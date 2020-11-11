/**
 *
 * ManageTemplatesCreateEdit
 *
 */


import { Button, Input, message, Modal, Select } from 'antd';
import axios from 'axios';
import React from 'react';
import './manageTemplate.css';
import {
    FieldContainer
} from './ManageTemplates.styled';
import Transfer from './transferque';

const ApiUtils = {
    MAIN_SKILLS: '/manageQuestion/getMainSkills',
    SUB_SKILLS: '/manageQuestion/getSubSkills',
    QUESTIONS: '/manageQuestion/bySkill',
    USERS: `/manageStudents/getCoaches/?orgID=${localStorage.getItem('orgID')}`,
    SET_TEMPLATE: 'manageTemplate/',
    UPDATE_TEMPLATE: 'manageTemplate/',

}
const DataUtils = {
    getMainSkills: async () => {
        return await axios.get(ApiUtils.MAIN_SKILLS, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') } });
    },
    getSubSkills: async (mainSkill) => {
        return await axios.get(ApiUtils.SUB_SKILLS, {
            params: { mainSkillArea: mainSkill, }
        });
    },
    getQuestions: async (mainSkill, subSkill) => {
        return await axios.get(ApiUtils.QUESTIONS, {
            params: { mainSkillArea: mainSkill, subSkillArea: subSkill }
        },
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') } }
        );
    },
    getAllUsers: async () => {
        return await axios.get(ApiUtils.USERS, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') } });
    },
    setTemplate: async (payload) => {
        return await axios.post(ApiUtils.SET_TEMPLATE, payload, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') } })
    },
    updateTemplate: async (payload) => {
        return await axios.put(ApiUtils.UPDATE_TEMPLATE, payload, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') } })
    }
};

class ManageTemplatesAddEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            templateName: props.templateName || '',

            selectedMainSkillArea: '',
            mainSkillList: [],

            selectedSubSkillArea: '',
            subSkillList: [],

            selectedQuestionList: (props.questionsList || []).map(ob => ({ key: ob.questionID, title: ob.questionText })),
            questionsList: [],


            //asigned by users
            assignedList: (props.assignedTo || []).map(ob => ob.userID),
            // all users to populate dropdown
            masterUserList: [],
        }
    }

    componentDidMount() {

        DataUtils.getMainSkills().then((response) => {
            if (!(response.data && response.data.data)) throw new Error('data not found in response');
            this.setState({ mainSkillList: response.data.data });
        }).catch((e) => {
            alert('error did mount');
        });

        DataUtils.getAllUsers().then((response) => {
            if (!(response.data && response.data.data)) throw new Error('data not found in response');
            this.setState({ masterUserList: response.data.data });
        }).catch((e) => {
            alert('error all select');
        });
        const { addEditingTemplateData } = this.props;
        if (addEditingTemplateData) {
            this.setState({
                ...addEditingTemplateData,
                templateName: addEditingTemplateData.templateName,
                selectedQuestionList: (addEditingTemplateData.questionsList || []).map(ob => ({ key: ob.questionID, title: ob.questionText })),
                assignedList: (addEditingTemplateData.assignedTo || []).map(ob => ob.userID),
                questionsList: []
            });
        }
    }

    handelMainSkillChange = (value) => {
        DataUtils.getSubSkills(value).then((response) => {
            if (!(response.data && response.data.data)) throw new Error('data not found in response');
            this.setState({ subSkillList: response.data.data, selectedMainSkillArea: value });
            this.setState({ selectedSubSkillArea: null, questionsList: [] });
        }).catch((e) => {
            alert('error  main skill handle change');
        })
        //  this.setState({ selectedMainSkillArea: value });
    }

    handelSubSkillChange = (value) => {
        DataUtils.getQuestions(this.state.selectedMainSkillArea, value).then((response) => {
            if (!(response.data && response.data.data)) throw new Error('data not found in response');
            this.setState({ questionsList: response.data.data, selectedSubSkillArea: value });
        }).catch((e) => {
            alert('error subskill');
        })
        //  this.setState({ selectedMainSkillArea: value });
    }




    cancelAddEdit = () => {
        this.setState({
            addEditModalStatus: '',
            addEditingTemplateData: null
        });
    }



    submit = () => {

        // {studentID: 1, studentReferenceNumber: 123, studentName: "sid1", studentContactNo: "123", orgID: 1, …}
        const { templateName, assignedList, selectedQuestionList } = this.state;
        const { onSave } = this.props;
        let obj = this.props.templateID ? { templateID: this.props.templateID } : {};

        if (this.props.addEditModalStatus === 'add') {
            DataUtils.setTemplate({

                "templateName": templateName,
                "createdBY": {
                    "userID": localStorage.getItem('userID')
                },
                "assignedTo": assignedList.map((id) => ({
                    userID: id
                })),
                "questionsList": selectedQuestionList.map((question) => ({
                    questionID: question.key
                }))
            }).then((response) => {
                message.success("Template successfully added");
                this.props.updateListingData();
            }).catch((e) => {
                alert('error while saving');
            })

        } else {
            console.log("inside update")
            console.log("templateID  is", this.props.addEditingTemplateData.templateID)
            const payload = {
                "templateID": this.props.addEditingTemplateData.templateID,
                "templateName": templateName,
                "createdBY": {
                    "userID": localStorage.getItem('userID')
                },
                "assignedTo": assignedList.map((id) => ({
                    userID: id
                })),
                "questionsList": selectedQuestionList.map((question) => ({
                    questionID: question.key
                }))
            }
            console.log("payload is", payload)
            DataUtils.updateTemplate(payload).then((response) => {
                message.success("Template successfully updated");
                this.props.updateListingData();
            }).catch((e) => {
                alert('error while update');
            })
        }

        //this.updateListingData()       

    }

    render() {

        const { questionsList, mainSkillList, assignedList, masterUserList, selectedMainSkillArea,
            selectedSubSkillArea,
            selectedQuestionList, subSkillList, templateName } = this.state;
        const { cancelAddEdit, addEditModalStatus } = this.props;

        return (
            <Modal
                title={addEditModalStatus === 'edit' ? 'Edit Template' : 'Create Template'}
                visible={addEditModalStatus.length}
                onOk={addEditModalStatus === 'edit' ? this.editTemplateData : this.createNewTemplate}
                onCancel={cancelAddEdit}
                footer={[
                    <Button key="back" onClick={cancelAddEdit}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.submit}>
                        {addEditModalStatus === 'edit' ? 'Update' : 'Create'}
                    </Button>,
                ]}
            >

                <FieldContainer style={{
                    width: 700,
                }}>  <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Template Name</p>
                    <Input value={templateName} placeholder='Enter Template Name' onChange={(e) => {
                        this.setState({ templateName: e.target.value });
                    }} />
                </FieldContainer>
                <FieldContainer style={{ display: "flex" }}>
                    <div><p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Main-skill Area</p>
                        <Select defaultValue="" value={selectedMainSkillArea} style={{ width: 400 }} onChange={this.handelMainSkillChange}>
                            <option value='' hidden>Select main-skill area</option>
                            {mainSkillList.map((skill, skillIndex) => {
                                return <Select.Option key={skillIndex} value={skill.mainSkillArea}>{skill.mainSkillArea}</Select.Option>
                            })}
                        </Select>
                    </div>
                    <div>
                        <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}> Sub-skill Area</p>
                        <Select defaultValue="" value={selectedSubSkillArea} style={{ width: 400 }} onChange={this.handelSubSkillChange}>
                            <option value='' hidden>Select sub-skill area</option>
                            {subSkillList.map((skill, skillIndex) => {
                                return <Select.Option key={skillIndex} value={skill.subSkillArea}>{skill.subSkillArea}</Select.Option>
                            })}
                        </Select>
                    </div>
                </FieldContainer>
                <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>&nbsp;&nbsp;&nbsp;&nbsp;Select Questions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Selected Questions</p>
                <Transfer
                    // this gets updated everytime it changes
                    defaultList={questionsList.map((question) => {
                        return {
                            key: question.questionID,
                            title: question.questionText
                        }
                    })}
                    //this wont get updated on change, acts like initial value
                    defaultSelectedList={selectedQuestionList}
                    //this is always the left side of tranfer list callback
                    onSelectListChange={(value) => this.setState({ selectedQuestionList: value })} />

                <FieldContainer style={{
                    width: 700,
                }}>
                    <p style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Assigned Coaches</p>

                    <Select mode='multiple' value={assignedList} placeholder="Select coaches" style={{ width: 400 }} onChange={(value) => {
                        this.setState({ assignedList: value });
                    }}>
                        {masterUserList.map((user, userIndex) => {
                            return <Select.Option key={userIndex} value={user.userID}>{user.userName}</Select.Option>
                        })}
                    </Select>
                </FieldContainer>

            </Modal >
        )
    }
}


export default ManageTemplatesAddEdit;

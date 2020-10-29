/**
 *
 * ManageQuestions
 *
 */

import React from 'react';
import { Table, Button, Icon, Popconfirm, message } from 'antd';
import axios from 'axios';

import {
    mainSkillsApiResponse,
    subSkillsApiResponse,
    questionsResponse,
} from './ManageQuestions.constants';

import ManageQuestionAddEditModal from './ManageQuestionAddEditModal';

import {
    filterArray,
} from '../../utils/utilityFunctions';

import {
    SkillSelectionContainer,
    QuestionHeaderContainer,
    TableHeaderContainer,
    SelectDropDownComponentWrapper,
    FieldContainer,
    IconContainer,
    ActionContainer,
    InputField,
} from './ManageQuestions.styled';

class ManageQuestions extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            mainSkillOptions: [],
            mainSkillValue: '',
            subSkillOptions: [],
            subSkillValue: '',
            questionsData: [],
            addEditModalStatus: '',
            addEditingQuestionData: null,
            questionFilterValue: '',
        }
    }

    componentDidMount() {
        // ToDo: api call to get the list of main skills options
        // const mainSkillOptions = mainSkillsApiResponse.data.map((mainSkill) => {
        //     return {
        //         id: mainSkill.mainSkillId,
        //         label: mainSkill.mainSkillName
        //     }
        // });

///manageQuestion/getMainSkills
//API to get sub skill areas: /manageQuestion/getSubSkills
        const apiCallPromise = axios.get("/manageQuestion/getMainSkills")
            .then(function (response) {
                //console.log(response)
                if(response.status === 200){
                return response.data.data;
                } else{
                    console.log('error');
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
            
        apiCallPromise.then((apiResponse) => {
            console.log('apiResponse: ', apiResponse);

            const mainSkillOptionsTemp = []

            for (let i = 0; i< apiResponse.length; i ++) {
                mainSkillOptionsTemp.push({
                    id: apiResponse[i],
                    label: apiResponse[i],
                });
            }

            this.setState({ mainSkillOptions: mainSkillOptionsTemp });

        })

        // const mainSkillOptionsTemp = []

        // for (let i = 0; i< mainSkillsApiResponse.data.length; i ++) {
        //     mainSkillOptionsTemp.push({
        //         id: mainSkillsApiResponse.data[i].mainSkillId,
        //         label: mainSkillsApiResponse.data[i].mainSkillName,
        //     });
        // }

        // this.setState({ mainSkillOptions: mainSkillOptionsTemp });
    }

    changeFilter = (value, fieldId) => {
        if (fieldId === 'mainSkillValue') {
            this.setState({ [fieldId]: value, subSkillOptions: [], subSkillValue: '', questionsData: [] });

            // ToDo: api call to get this list of sub skill options
            const subSkillOptions = subSkillsApiResponse.data.map((subSkill) => {
                return {
                    id: subSkill.subSkillId,
                    label: subSkill.subSkillName,
                }
            });
            this.setState({ subSkillOptions })
        } else {
            this.setState({ [fieldId]: value });

            this.getQuestions();
        }
    }

    getQuestions = () => {
        //  ToDo: api call to get the list of questions
        const questionsData = questionsResponse.data.map((question) => {
            return {
                ...question,
                key: question.questionId,
            }
        });
        this.setState({ questionsData });
    }

    editQuestion = (data) => {
        this.setState({
            addEditModalStatus: 'edit',
            addEditingQuestionData: data
        });
    }

    deleteQuestion = (questionId) => {
        //  ToDo: api call to delete the questionId question
        message.success('Question deleted successfully');
        console.log('delete question : ', questionId);
        this.getQuestions();
    }

    cancelAddEdit = () => {
        this.setState({
            addEditModalStatus: '',
            addEditingQuestionData: null
        });
    }

    updateListingData = () => {
        this.getQuestions();
        this.cancelAddEdit();
    }

    createNewQuestion = () => {
        this.setState({ addEditModalStatus: 'add' });
    }

    render() {
        const {
            mainSkillOptions,
            mainSkillValue,
            subSkillOptions,
            subSkillValue,
            questionsData,
            addEditModalStatus,
            addEditingQuestionData,
            questionFilterValue,
        } = this.state;

        const questionsColumns = [
            {
                title: 'Question',
                dataIndex: 'questionLabel',
                key: 'questionLabel',
            },
            {
                title: 'Action',
                dataIndex: 'questionId',
                key: 'questionId',
                render: (questionId, questionData) => {
                    return (
                        <ActionContainer>
                            <IconContainer>
                                <Popconfirm
                                    title={'Are you sure ?'}
                                    onConfirm={() => this.deleteQuestion(questionId)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Icon type={'delete'} />
                                </Popconfirm>
                            </IconContainer>
                            <IconContainer>
                                <Icon type={'edit'} onClick={() => this.editQuestion(questionData)} />
                            </IconContainer>
                        </ActionContainer>
                    );
                }
            },
        ];

        // questionsData
        let updatedQuestionsData = questionsData;

        if (questionFilterValue && questionFilterValue.length) {
            updatedQuestionsData = filterArray(questionsData, questionFilterValue, ['questionLabel']);
        }

        return (
            <div>
                <QuestionHeaderContainer>
                    <SkillSelectionContainer>
                        <SelectDropDownComponentWrapper
                            options={mainSkillOptions || []}
                            value={mainSkillValue}
                            showSearch
                            allowClear
                            showArrow
                            onChangeHandler={(value) => this.changeFilter(value, 'mainSkillValue')}
                            placeholder="Select Main Skill"
                        />
                        <SelectDropDownComponentWrapper
                            options={subSkillOptions || []}
                            value={subSkillValue}
                            showSearch
                            allowClear
                            showArrow
                            onChangeHandler={(value) => this.changeFilter(value, 'subSkillValue')}
                            placeholder="Select Sub Skill"
                        />
                    </SkillSelectionContainer>
                </QuestionHeaderContainer>
                {(mainSkillValue && subSkillValue) ? (
                    <>
                        <TableHeaderContainer>
                            <InputField
                                value={questionFilterValue}
                                onChange={(event) => this.changeFilter(event.target.value, 'questionFilterValue')}
                                placeholder="Filter question"
                            />
                            <Button onClick={this.createNewQuestion}>
                                Create New Question
                            </Button>
                        </TableHeaderContainer>
                        <FieldContainer>
                            <Table
                                dataSource={updatedQuestionsData}
                                columns={questionsColumns}
                                pagination={false}  //  Remove this line if you need pagination in questions
                            />
                        </FieldContainer>
                    </>
                ) : null}
                {addEditModalStatus && addEditModalStatus.length ? (
                    <ManageQuestionAddEditModal
                        addEditModalStatus={addEditModalStatus}
                        addEditingQuestionData={addEditingQuestionData}
                        cancelAddEdit={this.cancelAddEdit}
                        updateListingData={this.updateListingData}
                        mainSkillValue={mainSkillValue}
                        mainSkillOptions={mainSkillOptions}
                        subSkillValue={subSkillValue}
                        subSkillOptions={subSkillOptions}
                    />
                ) : null}
            </div>
        )
    }
}


export default ManageQuestions;

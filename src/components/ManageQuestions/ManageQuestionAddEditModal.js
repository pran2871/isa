/**
 *
 * ManageQuestionAddEditModal
 *
 */

import React from 'react';
import { Button, Modal, Input, message } from 'antd';

import SelectDropDownComponent from '../SelectDropDownComponent';

import {
    FieldContainer,
} from './ManageQuestions.styled';

import {
    manageStudentsOrganizationResponse,
    manageStudentsCoachListResponse,
} from './ManageQuestions.constants';

class ManageQuestionAddEditModal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            addEditingQuestionData: {
                question: '',
            },
        }
    }

    componentDidMount() {

        const { addEditingQuestionData } = this.props;

        if (addEditingQuestionData) {
            this.setState({ addEditingQuestionData: {
                ...addEditingQuestionData,
                question: addEditingQuestionData.questionLabel,
            }});
        }
    }

    submit = () => {
        console.log('addEditingQuestionData : ', this.state.addEditingQuestionData);
        console.log('addEditModalStatus : ', this.props.addEditModalStatus);
        console.log('mainSkillValue : ', this.props.mainSkillValue);
        console.log('subSkillValue : ', this.props.subSkillValue);
        //  ToDo: make the add / edit api call depending on the value of this.props.addEditModalStatus.
        //   use this.state.addEditingQuestionData to get the student data
        message.success(`Question ${this.props.addEditModalStatus === 'add' ? 'created' : 'updated'} successfully`);
        this.props.updateListingData();
    }

    changeFilter = (value) => {
        this.setState({ addEditingQuestionData: {
            ...this.state.addEditingQuestionData,
            question: value
        } });
    }

    render() {

        const { addEditingQuestionData } = this.state;
        const { cancelAddEdit, addEditModalStatus, mainSkillValue, mainSkillOptions, subSkillValue, subSkillOptions } = this.props;

        return (
            <Modal
                title={addEditModalStatus === 'edit' ? 'Edit Student Data' : 'Add New Student'}
                visible={addEditModalStatus.length}
                onOk={addEditModalStatus === 'edit' ? this.editStudentData : this.createNewStudent}
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
                <FieldContainer>
                    <SelectDropDownComponent
                        disabled
                        onChange={(event) => this.changeFilter(event.target.value)}
                        value={mainSkillValue}
                        placeholder="Main skill"
                        options={mainSkillOptions}
                    />
                </FieldContainer>
                <FieldContainer>
                    <SelectDropDownComponent
                        disabled
                        onChange={(event) => this.changeFilter(event.target.value)}
                        value={subSkillValue}
                        placeholder="Sub skill"
                        options={subSkillOptions}
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        onChange={(event) => this.changeFilter(event.target.value)}
                        value={addEditingQuestionData.question}
                        placeholder="Enter Question"
                    />
                </FieldContainer>
            </Modal>
        )
    }
}


export default ManageQuestionAddEditModal;

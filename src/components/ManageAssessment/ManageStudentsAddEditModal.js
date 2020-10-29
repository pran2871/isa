/**
 *
 * ManageStudentsAddEdit
 *
 */

import React from 'react';
import { Button, Modal, Input } from 'antd';

import SelectDropDownComponent from '../SelectDropDownComponent';

import {
    FieldContainer,
} from './ManageStudents.styled';

import {
    manageStudentsOrganizationResponse,
    manageStudentsCoachListResponse,
} from './ManageStudents.constants';

class ManageStudentsAddEdit extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            addEditingStudentData: {
                name: '',
                referenceNumber: '',
                contactNumber: '',
                organization: '',
                coach: '',
            },
            organizationList: [],
            coachList: [],
            // coachList: manageStudentsCoachListResponse.data,
        }
    }

    componentDidMount() {

        //  ToDo: API call to get the list of organizations
        this.setState({ organizationList: manageStudentsOrganizationResponse.data })


        const { addEditingStudentData } = this.props;
        if (addEditingStudentData) {
            this.setState({ addEditingStudentData: {
                ...addEditingStudentData,
                name: addEditingStudentData.studentName,
                referenceNumber: addEditingStudentData.studentReferenceNumber,
                contactNumber: addEditingStudentData.studentContactNo,
                organization: addEditingStudentData.organization.orgID,
                coach: addEditingStudentData.userID
            }});
        }
    }

    changeFilter = (value, fieldId) => {
        if (fieldId === 'organization') {
            //  ToDo: api call to get the list of coaches of the new organization
            this.setState({
                addEditingStudentData: {
                    ...this.state.addEditingStudentData,
                    [fieldId]: value,
                    coach: '',
                },
                coachList: manageStudentsCoachListResponse.data,
            });


        } else {
            this.setState({ addEditingStudentData: {
                ...this.state.addEditingStudentData,
                [fieldId]: value,
            } });
        }
    }

    submit = () => {
        console.log('addEditingStudentData : ', this.state.addEditingStudentData);
        console.log('addEditModalStatus : ', this.props.addEditModalStatus);
        //  ToDo: make the add / edit api .... this.props.addEditModalStatus.
        //  this.state.addEditingStudentData
        this.props.updateListingData();
    }

    render() {

        const { addEditingStudentData, organizationList = [], coachList = [] } = this.state;
        const { cancelAddEdit, addEditModalStatus } = this.props;

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
                    <Input
                        onChange={(event) => this.changeFilter(event.target.value, 'name')}
                        value={addEditingStudentData.name}
                        placeholder="Enter Name"
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        onChange={(event) => this.changeFilter(event.target.value, 'referenceNumber')}
                        value={addEditingStudentData.referenceNumber}
                        placeholder="Enter Reference Number"
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        onChange={(event) => this.changeFilter(event.target.value, 'contactNumber')}
                        value={addEditingStudentData.contactNumber}
                        placeholder="Enter Contact Number"
                    />
                </FieldContainer>
                <FieldContainer>
                    <SelectDropDownComponent
                        elmId="organization"
                        disabled={addEditModalStatus === 'edit'}
                        showSearch
                        allowClear
                        showArrow
                        onChangeHandler={(value) => this.changeFilter(value, 'organization')}
                        value={addEditingStudentData.organization}
                        placeholder="Select Organization"
                        options={organizationList.map((organizationData) => {
                            return {
                                id: organizationData.orgID,
                                label: organizationData.orgName,
                            }
                        })}
                    />
                </FieldContainer>
                <FieldContainer>
                    <SelectDropDownComponent
                        elmId="coach"
                        disabled={addEditModalStatus === 'edit'}
                        showSearch
                        allowClear
                        showArrow
                        onChangeHandler={(value) => this.changeFilter(value, 'coach')}
                        value={addEditingStudentData.coach}
                        placeholder="Select Coach"
                        options={coachList.map((CoachData) => {
                            return {
                                id: CoachData.userID,
                                label: CoachData.userName,
                            }
                        })}
                    />
                </FieldContainer>
            </Modal>
        )
    }
}


export default ManageStudentsAddEdit;

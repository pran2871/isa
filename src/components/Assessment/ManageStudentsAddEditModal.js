/**
 *
 * ManageStudentsAddEdit
 *
 */

import React from 'react';
import { Button, Modal, Input } from 'antd';
import axios from 'axios';
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

       
        //http://localhost:8080/manageOrganization/getAll/
        const apiCallPromise = axios.get("/manageOrganization/getAll/")
        .then(function (response) {
            console.log(response)
            console.log(response.data.data)
            //console.log(response.data.data.orgName)
            //console.log(response.data.data.orgID)
            //console.log(this.state.dataSource)
            console.log("akash")
        if(response.status === 200){
            //this.setState({ dataSource: response.data.data });
            //this.state.dataSource = response.data.data;
            //this.state.orgID = response.data.data.orgID;
            return response.data.data;
        } else{
            console.log('error');
        }
    })
    .catch(function (error) {
        console.log(error);
    });  

    // using .then, create a new apiCallPromise which extracts the data
    apiCallPromise.then((response) => {

      console.log('response.data.data : ', response);
      // [{name: 'a', b: 'b'}, {name: 'c', d: 'd'}]


      const parsedData  = response.map((rowData) => {
        return Object.values(rowData).map((value) => `${value}`);
      });
      console.log('setting data : ', parsedData);
      this.setState({ organizationList: response });
    })

      //  this.setState({ organizationList: manageStudentsOrganizationResponse.data })


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
                       //http://localhost:8080/manageStudents/getCoaches?orgID=1
            //var id = 
            const apiCallPromise = axios.get(`manageStudents/getCoaches?orgID=${this.state.addEditingStudentData.organization}`)
        .then(function (response) {
            console.log(response)
            console.log(response.data.data)
            //console.log(response.data.userName)
            //console.log(this.state.dataSource)
            console.log("akash")
        if(response.status === 200){
            //this.setState({ dataSource: response.data.data });
            //this.state.dataSource = response.data.data;
            return response.data.data;
        } else{
            console.log('error');
        }
    })
    .catch(function (error) {
        console.log(error);
    });  

    // using .then, create a new apiCallPromise which extracts the data
    apiCallPromise.then((response) => {

      console.log('response.data. : ', response);
      // [{name: 'a', b: 'b'}, {name: 'c', d: 'd'}]


      
      this.setState({
        addEditingStudentData: {
            ...this.state.addEditingStudentData,
            [fieldId]: value,
            coach: '',
        },
        coachList: response,
    });

    })

            


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
        
        
        //http://localhost:8080/manageOrganization/add/
        //http://localhost:8080/manageOrganization/update/
        
       
       
        axios.post(this.props.addEditModalStatus === 'add' ? '/manageOrganization/add/' : '/manageOrganization/update/', this.state.addEditingStudentData)
           .then(function (response) {
                console.log(response);   
            });
            
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

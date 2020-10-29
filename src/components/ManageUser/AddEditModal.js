import React from 'react';
import { Button, Modal, Input, message } from 'antd';
import axios from 'axios';
import SelectDropDownComponent from '../SelectDropDownComponent';
// import manageUsers from './ListUsers.js';
import {
    FieldContainer,
} from './style';

class addEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            addEditUserData: {
                userRoleOrgID : '',
                userID : '',
                emailID : '',
                userName : '',
                password : '',
                userContactNo : '',
                roleName : '',
                orgID : ''
            },
            organizationList: [],
            roleList: ['Coach', 'Admin', 'Superadmin'],
        }
    }

    componentDidMount() {
        axios.get("/manageOrganization/getAll/").then(response => {
            if(response.status === 200){
                this.setState({ organizationList: response.data.data });
            } else{
                console.log('error fetching orgList');
            }
        })
        .catch(function (error) {
            console.log(error);
        });


        const { addEditUserData } = this.props;
        if (addEditUserData) {
            this.setState({ addEditUserData: {
                ...addEditUserData,
                userID: addEditUserData.userID,
                userName: addEditUserData.userName,
                emailID: addEditUserData.emailID,
                password: addEditUserData.password,
                userContactNo: addEditUserData.userContactNo,
                roleName: addEditUserData.roleName,
                orgID: addEditUserData.orgID,
            }});
        }
    }

    changeFilter = (value, fieldId) => {
        this.setState({ addEditUserData: {
            ...this.state.addEditUserData,
            [fieldId]: value,
        }});
    }

    refreshListingData = () => {
        // this.cancelAddEdit();
        // new manageUsers().fetchUsersList();
        window.location.reload();
    }

    cancelAddEdit = () => {
        this.setState({
            addEditModalStatus: '',
            addEditUserData: null
        });
    }

    submit = () => {
        if(this.props.addEditModalStatus === 'add'){
            const newUser = {
                "user": {
                    "emailID": this.state.addEditUserData.emailID,
                    "userName": this.state.addEditUserData.userName,
                    "password": this.state.addEditUserData.password,
                    "userContactNo": this.state.addEditUserData.userContactNo
                },
                "role":{
                    "roleName": this.state.addEditUserData.roleName
                },
                "organization":{
                    "orgID": this.state.addEditUserData.orgID
                }
            }

            axios.post("/manageUser/", newUser).then(response => {
                if (response.status === 200) {
                    if (response.data.status === "error") {
                        message.error(response.data.message);
                    } else if (response.data.status === "success") {
                        if (response.data.message != "") {
                            message.success(response.data.message);
                        }
                    }
                } else {
                    message.error("Something went wrong");
                }
            }).catch(function (error) {
                console.log(error)
                message.error("Unable to contact server");
            });
        }else{
            const newUser = {
                "userRoleOrgID": this.state.addEditUserData.userRoleOrgID,
                "user": {
                    "userID": this.state.addEditUserData.userID,
                    "emailID": this.state.addEditUserData.emailID,
                    "userName": this.state.addEditUserData.userName,
                    "password": this.state.addEditUserData.password,
                    "userContactNo": this.state.addEditUserData.userContactNo
                },
                "role":{
                    "roleName": this.state.addEditUserData.roleName
                },
                "organization":{
                    "orgID": this.state.addEditUserData.orgID
                }
            }

            axios.patch("/manageUser/", newUser).then(function (response) {
                if (response.status === 200) {
                    if (response.data.status === "error") {
                        message.error(response.data.message);
                    } else if (response.data.status === "success") {
                        if (response.data.message != "") {
                            message.success(response.data.message);
                        }
                    }
                } else {
                    message.error("Something went wrong");
                }
            }).catch(function (error) {
                console.log(error)
                message.error("Unable to contact server");
            });
        }

        this.refreshListingData();
    }

    render() {

        const { addEditUserData, organizationList = [], roleList = [] } = this.state;
        const { cancelAddEdit, addEditModalStatus } = this.props;

        return (
            <Modal
                title={addEditModalStatus === 'edit' ? 'Update User' : 'Add New User'}
                visible={addEditModalStatus.length > 0}
                onOk={addEditModalStatus === 'edit' ? this.editUserData : this.createNewUser}
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
                        onChange={(event) => this.changeFilter(event.target.value, 'userName')}
                        value={addEditUserData.userName}
                        placeholder="Enter Name"
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        onChange={(event) => this.changeFilter(event.target.value, 'emailID')}
                        value={addEditUserData.emailID}
                        placeholder="Enter Email ID"
                    />
                </FieldContainer>
                <FieldContainer>
                    <Input
                        onChange={(event) => this.changeFilter(event.target.value, 'password')}
                        value={addEditUserData.password}
                        placeholder="Enter Password"
                    />
                </FieldContainer><FieldContainer>
                <Input
                    onChange={(event) => this.changeFilter(event.target.value, 'userContactNo')}
                    value={addEditUserData.userContactNo}
                    placeholder="Enter Contact Number"
                />
            </FieldContainer>
                <FieldContainer>
                    <SelectDropDownComponent
                        showArrow
                        onChangeHandler={(value) => this.changeFilter(value, 'roleName')}
                        value={addEditUserData.roleName}
                        placeholder="Select Role"
                        options={roleList.map((roleName) => {
                            return {
                                id: roleName.toLowerCase(),
                                label: roleName,
                            }
                        })}
                    />
                </FieldContainer>
                <FieldContainer>
                    <SelectDropDownComponent
                        disabled={addEditUserData.roleName.toLowerCase() === 'superadmin'}
                        showSearch
                        allowClear
                        showArrow
                        onChangeHandler={(value) => this.changeFilter(value, 'orgID')}
                        value={addEditUserData.orgID}
                        placeholder="Select Organization"
                        options={organizationList.map((organizationData) => {
                            return {
                                id: organizationData.orgID,
                                label: organizationData.orgName,
                            }
                        })}
                    />
                </FieldContainer>
            </Modal>
        )
    }
}


export default addEdit;

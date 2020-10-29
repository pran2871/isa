import React from 'react';
import { Table, Button, Icon, Popconfirm, message } from 'antd';
import axios from 'axios';
import AddEditModal from './AddEditModal';
import './ListUsers.css'
import {
    filterArray,
} from '../../utils/utilityFunctions';

import {
    InputFilterContainer,
    InputField,
    IconContainer,
    ActionContainer,
} from './style';

class ManageUsers extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filterValue: '',
            dataSource: [],
            addEditModalStatus: '',
            addEditUserData: null,
            deleteData:null,
        }
    }

    componentDidMount() {
        this.fetchUsersList();
    }

    fetchUsersList = () => {
        const apiCallPromise = axios.get("/manageUser/getAll").then(response => {
            if(response.status === 200){
                if(response.data.status === "error") {
                    message.error(response.data.message);
                }else{
                    if(response.data.message != "") {
                        message.success(response.data.message);
                    }
                    this.setState({ dataSource: response.data.data });
                }
            } else {
                message.error("Something went wrong");
            }
        }).catch(function (error) {
            message.error("Unable to contact server");
        });
    }


    // export ManageUsers();

    deleteUser = (userRoleOrgID, userData) => {
        this.setState({
            addEditModalStatus: '',
            deleteData: userData
        });

        const deleteUserPayload = {
            userRoleOrgID: userData.userRoleOrgID,
            user: userData.user,
            role: userData.role,
            organization: userData.organization
        }

        axios.delete("/manageUser/", {data: deleteUserPayload}).then(response => {
            if (response.status === 200) {
                if (response.data.status === "error") {
                    message.error(response.data.message);
                } else if (response.data.status === "success") {
                    if (response.data.message != "") {
                        message.success(response.data.message);
                    }

                    const dataSource = [...this.state.dataSource];
                    this.setState({ dataSource: dataSource.filter(item => item.userRoleOrgID !== userRoleOrgID) });
                }
            } else {
                message.error("Something went wrong");
            }
        }).catch(function (error) {
            console.log(error)
            message.error("Unable to contact server");
        });
    }

    createNewUser = () => {
        this.setState({ addEditModalStatus: 'add' });
    }

    editUserData = (userRoleOrgID, userData) => {
        let orgID = userData.organization.orgID;

        if(userData.role.roleName.toLowerCase() === 'superadmin'){
            orgID = '';
        }

        this.setState({
            addEditModalStatus: 'edit',
            addEditUserData: {
                userRoleOrgID : userData.userRoleOrgID,
                userID : userData.user.userID,
                emailID : userData.user.emailID,
                userName : userData.user.userName,
                password : '',
                userContactNo : userData.user.userContactNo,
                roleName : userData.role.roleName,
                orgID : orgID
            }
        });
    }

    cancelAddEdit = () => {
        this.setState({
            addEditModalStatus: '',
            addEditUserData: null
        });
    }

    changeFilter = (event) => {
        // event.preventDefault();
        // alert(event.target.value)
        this.setState({ filterValue: event.target.value });
    }

    refreshListingData = () => {
        this.fetchUsersList();
        this.cancelAddEdit();
    }

    render() {
        const manageUsersColumns = [
            {
                title: 'S. No.',
                dataIndex: '',
                key: 'S. No.',
                render: (text, record, index) => index+1,
            },
            {
                title: 'Name',
                dataIndex: 'user.userName',
                key: 'userName',
                sorter: (a, b) => {
                        a = a.user.userName || '';
                        b = b.user.userName || '';
                    return a.localeCompare(b)
                },
            },
            {
                title: 'Email ID',
                dataIndex: 'user.emailID',
                key: 'emailID',
                sorter: (a, b) => {
                    a = a.user.emailID || '';
                    b = b.user.emailID || '';
                    return a.localeCompare(b)
                },
            },
            {
                title: 'Role',
                dataIndex: 'role.roleName',
                key: 'roleName',
                sorter: (a, b) => {
                    a = a.role.roleName || '';
                    b = b.role.roleName || '';
                    return a.localeCompare(b)
                },
            },
            {
                title: 'Organization Name',
                dataIndex: 'organization.orgName',
                key: 'orgName',
                sorter: (a, b) => {
                    a = a.organization.orgName || '';
                    b = b.organization.orgName || '';
                    return a.localeCompare(b)
                }
            },
            {
                title: 'Created Date',
                dataIndex: 'createdAt',
                key: 'createdAt',
                sorter: (a, b) => {
                    a = a.createdAt || '';
                    b = b.createdAt || '';
                    return a.localeCompare(b)
                },
            },
            {
                title: 'Actions',
                dataIndex: 'userRoleOrgID',
                key: 'userRoleOrgID',
                render: (userRoleOrgID, userData) => {
                    return (
                        <ActionContainer>
                            <IconContainer>
                                <Icon type={'edit'} onClick={() => this.editUserData(userRoleOrgID, userData)} />
                            </IconContainer>
                            <IconContainer>
                                <Popconfirm
                                    title={'Are you sure?'}
                                    onConfirm={() => this.deleteUser(userRoleOrgID, userData)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Icon type={'delete'} />
                                </Popconfirm>
                            </IconContainer>
                        </ActionContainer>
                    );
                }
            },
        ];


        const { filterValue, dataSource, addEditModalStatus = '', addEditUserData } = this.state;

        let filteredDataSource = dataSource;
        if (filterValue && filterValue.length > 0) {
            filteredDataSource = filterArray(
                dataSource,
                filterValue,
                ['user.userName', 'user.emailID', 'role.roleName', 'organization.orgName', 'createdAt']
            );
        }

        return (
            <div>
                <InputFilterContainer>
                    <InputField
                        onChange={this.changeFilter}
                        value={filterValue}
                        allowClear
                        placeholder="Search User"
                    />
                    <Button
                        type="primary"
                        onClick={this.createNewUser}
                    >Add User</Button>
                </InputFilterContainer>
                <Table
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    dataSource={filteredDataSource}
                    columns={manageUsersColumns}
                />
                {
                    addEditModalStatus && addEditModalStatus.length > 0 ? (
                        <AddEditModal
                            addEditModalStatus={addEditModalStatus}
                            addEditUserData={addEditUserData}
                            cancelAddEdit={this.cancelAddEdit}
                            refreshListingData={this.refreshListingData}
                        />
                    ) : null
                }
            </div>
        )
    }
}


export default ManageUsers;
/*
import React, {useEffect, useState} from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar'
import {Button} from "@material-ui/core";
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { useHistory } from "react-router-dom";

const App = () => (
    <ToastProvider>
        <ListUsers/>
        <deleteUser/>
    </ToastProvider>
)

const ListUsers = () =>  {
    let history = useHistory();
    const { addToast } = useToasts();
    const [tableData, setTableData] = useState([]);

    const fetchUsersList = async () => {
        await axios.get("/manageUser/getAll").then(function (response) {
            if (response.status === 200) {
                setTableData(response.data.data);

                if(response.data.message !== "") {
                    addToast(response.data.message, {
                        appearance: response.data.status,
                        autoDismiss: true
                    });
                }
            }else {
                addToast("Something went wrong", {
                    appearance: 'error',
                    autoDismiss: true
                });
            }
        }).catch(function (error) {
            addToast("Some Error Occurred", {
                appearance: 'error',
                autoDismiss: true
            });
        });
    }

    const deleteUser = async (userData) => {
        const deleteUserPayload = {
            userRoleOrgID: userData.userRoleOrgID,
            user: userData.user,
            role: userData.role,
            organization: userData.organization
        }

        await axios.delete("/manageUser/", {data: deleteUserPayload}).then(function (response) {
            if (response.status === 200) {
                if(response.data.status === 'success'){
                    const dataDelete = [...tableData];
                    const index = userData.tableData.id;
                    dataDelete.splice(index, 1);
                    setTableData([...dataDelete]);
                }

                if(response.data.message !== "") {
                    addToast(response.data.message, {
                        appearance: response.data.status,
                        autoDismiss: true
                    });
                }
            }else {
                addToast("Something went wrong", {
                    appearance: 'error',
                    autoDismiss: true
                });
            }
        }).catch(function (error) {
            addToast("Some Error Occurred", {
                appearance: 'error',
                autoDismiss: true
            });
        });
    }

    // const updateUser = async (userData) => {
    //     history.push({pathname: '/manageUser/update', data: userData});
    // }

    useEffect(() => {
        fetchUsersList();
    }, [])


    return (
        <>
            <Button
                onClick={() => history.push('/manageUser/add')}
                color="primary"
                variant="outlined"
                style={{textTransform: 'none'}}
                size="medium">Add New User
            </Button>
            <div className="App">
                <MaterialTable
                    columns={[
                        {title: "S.No.", field: "tableData.id"},
                        {title: "Name", field: "user.userName"},
                        {title: "Email ID", field: "user.emailID"},
                        {title: "Role", field: "role.roleName"},
                        {title: "Organization", field: "organization.orgName"},
                        {title: "Created Date", field: "createdAt", width: 170}
                    ]}
                    data={tableData}
                    title="Users"
                    key={tableData.length}
                    actions={[{}]}
                    options={{
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#007bff',
                            color: '#FFF'
                        },
                        pageSizeOptions: [10, 20, 50, 100],
                        pageSize: 10,
                        rowStyle: (data, index) => {
                            if (index % 2) {
                                return {backgroundColor: "#ecf2f9"}
                            }
                        },
                        emptyRowsWhenPaging: false
                    }}
                    components={{
                        Action: props => (
                            <>
                                <Button
                                    onClick={
                                        (event) => history.push({
                                            pathname: '/manageUser/update',
                                            data: props.data
                                        })
                                    }
                                    color="default"
                                    variant="outlined"
                                    style={{textTransform: 'none'}}
                                    size="medium"
                                >Update</Button>

                                <Button
                                    onClick={
                                        (event) => deleteUser(props.data)
                                    }
                                    color="secondary"
                                    variant="outlined"
                                    style={{textTransform: 'none'}}
                                    size="medium"
                                >Delete</Button>
                            </>
                        )
                    }}
                />
            </div>
        </>
    );
}

export default App;*/
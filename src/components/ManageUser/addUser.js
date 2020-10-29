import React, {useEffect, useState} from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import {ToastProvider, useToasts} from "react-toast-notifications";

let pageType;
let selected = true;

const App = () => (
    <ToastProvider>
        <AddUser/>
    </ToastProvider>
)

const AddUser = () => {
    let history = useHistory();
    const { addToast } = useToasts();
    const { data } = history.location
    console.log(history);
    console.log(data);

    let userData = {
        userName: "",
        emailID: "",
        password: "",
        userContactNo: "",
        roleName: "",
        orgID: ""
    };

    if(history.location.pathname === "/manageUser/add"){
        pageType = "Add New";
    }else{
        pageType = "Update";
        selected = false;
        userData = {
            userID: data.user.userID,
            userName: data.user.userName,
            emailID: data.user.emailID,
            password: data.user.password,
            userContactNo: data.user.userContactNo,
            roleName: data.role.roleName,
            orgID: data.organization.orgID
        }
    }

    const [user, setUser] = useState(userData);
    const [orgList, setOrgList] = useState([]);
    const roleList = ['Coach', 'Admin', 'Superadmin'];

    const { userName, emailID, password, userContactNo, roleName, orgID } = user;
    const onInputChange = e => {setUser({ ...user, [e.target.name]: e.target.value });};

    useEffect(() => {
        organizationsList();
    }, [])

    const organizationsList = async () => {
        axios.get("/manageOrganization/getAll").then(function (response) {
            if (response.status === 200) {
                setOrgList(response.data.data);
            }
        }).catch(function (error) {
        });
    }

    const onSubmit = async e => {
        e.preventDefault();

        let newUser;
        if(history.location.pathname === "/manageUser/add"){
            newUser = {
                "user": {
                    "emailID": user.emailID,
                    "userName": user.userName,
                    "password": user.password,
                    "userContactNo": user.userContactNo
                },
                "role":{
                    "roleName": user.roleName
                },
                "organization":{
                    "orgID": user.orgID
                }
            }

            await axios.post("/manageUser/", newUser).then(function (response) {
                if (response.status === 200) {
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
        } else {
            newUser = {
                "userRoleOrgID": data.userRoleOrgID,
                "user": {
                    "userID": user.userID,
                    "emailID": user.emailID,
                    "userName": user.userName,
                    "password": user.password,
                    "userContactNo": user.userContactNo
                },
                "role":{
                    "roleName": user.roleName
                },
                "organization":{
                    "orgID": user.orgID
                }
            }

            await axios.patch("/manageUser/", newUser).then(function (response) {
                if (response.status === 200) {
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

        // setTimeout(() => {}, 5000);
        // history.push("/manageUser");
    };
    return (
        <>
            <Sidebar/>
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">{pageType} User</h2>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Name"
                                name="userName"
                                value={userName}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Email ID"
                                name="emailID"
                                value={emailID}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Contact Number"
                                name="userContactNo"
                                value={userContactNo}
                                onChange={e => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" onChange={e => onInputChange(e)} name="roleName">
                                <option disabled selected={selected}>Select Role</option>
                                {
                                    roleList.map((value, index) => {
                                        return <option selected={value.toLowerCase() === roleName} value={value.toLowerCase()}>{value}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-control form-control-lg" onChange={e => onInputChange(e)} name="orgID">
                                <option disabled selected={selected}>Select Organization</option>
                                {
                                    orgList.map((value, index) => {
                                        return <option selected={value.orgID === orgID} value={value.orgID}>{value.orgName}</option>
                                    })
                                }
                            </select>
                        </div>
                        <button className="btn btn-primary btn-block">{pageType} User</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default App;
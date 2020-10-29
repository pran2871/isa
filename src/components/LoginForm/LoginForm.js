import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";


import Header from '../Header/Header';

import {
    Input,
    Button,
    message,
} from 'antd';

import {
    LoginContainer,
    LoginFormContainer,
    FieldContainer,
    ButtonFieldContainer,
} from './LoginForm.styled';




function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })

    const handleChange = (value, id) => {
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        //message.warning('warning test data');
        //message.success('success test data');
        //redirectToHome();
        e.preventDefault();
         const payload={
             "email":state.email,
             "password":state.password,
         }
         //http://localhost:8080/login/?email_id=email1&password=1234
        axios.get("/login/?email_id="+payload.email+"&password="+payload.password, payload)
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    console.log(response.data);
                    console.log(response.data);
                    console.log(response.data.status);
                    console.log(response.data.message);
                    if(response.data.status ==='error')
                    {                        
                        console.log(response.data.message);
                        message.error(response.data.message);
                        
                    }else{
                    
                    // console.log(response.data.data.data)
                    // console.log(response.data.data.data.organization.orgID)
                    // console.log(response.data.data.data.organization.orgName)
                    // console.log(response.data.data.data.role.roleName)
                    // console.log(response.data.data.data.user.emailID)
                    // console.log(response.data.data.data.user.userContactNo)
                    // console.log(response.data.data.data.user.userID)
                    // console.log(response.data.data.data.user.userName)
                    // localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    console.log("success");
                    console.log(response.data);
                    localStorage.setItem('orgID',response.data.data.organization.orgID);
                    localStorage.setItem('orgName',response.data.data.organization.orgName);
                    localStorage.setItem('roleName',response.data.data.role.roleName);
                    localStorage.setItem('emailID',response.data.data.user.emailID);
                    localStorage.setItem('userContactNo',response.data.data.user.userContactNo);
                    localStorage.setItem('userID',response.data.data.user.userID);
                    localStorage.setItem('userName',response.data.data.user.userName);

                    redirectToHome();
                    //props.showError(null)
                    }
                }
                else if(response.code === 204){
                    message.error(response.data.message);
                }
                else{
                    message.error(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.history.push('/landing');
    }
    const redirectToRegister = () => {
        props.history.push('/forgot');
    }
    return(
        <div>
            <Header />
            <LoginContainer>
                <LoginFormContainer>
                    <FieldContainer>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={(event) => handleChange(event.target.value, 'email')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={state.password}
                            onChange={(event) => handleChange(event.target.value, 'password')}
                        />
                    </FieldContainer>
                    <ButtonFieldContainer>
                        <Button type="primary" onClick={handleSubmitClick}>
                            Submit
                        </Button>
                        <Button type="link" onClick={redirectToRegister} >
                            Forgot Password?
                        </Button>
                    </ButtonFieldContainer>
                </LoginFormContainer>
            </LoginContainer>
        </div>
    )
}

export default withRouter(LoginForm);
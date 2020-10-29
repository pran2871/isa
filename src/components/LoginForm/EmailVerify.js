import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

import Header from '../Header/Header';

import {
    Input,
    Button,
} from 'antd';

import {
    LoginContainer,
    LoginFormContainer,
    FieldContainer,
    ButtonFieldContainer,
} from '../LoginForm/LoginForm.styled';




function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        code : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
         const payload={
             "email":localStorage.getItem('email'),
             "password":state.password,
             "code":state.code,
         }
         //http://localhost:8080/login/verify/?email_id=akashmalla07@gmail.com&verification_code=ebnmavnfgy
        axios.get("/login/verify?email_id="+payload.email+"&verification_code="+payload.code, payload)
            .then(function (response) {
                console.log(response)
                console.log(response.data)
                //console.log(response.data.data.name)
                //name1 = response.data.data.name
                console.log(response.data.status)
                //console.log(response.data.data.roleName)
                if(response.status === 200){
                    // setState(prevState => ({
                    //     ...prevState,
                    //     'successMessage' : 'Login successful. Redirecting to home page..'
                    // }))
                    if(response.data.status ==='Fail')
                    {
                        console.log("qqqqqqqqqqqqq")
                        props.showError("Wronng Verification code");
                        
                    }else{
                    console.log("hiiiiiiiiiiii")
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                    localStorage.setItem('name',response.data.data.name);
                    localStorage.setItem('role',response.data.data.roleName);
                    //localStorage.setItem(NAME,response.data.data.name);
                   console.log(response.data.data.status)
                   
                   redirectToReset();
                    props.showError(null)
                    }
                }
                else if(response.code === 204){
                    props.showError("Email and password do not match");
                }
                else{
                    props.showError("User does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.history.push('/landing');
    }
    const redirectToReset = () => {
        props.history.push('/reset');
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
                            id="code"
                            placeholder="Enter Verification code"
                            value={state.code}
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <ButtonFieldContainer>
                        <Button
                            type="primary"
                            onClick={handleSubmitClick}
                        >
                            Submit
                    </Button>
                    </ButtonFieldContainer>
                </LoginFormContainer>
            </LoginContainer>
        </div>
    )
}

export default withRouter(LoginForm);
import React, {useState} from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

import Header from '../Header/Header';

import {
    Input,
    Button, message
} from 'antd';

import {
    LoginContainer,
    LoginFormContainer,
    FieldContainer,
    ButtonFieldContainer,
} from '../LoginForm/LoginForm.styled';


function ForgotPassword(props) {
    

    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        //if(state.email.length && state.password.length) {
           // props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
           }
           localStorage.setItem('email',payload.email)
            //http://localhost:8080/login/send-mail/?email_id=akashmalla07@gmail.com
            axios.put("/login/send-mail/?email_id="+payload.email, payload)
                .then(function (response) {
                    console.log(response)
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                        redirectToVerify();
                       // props.showError(null)
                    } else{
                        message.error(response.data.message);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        // } else {
        //     props.showError('Please enter valid username and password')    
        // }
        
    }
    const redirectToHome = () => {
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.history.push('/login'); 
    }
    const redirectToVerify = () => {
        props.history.push('/verify'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()
        // if(state.password === state.confirmPassword) {
                
        // } else {
        //     props.showError('Passwords do not match');
        // }
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
                            onChange={handleChange}
                        />
                    </FieldContainer>
                    <ButtonFieldContainer>
                        <Button
                            type="primary"
                            onClick={handleSubmitClick}
                        >
                            Send Verification Code
                        </Button>
                    </ButtonFieldContainer>
                </LoginFormContainer>
            </LoginContainer>
        </div>
    )
}

export default withRouter(ForgotPassword);
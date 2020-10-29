import React, {useState} from 'react';
import axios from 'axios';
import './ResetPassword.css';
import { Button, Modal, Input , message} from 'antd';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

import Header from '../Header/Header';



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
        confirmpassword :"",
        successMessage: null
    })
    const handleChange = (value, id) => {
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
             "confirmpassword":state.confirmpassword,
         }
        
         if(state.password === state.confirmpassword) {
             //http://localhost:8080/login/changePassword/?email_id=akashmalla07@gmail.com&password=123456
         
        const reply = axios.put("/login/changePassword?email_id="+payload.email+"&password="+payload.password, payload)
            .then(function (response) {
                console.log(response)
                console.log(response.data)
                //console.log(response.data.data.name)
                //name1 = response.data.data.name
                console.log(response.data.status)
                //console.log(response.data.data.roleName)
                if(response.status === 200){
                   
                         setState(prevState => ({
                             ...prevState,
                             'successMessage' : 'PassWord has been changed'
                         }))
                         message.success("Password successfully changed");
                    
                    if(response.data.status ==='error')
                    {
                        console.log("qqqqqqqqqqqqq")
                        message.error(response.data.message);
                    }else{
                    console.log("hello")
                   
                    
                    
                }
                }
                else if(response.code === 204){
                    message.error(response.data.message);
                }
                else{
                    message.error(response.data.message);
                }
            })
            reply.then((response) => {
                redirectToHome();
            })
            
        }else{
            message.error("error...try again");
        }
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
                            type="password"
                            id="password"
                            placeholder="Enter New Password" 
                            value={state.password}
                        onChange={(event) => handleChange(event.target.value, 'password')}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <Input
                            type="password"
                            id="confirmpassword"
                            placeholder="Enter New Password"
                            value={state.confirmpassword}
                            onChange={(event) => handleChange(event.target.value, 'confirmpassword')}
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
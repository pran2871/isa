import React, {useState} from 'react';
import axios from 'axios';
import './EmailVerification.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function EmailVerification(props) {
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
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'/user/EmailVerification', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
                        redirectToHome();
                        //props.showError(null)
                    } else{
                        message.error(response.data.message);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            //props.showError('Please enter valid username and password')    
            message.error(response.data.message);
        }
        
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }

    const handleSubmitCodeClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    const redirectToResetPassword = () => {
        
        props.updateTitle('Independence Skills Assessment');
        props.history.push('/reset'); 
    }
    const handleResendCodeClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
           // sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                 <label htmlFor="exampleInputEmail1">Enter verification code </label>
                <input type="verificationcode" 
                       className="form-control" 
                       id="verificationcode" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter Verification Code" 
                       value={state.verificationcode}
                    //    onChange={handleChange}
                />
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
             {/* <div className="form-group text-left">
                     <label htmlFor="exampleInputPassword1">Password</label> 
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>  */}
                {/* <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div> */}
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={redirectToResetPassword()}
                >
                    Submit Code
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp; 
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleResendCodeClick}
                >
                    Resend Code
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            {/* <div className="mt-2"> */}
                {/* <span>Already have an account? </span> */}
                {/* <span className="loginText" onClick={() => redirectToLogin()}>Forgot Email?</span>  */}
            {/* </div> */}
            
        </div>
    )
}

export default withRouter(EmailVerification);
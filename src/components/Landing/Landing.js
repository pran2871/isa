import React, {useState} from 'react';
import axios from 'axios';
import './Landing.css';
import Sidebar from '../Sidebar/Sidebar.js';
import { withRouter } from "react-router-dom";

//import About from "./About";
//import { Route, Switch } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex"
  }
});

function RegistrationForm(props) {
    const classes = useStyles();
    
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null 
    })
    //name = localStorage.getItem('name');
    //console.log(name);
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
            axios.post("http://54.173.160.222:8080/login/?email_id="+payload.email1+"&password="+payload.password, payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToHome = () => {
        return localStorage.setItem('name');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
            <div>
                landing page
            </div>
        </div>
    )
}

export default withRouter(RegistrationForm);
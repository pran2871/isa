import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import { Button, Modal, Input , message} from 'antd';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";




function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
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
        }

        if(state.password === state.confirmpassword) {
                
         
         //http://localhost:8080/login/?email_id=email1&password=12345
       const reply = axios.get("/login/changePassword?email_id="+payload.email+"&password="+payload.password, payload)
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
                    if(response.data.status ==='error')
                    {
                        console.log("qqqqqqqqqqqqq")
                        message.error(response.data.message);
                    }
                    console.log("hello")
                    props.history.push('/landing');
                }
                else if(response.code === 204){
                    message.error(response.data.message);
                }
                else{
                    message.error(response.data.message);
                }
            })
            reply.then((response) => {
                console.log("in promise")
                message.success("Password successfully changed");
                props.history.push('/landing');
            })
            .catch(function (error) {
                console.log(error);
            });

            
        } else {
            props.showError('Passwords do not match');
        }
    
    }
    const redirectToHome = () => {
        props.updateTitle('Independence Skills Assessment')
        props.history.push('/landing');
    }
    const redirectToRegister = () => {
        props.history.push('/forgot'); 
        props.updateTitle('Independence Skills Assessment');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                
                <input type="password" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter New PassWord" 
                       value={state.password}
                       onChange={handleChange}
                />
                
                </div>
                <div className="form-group text-left">
                
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="ReEnter New Password"
                       value={state.confirmpassword}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >ReSet</button>
            </form>
            
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            
        </div>
    )
}

export default withRouter(LoginForm);
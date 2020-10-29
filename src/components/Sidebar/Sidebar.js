import React, {useState} from 'react';
import './Sidebar.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Home from "../../Home";
import ManageOrganisation from "../../Home";
import ManageUser from "../../Home";
import ManageQuestions from "../../Home";
import ManageTemplate from "../../Home";
import ManageStudent from "../../Home";
import ViewReport from "../../Contact";

import LogOut from "../LoginForm/LoginForm";
//import About from "./About";
//import { Route, Switch } from "react-router-dom";
import Drawer from "./Drawer.js";
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

function Sidebar(props) {
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
           // sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(

         <div className={classes.container}>
      <Drawer />
      <Switch>
        <Route exact from="/landing" render={props => <Home {...props} />} />
        <Route exact path="/contact" render={props => <ManageOrganisation {...props} />} />
        <Route exact path="/manageUser" render={props => <ManageUser {...props} />} />
        <Route exact path="/contact" render={props => <ManageQuestions {...props} />} />
        <Route exact path="/contact" render={props => <ManageTemplate {...props} />} />
        <Route exact path="/contact" render={props => <ManageStudent {...props} />} />
        <Route exact path="/contact" render={props => <ViewReport {...props} />} />

        <Route exact path="/" render={props => <LogOut {...props} />} />
        {/* <Route exact path="/about" render={props => <About {...props} />} /> */}
      </Switch>
    </div>

    )
}

export default Sidebar;
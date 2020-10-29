import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { Layout } from 'antd';



import {
    HeaderTitleContainer
} from './Header.styled';

// import {
// ButtonFieldContainer,
// } from '../LoginForm/LoginForm.styled';

const { Header } = Layout;

function HeaderComponent(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if (
        ['/login',
        '/forgot',
        '/contact',
        '/table',
        '/addorg',
        '/about',
        '/landing',
        '/account',
        '/verify',
        '/reset',
    '/templates'].indexOf(props.location.pathname) >= 0) {
        title = 'Independence Skills Assessment'
    }
    
    function renderLogout() {
         if(props.location.pathname === '/dashboard' || props.location.pathname === '/account' || props.location.pathname === '/landing' ){
            return(
                 <div className="d-flex justify-content-end">
                
                    <button className="btn btn-danger " onClick={() => handleLogout()}>Logout</button>
                    
                </div>
            )
         }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    return(
        // <nav className="navbar navbar-dark bg-primary">
        //     <div className="row col-12 d-flex justify-content-center text-white">
        //         <span className="h3">{props.title || title}</span>
        //         {renderLogout()}
        //     </div>
        // </nav>
        <Header style={{ padding: '0'}}>
            <HeaderTitleContainer>
                {props.title || title}
            </HeaderTitleContainer>
            {/* <ButtonFieldContainer>
                        <Button
                            type="primary"
                            onClick={handleSubmitClick}
                        >
                            Send Verification Code
                        </Button>
                    </ButtonFieldContainer> */}
        </Header>
    )
}
export default withRouter(HeaderComponent);
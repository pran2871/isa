/**
 *
 * AuthenticatedRoute
 *
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

class AuthenticatedRoute extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const { component: Component, ...rest } = this.props;
        let token = localStorage.getItem(ACCESS_TOKEN_NAME);
        return (
            ((token && token.length)) ?
                (
                    <Route component={Component} {...rest} />
                ) :
                (
                    <Redirect to={{ pathname: '/login' }} />
                )
        );
    }
}


export default AuthenticatedRoute;

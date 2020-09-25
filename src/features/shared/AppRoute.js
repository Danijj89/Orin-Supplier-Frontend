import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default ({ component: Component, isPrivate, ...rest }) => {
    const signed = sessionStorage.getItem('token');
    if (isPrivate && !signed) {
        return <Redirect to='/login' />
    }
    if (!isPrivate && signed) {
        return <Redirect to='/home' />
    }
    return (
        <Route {...rest} render={ props => <Component {...props} /> } />
    )
}


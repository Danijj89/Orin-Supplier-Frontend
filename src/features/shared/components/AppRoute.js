import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SESSION_COOKIE, SESSION_USER_ID } from '../../../app/sessionKeys.js';
import { useDispatch } from 'react-redux';
import { cleanAppState } from '../../../app/duck/slice.js';

export default ({ component: Component, isPrivate, ...rest }) => {
    const dispatch = useDispatch();
    const signed = sessionStorage.getItem(SESSION_COOKIE);
    const expired = new Date() > new Date(JSON.parse(signed));
    if (isPrivate && expired) {
        dispatch(cleanAppState());
        sessionStorage.removeItem(SESSION_COOKIE);
        sessionStorage.removeItem(SESSION_USER_ID);
        return <Redirect to='/login' />
    }
    return (
        <Route {...rest} render={ props => <Component {...props} /> } />
    )
}


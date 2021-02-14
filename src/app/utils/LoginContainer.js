import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppError, selectAppStatus, selectSessionUser } from 'app/duck/selectors.js';
import Loader from 'features/shared/components/Loader.js';
import LoginPage from 'app/LoginPage.js';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import { cleanAppState } from 'app/duck/slice.js';
import { SESSION_USER } from 'app/sessionKeys.js';
import { useHistory } from 'react-router-dom';

const LoginContainer = React.memo(function LoginContainer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectSessionUser);
    const appStatus = useSelector(selectAppStatus);
    const appError = useSelector(selectAppError);
    const [errors, setErrors] = useState(appError ? [appError] : []);

    useEffect(() => {
        if (appError) setErrors([appError]);
        else setErrors([]);
    }, [appError])

    useEffect(() => {
        const sessionUser = localStorage.getItem(SESSION_USER);
        if (user && sessionUser) history.push('/home');
        else dispatch(cleanAppState());
    }, [history, dispatch, user]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanAppState());
            }
        }
    }, [dispatch, errors.length])

    let page;
    if (appStatus === 'PENDING') page = <Loader />
    else page = <LoginPage />

    return (
        <>
            <ErrorSnackbar error={ errors }/>
            { page }
        </>
    );
});

export default LoginContainer;
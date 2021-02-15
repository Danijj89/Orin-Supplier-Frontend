import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppError, selectAppStatus, selectSessionUser } from 'app/duck/selectors.js';
import Loader from 'features/shared/components/Loader.js';
import LoginPage from 'app/LoginPage.js';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import { cleanAppState, resetAppStatus } from 'app/duck/slice.js';
import { SESSION_USER } from 'app/sessionKeys.js';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    loader: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.backgroundPrimary.main
    }
}));

const LoginContainer = React.memo(function LoginContainer() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectSessionUser);
    const appStatus = useSelector(selectAppStatus);
    const appError = useSelector(selectAppError);
    const [errors, setErrors] = useState(appError ? [appError] : []);

    useEffect(() => {
        if (appError) setErrors([appError]);
    }, [appError])

    useEffect(() => {
        const sessionUser = localStorage.getItem(SESSION_USER);
        if (user && sessionUser) history.push('/home');
        else dispatch(cleanAppState());
    }, [history, dispatch, user]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(resetAppStatus());
            }
        }
    }, [dispatch, errors.length])

    return (
        <>
            <ErrorSnackbar error={ errors }/>
            <LoginPage/>
            <Backdrop className={ classes.loader } open={ appStatus === 'PENDING' }>
                <Loader/>
            </Backdrop>
        </>
    );
});

export default LoginContainer;
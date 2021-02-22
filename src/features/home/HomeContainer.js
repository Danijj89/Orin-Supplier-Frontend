import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Home from './Home.js';
import { selectAppError, selectAppStatus, selectSessionUserCompanyId } from 'app/duck/selectors.js';
import { Redirect } from 'react-router-dom';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import Loader from 'features/shared/components/Loader.js';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    loader: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.backgroundPrimary.main
    }
}));

const HomeContainer = React.memo(function HomeContainer() {
    const classes = useStyles();
    const companyId = useSelector(selectSessionUserCompanyId);

    const appStatus = useSelector(selectAppStatus);
    const appError = useSelector(selectAppError);

    const [errors, setErrors] = useState(appError ? [appError] : []);

    useEffect(() => {
        if (appError) setErrors([appError]);
        else setErrors([]);
    }, [appError])

    return (
        <>
            <ErrorSnackbar error={ errors }/>
            <Backdrop className={ classes.loader } open={ appStatus === 'PENDING' }>
                <Loader/>
            </Backdrop>
            { companyId && <Home/> }
            { !companyId && <Redirect to={ '/login' }/> }
        </>
    );
});

export default HomeContainer;
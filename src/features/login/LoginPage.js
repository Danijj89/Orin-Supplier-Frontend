import React, { useState } from 'react';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from '../../constants';
import AppService from '../api/AppService.js';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSessionInfo } from '../home/duck/slice.js';
import { Grid, CardMedia, Typography, TextField } from '@material-ui/core';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import loginImg from '../../images/login.png';
import {
    SESSION_APP_DEFAULTS,
    SESSION_COMPANY, SESSION_COOKIE,
    SESSION_USER
} from '../../app/sessionKeys.js';

const {
    title, emailLabel, errorMessages,
    footerText, passwordLabel, signInButton, signUpText, imageSubText, imageTitle
} = LANGUAGE.login.login;

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%'
    },
    leftPanel: {
        height: '100%',
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12)
    },
    rightPanel: {
        height: '100%',
        background: 'linear-gradient(43.26deg, #34AFF9 0%, #098EDF 100%)',
        padding: theme.spacing(20)
    },
    logo: {
        width: '50%',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(10)
    },
    form: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    button: {
        width: '100%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    footerTextTwo: {
        color: theme.palette.primary.main
    },
    loginImage: {
        marginBottom: theme.spacing(5)
    },
    loginImageTitle: {
        color: theme.palette.secondary.main,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    loginImageSubTitle: {
        color: theme.palette.secondary.main,
        textAlign: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

export default function LoginPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: null,
            password: null,
        }
    })

    const onSignInClick = async (data) => {
        setError(null);
        try {
            const { user, company, defaults, expires } = await AppService.signIn(data);
            sessionStorage.setItem(SESSION_COOKIE, JSON.stringify(new Date(Date.now() + expires)));
            sessionStorage.setItem(SESSION_COMPANY, JSON.stringify(company));
            sessionStorage.setItem(SESSION_USER, JSON.stringify(user));
            sessionStorage.setItem(SESSION_APP_DEFAULTS, JSON.stringify(defaults));
            dispatch(setSessionInfo({ user, company, defaults }));
            history.push('/home');
        } catch (err) {
            const { message } = err.response.data;
            setError(message);
        }
    }



    const isError = Object.keys(errors).length > 0 || error;
    const allErrors = Object.values(errors).map(err => err.message).concat([error]);

    return (
        <Grid container className={ classes.container }>
            <Grid item xs={ 5 } className={ classes.leftPanel }>
                <CardMedia className={ classes.logo } component="img" src={ logo } alt="Logo"/>
                <Typography variant="h3">{ title }</Typography>
                <form className={ classes.form } onSubmit={ handleSubmit(onSignInClick) } autoComplete="off">
                    { isError && <ErrorMessage errors={ allErrors }/> }
                    <TextField
                        name="email"
                        type="email"
                        error={ !!errors.email }
                        inputRef={ register({ required: errorMessages.emailRequired }) }
                        className={ classes.field }
                        label={ emailLabel }
                        autoFocus
                        fullWidth
                    />
                    <TextField
                        name="password"
                        type="password"
                        error={ !!errors.password }
                        inputRef={ register({ required: errorMessages.passwordRequired }) }
                        className={ classes.field }
                        label={ passwordLabel }
                        fullWidth
                    />
                    <ThemedButton
                        type="submit"
                        variant="contained"
                        styles={ classes.button }
                    >{ signInButton }</ThemedButton>
                </form>
                <Typography component="span">{ footerText }&nbsp;</Typography>
                <Typography className={ classes.footerTextTwo } component="span">{ signUpText }</Typography>
            </Grid>
            <Grid className={ classes.rightPanel } item xs={ 7 }>
                <CardMedia component="img" src={ loginImg } alt="Office" className={ classes.loginImage }/>
                <Typography className={classes.loginImageTitle} variant="h4">{ imageTitle }</Typography>
                <Typography className={classes.loginImageSubTitle} variant="subtitle2">{ imageSubText }</Typography>
            </Grid>
        </Grid>
    )
}
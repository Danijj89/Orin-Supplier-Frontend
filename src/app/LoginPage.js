import React, { useCallback, useEffect, useState } from 'react';
import logo from '../images/orinlogo.png';
import { LANGUAGE } from './utils/constants.js';
import { useDispatch } from 'react-redux';
import { Grid, CardMedia, Typography, TextField } from '@material-ui/core';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import ThemedButton from '../features/shared/buttons/ThemedButton.js';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import loginImg from '../images/login.png';
import { signIn } from './duck/thunks.js';
import Title3 from 'features/shared/display/Title3.js';

const {
    title,
    emailLabel,
    errorMessages,
    footerText,
    passwordLabel,
    signInButton,
    signUpText,
    imageSubText,
    imageTitle,
} = LANGUAGE.login.login;

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
    },
    leftPanel: {
        height: '100%',
        paddingTop: theme.spacing(20),
        paddingBottom: theme.spacing(20),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(12),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(5),
        },
    },
    rightPanel: {
        height: '100%',
        background: 'linear-gradient(43.26deg, #34AFF9 0%, #098EDF 100%)',
        padding: theme.spacing(20),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(3),
        },
    },
    logo: {
        width: '50%',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(10),
    },
    form: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        width: '100%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    footerTextTwo: {
        color: theme.palette.primary.main,
    },
    loginImage: {
        marginBottom: theme.spacing(5),
    },
    loginImageTitle: {
        color: theme.palette.secondary.main,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    loginImageSubTitle: {
        color: theme.palette.secondary.main,
        textAlign: 'center',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const LoginPage = React.memo(function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [errMessages, setErrMessages] = useState([]);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            email: null,
            password: null,
        },
    });

    useEffect(() => {
        setErrMessages(Object.values(errors).map(err => err.message));
    }, [errors])

    const onSignInClick = useCallback(async ({ email, password }) =>
            dispatch(signIn({ email, password })),
        [dispatch]);

    return (
        <Grid container className={ classes.container }>
            <Grid item xs={ 5 } className={ classes.leftPanel }>
                <CardMedia className={ classes.logo } component="img" src={ logo } alt="Logo"/>
                <Title3 title={ title }/>
                <form className={ classes.form } onSubmit={ handleSubmit(onSignInClick) } autoComplete="off" noValidate>
                    <ErrorSnackbar error={ errMessages }/>
                    <TextField
                        name="email"
                        type="email"
                        error={ !!errors.email }
                        inputRef={ register({
                            required: errorMessages.emailRequired,
                            pattern: {
                                value: /.*@.*\..*/,
                                message: errorMessages.emailRequired
                            }
                        }) }
                        className={ classes.field }
                        label={ emailLabel }
                        autoFocus
                        fullWidth
                    />
                    <TextField
                        name="password"
                        type="password"
                        error={ !!errors.password }
                        inputRef={ register({
                            required: errorMessages.passwordRequired,
                        }) }
                        className={ classes.field }
                        label={ passwordLabel }
                        fullWidth
                        autoComplete="on"
                    />
                    <ThemedButton
                        type="submit"
                        variant="contained"
                        styles={ classes.button }
                    >
                        { signInButton }
                    </ThemedButton>
                </form>
                <Typography component="span">{ footerText }&nbsp;</Typography>
                <Typography className={ classes.footerTextTwo } component="span">
                    { signUpText }
                </Typography>
            </Grid>
            <Grid className={ classes.rightPanel } item xs={ 12 } sm={ 7 }>
                <CardMedia
                    component="img"
                    src={ loginImg }
                    alt="Office"
                    className={ classes.loginImage }
                />
                <Typography className={ classes.loginImageTitle } variant="h4">
                    { imageTitle }
                </Typography>
                <Typography
                    className={ classes.loginImageSubTitle }
                    variant="subtitle2"
                >
                    { imageSubText }
                </Typography>
            </Grid>
        </Grid>
    );
});

export default LoginPage;
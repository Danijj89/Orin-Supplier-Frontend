import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from 'app/utils/constants.js';

const useStyles = makeStyles(theme => ({
    container: {
        width: '100vw',
        height: '100vh'
    }
}));

const {
    formLabels
} = LANGUAGE.login.register;

const Register = React.memo(function Register() {
    const classes = useStyles();
    const { register } = useForm({
        mode: 'onSubmit'
    });

    return (
        <Box className={ classes.container }>
            <TextField
                name="firstName"
                inputRef={ register({ required: true }) }
                label={ formLabels.firstName }
                fullWidth
            />
            <TextField
                name="lastName"
                inputRef={ register({ required: true }) }
                label={ formLabels.lastName }
                fullWidth
            />
            <TextField
                name="email"
                type="email"
                inputRef={ register({ required: true }) }
                label={ formLabels.email }
                fullWidth
            />
            <TextField
                name="password"
                type="password"
                inputRef={ register({ required: true }) }
                label={ formLabels.password }
                fullWidth
            />
            <TextField
                name="confirmPassword"
                type="password"
                inputRef={ register({ required: true }) }
                label={ formLabels.confirmPassword }
                fullWidth
            />
        </Box>
    );
});

Register.propTypes = {};

export default Register;


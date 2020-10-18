import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
    },
    label: {
        marginRight: theme.spacing(1)
    },
    required: {
        color: 'red',
        marginLeft: theme.spacing(1)
    },
    inputInvalid: {
        borderColor: 'red'
    }
}));

export default function SideCheckBox(
    { label, required, className, error, checked, onChange, ...props }) {
    const classes = useStyles();
    const classNames = clsx(className, error && classes.inputInvalid);

    return (
        <Box className={ classes.container }>
            <Typography
                className={ classes.label }
                variant="subtitle1"
            >
                { label }
                { required && <span className={ classes.required }>*</span> }
            </Typography>
            <Checkbox
                { ...props }
                color="primary"
                required={ required }
                className={ classNames }
                onChange={ e => onChange(e.target.checked) }
                checked={ checked }
            />
        </Box>
    )
}

SideCheckBox.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    error: PropTypes.bool
};


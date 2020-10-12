import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'inline-flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
        padding: theme.spacing(3)
    }
}));

export default function FormContainer({ children, className }) {
    const classes = useStyles();

    return (
        <Box className={ clsx(classes.container, className) }>
            { children }
        </Box>
    )
}

FormContainer.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string
};
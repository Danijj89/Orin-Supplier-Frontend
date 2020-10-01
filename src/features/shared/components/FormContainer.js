import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column'
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
    children: PropTypes.element,
    className: PropTypes.string
};
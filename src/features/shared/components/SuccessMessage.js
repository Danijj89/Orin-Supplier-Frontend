import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.success.main,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    }
}))

const SuccessMessage = React.memo(function SuccessMessage({ message, className }) {
    const classes = useStyles();
    return (
        <Typography
            variant="subtitle1"
            className={ clsx(classes.root, className) }
        >{ message }
        </Typography>
    )
});

SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default SuccessMessage;
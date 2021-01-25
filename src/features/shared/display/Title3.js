import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        fontWeight: props => props.bold && 'bold'
    }
}));

const Title3 = React.memo(function Title3({ title, bold, className }) {
    const classes = useStyles({ bold });
    return (
        <Typography className={ clsx(classes.root, className) } variant="h3">
            { title }
        </Typography>
    );
});

Title3.propTypes = {
    title: PropTypes.string.isRequired,
    bold: PropTypes.bool,
    className: PropTypes.string
};

export default Title3;
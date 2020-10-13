import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../../app/constants.js';

const useStyles = makeStyles({
    listItem: {
        padding: 0
    },
    error: {
        color: 'red'
    }
})

const { titleLabel } = LANGUAGE.shared.components.errorDisplay;

export default function ErrorDisplay({ errors, className }) {
    const classes = useStyles();

    return (
        <Box className={ className }>
            { errors.length > 0 && <Typography className={ classes.error }>{ titleLabel }</Typography> }
            <List>
                { errors.length > 0 && errors.map((error, index) =>
                    <ListItem key={ index } className={ classes.listItem }>
                        <ListItemText primary={ error } className={ classes.error }/>
                    </ListItem>
                ) }
            </List>
        </Box>

    )
}

ErrorDisplay.propTypes = {
    errors: PropTypes.array.isRequired,
    className: PropTypes.string
};
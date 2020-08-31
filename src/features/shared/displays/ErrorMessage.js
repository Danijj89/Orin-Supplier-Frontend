import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    listItem: {
        padding: 0
    },
    error: {
        color: 'red'
    }
})

export default function ErrorMessage({ errors }) {
    const classes = useStyles();

    return (
        <List>
            {errors && errors.map((error, index) =>
                <ListItem key={index} className={classes.listItem}>
                    <ListItemText primary={error.message} className={classes.error}/>
                </ListItem>
            )}
        </List>
    )
}
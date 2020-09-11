import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Add as IconAdd } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    item: {
        backgroundColor: theme.palette.background.paper
    }
}));

export default function CreateShipmentOrdersListItem({ poRef, selected, onAdd }) {
    const classes = useStyles();
    return (
        <ListItem button selected={selected} className={ classes.item }>
            <ListItemText primary={poRef}/>
            <ListItemIcon>
                <IconButton onClick={onAdd}>
                    <IconAdd />
                </IconButton>
            </ListItemIcon>
        </ListItem>
    )
}
import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Add as IconAdd } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    item: {
        height: 30
    },
    itemIcon: {
        minWidth: 0
    }
}));

export default function CreateShipmentOrdersListItem({ poRef, selected, onAdd, onClick }) {
    const classes = useStyles();
    return (
        <ListItem button selected={selected} className={ classes.item } onClick={onClick}>
            <ListItemText primary={poRef}/>
            <ListItemIcon className={ classes.itemIcon }>
                <IconButton onClick={onAdd} size="small">
                    <IconAdd fontSize="small"/>
                </IconButton>
            </ListItemIcon>
        </ListItem>
    )
}
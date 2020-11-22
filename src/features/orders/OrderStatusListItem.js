import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { FiberManualRecord as IconCircle } from '@material-ui/icons';
import { orderStatusColors } from '../shared/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        whiteSpace: 'nowrap'
    }
}));

const OrderStatusListItem = React.memo(function OrderStatusListItem({ option }) {
    const classes = useStyles();
    return (
        <ListItem dense component="div">
            <ListItemIcon>
                <IconCircle
                    style={ { color: orderStatusColors[option] } }
                    fontSize="small"
                />
            </ListItemIcon>
            <ListItemText classes={{ root: classes.root }}>{ option }</ListItemText>
        </ListItem>
    )
});

export default OrderStatusListItem;
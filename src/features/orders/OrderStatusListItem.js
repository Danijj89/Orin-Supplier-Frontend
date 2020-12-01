import React from 'react';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { FiberManualRecord as IconCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { orderStatusColors } from '../../app/themes/theme.js';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import { LOCALE } from '../../app/utils/constants.js';

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
                    style={ { color: orderStatusColors[getOptionId(option)] } }
                    fontSize="small"
                />
            </ListItemIcon>
            <ListItemText classes={{ root: classes.root }}>{ getOptionLabel(option, LOCALE) }</ListItemText>
        </ListItem>
    )
});

export default OrderStatusListItem;
import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord as IconCircle } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import { orderStatusesOptions } from '../shared/constants.js';

const { orderStatusLabelsMap } = LANGUAGE.shared.statusButtonMenu;

const useStyles = makeStyles((theme) => ({
    custom: {
        padding: theme.spacing(0.5),
        borderRadius: 6,
        whiteSpace: 'nowrap',
        minWidth: 80,
        color: '#FFFFFF',
        fontSize: 12,
        minFontSize: 10,
    }
}));

const statusColors = {
    'Not Started': '#818E9B',
    'In Progress': '#109CF1',
    Completed: '#2ED47A',
    Exception: '#F7685B',
};

export default function StatusButtonMenu({
    onItemClick,
    status,
    name,
    disabled,
    ...props
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { orderStatuses: statuses } = orderStatusesOptions;

    const getStatusColor = (status) => statusColors[status];
    const currentColor = getStatusColor(status);

    const onMenuClick = (e) => {
        if (!disabled) setAnchorEl(e.currentTarget);
    };
    const onMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Typography
                {...props}
                variant="subtitle2"
                className={classes.custom}
                onClick={onMenuClick}
                style={{ backgroundColor: currentColor }}
            >
                {status}
            </Typography>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={onMenuClose}
            >
                {statuses.map((status, i) => (
                    <MenuItem key={i} onClick={() => onItemClick(name, status)}>
                        <ListItemIcon style={{ color: getStatusColor(status) }}>
                            <IconCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={orderStatusLabelsMap[status]} />
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

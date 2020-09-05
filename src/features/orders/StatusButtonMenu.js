import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord as IconCircle } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectCurrentDefaults } from '../home/slice.js';
import { LANGUAGE } from '../../constants.js';

const { orderStatusLabelsMap } = LANGUAGE.shared.statusButtonMenu;

const useStyles = makeStyles((theme) => ({
    custom: {
        padding: theme.spacing(0.5),
        borderRadius: 6,
        whiteSpace: 'nowrap',
        minWidth: 80
    },
    notStarted: {
        color: '#DDDDDD'
    },
    inProgress: {
        color: '#109CF1'
    },
    completed: {
        color: '#11EE77'
    },
    exception: {
        color: '#EE5555'
    }
}));

const statusColors = {
    'Not Started': '#DDDDDD',
    'In Progress':'#109CF1',
    'Completed': '#11EE77',
    'Exception': '#EE5555',
};

export default function StatusButtonMenu({ onItemClick, status, name , disabled, ...props}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { orderStatuses } = useSelector(selectCurrentDefaults);

    const getStatusColor = (status) => statusColors[status];
    const currentColor = getStatusColor(status);

    const onMenuClick = (e) => {
        if (!disabled) setAnchorEl(e.currentTarget);
    }
    const onMenuClose = () => {
        setAnchorEl(null);
    }

    return (
        <Box>
            <Typography
                {...props}
                variant="subtitle2"
                className={ classes.custom }
                onClick={onMenuClick}
                style={{ backgroundColor: currentColor }}
                >
                {status}
            </Typography>
            <Menu
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ onMenuClose }
            >
                {orderStatuses.map((status, i) =>
                    <MenuItem key={i} onClick={() => onItemClick(name, status)} >
                        <ListItemIcon style={{ color: getStatusColor(status)}}>
                            <IconCircle fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary={orderStatusLabelsMap[status]}/>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    )
}
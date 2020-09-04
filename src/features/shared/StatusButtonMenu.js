import React, { useState } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FiberManualRecord as IconCircle } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectCurrentDefaults } from '../home/slice.js';
import { LANGUAGE } from '../../constants.js';
import StatusTooltip from './displays/StatusTooltip.js';

const { orderStatusLabelsMap } = LANGUAGE.shared.statusButtonMenu;

const useStyles = makeStyles((theme) => ({
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

export default function StatusButtonMenu({ onMenuItemClick, value, name }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { orderStatuses } = useSelector(selectCurrentDefaults);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Not Started': return classes.notStarted;
            case 'In Progress': return classes.inProgress;
            case 'Completed': return classes.completed;
            case 'Exception': return classes.exception;
            default: {
                console.log(`The given status "${status}" doesn't exists`);
                return classes.notStarted;
            }
        }
    }

    const onMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const onMenuClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <StatusTooltip status={value} onClick={ onMenuClick }/>
            <Menu
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ onMenuClose }
            >
                {orderStatuses.map((status, i) =>
                    <MenuItem key={i} onClick={() => onMenuItemClick(name, status)} >
                        <ListItemIcon className={ getStatusColor(status) }>
                            <IconCircle fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primary={orderStatusLabelsMap[status]}/>
                    </MenuItem>
                )}
            </Menu>
        </>
    )
}
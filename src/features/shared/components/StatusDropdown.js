import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { getOptionId, getOptionLabel } from '../../../app/utils/options/getters.js';
import { LOCALE } from '../../../app/utils/constants.js';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { FiberManualRecord as IconCircle } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const SHIPMENT_COLOR_MAP = {
    Unbooked: {
        background: '#F1F1F1',
        color: 'black'
    },
    Booked: {
        background: '#032B43',
        color: 'white'
    },
    'Space Released': {
        background: '#109CF1',
        color: 'white'
    },
    Shipped: {
        background: '#1EAE9B',
        color: 'white'
    },
    Archived: {
        background: '#FFBA08',
        color: 'white'
    },
    Delayed: {
        background: '#F45B69',
        color: 'white'
    }
};

const ORDER_COLOR_MAP = {
    'Not Started': {
        background: '#F1F1F1',
        color: 'black'
    },
    'In Progress': {
        background: '#109CF1',
        color: 'white'
    },
    Completed: {
        background: '#2ED47A',
        color: 'white'
    },
    Exception: {
        background: '#F7685B',
        color: 'white'
    }
};

const SALES_STATUS_COLOR_MAP = {
    1: {
        background: '#F1F1F1',
        color: 'black'
    },
    2: {
        background: '#109CF1',
        color: 'white'
    },
    3: {
        background: '#2ED47A',
        color: 'white'
    },
    4: {
        background: '#F7685B',
        color: 'white'
    }
};

const LEAD_TYPE_COLOR_MAP = {
    1: {
        background: '#109CF1',
        color: 'white'
    },
    2: {
        background: '#FFBA08',
        color: 'white'
    },
    3: {
        background: '#F7685B',
        color: 'white'
    },
}

const LEAD_POTENTIAL_COLOR_MAP = {
    1: {
        background: '#109CF1',
        color: 'white'
    },
    2: {
        background: '#FFBA08',
        color: 'white'
    },
    3: {
        background: '#F7685B',
        color: 'white'
    },
}

function getStatusBackgroundColor(status, colorMap) {
    if (colorMap === 'shipment') return SHIPMENT_COLOR_MAP[status].background;
    if (colorMap === 'order') return ORDER_COLOR_MAP[status].background;
    if (colorMap === 'salesStatus') return SALES_STATUS_COLOR_MAP[status].background;
    if (colorMap === 'leadType') return LEAD_TYPE_COLOR_MAP[status].background;
    if (colorMap === 'leadPotential') return LEAD_POTENTIAL_COLOR_MAP[status].background;
}

function getStatusColor(status, colorMap) {
    if (colorMap === 'shipment') return SHIPMENT_COLOR_MAP[status].color;
    if (colorMap === 'order') return ORDER_COLOR_MAP[status].color;
    if (colorMap === 'salesStatus') return SALES_STATUS_COLOR_MAP[status].color;
    if (colorMap === 'leadType') return LEAD_TYPE_COLOR_MAP[status].color;
    if (colorMap === 'leadPotential') return LEAD_POTENTIAL_COLOR_MAP[status].color;
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex'
    },
    button: {
        backgroundColor: ({ colorMap, status }) => getStatusBackgroundColor(status, colorMap),
        color: ({ colorMap, status }) => getStatusColor(status, colorMap),
        flex: 1,
        whiteSpace: 'nowrap'
    }
}));

const StatusDropdown = React.memo(function StatusDropdown(
    { status, statuses, colorMap, onStatusChange, className }) {
    const classes = useStyles({ status: getOptionId(status), colorMap });
    const [anchorEl, setAnchorEl] = useState(false);

    const onButtonClick = useCallback(
        e => {
            e.stopPropagation();
            setAnchorEl(e.currentTarget);
        }, []);

    const onClose = useCallback(
        e => {
            e.stopPropagation();
            setAnchorEl(null);
        }, []);

    const onSelect = useCallback(
        (e, status) => {
            e.stopPropagation();
            onStatusChange(status);
            setAnchorEl(null);
        },
        [onStatusChange]);

    const getIconStyle = useCallback(
        (status) => ({
            color: getStatusBackgroundColor(getOptionId(status), colorMap)
        }),
        [colorMap]);

    return (
        <Box className={ clsx(classes.container, className) }>
            <Button
                onClick={ onButtonClick }
                className={ classes.button }
                variant="contained"
                size="small"
                disableElevation
            >
                { getOptionLabel(status, LOCALE) }
            </Button>
            <Menu
                anchorEl={ anchorEl }
                open={ Boolean(anchorEl) }
                onClose={ onClose }
            >
                { statuses.map(status =>
                    <MenuItem
                        key={ getOptionId(status) }
                        onClick={ e => onSelect(e, status) }
                    >
                        <ListItemIcon>
                            <IconCircle
                                style={ getIconStyle(status) }
                                fontSize="small"
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={ getOptionLabel(status, LOCALE) }
                        />
                    </MenuItem>
                ) }
            </Menu>
        </Box>
    )
});

StatusDropdown.propTypes = {
    status: PropTypes.object.isRequired,
    statuses: PropTypes.array.isRequired,
    colorMap: PropTypes.oneOf([
        'shipment',
        'order',
        'salesStatus',
        'leadType',
        'leadPotential'
    ]).isRequired,
    onStatusChange: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default StatusDropdown;
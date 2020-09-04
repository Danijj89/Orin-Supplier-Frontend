import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    custom: {
        padding: theme.spacing(0.5),
        borderRadius: 6,
        whiteSpace: 'nowrap'
    },
    notStarted: {
        backgroundColor: '#DDDDDD'
    },
    inProgress: {
        backgroundColor: '#109CF1',
        color: '#FFFFFF'
    },
    completed: {
        backgroundColor: '#11EE77',
        color: '#FFFFFF'
    },
    exception: {
        backgroundColor: '#EE5555',
        color: '#FFFFFF'
    }
}));

export default function StatusTooltip({ status }) {
    const classes = useStyles();

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

    const color = getStatusColor(status);
    return (
        <Typography
            variant="subtitle2"
            className={ `${classes.custom} ${color}` }
        >
            {status}
        </Typography>
    )
}
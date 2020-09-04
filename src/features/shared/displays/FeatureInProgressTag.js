import React from 'react';
import { Tooltip } from '@material-ui/core';
import { ReportProblemOutlined as IconWarning } from '@material-ui/icons';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const { title } = LANGUAGE.shared.featureInProgressTag;

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'red'
    },
    tooltip: {
        margin: theme.spacing(0.4)
    }
}));

export default function FeatureInProgressTag() {
    const classes = useStyles();
    return (
        <Tooltip title={ title } className={ classes.tooltip }>
            <IconWarning className={ classes.icon } fontSize="small"/>
        </Tooltip>
    )
}
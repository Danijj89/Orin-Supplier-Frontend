import React from 'react';
import { Box, Tooltip } from '@material-ui/core';
import { ReportProblemOutlined as IconWarning } from '@material-ui/icons';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const { title } = LANGUAGE.shared.featureInProgressTag;

const useStyles = makeStyles((theme) => ({
    icon: {
        color: 'red'
    }
}));

export default function FeatureInProgressTag() {
    const classes = useStyles();
    return (
        <Tooltip title={ title }>
            <IconWarning className={ classes.icon } fontSize="small"/>
        </Tooltip>
    )
}
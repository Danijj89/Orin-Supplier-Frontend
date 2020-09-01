import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    stepper: {
        backgroundColor: 'transparent',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(30),
        paddingRight: theme.spacing(30),
    },
    step: {
        color: theme.palette.tertiary.light,
        "& $completed": {
            color: theme.palette.primary.light
        },
        "& $active": {
            color: theme.palette.primary.dark
        },
    },
    active: {},
    completed: {},
    disabled: {},
    alternativeLabel: {
        '&$label': {
            color: theme.palette.primary.light
        },
        '&$active': {
            color: theme.palette.primary.dark
        }
    },
    label: {},
    labelContainer: {},
    text: {
        fill: theme.palette.secondary.main
    }
}));

export default function DocumentStepper({ activeStep, steps }) {
    const classes = useStyles();
    const renderedSteps = steps.map((label) => (
        <Step key={ label } classes={ { root: classes.step, completed: classes.completed } }>
            <StepLabel
                classes={ {
                    alternativeLabel: classes.alternativeLabel,
                    label: classes.label,
                    active: classes.active,
                    completed: classes.completed
                } }
                StepIconProps={ {
                    classes: {
                        root: classes.step,
                        completed: classes.completed,
                        active: classes.active,
                        text: classes.text
                    }
                } }>{ label }</StepLabel>
        </Step>
    ));

    return (
        <Stepper
            activeStep={ activeStep }
            alternativeLabel
            children={ renderedSteps }
            className={ classes.stepper }
        >
        </Stepper>
    )
}
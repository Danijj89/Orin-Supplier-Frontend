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
        color: theme.palette.primary.light,
        "& $completed": {
            color: theme.palette.secondary.light
        },
        "& $active": {
            color: theme.palette.secondary.dark
        },
    },
    active: {},
    completed: {},
    disabled: {},
    alternativeLabel: {
        '&$label': {
            color: theme.palette.secondary.light
        },
        '&$active': {
            color: theme.palette.secondary.dark
        }
    },
    label: {},
    labelContainer: {},
    text: {
        fill: 'white'
    }
}));

export default function DocumentStepper({ activeStep, steps }) {
    const classes = useStyles();
    const renderedSteps = steps.map((label, index) => (
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
                        root: classes.steps,
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
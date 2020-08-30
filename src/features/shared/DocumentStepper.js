import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    stepper: {
        backgroundColor: 'transparent',
        padding: '24px 25%'
    }
});

export default function DocumentStepper({ activeStep, steps }) {
    const classes = useStyles();
    const renderedSteps = steps.map((label) => (
        <Step key={label}>
            <StepLabel>{label}</StepLabel>
        </Step>
    ));

    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            children={renderedSteps}
            className={classes.stepper}
        >
        </Stepper>
    )
}
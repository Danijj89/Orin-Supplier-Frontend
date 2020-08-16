import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export default function DocumentStepper({ activeStep, steps, styles }) {

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
            className={styles}
        >
        </Stepper>
    )
}
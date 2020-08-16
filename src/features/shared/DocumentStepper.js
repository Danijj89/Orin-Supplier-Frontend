import React from 'react';
import Stepper from '@material-ui/core/Stepper';

export default function DocumentStepper({ activeStep, renderedSteps, styles }) {

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
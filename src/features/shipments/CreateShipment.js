import React, { useState } from 'react';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import CreateShipmentOrdersPicker from './CreateShipmentOrders.js';

const { steps, titleLabel } = LANGUAGE.shipments.createShipment;

export default function CreateShipment() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <Container>
            <DocumentStepper activeStep={ activeStep } steps={ steps }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <hr/>
            { activeStep === 0 && <CreateShipmentOrdersPicker setActiveStep={ setActiveStep }/> }
            {/*{ activeStep === 1 && <CreatePOProductInfo setActiveStep={ setActiveStep }/> }*/}
            {/*{ activeStep === 2 &&*/}
            {/*<DocumentPreview*/}
            {/*    onPrevButtonClick={onPreviewPrevButtonClick}*/}
            {/*    onSubmitButtonClick={onPreviewSubmitButtonClick}*/}
            {/*    previewFileUrl={previewFileUrl}*/}
            {/*    status={status}*/}
            {/*    error={error}*/}
            {/*    fileName={newPO.fileName}*/}
            {/*/> }*/}
        </Container>
    )
}
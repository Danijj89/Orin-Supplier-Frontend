import React, { useState } from 'react';
import DocumentStepper from '../shared/DocumentStepper.js';
import { Container, Typography, Divider } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import CreateShipmentOrders from './CreateShipmentOrders.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    row: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

const { steps, titleLabel } = LANGUAGE.shipments.createShipment;

export default function CreateShipment() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);

    return (
        <Container>
            <DocumentStepper activeStep={ activeStep } steps={ steps }/>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider className={ classes.row }/>
            { activeStep === 0 && <CreateShipmentOrders setActiveStep={ setActiveStep }/> }
            {/*{ activeStep === 1 && <CreateOrderProducts setActiveStep={ setActiveStep }/> }*/}
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
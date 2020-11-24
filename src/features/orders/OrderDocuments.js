import React from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import DocumentService from '../api/DocumentService.js';
import { downloadFile } from '../shared/utils/file.js';
import Paper from '@material-ui/core/Paper';
import ShipmentDocumentsCard from './ShipmentDocumentsCard.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    shipmentCards: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(1)
    }
}));

export default function OrderDocuments({ order }) {

    const onGenerateDoc = async (ext) => {
        const file = await DocumentService.downloadOrder(order._id, ext);
        downloadFile(file, `${ order.fileName }.${ ext }`);
    };
    const classes = useStyles();

    return (
        <Paper>
            <ThemedButton
                onClick={ () => onGenerateDoc('xlsx') }
            >Generate Excel</ThemedButton>
            <ThemedButton
                onClick={ () => onGenerateDoc('pdf') }
            >Generate PDF</ThemedButton>
            { order.shipmentIds.map(id =>
                <ShipmentDocumentsCard className={classes.shipmentCards} key={ id } shipmentId={ id }/>
            ) }
        </Paper>
    )
}


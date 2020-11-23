import React from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import DocumentService from '../api/DocumentService.js';
import { downloadFile } from '../shared/utils/file.js';
import Paper from '@material-ui/core/Paper';
import ShipmentDocumentsCard from './ShipmentDocumentsCard.js';

export default function OrderDocuments({ order }) {

    const onGenerateDoc = async (event, ext) => {
        const file = await DocumentService.downloadOrder(order._id, ext);
        downloadFile(file, `${ order.fileName }.${ ext }`);
    };

    return (
        <Paper>
            <ThemedButton
                onClick={ event => onGenerateDoc(event, 'xlsx') }
            >Generate Excel</ThemedButton>
            <ThemedButton
                onClick={ event => onGenerateDoc(event, 'pdf') }
            >Generate PDF</ThemedButton>
            { order.shipmentIds.map(id =>
                <ShipmentDocumentsCard key={ id } shipmentId={ id }/>
            ) }
        </Paper>
    )
}


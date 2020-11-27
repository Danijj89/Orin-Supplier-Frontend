import React, { useCallback, useMemo } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import DocumentService from '../api/DocumentService.js';
import { downloadFile } from '../shared/utils/file.js';
import ShipmentDocumentsCard from './ShipmentDocumentsCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrderFileNameField, selectOrderShipmentIdsField } from './duck/selectors.js';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';

const useStyles = makeStyles((theme) => ({
    shipmentCards: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(1)
    }
}));

const {
    buttonLabels,
    textLabels
} = LANGUAGE.order.order.orderDocuments;

const OrderDocuments = React.memo(function OrderDocuments() {
    const classes = useStyles();
    const { id: orderId } = useParams();
    const orderShipmentIds = useSelector(state => selectOrderShipmentIdsField(state, orderId));
    const orderFileName = useSelector(state => selectOrderFileNameField(state, orderId));

    const createGenerateDocumentHandler = useCallback(
        (ext) => async () => {
            const file = await DocumentService.downloadOrder(orderId, ext);
            downloadFile(file, `${ orderFileName }.${ ext }`);
        }, [orderFileName, orderId]);

    const isOrderInShipment = useMemo(
        () => orderShipmentIds.length > 0,
        [orderShipmentIds.length]);

    return (
        <Box>
            <ThemedButton
                onClick={ createGenerateDocumentHandler('xlsx') }
            >{ buttonLabels.generateExcel }</ThemedButton>
            <ThemedButton
                onClick={ createGenerateDocumentHandler('pdf') }
            >{ buttonLabels.generatePdf }</ThemedButton>
            <Paper>
                { isOrderInShipment && orderShipmentIds.map(id =>
                    <ShipmentDocumentsCard className={ classes.shipmentCards } key={ id } shipmentId={ id }/>
                ) }
                { !isOrderInShipment && <Typography variant="h6">{ textLabels.noOrder }</Typography> }
            </Paper>
        </Box>
    )
});

export default OrderDocuments;


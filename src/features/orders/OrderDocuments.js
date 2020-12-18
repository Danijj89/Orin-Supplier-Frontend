import React, { useCallback, useMemo } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ShipmentDocumentsCard from './ShipmentDocumentsCard.js';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderShipmentIdsField } from './duck/selectors.js';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import { downloadOrder } from '../documents/duck/thunks.js';

const useStyles = makeStyles((theme) => ({
    shipmentCards: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(1),
    },
    orderDocsCard: {
        padding: theme.spacing(1),
    },
    orderDocsActions: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
}));

const { buttonLabels, textLabels } = LANGUAGE.order.order.orderDocuments;

const OrderDocuments = React.memo(function OrderDocuments() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id: orderId } = useParams();
    const orderShipmentIds = useSelector((state) =>
        selectOrderShipmentIdsField(state, orderId)
    );

    const createGenerateDocumentHandler = useCallback(
        (ext) => () => dispatch(downloadOrder({ orderId, ext })),
        [dispatch, orderId]
    );

    const isOrderInShipment = useMemo(() => orderShipmentIds.length > 0, [
        orderShipmentIds.length,
    ]);

    return (
        <Box>
            <ThemedButton
                variant="outlined"
                onClick={createGenerateDocumentHandler('xlsx')}
                className={classes.orderDocsActions}
            >
                {buttonLabels.generateExcel}
            </ThemedButton>
            <ThemedButton
                variant="outlined"
                onClick={createGenerateDocumentHandler('pdf')}
                className={classes.orderDocsActions}
            >
                {buttonLabels.generatePdf}
            </ThemedButton>
            <Paper className={classes.orderDocsCard}>
                {isOrderInShipment &&
                    orderShipmentIds.map((id) => (
                        <ShipmentDocumentsCard
                            className={classes.shipmentCards}
                            key={id}
                            shipmentId={id}
                        />
                    ))}
                {!isOrderInShipment && (
                    <Typography variant="h6">{textLabels.noOrder}</Typography>
                )}
            </Paper>
        </Box>
    );
});

export default OrderDocuments;

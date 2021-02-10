import React, { useCallback, useMemo } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderShipmentIdsField } from './duck/selectors.js';
import { Typography } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import { downloadOrder } from '../documents/duck/thunks.js';
import { READ_ANY } from '../admin/utils/actions.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import {Box, Divider, Grid} from '@material-ui/core';
import ShipmentDocumentsCard from 'features/orders/ShipmentDocumentsCard.js';

const useStyles = makeStyles((theme) => ({
    shipmentCards: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(1),
    },
    orderDocsCard: {
        marginTop: theme.spacing(2),
    },
    orderDocsActions: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(3),
    },
}));

const { buttons, labels } = LANGUAGE.order.order;

const SplitDocuments = React.memo(function SplitDocuments({ orderId, splitId, items }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const orderShipmentIds = useSelector((state) =>
        selectOrderShipmentIdsField(state, { orderId, splitId })
    );
    const createGenerateDocumentHandler = useCallback(
        (ext) => () => dispatch(downloadOrder({ orderId, ext, splitId, items })),
        [dispatch, orderId, splitId]
    );

    const isOrderInShipment = useMemo(() => orderShipmentIds.length > 0, [
        orderShipmentIds,
    ]);

    return (
        <ShipmentPermission action={ [READ_ANY] }>
            <Grid container direction="row" justify="space-between">
            <Grid item>
             <Typography variant="h6">Order Documents</Typography>
             </Grid>
             <Grid item>
            <ThemedButton
                variant="text"
                onClick={ createGenerateDocumentHandler('xlsx') }
                className={ classes.orderDocsActions }
            >
                { buttons.generateExcel }
            </ThemedButton>
            <ThemedButton
                variant="text"
                onClick={ createGenerateDocumentHandler('pdf') }
                className={ classes.orderDocsActions }
            >
                { buttons.generatePdf }
            </ThemedButton>
            </Grid>
            </Grid >
            <Divider variant="middle" />
            <Box className={ classes.orderDocsCard }>
                <Typography variant="h6">Shipment Documents</Typography>
                { isOrderInShipment &&
                orderShipmentIds.map((shipmentId) => (
                    <ShipmentDocumentsCard
                        className={ classes.shipmentCards }
                        key={ `shipment-document-card-${ shipmentId }` }
                        shipmentId={ shipmentId }
                    />
                )) }
                { !isOrderInShipment && (
                    <Typography variant="subtitle1">{ labels.noOrder }</Typography>
                ) }
            </Box>
        </ShipmentPermission>
    );
});

export default SplitDocuments;



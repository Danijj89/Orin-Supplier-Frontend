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
import Box from '@material-ui/core/Box';
import ShipmentDocumentsCard from 'features/orders/ShipmentDocumentsCard.js';

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

const { buttons, labels } = LANGUAGE.order.order;

const SplitDocuments = React.memo(function SplitDocuments({ orderId, splitId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const orderShipmentIds = useSelector((state) =>
        selectOrderShipmentIdsField(state, { orderId, splitId })
    );

    const createGenerateDocumentHandler = useCallback(
        (ext) => () => dispatch(downloadOrder({ orderId, ext })),
        [dispatch, orderId]
    );

    const isOrderInShipment = useMemo(() => orderShipmentIds.length > 0, [
        orderShipmentIds,
    ]);

    return (
        <ShipmentPermission action={ [READ_ANY] }>
            <ThemedButton
                variant="outlined"
                onClick={ createGenerateDocumentHandler('xlsx') }
                className={ classes.orderDocsActions }
            >
                { buttons.generateExcel }
            </ThemedButton>
            <ThemedButton
                variant="outlined"
                onClick={ createGenerateDocumentHandler('pdf') }
                className={ classes.orderDocsActions }
            >
                { buttons.generatePdf }
            </ThemedButton>
            <Box className={ classes.orderDocsCard }>
                { isOrderInShipment &&
                orderShipmentIds.map((shipmentId) => (
                    <ShipmentDocumentsCard
                        className={ classes.shipmentCards }
                        key={ `shipment-document-card-${ shipmentId }` }
                        shipmentId={ shipmentId }
                    />
                )) }
                { !isOrderInShipment && (
                    <Typography variant="h6">{ labels.noOrder }</Typography>
                ) }
            </Box>
        </ShipmentPermission>
    );
});

export default SplitDocuments;



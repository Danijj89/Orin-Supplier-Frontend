import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Table from 'features/shared/components/table/Table.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentDocuments } from 'features/shipments/duck/selectors.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { GetApp as IconDownload } from '@material-ui/icons';
import { selectUsersMap } from 'features/home/duck/users/selectors.js';
import { downloadShipmentDocument } from 'features/documents/duck/thunks.js';
import DeleteButton from 'features/shared/buttons/DeleteButton.js';
import { deleteDocument } from 'features/shipments/duck/thunks.js';
import { CREATE_ANY, CREATE_OWN, DELETE_ANY, DELETE_OWN, READ_ANY, READ_OWN } from 'features/admin/utils/actions.js';
import ShipmentPermission from 'features/shared/permissions/ShipmentPermission.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { getDocumentUrl } from 'features/documents/utils/urls.js';
import { getOptionId } from 'app/utils/options/getters.js';

const {
    documentTableHeaders,
    messages
} = LANGUAGE.shipment.shipment;

const ShipmentDocumentTable = React.memo(function ShipmentDocumentTable(
    { shipmentId, maxEmptyRows, className }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const documents = useSelector(state => selectShipmentDocuments(state, { shipmentId }));
    const usersMap = useSelector(selectUsersMap);

    const onEditDocument = useCallback(
        (docType, documentId) => history.push(
            getDocumentUrl(
                getOptionId(docType),
                shipmentId,
                { document: documentId, edit: true }
            )
        ), [history, shipmentId]);

    const onDownload = useCallback(
        (documentId, ext) => dispatch(downloadShipmentDocument({ shipmentId, documentId, ext })),
        [dispatch, shipmentId]);

    const createDeleteHandler = useCallback(
        (documentId) => () => dispatch(deleteDocument({ shipmentId, documentId })),
        [dispatch, shipmentId]);

    const columns = useMemo(() => [
        {
            field: 'delete',
            renderCell: params =>
                <ShipmentPermission
                    action={ [DELETE_ANY, DELETE_OWN] }
                    shipmentId={ shipmentId }
                >
                    <DeleteButton
                        onDelete={ createDeleteHandler(params.id) }
                        deleteMessage={ messages.documentDeleteMessage }
                        variant="icon"
                    />
                </ShipmentPermission>
        },
        {
            field: 'ref',
            headerName: documentTableHeaders.ref,
            renderCell: params =>
                <ShipmentPermission action={ [CREATE_ANY, CREATE_OWN] } shipmentId={ shipmentId }>
                    <ThemedButton
                        onClick={ () => onEditDocument(params.type, params.id) }
                        variant="text"
                    >
                        { params.ref }
                    </ThemedButton>
                </ShipmentPermission>
        },
        { field: 'type', headerName: documentTableHeaders.type, type: 'option' },
        { field: 'createdAt', headerName: documentTableHeaders.createdAt, type: 'datetime' },
        { field: 'createdBy', headerName: documentTableHeaders.createdBy },
        {
            field: 'excel',
            headerName: documentTableHeaders.excel,
            renderCell: (params) =>
                <ThemedButton
                    onClick={ () => onDownload(params.id, 'xlsx') }
                    variant="text"
                >
                    <IconDownload/>
                </ThemedButton>,
            align: 'center',
            width: 50
        },
        {
            field: 'pdf',
            headerName: documentTableHeaders.pdf,
            renderCell: (params) =>
                <ThemedButton
                    onClick={ () => onDownload(params.id, 'pdf') }
                    variant="text"
                >
                    <IconDownload/>
                </ThemedButton>,
            align: 'center',
            width: 50
        }
    ], [onDownload, createDeleteHandler, shipmentId, onEditDocument]);

    const rows = useMemo(() => documents.map(doc => ({
        id: doc._id,
        ref: doc.ref,
        type: doc.type,
        createdAt: doc.createdAt,
        createdBy: usersMap[doc.createdBy]?.name,
        fileName: doc.fileName
    })), [documents, usersMap]);

    const options = useMemo(() => ({
        table: {
            dense: true,
            classes: {
                container: className
            }
        },
        head: {
            sort: false
        },
        body: {
            maxEmptyRows,
            hover: false
        },
        foot: {
            pagination: 'hide'
        }
    }), [maxEmptyRows, className]);

    return (
        <ShipmentPermission action={ [READ_ANY, READ_OWN] } shipmentId={ shipmentId }>
            <Table
                rows={ rows }
                columns={ columns }
                options={ options }
            />
        </ShipmentPermission>
    );
});

ShipmentDocumentTable.propTypes = {
    shipmentId: PropTypes.string.isRequired,
    maxEmptyRows: PropTypes.number,
    className: PropTypes.string
};

export default ShipmentDocumentTable;


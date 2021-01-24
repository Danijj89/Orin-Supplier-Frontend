import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Table from './table/Table.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectShipmentDocuments } from '../../shipments/duck/selectors.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { GetApp as IconDownload } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { selectUsersMap } from 'features/home/duck/users/selectors.js';
import { downloadShipmentDocument } from '../../documents/duck/thunks.js';
import DeleteButton from '../buttons/DeleteButton.js';
import { deleteDocument } from '../../shipments/duck/thunks.js';
import { DELETE_ANY, DELETE_OWN, READ_ANY, READ_OWN } from '../../admin/utils/actions.js';
import ShipmentPermission from '../permissions/ShipmentPermission.js';

const {
    tableHeaderLabelsMap,
    deleteMessage
} = LANGUAGE.shipment.shipment.shipmentDocumentTable;

const ShipmentDocumentTable = React.memo(function ShipmentDocumentTable(
    { shipmentId, maxEmptyRows, className }) {
    const dispatch = useDispatch();
    const documents = useSelector(state => selectShipmentDocuments(state, { shipmentId }));
    const usersMap = useSelector(selectUsersMap);

    const onDownload = useCallback(
        (documentId, ext) => dispatch(downloadShipmentDocument({ shipmentId, documentId, ext })),
        [dispatch, shipmentId]);

    const createDeleteHandler = useCallback(
        (documentId) => () => dispatch(deleteDocument({ shipmentId, documentId })),
        [dispatch, shipmentId]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        {
            field: 'delete',
            renderCell: params =>
                <ShipmentPermission action={ [DELETE_ANY, DELETE_OWN] } shipmentId={ shipmentId }>
                    <DeleteButton
                        onDelete={ createDeleteHandler(params.id) }
                        deleteMessage={ deleteMessage }
                        variant="icon"
                    />
                </ShipmentPermission>
        },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'type', headerName: tableHeaderLabelsMap.type, type: 'option' },
        { field: 'createdAt', headerName: tableHeaderLabelsMap.createdAt, type: 'datetime' },
        { field: 'createdBy', headerName: tableHeaderLabelsMap.createdBy },
        {
            field: 'excel',
            headerName: tableHeaderLabelsMap.excel,
            renderCell: (params) =>
                <IconButton
                    onClick={ () => onDownload(params.id, 'xlsx') }
                    size="small"
                >
                    <IconDownload/>
                </IconButton>,
            align: 'center',
            width: 50
        },
        {
            field: 'pdf',
            headerName: tableHeaderLabelsMap.pdf,
            renderCell: (params) =>
                <IconButton
                    onClick={ () => onDownload(params.id, 'pdf') }
                    size="small"
                >
                    <IconDownload/>
                </IconButton>,
            align: 'center',
            width: 50
        }
    ], [onDownload, createDeleteHandler, shipmentId]);

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


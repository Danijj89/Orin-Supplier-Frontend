import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Table from './table/Table.js';
import { useSelector } from 'react-redux';
import { selectShipmentDocuments } from '../../shipments/duck/selectors.js';
import { LANGUAGE, LOCALE } from '../../../app/utils/constants.js';
import { GetApp as IconDownload } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { selectUsersMap } from '../../users/duck/selectors.js';
import { dateToLocaleDate } from '../utils/format.js';
import DocumentService from '../../api/DocumentService.js';
import { downloadFile } from '../utils/file.js';
import { getOptionLabel } from '../../../app/utils/options/getters.js';

const {
    tableHeaderLabelsMap
} = LANGUAGE.shipment.shipment.shipmentDocumentTable;

const ShipmentDocumentTable = React.memo(function ShipmentDocumentTable(
    { shipmentId, maxEmptyRows, className }) {
    const documents = useSelector(state => selectShipmentDocuments(state, { shipmentId }));
    const usersMap = useSelector(selectUsersMap);

    const onDownload = useCallback(
        async (documentId, fileName, ext) => {
            const file = await DocumentService.downloadShipmentDocument(shipmentId, documentId, ext);
            downloadFile(file, fileName);
        },
        [shipmentId]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'type', headerName: tableHeaderLabelsMap.type },
        { field: 'createdAt', headerName: tableHeaderLabelsMap.createdAt },
        { field: 'createdBy', headerName: tableHeaderLabelsMap.createdBy },
        {
            field: 'excel',
            headerName: tableHeaderLabelsMap.excel,
            renderCell: (params) =>
                <IconButton
                    onClick={ () => onDownload(params.id, params.fileName, 'xlsx') }
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
                    onClick={ () => onDownload(params.id, params.fileName, 'pdf') }
                    size="small"
                >
                    <IconDownload/>
                </IconButton>,
            align: 'center',
            width: 50
        }
    ], [onDownload]);

    const rows = useMemo(() => documents.map(doc => ({
        id: doc._id,
        ref: doc.ref,
        type: getOptionLabel(doc.type, LOCALE),
        createdAt: dateToLocaleDate(doc.createdAt),
        createdBy: usersMap[doc.createdBy]?.name,
        fileName: doc.fileName
    })), [documents, usersMap]);

    return (
        <Table
            rows={ rows }
            columns={ columns }
            dense
            maxEmptyRows={ maxEmptyRows }
            className={ className }
        />
    );
});

ShipmentDocumentTable.propTypes = {
    shipmentId: PropTypes.string.isRequired,
    maxEmptyRows: PropTypes.number,
    className: PropTypes.string
};

export default ShipmentDocumentTable;


import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../shared/components/Table.js';
import { useSelector } from 'react-redux';
import { selectShipmentDocuments } from './duck/selectors.js';
import { LANGUAGE } from '../../app/constants.js';
import { GetApp as IconDownload } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { documentTypesOptions } from '../shared/constants.js';
import { selectUsersMap } from '../users/duck/selectors.js';
import { dateToLocaleDate } from '../shared/utils/format.js';
import DocumentService from '../api/DocumentService.js';
import { downloadFile } from '../shared/utils/file.js';

const {
    tableHeaderLabelsMap
} = LANGUAGE.shipment.shipment.shipmentDocumentTable;

const ShipmentDocumentTable = React.memo(function ShipmentDocumentTable() {
    const { id } = useParams();
    const documents = useSelector(state => selectShipmentDocuments(state, id));
    const usersMap = useSelector(selectUsersMap);

    const onExcelDownload = useCallback(
        async (documentId, fileName) => {
            const file = await DocumentService.downloadShipmentDocument(id, documentId, 'xlsx');
            downloadFile(file, fileName);
        },
        [id]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'type', headerName: tableHeaderLabelsMap.type },
        { field: 'createdAt', headerName: tableHeaderLabelsMap.createdAt },
        { field: 'createdBy', headerName: tableHeaderLabelsMap.createdBy },
        {
            field: 'download',
            renderCell: (params) =>
                <IconButton onClick={ () => onExcelDownload(params.id, params.fileName) }>
                    <IconDownload/>
                </IconButton>,
            align: 'center'
        }
    ];

    const rows = documents.map(doc => ({
        id: doc._id,
        ref: doc.ref,
        type: documentTypesOptions[doc.type],
        createdAt: dateToLocaleDate(doc.createdAt),
        createdBy: usersMap[doc.createdBy]?.name,
        fileName: doc.fileName
    }));

    return (
        <Table rows={ rows } columns={ columns }/>
    )
});

export default ShipmentDocumentTable;


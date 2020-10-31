import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllShipments } from './duck/selectors.js';
import Table from '../shared/components/Table.js';
import { LANGUAGE } from '../../app/constants.js';

const { tableHeadersMap } = LANGUAGE.shipments.overview.shipmentsTable;

export default function ShipmentsTable({ isLoading }) {
    const history = useHistory();
    const shipments = useSelector(selectAllShipments);

    const onRowClick = (params) => history.push(`/home/shipments/${ params.id }`)

    const columns = [
        { field: 'id', hide: true },
        { field: 'consigneeName', headerName: tableHeadersMap.consigneeName }
    ];

    const rows = shipments.filter(s => s.active).map(shipment => ({
        id: shipment._id,
        consigneeName: shipment.consigneeAdd.name
    }));

    return (
        <Table
            columns={ columns }
            rows={ rows }
            isLoading={ isLoading }
            onRowClick={ onRowClick }
        />
    )
}
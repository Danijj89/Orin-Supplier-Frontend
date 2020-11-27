import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllShipments } from './duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from '../../app/utils/constants.js';

const { tableHeadersMap } = LANGUAGE.shipment.overview.shipmentsTable;

const ShipmentsTable = React.memo(function ShipmentsTable() {
    const history = useHistory();
    const location = useLocation();
    const shipments = useSelector(selectAllShipments);

    const onRowClick = useCallback(
        (params) => history.push(`${location.pathname}/${ params.id }`),
    [history, location.pathname]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'consigneeName', headerName: tableHeadersMap.consigneeName }
    ], []);

    const rows = useMemo(() => shipments.map(shipment => ({
        id: shipment._id,
        consigneeName: shipment.consigneeAdd.name
    })), [shipments]);

    return (
        <Table
            columns={ columns }
            rows={ rows }
            onRowClick={ onRowClick }
        />
    )
});

export default ShipmentsTable;
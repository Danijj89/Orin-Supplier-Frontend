import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LANGUAGE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { useSelector } from 'react-redux';
import { selectClientOrders } from './duck/selectors.js';

const {
    ordersTableHeadersMap
} = LANGUAGE.client.clientDetails.clientOrdersTable;

const ClientOrdersTable = React.memo(function ClientOrdersTable() {
    const history = useHistory();
    const { id: clientId } = useParams();
    const clientOrders = useSelector(state => selectClientOrders(state, clientId));

    const onRowClick = (params) => history.push(`/home/orders/${ params.id }`);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'clientRef', headerName: ordersTableHeadersMap.clientRef },
        { field: 'crd', headerName: ordersTableHeadersMap.crd },
        { field: 'realCrd', headerName: ordersTableHeadersMap.realCrd },
        { field: 'totalQ', headerName: ordersTableHeadersMap.totalQ },
        { field: 'totalA', headerName: ordersTableHeadersMap.totalA },
        { field: 'del', headerName: ordersTableHeadersMap.del }
    ], []);

    const rows = useMemo(() => clientOrders.map(order => ({
        id: order._id,
        ref: order.ref,
        clientRef: order.clientRef,
        crd: order.crd,
        realCrd: order.realCrd,
        del: order.del,
        totalQ: UnitCounter.stringRep(order.totalQ),
        totalA: order.totalA
    })), [clientOrders]);

    return (
        <Table rows={ rows } columns={ columns } onRowClick={ onRowClick }/>
    )
});

export default ClientOrdersTable;
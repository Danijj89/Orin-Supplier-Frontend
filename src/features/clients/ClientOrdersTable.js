import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { useSelector } from 'react-redux';
import { selectClientOrders } from './duck/selectors.js';
import { selectItemUnitsMap } from '../../app/duck/selectors.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';

const {
    ordersTableHeadersMap
} = LANGUAGE.client.clientDetails.clientOrdersTable;

const ClientOrdersTable = React.memo(function ClientOrdersTable() {
    const history = useHistory();
    const { id: clientId } = useParams();
    const clientOrders = useSelector(state => selectClientOrders(state, { clientId }));
    const itemUnitsMap = useSelector(selectItemUnitsMap);

    const onRowClick = (params) => history.push(`/home/orders/${ params.id }`);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'clientRef', headerName: ordersTableHeadersMap.clientRef },
        { field: 'crd', headerName: ordersTableHeadersMap.crd, type: 'date' },
        { field: 'realCrd', headerName: ordersTableHeadersMap.realCrd, type: 'date' },
        { field: 'totalQ', headerName: ordersTableHeadersMap.totalQ },
        { field: 'totalA', headerName: ordersTableHeadersMap.totalA },
        { field: 'del', headerName: ordersTableHeadersMap.del, type: 'option' }
    ], []);

    const rows = useMemo(() => clientOrders.map(order => ({
        id: order._id,
        ref: order.ref,
        clientRef: order.clientRef,
        crd: order.crd,
        realCrd: order.realCrd,
        del: order.del,
        totalQ: UnitCounter.stringRep(order.totalQ, itemUnitsMap, LOCALE),
        totalA: order.totalA
    })), [clientOrders, itemUnitsMap]);

    return (
        <OrderPermission action={ [READ_ANY, READ_OWN] }>
            <Table rows={ rows } columns={ columns } onRowClick={ onRowClick }/>
        </OrderPermission>
    )
});

export default ClientOrdersTable;
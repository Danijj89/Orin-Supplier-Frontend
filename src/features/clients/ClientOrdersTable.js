import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import Table from '../shared/components/table/Table.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { useSelector } from 'react-redux';
import { selectClientOrders } from './duck/selectors.js';
import { selectItemUnitsMap } from 'app/duck/selectors.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';
import { formatItemsTotalQuantities } from 'features/shared/utils/format.js';
import { getOrderURL } from 'features/orders/utils/urls.js';

const {
    ordersTableHeadersMap
} = LANGUAGE.client.clientDetails.clientOrdersTable;

const ClientOrdersTable = React.memo(function ClientOrdersTable() {
    const history = useHistory();
    const { id: clientId } = useParams();
    const clientOrders = useSelector(state => selectClientOrders(state, { clientId }));
    const itemUnitsMap = useSelector(selectItemUnitsMap);

    const onRowClick = useCallback(
        row => history.push(getOrderURL(row.id, { tab: 'fulfillment', split: row.splitId })), [history]);

    const columns = useMemo(() => [
        { field: 'ref', headerName: ordersTableHeadersMap.ref },
        { field: 'clientRef', headerName: ordersTableHeadersMap.clientRef },
        { field: 'crd', headerName: ordersTableHeadersMap.crd, type: 'date' },
        { field: 'realCrd', headerName: ordersTableHeadersMap.realCrd, type: 'date' },
        {
            field: 'quantity',
            headerName: ordersTableHeadersMap.quantity,
            format: row => formatItemsTotalQuantities(row.quantity, itemUnitsMap, LOCALE)
        },
        { field: 'total', headerName: ordersTableHeadersMap.total },
        { field: 'del', headerName: ordersTableHeadersMap.del, type: 'option' }
    ], [itemUnitsMap]);

    const rows = useMemo(() => {
        const result = [];
        clientOrders.forEach(order => order.shippingSplits.forEach(split => result.push({
            id: order._id,
            splitId: split._id,
            ref: split.ref,
            clientRef: order.clientRef,
            crd: split.crd,
            realCrd: split.realCrd,
            del: order.del,
            quantity: split.quantity,
            total: split.total
        })));
        return result;
    }, [clientOrders]);

    const options = useMemo(() => ({
        body: {
            onRowClick
        },
        foot: {
            pagination: 'hide'
        }
    }), [onRowClick]);

    return (
        <OrderPermission action={ [READ_ANY, READ_OWN] }>
            <Table rows={ rows } columns={ columns } options={ options }/>
        </OrderPermission>
    )
});

export default ClientOrdersTable;
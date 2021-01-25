import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllShipments } from './duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { getOptionId } from 'app/utils/options/getters.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import { selectDeliveryMethods, selectShipmentStatuses } from 'app/duck/selectors.js';
import { updateShipment } from './duck/thunks.js';
import { SESSION_SHIPMENT_TABLE_FILTERS } from 'app/sessionKeys.js';

const { tableHeadersMap } = LANGUAGE.shipment.overview.shipmentsTable;

function getContainerQuantityString(containerQ) {
    if (!containerQ) return null;
    return containerQ
        .filter(container => container.quantity > 0)
        .map(container => `${ container.quantity } ${ container.type }`)
        .join(' + ')
}

const ShipmentsTable = React.memo(function ShipmentsTable() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const shipments = useSelector(selectAllShipments);
    const shipmentStatusOptions = useSelector(selectShipmentStatuses);
    const deliveryMethodOptions = useSelector(selectDeliveryMethods);

    const onRowClick = useCallback(
        (params) => history.push(`${ location.pathname }/${ params.id }?tab=orders`),
        [history, location.pathname]);

    const createStatusChangeHandler = useCallback(
        (shipmentId) => (newStatus) =>
            dispatch(updateShipment({
                shipmentId,
                update: { status: getOptionId(newStatus) }
            })),
        [dispatch]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        { field: 'ref', headerName: tableHeadersMap.ref },
        { field: 'consignee', headerName: tableHeadersMap.consignee },
        { field: 'crd', headerName: tableHeadersMap.crd, type: 'date' },
        {
            field: 'status',
            headerName: tableHeadersMap.status,
            renderCell: params =>
                <StatusDropdown
                    status={ params.status }
                    statuses={ shipmentStatusOptions }
                    colorMap="shipment"
                    onStatusChange={ createStatusChangeHandler(params.id) }
                />,
            align: 'center',
            width: 140
        },
        { field: 'pod', headerName: tableHeadersMap.pod },
        { field: 'del', headerName: tableHeadersMap.del, type: 'option' },
        { field: 'containerQ', headerName: tableHeadersMap.containerQ }
    ], [shipmentStatusOptions, createStatusChangeHandler]);

    const rows = useMemo(() => shipments.map(shipment => ({
        id: shipment._id,
        ref: shipment.ref,
        consignee: shipment.consigneeAdd.name,
        crd: shipment.crd,
        status: shipment.status,
        pod: shipment.pod,
        del: shipment.del,
        containerQ: getContainerQuantityString(shipment.containerQ)
    })), [shipments]);

    const tools = useMemo(() => [
        {
            id: 'shipments-table-filters',
            type: 'filter',
            options: {
                sessionKey: SESSION_SHIPMENT_TABLE_FILTERS,
                filters: [
                    { field: 'consignee', type: 'text', label: tableHeadersMap.consignee },
                    { field: 'crd', type: 'date', label: tableHeadersMap.crd },
                    { field: 'status', type: 'option', options: shipmentStatusOptions, label: tableHeadersMap.status },
                    { field: 'del', type: 'option', options: deliveryMethodOptions, label: tableHeadersMap.del }
                ]
            }
        }
    ], [deliveryMethodOptions, shipmentStatusOptions]);

    const options = useMemo(() => ({
        table: {
            dense: true
        },
        body: {
            onRowClick
        }
    }), [onRowClick]);

    return (
        <Table
            columns={ columns }
            rows={ rows }
            options={ options }
            tools={ tools }
        />
    )
});

export default ShipmentsTable;
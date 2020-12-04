import React, { useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllShipments } from './duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import { selectShipmentStatuses } from '../../app/duck/selectors.js';
import { updateShipment } from './duck/thunks.js';

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
        { field: 'crd', headerName: tableHeadersMap.crd },
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
        { field: 'del', headerName: tableHeadersMap.del },
        { field: 'containerQ', headerName: tableHeadersMap.containerQ }
    ], [shipmentStatusOptions, createStatusChangeHandler]);

    const rows = useMemo(() => shipments.map(shipment => ({
        id: shipment._id,
        ref: shipment.ref,
        consignee: shipment.consigneeAdd.name,
        crd: shipment.crd,
        status: shipment.status,
        pod: shipment.pod,
        del: getOptionLabel(shipment.del, LOCALE),
        containerQ: getContainerQuantityString(shipment.containerQ)
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
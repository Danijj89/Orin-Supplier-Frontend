import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserId } from 'app/duck/selectors.js';
import Permission from './Permission.js';
import { selectShipmentOwnerById } from '../../shipments/duck/selectors.js';

const SHIPMENT_RESOURCE = 'shipment';

const ShipmentPermission = React.memo(function ShipmentPermission(
    { action = [], shipmentId, children, ...rest }) {
    let childrenArray = Array.isArray(children) ? children : [children];
    childrenArray = childrenArray.filter(child => child);
    const shipmentOwner = useSelector(state => selectShipmentOwnerById(state, { shipmentId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => shipmentId ? shipmentOwner === sessionUserId : true,
        [shipmentOwner, sessionUserId, shipmentId]);

    return (
        <Permission resource={ SHIPMENT_RESOURCE } action={ action } isOwner={ isOwner }>
            { children && childrenArray.map((child, idx) =>
                React.cloneElement(child, {
                    key: idx,
                    ...rest
                })
            ) }
        </Permission>
    );
});

ShipmentPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    shipmentId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default ShipmentPermission;
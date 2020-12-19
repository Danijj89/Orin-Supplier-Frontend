import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';
import { selectShipmentOwnerById } from '../../shipments/duck/selectors.js';

const ShipmentPermission = React.memo(function ShipmentPermission(
    { resource, action = [], shipmentId, children }) {
    const shipmentOwner = useSelector(state => selectShipmentOwnerById(state, { shipmentId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => shipmentId ? shipmentOwner === sessionUserId : true,
        [shipmentOwner, sessionUserId, shipmentId]);

    return (
        <Permission resource={ resource } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

ShipmentPermission.propTypes = {
    resource: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    shipmentId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default ShipmentPermission;
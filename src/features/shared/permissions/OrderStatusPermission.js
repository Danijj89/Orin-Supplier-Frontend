import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectOrderOwnerById } from '../../orders/duck/selectors.js';
import { selectSessionUserId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';

const ORDER_STATUS_RESOURCE = 'order_status';

const OrderStatusPermission = React.memo(function OrderStatusPermission(
    { action = [], orderId, children }) {
    const orderOwner = useSelector(state => selectOrderOwnerById(state, { orderId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => orderId ? sessionUserId === orderOwner : true,
        [orderOwner, sessionUserId, orderId]);

    return (
        <Permission resource={ ORDER_STATUS_RESOURCE } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

OrderStatusPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    orderId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default OrderStatusPermission;
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectOrderOwnerById } from '../../orders/duck/selectors.js';
import { selectSessionUserId } from 'app/duck/selectors.js';
import Permission from './Permission.js';

const ORDER_RESOURCE = 'order';

const OrderPermission = React.memo(function OrderPermission(
    { action = [], orderId, children, ...rest }) {
    let childrenArray = Array.isArray(children) ? children : [children];
    childrenArray = childrenArray.filter(child => child);
    const orderOwner = useSelector(state => selectOrderOwnerById(state, { orderId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => orderId ? sessionUserId === orderOwner : true,
        [orderOwner, sessionUserId, orderId]);

    return (
        <Permission resource={ ORDER_RESOURCE } action={ action } isOwner={ isOwner }>
            { children && childrenArray.map((child, idx) =>
                React.cloneElement(child, {
                    key: idx,
                    ...rest
                })
            ) }
        </Permission>
    );
});

OrderPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    orderId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default OrderPermission;
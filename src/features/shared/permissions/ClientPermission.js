import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';
import { selectClientOwnerById } from '../../clients/duck/selectors.js';

export function isOwnClient(ownerId, client) {
    const { createdBy, assignedTo } = client;
    return ownerId === createdBy || ownerId === assignedTo;
}

export const CLIENT_RESOURCE = 'client';

const ClientPermission = React.memo(function ClientPermission(
    { action = [], clientId, children }) {
    const clientOwners = useSelector(state => selectClientOwnerById(state, { clientId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => clientId ? clientOwners.some(owner => owner === sessionUserId) : true,
        [clientOwners, sessionUserId, clientId]);

    return (
        <Permission resource={ CLIENT_RESOURCE } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

ClientPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    clientId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default ClientPermission;
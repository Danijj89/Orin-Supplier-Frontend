import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';
import { selectClientOwnerById } from '../../clients/duck/selectors.js';

const ClientPermission = React.memo(function ClientPermission(
    { resource, action = [], clientId, children }) {
    const clientOwners = useSelector(state => selectClientOwnerById(state, { clientId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => clientId ? clientOwners.some(owner => owner === sessionUserId) : true,
        [clientOwners, sessionUserId, clientId]);

    return (
        <Permission resource={ resource } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
}, (prev, next) => {
    return prev.clientId === next.clientId;
});

ClientPermission.propTypes = {
    resource: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    clientId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default ClientPermission;
import React from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission.js';

const RESOURCE = 'permission';

const PermissionPermission = React.memo(function PermissionPermission(
    { action = [], children }) {

    return (
        <Permission resource={ RESOURCE } action={ action } isOwner={ true }>
            { children }
        </Permission>
    );
});

PermissionPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    children: PropTypes.node.isRequired
};

export default PermissionPermission;
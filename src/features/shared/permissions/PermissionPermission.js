import React from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission.js';

const PERMISSION_RESOURCE = 'permission';

const PermissionPermission = React.memo(function PermissionPermission(
    { action = [], children }) {

    return (
        <Permission resource={ PERMISSION_RESOURCE } action={ action } isOwner={ true }>
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
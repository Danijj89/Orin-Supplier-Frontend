import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserId } from 'app/duck/selectors.js';
import Permission from './Permission.js';

const USER_RESOURCE = 'user';

const UserPermission = React.memo(function UserPermission(
    { action = [], userId, children }) {
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => userId ? userId === sessionUserId : true,
        [userId, sessionUserId]);

    return (
        <Permission resource={ USER_RESOURCE } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

UserPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    userId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default UserPermission;
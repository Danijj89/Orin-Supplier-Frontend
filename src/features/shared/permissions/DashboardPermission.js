import React from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission.js';


export const DASHBOARD_RESOURCE = 'dashboard';

const DashboardPermission = React.memo(function DashboardPermission(
    { action = [], children }) {

    return (
        <Permission resource={ DASHBOARD_RESOURCE } action={ action }>
            { children }
        </Permission>
    );
});

DashboardPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    children: PropTypes.node.isRequired
};

export default DashboardPermission;
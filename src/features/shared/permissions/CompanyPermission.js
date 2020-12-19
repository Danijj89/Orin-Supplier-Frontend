import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserCompanyId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';

const CompanyPermission = React.memo(function CompanyPermission(
    { resource, action = [], companyId, children }) {
    const sessionUserCompanyId = useSelector(selectSessionUserCompanyId);
    const isOwner = useMemo(
        () => sessionUserCompanyId ? sessionUserCompanyId === companyId : true,
        [sessionUserCompanyId, companyId]);

    return (
        <Permission resource={ resource } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

CompanyPermission.propTypes = {
    resource: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    companyId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default CompanyPermission;
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserCompanyId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';

const COMPANY_RESOURCE = 'company';

const CompanyPermission = React.memo(function CompanyPermission(
    { action = [], companyId, children }) {
    const sessionUserCompanyId = useSelector(selectSessionUserCompanyId);
    const isOwner = useMemo(
        () => sessionUserCompanyId ? sessionUserCompanyId === companyId : true,
        [sessionUserCompanyId, companyId]);

    return (
        <Permission resource={ COMPANY_RESOURCE } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

CompanyPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    companyId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default CompanyPermission;
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectSessionUserId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';
import { selectLeadOwnersById } from '../../leads/duck/selectors.js';

const RESOURCE = 'lead';

const LeadPermission = React.memo(function LeadPermission(
    { action = [], leadId, children }) {
    const leadOwners = useSelector(state => selectLeadOwnersById(state, { leadId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => leadId ? leadOwners.some(owner => owner === sessionUserId) : true,
        [leadOwners, sessionUserId, leadId]);

    return (
        <Permission resource={ RESOURCE } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

LeadPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    leadId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default LeadPermission;
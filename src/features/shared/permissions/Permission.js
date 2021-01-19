import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectAppGrants, selectSessionUser } from 'app/duck/selectors.js';
import {
    CREATE_ANY,
    CREATE_OWN,
    DELETE_ANY,
    DELETE_OWN,
    READ_ANY,
    READ_OWN,
    UPDATE_ANY,
    UPDATE_OWN
} from '../../admin/utils/actions.js';
import { AccessControl } from 'accesscontrol';

const Permission = React.memo(function Permission({ resource, action = [], isOwner, children }) {
    const grants = useSelector(selectAppGrants);
    const ac = new AccessControl(grants);
    const { roles } = useSelector(selectSessionUser);
    const actions = Array.isArray(action) ? action : [action];
    if (!roles?.length) {
        return null;
    }
    let match = false;
    for (const action of actions) {
        switch (action) {
            case READ_ANY:
                match = ac.can(roles).readAny(resource).granted;
                break;
            case CREATE_ANY:
                match = ac.can(roles).createAny(resource).granted;
                break;
            case UPDATE_ANY:
                match = ac.can(roles).updateAny(resource).granted;
                break;
            case DELETE_ANY:
                match = ac.can(roles).deleteAny(resource).granted;
                break;
            case READ_OWN:
                match = ac.can(roles).readOwn(resource).granted && isOwner;
                break;
            case CREATE_OWN:
                match = ac.can(roles).createOwn(resource).granted && isOwner;
                break;
            case UPDATE_OWN:
                match = ac.can(roles).updateOwn(resource).granted && isOwner;
                break;
            case DELETE_OWN:
                match = ac.can(roles).deleteOwn(resource).granted && isOwner;
                break;
            default:
        }
        if (match) break;
    }

    if (match) {
        return <>{ children }</>
    } else {
        return null;
    }
});

Permission.propTypes = {
    resource: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    isOwner: PropTypes.bool,
    children: PropTypes.node.isRequired
};

export default Permission;
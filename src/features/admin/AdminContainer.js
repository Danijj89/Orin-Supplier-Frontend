import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoleDataStatus, selectRoleError } from './duck/roles/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Admin from './Admin.js';
import { fetchRoles } from './duck/roles/thunks.js'
import { cleanRoleState } from './duck/roles/slice.js';
import { selectResourceDataStatus, selectResourceError } from './duck/resources/selectors.js';
import { fetchResources } from './duck/resources/thunks.js';
import { cleanResourceState } from './duck/resources/slice.js';
import { selectPermissionDataStatus, selectPermissionError } from './duck/permissions/selectors.js';
import { fetchPermissions } from './duck/permissions/thunks.js';
import { cleanPermissionState } from './duck/permissions/slice.js';

const AdminContainer = React.memo(function AdminContainer() {
    const dispatch = useDispatch();

    const resourceDataStatus = useSelector(selectResourceDataStatus);
    const resourceError = useSelector(selectResourceError);
    const permissionDataStatus = useSelector(selectPermissionDataStatus);
    const permissionError = useSelector(selectPermissionError);
    const roleDataStatus = useSelector(selectRoleDataStatus);
    const roleError = useSelector(selectRoleError);

    const status = determineStatus(resourceDataStatus, permissionDataStatus, roleDataStatus);
    const errors = getErrors(resourceError, permissionError, roleError);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            dispatch(fetchResources());
            dispatch(fetchPermissions());
            dispatch(fetchRoles());
            fetched.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanResourceState());
                dispatch(cleanPermissionState());
                dispatch(cleanRoleState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Admin/> }
        </>
    );
});

export default AdminContainer;
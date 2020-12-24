import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoleDataStatus, selectRoleError, selectRoleStatus } from './duck/roles/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Admin from './Admin.js';
import { fetchRoles } from './duck/roles/thunks.js'
import { cleanRoleState } from './duck/roles/slice.js';
import { selectResourceDataStatus, selectResourceError, selectResourceStatus } from './duck/resources/selectors.js';
import { fetchResources } from './duck/resources/thunks.js';
import { cleanResourceState } from './duck/resources/slice.js';
import {
    selectPermissionDataStatus,
    selectPermissionError,
    selectPermissionStatus
} from './duck/permissions/selectors.js';
import { fetchPermissions } from './duck/permissions/thunks.js';
import { cleanPermissionState } from './duck/permissions/slice.js';
import { selectCompanyDataStatus, selectCompanyError, selectCompanyStatus } from './duck/companies/selectors.js';
import { cleanCompanyState } from './duck/companies/slice.js';
import { fetchCompanies } from './duck/companies/thunks.js';
import StatusHandler from 'features/shared/status/StatusHandler.js';
import PermissionPermission from 'features/shared/permissions/PermissionPermission.js';
import { READ_ANY } from 'features/admin/utils/actions.js';

const AdminContainer = React.memo(function AdminContainer() {
    const dispatch = useDispatch();

    const resourceDataStatus = useSelector(selectResourceDataStatus);
    const resourceError = useSelector(selectResourceError);
    const permissionDataStatus = useSelector(selectPermissionDataStatus);
    const permissionError = useSelector(selectPermissionError);
    const roleDataStatus = useSelector(selectRoleDataStatus);
    const roleError = useSelector(selectRoleError);
    const companyDataStatus = useSelector(selectCompanyDataStatus);
    const companyError = useSelector(selectCompanyError);

    const status = determineStatus(
        resourceDataStatus,
        permissionDataStatus,
        roleDataStatus,
        companyDataStatus
    );
    const errors = getErrors(
        resourceError,
        permissionError,
        roleError,
        companyError
    );

    const resourceStatus = useSelector(selectResourceStatus);
    const permissionStatus = useSelector(selectPermissionStatus);
    const roleStatus = useSelector(selectRoleStatus);
    const companyStatus = useSelector(selectCompanyStatus);

    const fetched = useRef(false);
    useEffect(() => {
        if (!fetched.current) {
            dispatch(fetchResources());
            dispatch(fetchPermissions());
            dispatch(fetchRoles());
            dispatch(fetchCompanies());
            fetched.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
                dispatch(cleanResourceState());
                dispatch(cleanPermissionState());
                dispatch(cleanRoleState());
                dispatch(cleanCompanyState());
            }
        }
    }, [dispatch, errors.length]);

    return (
        <PermissionPermission action={ READ_ANY }>
            <StatusHandler status={ resourceStatus } error={ resourceError }/>
            <StatusHandler status={ permissionStatus } error={ permissionError }/>
            <StatusHandler status={ roleStatus } error={ roleError }/>
            <StatusHandler status={ companyStatus } error={ companyError }/>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Admin/> }
        </PermissionPermission>
    );
});

export default AdminContainer;
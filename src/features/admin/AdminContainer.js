import React from 'react';
import { useSelector } from 'react-redux';
import { selectRoleDataStatus, selectRoleError } from './duck/roles/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Admin from './Admin.js';

const AdminContainer = React.memo(function AdminContainer() {

    const roleDataStatus = useSelector(selectRoleDataStatus);
    const roleError = useSelector(selectRoleError);

    const status = determineStatus(roleDataStatus);
    const errors = getErrors(roleError);

    return (
        <>
            { status === 'REJECTED' && <ErrorPage errors={ errors }/> }
            { status === 'PENDING' && <Loader/> }
            { status === 'FULFILLED' && <Admin/> }
        </>
    );
});

export default AdminContainer;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoleDataStatus, selectRoleError } from './duck/roles/selectors.js';
import { determineStatus, getErrors } from '../shared/utils/state.js';
import ErrorPage from '../shared/components/ErrorPage.js';
import Loader from '../shared/components/Loader.js';
import Admin from './Admin.js';
import { fetchRoles } from './duck/roles/thunks.js'
import { cleanRoleState } from './duck/roles/slice.js';

const AdminContainer = React.memo(function AdminContainer() {
    const dispatch = useDispatch();
    const roleDataStatus = useSelector(selectRoleDataStatus);
    const roleError = useSelector(selectRoleError);

    const status = determineStatus(roleDataStatus);
    const errors = getErrors(roleError);

    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    useEffect(() => {
        return () => {
            if (errors.length > 0) {
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
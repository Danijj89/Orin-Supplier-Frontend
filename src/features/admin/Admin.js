import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import Permissions from './Permissions.js';
import Resources from '../Resources.js';
import Roles from './Roles.js';
import NavTabs from '../shared/components/NavTabs.js';
import { LANGUAGE } from '../../app/utils/constants.js';

const {
    tabsLabelsMap
} = LANGUAGE.admin.admin;

const Admin = React.memo(function Admin() {
    const [tabValue, setTabValue] = useState('resources')

    return (
        <>
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                />
            </Paper>
            { tabValue === 'resources' && <Resources/> }
            { tabValue === 'permissions' && <Permissions/> }
            { tabValue === 'roles' && <Roles/> }
        </>
    );
});

export default Admin;
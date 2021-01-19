import React, { useState } from 'react';
import { Paper } from '@material-ui/core';
import Permissions from './Permissions.js';
import Resources from 'features/admin/Resources.js';
import Roles from './Roles.js';
import NavTabs from '../shared/components/NavTabs.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import Users from './Users.js';
import Companies from './Companies.js';
import { makeStyles } from '@material-ui/core/styles';


const {
    tabsLabelsMap
} = LANGUAGE.admin.admin;

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
    navTabs: {
        marginBottom: theme.spacing(2)
    }
}));

const Admin = React.memo(function Admin() {
    const [tabValue, setTabValue] = useState('resources')
    const classes = useStyles();

    return (
        <>
            <Paper className={ classes.container }>
                <Paper className={ classes.navTabs}>
                    <NavTabs
                        tabsLabelsMap={ tabsLabelsMap }
                        tabValue={ tabValue }
                        onChange={ setTabValue }
                    />
                </Paper>
                { tabValue === 'resources' && <Resources/> }
                { tabValue === 'permissions' && <Permissions/> }
                { tabValue === 'roles' && <Roles/> }
                { tabValue === 'users' && <Users/> }
                { tabValue === 'companies' && <Companies/> }
            </Paper>
        </>
    );
});

export default Admin;
import React from 'react';
import Box from '@material-ui/core/Box';
import NewResourceButton from './NewResourceButton.js';
import { useSelector } from 'react-redux';
import { selectAllResources } from './duck/resources/selectors.js';
import { useForm } from 'react-hook-form';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { LANGUAGE } from '../../app/utils/constants.js';

const {
    formLabels
} = LANGUAGE.admin.admin;

const Admin = React.memo(function Admin() {
    const resources = useSelector(selectAllResources);

    const { control } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            resource: null,
        }
    });

    return (
        <Box>
            <NewResourceButton/>
            <RHFAutoComplete
                rhfControl={ control }
                name="resource"
                label={ formLabels.resource }
                options={ resources }
            />
        </Box>
    );
});

export default Admin;
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { LANGUAGE } from '../../app/constants.js';
import { Controller, useForm } from 'react-hook-form';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { documentTypesOptions } from '../shared/constants.js';

const {
    buttonLabel,
    dialogTitleLabel,
    submitButtonLabel,
    formLabels
} = LANGUAGE.shipment.shipment.documentButton;

const DocumentButton = React.memo(function DocumentButton() {
    const history = useHistory();
    const [isEdit, setIsEdit] = useState(false);

    const { control, errors, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            type: documentTypesOptions[0]
        }
    });

    const onEdit = useCallback(() => setIsEdit(true), []);
    const onCancel = useCallback(() => setIsEdit(false), []);

    const onSubmit = useCallback((data) => {
        switch (data.type) {
            case 'ci':
                history.push('/home/documents/ci/new');
                break;
            case 'pl':
                history.push('/home/documents/pl/new');
                break;
            default:
                history.push('/home/shipments');
        }
    }, [history]);

    return (
        <Box>
            <ThemedButton onClick={ onEdit }>{ buttonLabel }</ThemedButton>
            <FormDialog
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ submitButtonLabel }
                onCancel={ onCancel }
                onSubmit={ handleSubmit(onSubmit) }
            >
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ documentTypesOptions }
                            getOptionLabel={ option => option.name }
                            getOptionSelected={ option => option.type === getValues('type').type }
                            label={ formLabels.type }
                            error={ !!errors.type }
                            required
                        />
                    }
                    name="type"
                    control={ control }
                    rules={ { required: true } }
                />
            </FormDialog>
        </Box>
    )
});

export default DocumentButton;
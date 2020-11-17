import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    const { control, errors, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            document: documentTypesOptions[0]
        }
    });

    const onEdit = useCallback(() => setIsEdit(true), []);
    const onCancel = useCallback(() => setIsEdit(false), []);

    const onSubmit = useCallback((data) => {
        switch (data.document.type) {
            case 'CI':
                history.push(`/home/documents/ci/new?shipment=${id}`);
                break;
            case 'PL':
                history.push(`/home/documents/pl/new?shipment=${id}`);
                break;
            default:
                history.push('/home/shipments');
        }
    }, [history, id]);

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
                            getOptionSelected={ option => option.type === getValues('document').type }
                            label={ formLabels.document }
                            error={ !!errors.document }
                            required
                        />
                    }
                    name="document"
                    control={ control }
                    rules={ { required: true } }
                />
            </FormDialog>
        </Box>
    )
});

export default DocumentButton;
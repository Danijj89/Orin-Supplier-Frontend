import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useForm } from 'react-hook-form';
import { documentObjectTypesOptions } from '../shared/constants.js';
import { useDispatch } from 'react-redux';
import { cleanNewDocument } from '../documents/duck/slice.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';

const {
    buttonLabel,
    dialogTitleLabel,
    submitButtonLabel,
    formLabels
} = LANGUAGE.shipment.shipment.documentButton;

const DocumentButton = React.memo(function DocumentButton() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    const { control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            document: documentObjectTypesOptions[0]
        }
    });

    const onEdit = useCallback(() => setIsEdit(true), []);
    const onCancel = useCallback(() => setIsEdit(false), []);

    const onSubmit = useCallback((data) => {
        dispatch(cleanNewDocument());
        switch (data.document.type) {
            case 'CI':
                history.push(`/home/documents/ci/new?shipment=${ id }`);
                break;
            case 'PL':
                history.push(`/home/documents/pl/new?shipment=${ id }`);
                break;
            case 'SC':
                history.push(`/home/documents/sc/new?step=details&shipment=${ id }`);
                break;
            default:
                history.push('/home/shipments');
        }
    }, [dispatch, history, id]);

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
                <RHFAutoComplete
                    rhfControl={ control }
                    name="document"
                    label={ formLabels.document }
                    options={ documentObjectTypesOptions }
                    getOptionLabel={ option => option.name }
                    getOptionSelected={ (option, value) => option.type === value.type }
                    error={ !!errors.document }
                    required
                />
            </FormDialog>
        </Box>
    )
});

export default DocumentButton;
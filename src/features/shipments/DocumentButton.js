import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { cleanNewDocument } from '../documents/duck/slice.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import { selectDocumentTypes, selectSessionUserId } from '../../app/duck/selectors.js';
import { getOptionLabel } from '../../app/utils/options/getters.js';
import { SHIPMENT } from '../admin/utils/resources.js';
import { CREATE_ANY, CREATE_OWN } from '../admin/utils/actions.js';
import Permission from '../shared/components/Permission.js';
import { selectShipmentOwnerById } from './duck/selectors.js';
import { isShipmentOwner } from '../admin/utils/resourceOwnerCheckers.js';

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
    const documentTypeOptions = useSelector(selectDocumentTypes);
    const shipmentOwner = useSelector(state => selectShipmentOwnerById(state, { shipmentId: id }));
    const sessionUserId = useSelector(selectSessionUserId);
    const [isEdit, setIsEdit] = useState(false);

    const { control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            document: documentTypeOptions[0]
        }
    });

    const onEdit = useCallback(() => setIsEdit(true), []);
    const onCancel = useCallback(() => setIsEdit(false), []);

    const onSubmit = useCallback((data) => {
        dispatch(cleanNewDocument());
        switch (data.document.id) {
            case 'CI':
                history.push(`/home/documents/ci/new?step=details&shipment=${ id }`);
                break;
            case 'PL':
                history.push(`/home/documents/pl/new?step=details&shipment=${ id }`);
                break;
            case 'SC':
                history.push(`/home/documents/sc/new?step=details&shipment=${ id }`);
                break;
            case 'CE':
                history.push(`/home/documents/ce/new?step=details&shipment=${ id }`);
                break;
            default:
                history.push('/home/shipments');
        }
    }, [dispatch, history, id]);

    return (
        <Permission
            resource={ SHIPMENT }
            action={ [CREATE_ANY, CREATE_OWN] }
            isOwner={ isShipmentOwner(sessionUserId, shipmentOwner) }
        >
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
                    options={ documentTypeOptions }
                    getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                    getOptionSelected={ (option, value) => option.id === value.id }
                    error={ !!errors.document }
                    required
                />
            </FormDialog>
        </Permission>
    )
});

export default DocumentButton;
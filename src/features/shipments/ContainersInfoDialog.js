import React, { useEffect, useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import FormDialog from '../shared/wrappers/FormDialog.js';
import { LANGUAGE } from 'app/utils/constants.js';
import ContainerSelectorTable from './ContainerSelectorTable.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectDefaultContainerRowItem } from 'app/duck/selectors.js';
import { updateShipment } from './duck/thunks.js';

const {
    titles,
    buttons
} = LANGUAGE.shipment.editShipment;

const ContainerSelectorButton = React.memo(function ContainerSelectorButton({ shipmentId, containerQ, className }) {
    const dispatch = useDispatch();
    const defaultContainerRowItem = useSelector(selectDefaultContainerRowItem);
    const initialContainers = useMemo(
        () => containerQ || [defaultContainerRowItem],
    [containerQ, defaultContainerRowItem]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [containers, setContainers] = useState(initialContainers);

    useEffect(() => {
        setContainers(initialContainers);
    }, [initialContainers]);

    const onButtonClick = () => setIsDialogOpen(true);
    const onCancel = () => {
        setContainers(initialContainers)
        setIsDialogOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateShipment({ shipmentId, update: { containerQ: containers } }));
        setContainers(initialContainers);
        setIsDialogOpen(false);
    };

    return (
        <Box className={ className }>
            <ThemedButton variant="outlined" onClick={ onButtonClick }>
                { buttons.containers }
            </ThemedButton>
            <FormDialog
                onSubmit={ onSubmit }
                onCancel={ onCancel }
                isOpen={ isDialogOpen }
                titleLabel={ titles.containers }
                submitLabel={ buttons.containersSubmit }
            >
                <ContainerSelectorTable
                    containers={ containers }
                    setContainers={ setContainers }
                />
            </FormDialog>
        </Box>
    )
});

export default ContainerSelectorButton;
import React, { useEffect } from 'react';
import RHFConsolidationTable from '../shared/rhf/forms/RHFConsolidationTable.js';
import { useForm } from 'react-hook-form';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { updateShipmentConsolidation } from './duck/thunks.js';

const consolidationTableFieldNames = {
    custom1: 'coCustom1',
    custom2: 'coCustom2',
    package: 'coPackage',
    netWeight: 'coNetWeight',
    grossWeight: 'coGrossWeight',
    dimension: 'coDimension',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: 'items'
};

const {
    submitButtonLabel
} = LANGUAGE.shipment.editShipment.consolidationTable;

const ShipmentConsolidationTable = React.memo(function ShipmentConsolidationTable({ shipment }) {
    const dispatch = useDispatch();

    const { register, control, errors, setValue, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [consolidationTableFieldNames.custom1]: shipment.coCustom1,
            [consolidationTableFieldNames.custom2]: shipment.coCustom2,
            [consolidationTableFieldNames.package]: shipment.coPackage,
            [consolidationTableFieldNames.netWeight]: shipment.coNetWeight,
            [consolidationTableFieldNames.grossWeight]: shipment.coGrossWeight,
            [consolidationTableFieldNames.dimension]: shipment.coDimension,
            [consolidationTableFieldNames.measurementUnit]: shipment.measurementUnit,
            [consolidationTableFieldNames.weightUnit]: shipment.weightUnit,
            [consolidationTableFieldNames.items]: shipment.coItems || []
        }
    });

    useEffect(() => {
        register({ name: consolidationTableFieldNames.custom1 });
        register({ name: consolidationTableFieldNames.custom2 });
        register({ name: consolidationTableFieldNames.package });
        register({ name: consolidationTableFieldNames.netWeight });
        register({ name: consolidationTableFieldNames.grossWeight });
        register({ name: consolidationTableFieldNames.dimension });
        register({ name: consolidationTableFieldNames.items });
    }, [register]);

    const onSubmit = (data) =>
        dispatch(updateShipmentConsolidation({ id: shipment._id, update: data}));

    return (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <RHFConsolidationTable
                rhfRegister={ register }
                rhfControl={ control }
                rhfSetValue={ setValue }
                rhfGetValues={ getValues }
                rhfErrors={ errors }
                fieldNames={ consolidationTableFieldNames }
            />
            <ThemedButton type="submit">{ submitButtonLabel }</ThemedButton>
        </form>

    )
});

export default ShipmentConsolidationTable;
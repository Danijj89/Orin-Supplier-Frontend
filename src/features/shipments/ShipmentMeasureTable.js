import React, { useEffect } from 'react';
import RHFMeasureTable, { validateItemMeasures } from '../shared/rhf/forms/RHFMeasureTable.js';
import { useForm } from 'react-hook-form';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { updateShipmentMeasures } from './duck/thunks.js';
import { measureTableItemsToItems } from '../shared/utils/entityConversion.js';

const measureTableFieldNames = {
    custom1: 'plCustom1',
    custom2: 'plCustom2',
    package: 'package',
    netWeight: 'netWeight',
    grossWeight: 'grossWeight',
    dimension: 'dimension',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: 'items'
};

const {
    submitButtonLabel
} = LANGUAGE.shipment.editShipment.measureTable;

const ShipmentMeasureTable = React.memo(function ShipmentMeasureTable({ shipment }) {
    const dispatch = useDispatch();
    const { register, control, errors, setValue, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [measureTableFieldNames.items]: shipment.items,
            [measureTableFieldNames.measurementUnit]: shipment.measurementUnit,
            [measureTableFieldNames.weightUnit]: shipment.weightUnit,
            [measureTableFieldNames.package]: shipment.package,
            [measureTableFieldNames.netWeight]: shipment.netWeight,
            [measureTableFieldNames.grossWeight]: shipment.grossWeight,
            [measureTableFieldNames.dimension]: shipment.dimension,
            [measureTableFieldNames.custom1]: shipment.plCustom1,
            [measureTableFieldNames.custom2]: shipment.plCustom2
        }
    });

    useEffect(() => {
        register({ name: measureTableFieldNames.items }, { validate: validateItemMeasures });
        register({ name: measureTableFieldNames.custom1 });
        register({ name: measureTableFieldNames.custom2 });
        register({ name: measureTableFieldNames.package });
        register({ name: measureTableFieldNames.netWeight });
        register({ name: measureTableFieldNames.grossWeight });
        register({ name: measureTableFieldNames.dimension });
        register({ name: measureTableFieldNames.dimension });
    }, [register]);

    const onSubmit = (data) => {
        data.items = measureTableItemsToItems(data.items);
        dispatch(updateShipmentMeasures({ id: shipment._id, update: data }));
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
            <RHFMeasureTable
                rhfRegister={ register }
                rhfControl={ control }
                rhfGetValues={ getValues }
                rhfSetValue={ setValue }
                rhfErrors={ errors }
                fieldNames={ measureTableFieldNames }
            />
            <ThemedButton type="submit">{ submitButtonLabel }</ThemedButton>
        </form>

    )
});

export default ShipmentMeasureTable;
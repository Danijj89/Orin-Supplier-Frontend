import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RHFMeasureTable, {
    validateItemMeasures,
} from '../shared/rhf/forms/RHFMeasureTable.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateShipment } from './duck/thunks.js';
import { tableItemsToItems } from '../shared/utils/entityConversion.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router-dom';
import { selectShipmentById } from './duck/selectors.js';
import { getOptionId } from 'app/utils/options/getters.js';
import Footer from '../shared/components/Footer.js';
import { getShipmentURL } from 'features/shipments/utils/urls.js';

const measureTableFieldNames = {
    custom1: 'plCustom1',
    custom2: 'plCustom2',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: 'items',
    marks: 'marks',
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(3),
        marginBottom: theme.spacing(10),
    },
}));

const {
    submitButtonLabel,
    cancelButtonLabel,
} = LANGUAGE.shipment.editShipment.measureTable;

const ShipmentMeasureTable = React.memo(function ShipmentMeasureTable({
    onCancel,
}) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();
    const shipment = useSelector((state) =>
        selectShipmentById(state, { shipmentId })
    );

    const {
        register,
        control,
        errors,
        setValue,
        getValues,
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [measureTableFieldNames.items]: shipment.items,
            [measureTableFieldNames.measurementUnit]: shipment.measurementUnit,
            [measureTableFieldNames.weightUnit]: shipment.weightUnit,
            [measureTableFieldNames.custom1]: shipment.plCustom1,
            [measureTableFieldNames.custom2]: shipment.plCustom2,
            [measureTableFieldNames.marks]: shipment.marks,
        },
    });

    useEffect(() => {
        register({ name: measureTableFieldNames.items }, { validate: validateItemMeasures });
        register({ name: measureTableFieldNames.custom1 });
        register({ name: measureTableFieldNames.custom2 });
    }, [register]);

    const onSubmit = useCallback(data => {
        data.items = tableItemsToItems(data.items);
        data.weightUnit = getOptionId(data.weightUnit);
        data.measurementUnit = getOptionId(data.measurementUnit);
        dispatch(updateShipment({ shipmentId, update: data }));
        history.push(getShipmentURL(shipmentId));
    }, [history, dispatch, shipmentId]);

    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <RHFMeasureTable
                    rhfControl={control}
                    rhfGetValues={getValues}
                    rhfSetValue={setValue}
                    rhfErrors={errors}
                    fieldNames={measureTableFieldNames}
                    className={classes.card}
                />
                <Footer
                    prevLabel={cancelButtonLabel}
                    nextLabel={submitButtonLabel}
                    onPrevClick={onCancel}
                    nextButtonType="submit"
                />
            </form>
        </Paper>
    );
});

export default ShipmentMeasureTable;

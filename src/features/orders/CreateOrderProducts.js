import React, { useCallback, useEffect } from 'react';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import Footer from '../shared/components/Footer.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addressToDocAddress, productTableItemsToOrderItems } from '../shared/utils/entityConversion.js';
import { createOrder } from './duck/thunks.js';
import { getOptionId } from 'app/utils/options/getters.js';

const {
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.order.createOrder.createOrderProducts;


const productTableFieldNames = {
    custom1: 'custom1',
    custom2: 'custom2',
    currency: 'currency',
    items: 'items',
    saveItems: 'saveItems',
    marks: 'marks'
};

const CreateOrderProducts = React.memo(function CreateOrderProducts({ order, setOrder }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const { register, control, errors, setValue, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [productTableFieldNames.currency]: order.currency,
            [productTableFieldNames.items]: order.items,
            [productTableFieldNames.custom1]: order.custom1,
            [productTableFieldNames.custom2]: order.custom2,
            [productTableFieldNames.marks]: order.marks,
            [productTableFieldNames.saveItems]: order.saveItems,
        }
    });

    useEffect(() => {
        register({ name: productTableFieldNames.items }, { validate: validateItems });
        register({ name: productTableFieldNames.custom1 });
        register({ name: productTableFieldNames.custom2 });
    }, [register]);

    const onPrevClick = () => {
        setOrder(prev => ({ ...prev, ...getValues() }));
        history.push('/home/orders/new?step=details');
    };

    const onSubmit = useCallback(data => {
        const actualData = { ...order, ...data };
        actualData.fromAdd = addressToDocAddress(actualData.fromAdd);
        actualData.toAdd = addressToDocAddress(actualData.toAdd);
        if (actualData.shipAdd) actualData.shipAdd = addressToDocAddress(actualData.shipAdd);
        if (actualData.del) actualData.del = getOptionId(actualData.del);
        actualData.currency = getOptionId(actualData.currency);
        actualData.to = actualData.to._id;
        actualData.items = productTableItemsToOrderItems(actualData.items);
        actualData.createdBy = order.createdBy
        dispatch(createOrder({ data: actualData }));
    }, [dispatch, order]);

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <RHFProductTable
                rhfRegister={ register }
                rhfErrors={ errors }
                rhfControl={ control }
                rhfSetValue={ setValue }
                rhfGetValues={ getValues }
                fieldNames={ productTableFieldNames }
            />
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                nextButtonType="submit"
            />
        </form>
    )
});

export default CreateOrderProducts;
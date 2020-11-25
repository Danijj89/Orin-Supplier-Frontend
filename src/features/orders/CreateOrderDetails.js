import React from 'react';
import RHFOrderDetails from '../shared/rhf/forms/RHFOrderDetails.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';
import Footer from '../shared/components/Footer.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { cleanNewOrder } from './duck/slice.js';
import { useHistory } from 'react-router-dom';

const {
    prevButtonLabel,
    nextButtonLabel
} = LANGUAGE.order.createOrder.createOrderDetails;

const orderDetailsFieldNames = {
    ref: 'ref',
    date: 'date',
    fromAdd: 'fromAdd',
    to: 'to',
    toAdd: 'toAdd',
    crd: 'crd',
    incoterm: 'incoterm',
    pay: 'pay',
    clientRef: 'clientRef',
    notes: 'notes',
    shipAdd: 'shipAdd',
    del: 'del',
    pol: 'pol',
    pod: 'pod',
    carrier: 'carrier',
    autoGenerateRef: 'autoGenerateRef'
};

const CreateOrderDetails = React.memo(function CreateOrderDetails({ order, setOrder }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const companyPorts = useSelector(selectCompanyPorts);
    const clientsMap = useSelector(selectClientsMap);

    const { register, control, errors, setValue, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [orderDetailsFieldNames.ref]: !order.autoGenerateRef ? order.ref : null,
            from: order.from,
            [orderDetailsFieldNames.fromAdd]: order.fromAdd,
            [orderDetailsFieldNames.to]: order.to || null,
            [orderDetailsFieldNames.toAdd]: order.toAdd || null,
            [orderDetailsFieldNames.date]: new Date(order.date),
            [orderDetailsFieldNames.crd]: order.crd ? new Date(order.crd) : null,
            [orderDetailsFieldNames.incoterm]: order.incoterm || null,
            [orderDetailsFieldNames.pay]: order.pay,
            [orderDetailsFieldNames.clientRef]: order.clientRef,
            [orderDetailsFieldNames.notes]: order.notes,
            [orderDetailsFieldNames.shipAdd]: order.shipAdd || null,
            [orderDetailsFieldNames.pol]: order.pol || null,
            [orderDetailsFieldNames.pod]: order.pod || null,
            [orderDetailsFieldNames.del]: order.del,
            [orderDetailsFieldNames.carrier]: order.carrier,
            [orderDetailsFieldNames.autoGenerateRef]: order.autoGenerateRef,
            createdBy: order.createdBy
        }
    });

    const onPrevClick = () => {
        dispatch(cleanNewOrder());
        history.push('/home/orders');
    };

    const onNextClick = (data) => {
        setOrder(prev => ({...prev, ...data }));
        history.push('/home/orders/new?step=products');
    };

    return (
        <form onSubmit={handleSubmit(onNextClick)} autoComplete="off" noValidate>
            <RHFOrderDetails
                rhfRegister={ register }
                rhfErrors={ errors }
                rhfControl={ control }
                rhfGetValues={ getValues }
                rhfSetValue={ setValue }
                companyAddresses={ companyAddresses }
                companyPorts={ companyPorts }
                clientsMap={ clientsMap }
                fieldNames={ orderDetailsFieldNames }
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

export default CreateOrderDetails;
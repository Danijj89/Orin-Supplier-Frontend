import React, { useMemo } from 'react';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { dateToLocaleDate, formatAddress, formatCurrency } from '../shared/utils/format.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { useSelector } from 'react-redux';
import { selectUserById } from 'features/home/duck/users/selectors.js';
import EditOrderDetailsButton from './EditOrderDetailsButton.js';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import { selectOrderById } from './duck/selectors.js';
import { useParams } from 'react-router-dom';
import { selectItemUnitsMap } from '../../app/duck/selectors.js';

const {
    titleLabel,
    orderReferenceLabel,
    companyLabel,
    dateLabel,
    crdLabel,
    incotermLabel,
    quantityLabel,
    clientReferenceLabel,
    clientLabel,
    authorLabel,
    realCrdLabel,
    paymentMethodLabel,
    totalLabel
} = LANGUAGE.order.order.orderDetails.detailsInfoCard;

export default function DetailsInfoCard() {
    const { id: orderId } = useParams();
    const order = useSelector(state => selectOrderById(state, { orderId }));
    const createdBy = useSelector(state => selectUserById(state, order.createdBy));
    const itemUnitsMap = useSelector(selectItemUnitsMap);

    const leftData = useMemo(() => [
        { label: orderReferenceLabel, value: order.ref },
        { label: companyLabel, value: formatAddress(order.fromAdd) },
        { label: dateLabel, value: dateToLocaleDate(order.date) },
        { label: crdLabel, value: dateToLocaleDate(order.crd) },
        { label: incotermLabel, value: order.incoterm },
        { label: quantityLabel, value: UnitCounter.stringRep(order.totalQ, itemUnitsMap, LOCALE) }
    ], [order.ref, order.fromAdd, order.date, order.crd, order.incoterm, order.totalQ, itemUnitsMap]);

    const rightData = useMemo(() => [
        { label: clientReferenceLabel, value: order.clientRef },
        { label: clientLabel, value: formatAddress(order.toAdd) },
        { label: authorLabel, value: createdBy.name },
        { label: realCrdLabel, value: dateToLocaleDate(order.realCrd) },
        { label: paymentMethodLabel, value: order.pay },
        { label: totalLabel, value: formatCurrency(order.currency, order.totalA) }
    ], [order.clientRef, order.toAdd, order.realCrd, order.pay, order.currency, order.totalA, createdBy.name]);

    return (
        <InfoCard
            title={ titleLabel }
            button={ <EditOrderDetailsButton order={ order }/> }
            content={
                <Grid container>
                    <Grid container item md={ 6 }>
                        <DividerDataDisplay data={ leftData }/>
                    </Grid>
                    <Grid container item md={ 6 }>
                        <DividerDataDisplay data={ rightData }/>
                    </Grid>
                </Grid>
            }
        />
    )
}
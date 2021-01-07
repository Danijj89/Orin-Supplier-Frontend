import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { dateToLocaleDate, formatAddress, formatCurrency, formatItemsTotalQuantities } from '../shared/utils/format.js';
import { useSelector } from 'react-redux';
import { selectUserById } from 'features/home/duck/users/selectors.js';
import EditOrderDetailsButton from './EditOrderDetailsButton.js';
import { Grid } from '@material-ui/core';
import DividerDataDisplay from '../shared/wrappers/DividerDisplay.js';
import { selectItemUnitsMap } from 'app/duck/selectors.js';
import { getItemsData } from 'features/shared/utils/reducers.js';

const {
    titles,
    labels
} = LANGUAGE.order.order;

const DetailsInfoCard = React.memo(function DetailsInfoCard({ order }) {
    const createdBy = useSelector(state => selectUserById(state, order.createdBy));
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const { quantity, total } = getItemsData(order.items);

    const leftData = useMemo(() => [
        { label: labels.orderReference, value: order.ref },
        { label: labels.company, value: formatAddress(order.fromAdd) },
        { label: labels.date, value: dateToLocaleDate(order.date) },
        { label: labels.crd, value: dateToLocaleDate(order.crd) },
        { label: labels.incoterm, value: order.incoterm },
        { label: labels.quantity, value: formatItemsTotalQuantities(quantity, itemUnitsMap, LOCALE) }
    ], [order.ref, order.fromAdd, order.date, order.crd, order.incoterm, quantity, itemUnitsMap]);

    const rightData = useMemo(() => [
        { label: labels.clientReference, value: order.clientRef },
        { label: labels.client, value: formatAddress(order.toAdd) },
        { label: labels.author, value: createdBy.name },
        { label: labels.realCrd, value: dateToLocaleDate(order.realCrd) },
        { label: labels.paymentMethod, value: order.pay },
        { label: labels.total, value: formatCurrency(total, order.currency) }
    ], [order.clientRef, order.toAdd, order.realCrd, order.pay, order.currency, total, createdBy.name]);

    const tools = useMemo(() => [
        <EditOrderDetailsButton order={ order }/>
    ], [order]);

    return (
        <InfoCard
            title={ titles.details }
            tools={ tools }
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
    );
});

DetailsInfoCard.propTypes = {
    order: PropTypes.object.isRequired
};

export default DetailsInfoCard;
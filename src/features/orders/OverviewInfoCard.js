import React from 'react';
import { LANGUAGE } from '../../app/constants.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { formatAddress } from '../shared/utils/format.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { useSelector } from 'react-redux';
import { selectUserById } from '../users/duck/selectors.js';
import { getCurrencySymbol } from '../shared/utils/random.js';
import EditOrderDetailsButton from './EditOrderDetailsButton.js';

const {
    titleLabel,
    leftLabels,
    rightLabels
} = LANGUAGE.order.order.orderInfoCards.overviewInfoCard;

export default function OverviewInfoCard({ order }) {
    const createdBy = useSelector(state => selectUserById(state, order.createdBy));

    const leftData = [
        order.ref,
        formatAddress(order.fromAdd),
        order.date,
        order.crd,
        order.incoterm,
        UnitCounter.stringRep(order.totalQ)
    ];

    const rightData = [
        order.clientRef,
        formatAddress(order.toAdd),
        createdBy?.name,
        order.realCrd,
        order.pay,
        `${ getCurrencySymbol(order.currency) } ${ order.totalA }`
    ];

    return (
        <InfoCard
            title={ titleLabel }
            button={ <EditOrderDetailsButton order={ order }/> }
            content={
                <ColumnInfoDisplay
                    leftLabels={ leftLabels }
                    leftData={ leftData }
                    rightLabels={ rightLabels }
                    rightData={ rightData }
                />
            }
        />
    )
}
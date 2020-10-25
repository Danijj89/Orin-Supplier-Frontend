import React from 'react';
import { LANGUAGE } from '../../app/constants.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import ColumnInfoDisplay from '../shared/wrappers/ColumnInfoDisplay.js';
import { dateToLocaleDate, formatAddress, formatCurrency } from '../shared/utils/format.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { useSelector } from 'react-redux';
import { selectUserById } from '../users/duck/selectors.js';
import EditOrderDetailsButton from './EditOrderDetailsButton.js';

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
} = LANGUAGE.order.order.orderInfoCards.detailsInfoCard;

export default function DetailsInfoCard({ order }) {
    const createdBy = useSelector(state => selectUserById(state, order.createdBy));

    const columns = [
        [
            { label: orderReferenceLabel, value: order.ref },
            { label: companyLabel, value: formatAddress(order.fromAdd) },
            { label: dateLabel, value: order.date },
            { label: crdLabel, value: dateToLocaleDate(order.crd) },
            { label: incotermLabel, value: order.incoterm },
            { label: quantityLabel, value: UnitCounter.stringRep(order.totalQ) }
        ],
        [
            { label: clientReferenceLabel, value: order.clientRef },
            { label: clientLabel, value: formatAddress(order.toAdd) },
            { label: authorLabel, value: createdBy?.name },
            { label: realCrdLabel, value: dateToLocaleDate(order.realCrd) },
            { label: paymentMethodLabel, value: order.pay },
            { label: totalLabel, value: formatCurrency(order.currency, order.totalA) }
        ]
    ];

    return (
        <InfoCard
            title={ titleLabel }
            button={ <EditOrderDetailsButton order={ order }/> }
            content={
                <ColumnInfoDisplay
                    columns={ columns }
                />
            }
        />
    )
}
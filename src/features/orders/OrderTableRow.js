import React, { useEffect } from 'react';
import { getStringFromTotalQuantityObject, yymmddToLocaleDate } from './helpers.js';

export default function OrderTableRow({ order }) {
    const { status, poRef, totalQ, crd, from, remarks } = order;
    const renderedTotalQuantity = getStringFromTotalQuantityObject(totalQ);

    useEffect(() => {
        console.log(order);
    })

    return (
        <tr>
            <td>{status}</td>
            <td>{poRef}</td>
            <td>{renderedTotalQuantity}</td>
            <td>{yymmddToLocaleDate(crd)}</td>
            <td>{from.name}</td>
            <td>{remarks}</td>
        </tr>
    )
}
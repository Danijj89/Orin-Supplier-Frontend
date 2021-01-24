import { getOptionId } from 'app/utils/options/getters.js';
import { useState } from 'react';

export default function useExportData(items) {
    const totalQuantity = {};
    const totalAmount = {};

    items.forEach(item => {
        const { quantity, unit, currency, total } = item;
        const unitId = getOptionId(unit);
        const currencyId = getOptionId(currency);
        if (totalQuantity.hasOwnProperty(unitId)) totalQuantity[unitId] += quantity;
        else totalQuantity[unitId] = quantity;
        if (totalAmount.hasOwnProperty(currencyId)) totalAmount[currencyId] += total;
        else totalAmount[currencyId] = total;
    });

    return useState({
        quantity: totalQuantity,
        totalAmount
    });
}
import { useState } from 'react';
import { getOptionId } from 'app/utils/options/getters.js';

export default function useItemsData(items) {
    const totalQuantity = {};
    let totalAmount = 0;

    items.forEach(item => {
        const { quantity, unit, total } = item;
        const unitId = getOptionId(unit);
        totalAmount += total;
        if (totalQuantity.hasOwnProperty(unitId)) totalQuantity[unitId] += quantity;
        else totalQuantity[unitId] = quantity;
    });

    return useState({
        quantity: totalQuantity,
        total: totalAmount
    });
}
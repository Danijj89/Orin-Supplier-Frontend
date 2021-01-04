import { roundToNDecimal } from 'features/shared/utils/format.js';

export function getItemsData(items) {
    const totalQuantity = {};
    let totalAmount = 0;
    for (const item of items) {
        const { quantity, unit, total } = item;
        if (totalQuantity.hasOwnProperty(unit)) totalQuantity[unit] += quantity;
        else totalQuantity[unit] = quantity;
        totalAmount += total;
    }
    return {
        quantity: totalQuantity,
        total: roundToNDecimal(totalAmount, 2)
    };
}
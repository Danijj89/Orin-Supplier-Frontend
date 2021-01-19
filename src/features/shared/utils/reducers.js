import { roundToNDecimal } from 'features/shared/utils/format.js';
import { getOptionId } from 'app/utils/options/getters.js';

export function getItemsData(items) {
    const totalQuantity = {};
    let totalAmount = 0;
    for (const item of items) {
        const { quantity, unit, total } = item;
        const unitId = getOptionId(unit);
        if (totalQuantity.hasOwnProperty(unitId)) totalQuantity[unitId] += quantity;
        else totalQuantity[unitId] = quantity;
        totalAmount += total;
    }
    return {
        quantity: totalQuantity,
        total: roundToNDecimal(totalAmount, 2)
    };
}
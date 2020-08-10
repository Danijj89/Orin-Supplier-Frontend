import { roundTo2Decimal } from '../../shared/utils.js';

export const onUnitPriceChange = (state, action) => {
    const { rowIdx, colIdx, val } = action.payload;
    const { rows } = state.newOrder.orderProductInfo;

    const oldAmount = rows[rowIdx][7];
    state.newOrder.orderProductInfo.totalAmount -= oldAmount;
    // update to new value
    rows[rowIdx][colIdx] = Number(val);

    const quantity = rows[rowIdx][4];
    const uniPriceAfterUpdate = rows[rowIdx][colIdx];
    // update amount
    rows[rowIdx][7] =
        roundTo2Decimal( quantity * uniPriceAfterUpdate);
    const newAmount = rows[rowIdx][7];
    state.newOrder.orderProductInfo.totalAmount += newAmount;
}

export const onUnitChange = (state, action) => {
    const { rowIdx, colIdx, val } = action.payload;
    const { rows, totalPieces } = state.newOrder.orderProductInfo;

    const quantity = rows[rowIdx][4];
    const oldUnit = rows[rowIdx][colIdx];
    totalPieces[oldUnit] -= quantity;
    // update to new value
    rows[rowIdx][colIdx] = val;

    const newUnit = rows[rowIdx][colIdx];
    // Check if this new unit was present before
    if (!totalPieces[newUnit]) {
        totalPieces[newUnit] = quantity;
    } else {
        totalPieces[newUnit] += quantity;
    }
}

export const onQuantityChange = (state, action) => {
    const { rowIdx, colIdx, val } = action.payload;
    const { rows, totalPieces } = state.newOrder.orderProductInfo;

    const oldAmount = rows[rowIdx][7];
    state.newOrder.orderProductInfo.totalAmount -= oldAmount;

    const oldQuantity = rows[rowIdx][colIdx];
    const unit = rows[rowIdx][5];
    totalPieces[unit] -= oldQuantity;

    // update to new value
    rows[rowIdx][colIdx] = Number(val);

    const newQuantity = rows[rowIdx][colIdx];
    const unitPrice = rows[rowIdx][6];
    // update amount
    rows[rowIdx][7] =
        roundTo2Decimal( newQuantity * unitPrice);
    const newAmount = rows[rowIdx][7];
    state.newOrder.orderProductInfo.totalAmount += newAmount;
    // update total pieces
    totalPieces[unit] += newQuantity;
}
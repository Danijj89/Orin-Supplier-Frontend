import { itemUnitsOptions, packageUnitsOptions } from '../../shared/constants.js';

export const defaultShipmentRowValues = {
    _id: null,
    ref: '',
    description: '',
    ciCustom1: null,
    ciCustom2: null,
    quantity: 0,
    unit: itemUnitsOptions[0],
    price: 0,
    total: 0,
    package: 0,
    pUnit: packageUnitsOptions[0],
    netW: 0,
    grossW: 0,
    dim: 0,
    plCustom1: null,
    plCustom2: null,
};
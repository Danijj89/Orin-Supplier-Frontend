import { itemUnitsOptions, packageUnitsOptions } from '../../shared/constants.js';

export const defaultShipmentRowValues = {
    _id: null,
    ref: '',
    description: '',
    quantity: 0,
    unit: itemUnitsOptions[0],
    price: 0,
    total: 0,
    package: 0,
    pUnit: packageUnitsOptions[0],
    custom1: '',
    custom2: '',
};
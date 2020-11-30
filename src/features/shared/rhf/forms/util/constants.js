import { packageUnitsOptions } from '../../../../../app/utils/options/options.js';

export const defaultProductRowValues = {
    _id: null,
    product: null,
    order: null,
    ref: '',
    description: '',
    localD: '',
    hsc: '',
    quantity: 0,
    unit: 'PCS',
    price: 0,
    total: 0,
    package: 0,
    pUnit: packageUnitsOptions[0],
    netW: 0,
    grossW: 0,
    dim: 0,
    ciCustom1: '',
    ciCustom2: '',
    plCustom1: '',
    plCustom2: ''
};
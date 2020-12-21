import { getOptionId } from '../../../app/utils/options/getters.js';

export function getCurrencySymbol(currency) {
    switch (getOptionId(currency)) {
        case 'USD': return '$';
        case 'EUR': return '€';
        case 'CNY': return '¥';
        default: return '';
    }
}





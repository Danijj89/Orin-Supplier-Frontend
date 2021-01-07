import { getOptionId } from 'app/utils/options/getters.js';

export function getCurrencySymbol(currency) {
    const currencyId = typeof currency === 'string' ? currency : getOptionId(currency);
    switch (currencyId) {
        case 'USD': return '$';
        case 'EUR': return '€';
        case 'CNY': return '¥';
        default: return '';
    }
}





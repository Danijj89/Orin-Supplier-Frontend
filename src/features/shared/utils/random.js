
export function getCurrencySymbol(currency) {
    switch (currency) {
        case 'USD': return '$';
        case 'EUR': return '€';
        case 'CNY': return '¥';
        default: return '';
    }
}





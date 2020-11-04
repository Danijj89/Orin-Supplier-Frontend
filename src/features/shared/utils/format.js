import { LOCALE } from '../../../app/constants.js';
import { getCurrencySymbol } from './random.js';

export function dateToLocaleDate(date) {
    if (!date) return null;
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleString(LOCALE, dateOptions);
}

export function dateToYYMMDD(dateString) {
    return dateString.substr(0, 10);
}

export function roundToNDecimal(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

export function formatAddress(address) {
    return address.name + '\n'
        + address.address + '\n'
        + (address.address2 && address.address2 + '\n')
            + (address.city && address.city + ', ' )
        + (address.zip && address.zip + ' ' )
        + (address.administrative && address.administrative + ' ' )
        + address.country;
}

export function formatCurrency(currency, value) {
    return `${ getCurrencySymbol(currency) } ${ value }`;
}


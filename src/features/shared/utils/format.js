import { LOCALE } from '../../../constants.js';

export function dateToLocaleDate(date) {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleString(LOCALE, dateOptions);
}

export function dateToYYMMDD(dateString) {
    return dateString.substr(0, 10);
}

export function roundTo2Decimal(n) {
    return Math.round(n * 1e2) / 1e2;
}

export function formatAddress(address) {
    return`${ address.name }\n
        ${ address.address + '\n' }
        ${ address.address2 + '\n' }
        ${ address.city + ' ' }${address.zip + ' '}
        ${address.administrative + ' '}${address.country}`;
}
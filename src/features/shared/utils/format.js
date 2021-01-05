import { LOCALE } from 'app/utils/constants.js';
import { getCurrencySymbol } from './random.js';
import { getOptionLabel } from 'app/utils/options/getters.js';

export function dateToLocaleDate(date) {
    if (!date) return null;
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleString(LOCALE, dateOptions);
}

export function dateToLocaleDatetime(date) {
    if (!date) return null;
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(date).toLocaleString(LOCALE, dateOptions);
}

export function dateToYYMMDD(dateString) {
    return dateString.substr(0, 10);
}

export function roundToNDecimal(num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}

export function formatAddress(address, locale = 'en') {
    return address.name + '\n'
        + address.address + '\n'
        + (address.address2 ? address.address2 + '\n' : '')
        + (address.city && address.city + ', ')
        + (address.zip ? address.zip + ' ' : '')
        + (address.administrative ? address.administrative + ' ' : '')
        + getOptionLabel(address.country, locale);
}

export function formatCurrency(currency, value) {
    return `${ getCurrencySymbol(currency) } ${ value }`;
}

export function formatQuantityWithUnit(quantity, unit) {
    return `${ quantity } ${ getOptionLabel(unit, LOCALE) }`
}

export function formatItemsTotalQuantities(unitObj, unitsMap, locale = 'en') {
    let entries = Object.entries(unitObj);
    if (entries.length > 1) entries = entries.filter(([_, quantity]) => quantity !== 0);
    return entries.map(([unit, quantity]) => `${ quantity } ${ getOptionLabel(unitsMap[unit], locale) }`)
        .join(' + ');
}


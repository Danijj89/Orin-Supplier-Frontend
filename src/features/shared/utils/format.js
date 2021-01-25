import { LOCALE } from 'app/utils/constants.js';
import { getCurrencySymbol } from './random.js';
import { getOptionId, getOptionLabel, getOptionSymbol } from 'app/utils/options/getters.js';

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

export function formatNumberWithDecimal(num, dec) {
    return (Math.round(num * 100) / 100).toFixed(2);
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

export function formatCurrency(value, currency) {
    const currencyId = typeof currency === 'string' ? currency : getOptionId(currency);
    return `${ getCurrencySymbol(currencyId) } ${ formatNumberWithDecimal(value, 2) }`;
}

export function formatQuantityWithUnit(quantity, unit) {
    const label = typeof unit === 'string' ? unit : getOptionLabel(unit, LOCALE);
    return `${ quantity } ${ label }`
}

export function formatItemsTotalQuantities(unitObj, unitsMap, locale = 'en') {
    let entries = Object.entries(unitObj);
    if (entries.length > 1) entries = entries.filter(([_, quantity]) => quantity !== 0);
    return entries.map(([unit, quantity]) => `${ quantity } ${ getOptionLabel(unitsMap[unit], locale) }`)
        .join(' + ');
}

export function formatCurrencyTotalAmount(obj, currencyMap) {
    let entries = Object.entries(obj);
    if (entries.length > 1) entries = entries.filter(([_, quantity]) => quantity !== 0);
    return entries.map(([currency, quantity]) =>
        `${ getOptionSymbol(currencyMap[currency]) } ${ formatNumberWithDecimal(quantity, 2) }`)
        .join(' + ');
}

export function getFulfilledPercentage(fulfilledCount, totalCount) {
    return `${ roundToNDecimal(fulfilledCount / totalCount * 100, 2) }%`;
}


import { LOCALE } from '../../constants.js';

export function roundTo2Decimal(n) {
    return Math.round(n * 1e2) / 1e2;
}

export function getCurrencySymbol(currency) {
    switch (currency) {
        case 'USD': return '$';
        case 'EUR': return '€';
        case 'CNY': return '¥';
        default: return '';
    }
}

export function downloadFile(file, filename) {
    const url = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
}

export function getFileName(doctype, id, author) {
    return `${doctype}_${id}_${author}`;
}

export const getStringFromTotalQuantityObject = (totalQuantity) => {
    return Object.entries(totalQuantity)
        .filter(([key, value], _) => value !== 0)
        .map(([key, value], _) => value === 0 ? '' : `${value} ${key}`)
        .join(' + ');
};
export const dateToLocaleDate = (date) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleString(LOCALE, dateOptions);
}

export const convertDateStringToyymmdd = (dateString) => dateString.substr(0, 10);
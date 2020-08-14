
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
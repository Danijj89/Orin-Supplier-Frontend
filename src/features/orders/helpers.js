
export const getStringFromTotalQuantityObject = (totalQuantity) => {
    return Object.entries(totalQuantity)
        .filter(([key, value], _) => value !== 0)
        .map(([key, value], _) => value === 0 ? '' : `${value} ${key}`)
        .join(' + ');
};

export const yymmddToLocaleDate = (date) => {
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleString('en-EN', dateOptions);
}
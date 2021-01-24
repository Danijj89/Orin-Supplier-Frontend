
export function getOptionId(option) {
    return option?.id;
}

export function getOptionLabel(option, locale = 'en') {
    return option?.label[locale];
}

export function getOptionSymbol(option) {
    return option.symbol;
}

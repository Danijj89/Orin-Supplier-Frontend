import { LOCALE } from 'app/utils/constants.js';

export function getOptionId(option) {
    return option?.id;
}

export function getOptionLabel(option, locale = LOCALE) {
    return option?.label[locale];
}

export function getOptionSymbol(option) {
    return option.symbol;
}

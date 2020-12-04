
export function getOptionId(method) {
    return method?.id;
}

export function getOptionLabel(method, locale = 'en') {
    return method?.label[locale];
}

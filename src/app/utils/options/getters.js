
export const getOptionId = (method) => method?.id;
export function getOptionLabel(method, locale = 'en') {
    return method?.label[locale];
}


export const getOptionId = (method) => method?.id;
export function getOptionLabel(method, lang = 'en') {
    return method.label[lang];
}

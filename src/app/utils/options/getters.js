
export const getDeliveryMethodId = (method) => method.id;
export function getDeliveryMethodLabel(method, lang = 'en') {
    return method.label[lang];
}

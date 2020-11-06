import { LANGUAGE } from '../../../../../app/constants.js';

const {
    errorMessages
} = LANGUAGE.shared.rhf.forms.util.helpers;

export const validateItems = (items) => {
    if (!items.length) return errorMessages.missingItems;
    for (const item of items) {
        if (!(item.ref && item.quantity && item.unit && item.price))
            return errorMessages.missingItemInfo;
    }
    return true;
};
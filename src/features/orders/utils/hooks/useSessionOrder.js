import useSessionStorage from 'features/shared/hooks/useSessionStorage.js';
import { SESSION_NEW_ORDER } from 'app/sessionKeys.js';
import { useSelector } from 'react-redux';
import { selectCompanyDefaultAddress, selectCurrentCompany } from 'features/home/duck/home/selectors.js';
import {
    selectCurrencies,
    selectDefaultRowItem,
    selectDeliveryMethods,
    selectSessionUserId
} from 'app/duck/selectors.js';


export default function useSessionOrder() {
    const company = useSelector(selectCurrentCompany);
    const defaultAddress = useSelector(selectCompanyDefaultAddress);
    const deliveryMethods = useSelector(selectDeliveryMethods);
    const currencies = useSelector(selectCurrencies);
    const sessionUserId = useSelector(selectSessionUserId);
    const defaultRowItem = useSelector(selectDefaultRowItem);

    const initialOrder = {
        from: company._id,
        fromAdd: defaultAddress,
        date: Date.now(),
        del: deliveryMethods[0],
        currency: company.currency || currencies[0],
        createdBy: sessionUserId,
        saveItems: false,
        autoGenerateRef: true,
        items: [defaultRowItem]
    };

    return useSessionStorage(SESSION_NEW_ORDER, initialOrder);
}
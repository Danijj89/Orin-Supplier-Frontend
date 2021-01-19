import { useSelector } from 'react-redux';
import { selectClientsMap } from 'features/clients/duck/selectors.js';
import { selectOrderById } from 'features/orders/duck/selectors.js';

export default function usePopulatedOrder(orderId) {
    const order = useSelector(state => selectOrderById(state, { orderId }));
    const clientsMap = useSelector(selectClientsMap);
    return {
        ...order,
        to: clientsMap[order.to]
    };
};
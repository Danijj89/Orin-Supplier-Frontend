import { useState } from 'react';

export default function useCachedSplitItems(shippingSplits, totalItems) {
    const [value, setValue] = useState(() => {
        const itemsMap = totalItems.reduce((map, item) => {
            map[item._id] = item;
            return map;
        }, {});
        for (const split of shippingSplits) {
            for (const item of split.items) {
                if (itemsMap.hasOwnProperty(item._id))
                    itemsMap[item._id].quantity -= item.quantity;
                else itemsMap[item._id] = -1 * item.quantity;
            }
        }
        return itemsMap;
    });

    return [value, setValue];
}
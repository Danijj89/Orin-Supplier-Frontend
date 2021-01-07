import { useEffect, useState } from 'react';

export default function useUpdatedState(newState) {
    const [value, setValue] = useState(newState);

    useEffect(() => {
        setValue(newState);
    }, [newState]);

    return [value, setValue];
}
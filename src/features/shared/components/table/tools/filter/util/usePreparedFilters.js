import useLocalStorage from 'features/shared/hooks/useLocalStorage.js';

export default function usePreparedFilters(sessionKey, preparedFilters, clearStorage) {
    if (clearStorage) localStorage.removeItem(sessionKey);
    return useLocalStorage(sessionKey, preparedFilters);
}
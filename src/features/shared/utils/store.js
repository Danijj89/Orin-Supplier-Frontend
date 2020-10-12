
export function isLoading(statuses) {
    for (const status of statuses) {
        if (status === 'PENDING') return true;
    }
    return false;
}
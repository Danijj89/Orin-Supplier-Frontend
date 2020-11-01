
export function isLoading(statuses) {
    for (const status of statuses) {
        if (status === 'PENDING') return true;
    }
    return false;
}

export const determineStatus = (statuses) => {
    let isIdle = false;
    const stats = [];
    for (const status of statuses) {
        if (status === 'PENDING') return 'PENDING';
        if (status === 'REJECTED') return 'REJECTED';
        if (status === 'IDLE') isIdle = true ;
        stats.push(status);
    }
    console.log(stats)
    if (isIdle) return 'IDLE';
    return 'FULFILLED';
};
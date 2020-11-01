
export const determineStatus = (statuses) => {
    let isIdle = false;
    for (const status of statuses) {
        if (status === 'PENDING') return 'PENDING';
        if (status === 'REJECTED') return 'REJECTED';
        if (status === 'IDLE') isIdle = true ;
    }
    if (isIdle) return 'PENDING';
    return 'FULFILLED';
};
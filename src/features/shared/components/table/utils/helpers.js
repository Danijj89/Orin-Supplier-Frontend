import { getOptionId } from 'app/utils/options/getters.js';

export function descendingComparator(a, b, orderBy) {
    if (typeof a[orderBy] === 'string' || typeof b[orderBy] === 'string') {
        if (b[orderBy] < a[orderBy]) return -1;
        if (b[orderBy] > a[orderBy]) return 1;
    } else {
        if (getOptionId(b[orderBy]) < getOptionId(a[orderBy])) return -1;
        if (getOptionId(b[orderBy]) > getOptionId(a[orderBy])) return 1;
    }
    return 0;
}

export function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
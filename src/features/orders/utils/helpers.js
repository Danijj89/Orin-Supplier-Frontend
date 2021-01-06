
export function getNextSplitRef(lastRef) {
    const len = lastRef.length;
    const isFirstSplit = lastRef.charAt(len - 2) !== '-';

    if (isFirstSplit) return lastRef + '-A';

    const prefix = lastRef.substring(0, len - 1);
    const currChar = lastRef.charCodeAt(len - 1);
    const nextChar = currChar + 1;
    if (nextChar === 90) return prefix + 'AA';

    return prefix + String.fromCharCode(currChar + 1);
}
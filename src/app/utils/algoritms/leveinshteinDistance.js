export function levenshteinDistance(str1, str2) {
    const width = str1.length + 1;
    const height = str2.length + 1;
    // initialize grid
    const grid = new Array(height).fill(0).map((n, i) => {
        const arr = new Array(width).fill(0);
        if (i === 0) return arr.map((_, i) => i);
        arr[0] = i;
        return arr;
    });
    let replaceCost = 0;
    for (let i = 1; i < height; i++) {
        for (let j = 1; j < width; j++) {
            replaceCost = str1[j - 1] === str2[i - 1] ? grid[i - 1][j - 1] : grid[i - 1][j - 1] + 2;
            grid[i][j] = Math.min(
                grid[i - 1][j] + 1,
                grid[i][j - 1] + 1,
                replaceCost
            )
        }
    }
    return grid[height - 1][width - 1];
}
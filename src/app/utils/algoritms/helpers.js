import { levenshteinDistance } from 'app/utils/algoritms/leveinshteinDistance.js';

export const isWithinPercentageEditDistance = (str1, str2, percentage = 0.8) => {
    const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    const longest = Math.max(str1.length, str2.length);
    return percentage <= ((longest - distance) / longest);
}
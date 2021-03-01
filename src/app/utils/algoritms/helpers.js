import { levenshteinDistance } from 'app/utils/algoritms/leveinshteinDistance.js';

const suffixes = ['inc', 'ltd'];

export const isWithinPercentageEditDistance = (str1, str2, percentage = 0.8) => {
    let pattern;
    let regex;
    let word1 = str1;
    let word2 = str2;
    for (const suffix of suffixes) {
        pattern = "(\\s*" + suffix + "(.*)?)(?!.*" + suffix + ")";
        regex = new RegExp(pattern, 'gi');
        word1 = word1.replace(regex, "");
        word2 = word2.replace(regex, "");
    }
    const distance = levenshteinDistance(word1.toLowerCase(), word2.toLowerCase());
    const longest = Math.max(str1.length, str2.length);
    return percentage <= ((longest - distance) / longest);
}
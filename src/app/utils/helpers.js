export function getCurrentLocale() {
    const locales = navigator.languages === undefined ? [navigator.language] : navigator.languages;
    for (const locale of locales) {
        const curr = locale.split('-');
        if (curr[0] === 'zh' || curr[0] === 'en') return curr[0];
    }
    return 'en';
}
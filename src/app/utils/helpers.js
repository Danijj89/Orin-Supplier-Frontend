import ReactGA from "react-ga";

export function getCurrentLocale() {
    const locales = navigator.languages === undefined ? [navigator.language] : navigator.languages;
    for (const locale of locales) {
        const curr = locale.split('-');
        if (curr[0] === 'zh' || curr[0] === 'en') return curr[0];
    }
    return 'en';
}

export const initGA = () => {
   ReactGA.initialize('UA-45960652-4'); 
}

export const PageView = () => {  
    ReactGA.pageview(window.location.pathname +  
                     window.location.search); 
}

export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  });
};
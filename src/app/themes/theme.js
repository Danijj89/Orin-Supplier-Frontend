import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

let appTheme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins, Helvetica, sans-serif',
    },
    palette: {
        primary: {
            main: '#109CF1' /* Caroline Blue */,
            dark: '#098DE9',
            scuro: '#032B43' /* Prussian Blue */,
        },
        secondary: {
            main: '#FFFFFF',
        },
        tertiary: { grey },
        backgroundPrimary: {
            main: '#FFFFFF',
        },
        backgroundSecondary: {
            main: '#F1F1F1',
        },
        danger: {
            main: '#F45B69' /* Fiery Rose */,
        },
        warning: {
            main: '#FFBA08' /* Selective Yellow */,
        },
        success: {
            main: '#1EAE9B' /* Keppel Green */,
        },
    },
    overrides: {
        MuiInput: {
            root: {
                padding: 0,
            },
        },
    },
});
appTheme = responsiveFontSizes(appTheme);

export default appTheme;

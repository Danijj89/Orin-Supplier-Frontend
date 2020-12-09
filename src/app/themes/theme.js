import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

let appTheme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins, Helvetica, sans-serif',
    },
    palette: {
        primary: {
            main: '#109CF1' /* Caroline Blue */,
            dark: '#098DE9' /* Blue De France */,
            scuro: '#032B43' /* Prussian Blue */,
        },
        secondary: {
            main: '#FFFFFF',
        },
        tertiary: {
            main: '#2A2A2A',
        },
        backgroundPrimary: {
            main: '#FFFFFF',
        },
        backgroundSecondary: {
            main: '#F1F1F1',
        },
        danger: {
            main: '#F45B69' /* Fiery Rose */,
            dark: '#990B16' /* Carmine */,
            light: '#ed6e85' /* Paradise pink */,
        },
        warning: {
            main: '#FFBA08' /* Selective Yellow */,
        },
        success: {
            main: '#1EAE9B' /* Keppel Green */,
            dark: '#12695D' /* Pine Green */,
        },
        black: {
            main: '#2A2A2A' /* Jet Black */,
        },
        grey: {
            main: '#858782' /* Battleship Grey */,
            light: '#D6D7D5' /* Light Grey */,
        },
        white: {
            main: '#FFFFFF',
        },
    },
    overrides: {
        MuiInput: {
            root: {
                padding: 0,
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
            },
        },
        MuiTextField: {
            root: {
                color: 'red',
            },
        },
    },
});
appTheme = responsiveFontSizes(appTheme);

export default appTheme;

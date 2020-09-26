import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

let appTheme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins, Helvetica, sans-serif',
    },
    palette: {
        primary: {
            main: '#109CF1',
            dark: '#098DE9',
        },
        secondary: {
            main: '#FFFFFF',
        },
        tertiary: grey,
        backgroundPrimary: {
            main: '#FFFFFF',
        },
        backgroundSecondary: {
            main: '#F1F1F1',
        },
    },
});
appTheme = responsiveFontSizes(appTheme);

export default appTheme;
import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = {
        paper: '#DEDEDE',
        primaryLight: '#f4f4f4',
        primary200: '#f0f0f0',
        primaryMain: '#E9E9E9',
        primaryDark: '#dcdcdc',
        primary800: '#cccccc',
        secondaryLight: '#3b3b3bcc',
        secondary200: '#fce89c',
        secondaryDark: '#3B3B3B',
        secondaryMain: '#000000',
        secondary800: '#f0cf00',
        successLight: '#b9f6ca',
        success200: '#69f0ae',
        successMain: '#00e676',
        successDark: '#00c853',
        errorLight: '#ef9a9a',
        errorMain: '#f44336',
        errorDark: '#c62828',
        orangeLight: '#fbe9e7',
        orangeMain: '#ffab91',
        orangeDark: '#d84315',
        warningLight: '#fff8e1',
        warningMain: '#ffe57f',
        warningDark: '#ffc107',
        grey50: '#F8FAFC',
        grey100: '#EEF2F6',
        grey200: '#E3E8EF',
        grey300: '#CDD5DF',
        grey500: '#697586',
        grey600: '#4B5565',
        grey700: '#364152',
        grey900: '#121926',
        darkPaper: '#111936',
        darkBackground: '#1a223f',
        darkLevel1: '#29314f',
        darkLevel2: '#212946',
        darkTextTitle: '#d7dcec',
        darkTextPrimary: '#bdc8f0',
        darkTextSecondary: '#8492c4',
        darkPrimaryLight: '#f4f4f4',
        darkPrimaryMain: '#E9E9E9',
        darkPrimaryDark: '#dcdcdc',
        darkPrimary200: '#f0f0f0',
        darkPrimary800: '#cccccc',
        darkSecondaryLight: '#3b3b3bcc',
        darkSecondaryMain: '#F9DF23',
        darkSecondaryDark: '#f5d600',
        darkSecondary200: '#fce89c',
        darkSecondary800: '#f0cf00'
    };
    //
    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        customization
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;

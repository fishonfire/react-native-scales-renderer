import { DefaultTheme, Theme } from '@react-navigation/native'

export const Colors = {
  primary: '#E17000',
  secondary: '#00423C',
  black: '#181d20',
  darkGrey: '#3a4044',
  grey: '#8C8D8F',
  lightGrey: '#EEEEEE',
  white: '#ffffff',
  text: '#181d20',
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    heavy: 'System',
  },
}

export interface CustomTheme extends Theme {
  dark: boolean
  colors: {
    background: string
    primary: string
    secondary: string
    text: string
    darkGrey: string
    grey: string
    lightGrey: string
    notification: string
    border: string
    card: string
  }
}

// ThemeProvider requires this format
export const MyTheme: CustomTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: Colors.secondary,
    background: Colors.white,
    text: Colors.black,
    darkGrey: Colors.darkGrey,
    grey: Colors.grey,
    lightGrey: Colors.lightGrey,
  },
  fonts: {
    regular: {
      fontFamily: Colors.fonts.regular,
      fontWeight: '400',
    },
    medium: {
      fontFamily: Colors.fonts.medium,
      fontWeight: '500',
    },
    bold: {
      fontFamily: Colors.fonts.bold,
      fontWeight: '700',
    },
    heavy: {
      fontFamily: Colors.fonts.heavy,
      fontWeight: '800',
    },
  },
}

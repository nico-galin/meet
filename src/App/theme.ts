import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, Input, Link } from '@chakra-ui/react'

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: 'blue.300' };
Link.defaultProps = { ...Link.defaultProps, padding: "5px", borderRadius: "5px"}

const colors = {
  brand: {
    primaryBG: '#1C1C1E',

    secondaryBG: '#2C2C2E',
    secondaryStroke: "#494949",

    tertiaryBG: '#48484A',
    tertiaryStroke: '#6F6F6F',

    primary: '#0A84FF',
    primaryLight: '#49A4FF',
    primaryStroke: '#0069D3',

    secondary: '#A7A7A7',
    secondaryDark: '#494949',
    
    red: "#FF453A",
    redLight: '#ff665e',
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('white', '#1C1C1E')(props),
      color: mode('black', 'white')(props),
    },
  })
}

const components = {
  Input: {
    
  },
  Button: {
    variants: {
      solid: {
        outline: "none",
        borderRadius: "8px",
        _focus: {
          boxShadow: "none"
        },
        _active: "none",
      }
    },
  }
}

const theme = extendTheme({
  fonts: {
    heading: 'Raleway, sans-serif',
    body: 'Raleway, sans-serif',
  },
  colors,
  styles,
  components: components,
  initialColorMode: 'dark',
  useSystemColorMode: false,
});

export default theme;
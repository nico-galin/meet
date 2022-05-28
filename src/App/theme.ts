import { mode } from '@chakra-ui/theme-tools';
import { extendTheme, Input } from '@chakra-ui/react'

Input.defaultProps = { ...Input.defaultProps, focusBorderColor: 'blue.300' };

const colors = {
  brand: {
    primaryBG: '#1C1C1E',

    secondaryBG: '#2C2C2E',
    secondaryStroke: "#494949",

    tertiaryBG: '#494949',
    tertiaryStroke: '#6A6A6A',

    primary: '#0A84FF',
    primaryLight: '#49A4FF',
    primaryStroke: '#0069D3',

    secondary: '#A7A7A7',
    
    red: "#FF453A"
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
  initialColorMode: 'light',
  useSystemColorMode: false,
});

export default theme;
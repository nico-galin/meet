import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from 'contexts/auth'
import { HashRouter } from 'react-router-dom'
import theme from './theme'

interface Props {
  children: any
}

const Providers = ({ children }: Props) => {
  return (
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <HashRouter>
            {children}
          </HashRouter>
        </AuthProvider>
      </ChakraProvider>
  )
}

export default Providers

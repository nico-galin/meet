import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { AuthProvider } from 'contexts/auth'
import { DatabaseProvider } from 'contexts/database'
import { HashRouter } from 'react-router-dom'
import theme from './theme'

interface Props {
  children: any
}

const Providers = ({ children }: Props) => {
  return (
      <ChakraProvider theme={theme}>
        <HashRouter>
          <AuthProvider>
            <DatabaseProvider>
              {children}
            </DatabaseProvider>
          </AuthProvider>
        </HashRouter>
      </ChakraProvider>
  )
}

export default Providers

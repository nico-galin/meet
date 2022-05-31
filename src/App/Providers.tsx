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
        <AuthProvider>
          <DatabaseProvider>
            <HashRouter>
              <DarkMode>
                {children}
              </DarkMode>
            </HashRouter>
          </DatabaseProvider>
        </AuthProvider>
      </ChakraProvider>
  )
}

export default Providers

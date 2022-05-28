import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from 'contexts/auth'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'

interface Props {
  children: any
}

const Providers = ({ children }: Props) => {
  return (
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </AuthProvider>
      </ChakraProvider>
  )
}

export default Providers

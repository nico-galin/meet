import { Box, Button, HStack, StackDivider, Text } from "@chakra-ui/react"
import { ReactComponent as ExitIcon } from 'assets/svg/exit.filled.svg';

interface Props {
  onExit: () => void
  emoji?: string
  title: string
  subtitle?: string
  children?: any
}

const ModalHeader = ({ onExit, emoji, title, subtitle, children }: Props) => {
  return (
    <HStack width="100%" justifyContent="space-between" alignItems="start">
      <HStack>
        {!!emoji &&
          <>
            <Text fontSize="5xl">{emoji}</Text>
            <StackDivider width="5px"/>
          </>
        }
        <Box>
          <Text textAlign="left" fontWeight="semibold" fontSize="2xl">{title}</Text>
          {!!subtitle && <Text textAlign="left" fontSize="sm" color="brand.secondary">{subtitle}</Text>}
        </Box>
      </HStack>
    <Button variant="ghost" onClick={onExit}><ExitIcon width="10px"/></Button>
  </HStack>
  )
}

export default ModalHeader
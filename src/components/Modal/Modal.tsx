import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'

interface Props {
  onClose: () => void
  children: any
  size?: string
}

const CustomModal = ({ onClose, size = "3xl", children }: Props) => (
  <Modal isCentered isOpen onClose={onClose} size={size} scrollBehavior="inside">
    <ModalOverlay />
    <ModalContent marginX="10px" borderRadius="16px" maxHeight="90%">
      <ModalBody
        backgroundColor="brand.secondaryBG"
        padding="20px"
        borderRadius="16px"
        sx={{
          '&::-webkit-scrollbar': {
            width: '16px',
            borderRadius: '8px',
            backgroundColor: `rgba(0, 0, 0, 0.1)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgba(0, 0, 0, 0.1)`,
          },
        }}
      >
        <Stack textAlign="left">{children}</Stack>
      </ModalBody>
    </ModalContent>
  </Modal>
)

export default CustomModal

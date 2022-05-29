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
  <Modal isCentered isOpen onClose={onClose} size={size}>
    <ModalOverlay />
    <ModalContent marginX="10px" borderRadius="16px">
      <ModalBody
        backgroundColor="brand.secondaryBG"
        padding="20px"
        borderRadius="16px"
      >
        <Stack textAlign="left">{children}</Stack>
      </ModalBody>
    </ModalContent>
  </Modal>
)

export default CustomModal

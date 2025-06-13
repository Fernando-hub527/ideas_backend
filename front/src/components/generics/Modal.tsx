import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'

export function DefaultModal(props: {onClose: ()=>void, isOpen: boolean, title: string, children: ReactNode}) {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.50">
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginTop={-5}>
             {props.children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
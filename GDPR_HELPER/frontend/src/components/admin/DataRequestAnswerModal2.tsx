import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure, FormControl, FormLabel, Input, RadioGroup, Stack, Radio,
} from '@chakra-ui/react'
export default function DataRequestAnswerModal(props : {DataRequestID : number}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleSubmit = () => {
        console.log("submit")
    }
    return (
        <>
            <Button onClick={onOpen}>Respond</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Data Request Answer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Response</FormLabel>
                            <RadioGroup defaultValue='2'>
                                <Stack spacing={5} direction='row'>
                                    <Radio colorScheme='green' value='yes'>
                                        Accept
                                    </Radio>
                                    <Radio colorScheme='red' value='no'>
                                        Deny
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Justification claim</FormLabel>
                            <Input/>
                        </FormControl>
                        </form>
                    </ModalBody>


                        <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Send Response
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


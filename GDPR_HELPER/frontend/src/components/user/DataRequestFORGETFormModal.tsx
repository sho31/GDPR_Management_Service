import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure, FormControl, FormLabel, Input, RadioGroup, Stack, Radio, Select, useToast,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import {useState} from "react";
import AlertPop from "../common/AlertPop";
export default function DataRequestFORGETFormModal(props : {DataSubjectID : number, apiKey : string}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();
    let myHeaders = new Headers();
    myHeaders.append("api-key", props.apiKey);
    myHeaders.append("Content-Type", "application/json");



    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = async (data: any) => {
        //console.log(data);
        toast({
            title: "Submitted!",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        onClose()
        let newValue = "";
        if (data.newValue) {
            newValue = data.newValue;
        }
        console.log(data);
        let myInit = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                claim: data.claim,
                dataReqType: 'FORGET',
                newValue: '',
                dataID: null,
                dataSubjectID: props.DataSubjectID
            })
        };
        const response = await fetch("http://localhost:3000/dataRequest/create", myInit)
        console.log(response)
    };

    return (
        <>
            <Button onClick={onOpen}>Create a request to remove all data from the Database (right to forget)</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Data Request Answer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form action='submit' onSubmit={handleSubmit(onSubmit)}>
                                <FormLabel>Claim</FormLabel>
                            <Input
                                type="text"
                                placeholder="Claim"
                                {...register("claim", {
                                    required: "Please enter a claim",
                                    minLength: 3,
                                    maxLength: 80
                                })}
                            />
                            {errors.claim && <AlertPop title={String (errors.claim.message)} />}
                            <ModalFooter>
                                <Button type="submit" colorScheme='blue' mr={3}>
                                    Send Request
                                </Button>
                                <Button variant='ghost' onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </form>
                    </ModalBody>



                </ModalContent>
            </Modal>
        </>
    )
}


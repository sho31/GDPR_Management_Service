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
export default function DataRequestAnswerModal(props : {DataRequestID : number, RemoveDataRequest : Function}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState();
    const [dataRequestAnswer, setDataRequestAnswer] = useState(true);
    const toast = useToast();
    let myHeaders = new Headers();
    const apiKey = process.env.REACT_APP_API_KEY;
    if (apiKey) {
        myHeaders.append("api-key", apiKey);//This is unsafe to expose an api key in the frontend,
        // the api key should be accessed from the backend and not showed to the client, only if logged in.
    }
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
        onClose();
        setData(data);
        console.log(data);
        let myInit = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                acceptedRequest: Boolean(dataRequestAnswer),
                justification: data.claim,
                DataRequestID: props.DataRequestID,
            })
        };
        const response = await fetch(process.env.REACT_APP_GDPRMS_URL + "/dataRequestAnswer/create", myInit)
        console.log(response)
        props.RemoveDataRequest(props.DataRequestID)
    };
    const onSelectAnswer = (e : any) => {
        console.log(e.target.value);
        setDataRequestAnswer(e.target.value);
    }
    //console.log(data);
    //console.log(errors)

    return (
        <>
            <Button onClick={onOpen}>Create Answer</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Data Request Answer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form action='submit' onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                                <FormLabel>Response</FormLabel>
                                <RadioGroup defaultValue='true' >
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='green' value='true' onChange={onSelectAnswer}>
                                            Accept
                                        </Radio>
                                        <Radio colorScheme='red' value='false' onChange={onSelectAnswer}>
                                            Deny
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl mt={6}>
                                <FormLabel>Justification</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Justification"
                                    {...register("claim", {
                                        required: "Please enter a justification",
                                        minLength: 3,
                                        maxLength: 80
                                    })}
                                />
                                {errors.claim && <AlertPop title={String (errors.claim.message)} />}

                            </FormControl>
                            <ModalFooter>
                                <Button type="submit" colorScheme='blue' mr={3}>
                                    Send Response
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


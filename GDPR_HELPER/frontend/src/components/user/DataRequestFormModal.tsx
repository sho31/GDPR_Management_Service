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
export default function DataRequestFormModal(props : {DataID : number, DataSubjectID : number}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState();
    const [dataRequestType, setDataRequestType] = useState("");
    const toast = useToast();
    let myHeaders = new Headers();
    myHeaders.append("api-key", "abc");
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
        setData(data);
        console.log(data);
        let myInit = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                claim: data.claim,
                dataReqType: dataRequestType,
                newValue: newValue,
                dataID: props.DataID,
                dataSubjectID: props.DataSubjectID
            })
        };
        const response = await fetch("http://localhost:3000/dataRequest/create", myInit)
        console.log(response)
    };
    const onSelect = (e : any) => {
        console.log(e.target.value);
        setDataRequestType(e.target.value);
    }
    //console.log(data);
    //console.log(errors)

    return (
        <>
            <Button onClick={onOpen}>Create Request</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Data Request Answer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form action='submit' onSubmit={handleSubmit(onSubmit)}>
                            <Select placeholder='Select request type' {...register("requestType", {required: "Please choose a request",})} onChange={onSelect} >
                                <option value='RECTIFICATION'>Rectification</option>
                                <option value='DELETION'>Deletion</option>
                            </Select>
                            {errors.requestType && <AlertPop title={String (errors.requestType.message)} />}

                            {dataRequestType === 'RECTIFICATION' && <><FormLabel>New value</FormLabel>

                                <Input
                                type="text"
                                placeholder="New value"
                            {...register("newValue", {
                                required: "Please enter a new value",
                                minLength: 3,
                                maxLength: 80
                            })}
                                />
                                </>}
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
                                    Send Data Request
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


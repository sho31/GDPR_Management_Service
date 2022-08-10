import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export default function AlertPop ( props : {title : string | undefined} ) {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{props.title}</AlertTitle>
        </Alert>
    );
}
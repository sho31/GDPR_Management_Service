import DataList from "../../components/user/DataList";
import {Box, Heading} from "@chakra-ui/react";
import {useParams} from "react-router-dom";

export default function UserDashboard() {
    let id = Number(useParams().DataSubjectID);
    if (isNaN(Number(id))) {
        id = 0;
    }
    return (
        <>
            <Heading margin={5}>Personal data</Heading>
            <Box margin={10} borderWidth='1px' borderRadius='lg'>
                <DataList DataSubjectID = {id}  />
            </Box>
        </>
    )
}
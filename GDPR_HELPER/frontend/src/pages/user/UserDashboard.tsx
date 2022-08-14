import DataList from "../../components/user/DataList";
import {Box, Heading} from "@chakra-ui/react";
import {useParams, useSearchParams} from "react-router-dom";

export default function UserDashboard() {
    let id = Number(useParams().DataSubjectID);
    console.log("id", id)
    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("__firebase_request_key")
    let apiKey = searchParams.get("apiKey")
    if (!apiKey) {
        apiKey = "abc"
    }
    console.log("key", apiKey)

    if (isNaN(Number(id))) {
        id = 0;
    }
    return (
        <>
            <Heading margin={5}>Personal data</Heading>
            <Box margin={10} borderWidth='1px' borderRadius='lg'>
                <DataList DataSubjectID = {id} apiKey={apiKey}  />
            </Box>
        </>
    )
}
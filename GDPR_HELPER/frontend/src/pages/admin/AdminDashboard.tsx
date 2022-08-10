import DataRequestsList from "../../components/admin/DataRequestsList";
import {Box, Heading} from "@chakra-ui/react";

export default function AdminDashboard() {
    return (
        <>
            <Heading margin={5}>Unanswered Data Requests</Heading>
            <Box margin={10} borderWidth='1px' borderRadius='lg'>
                <DataRequestsList/>
            </Box>
        </>
    )
}
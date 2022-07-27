import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button
} from '@chakra-ui/react'
import {useEffect, useState} from "react";
import type {Data} from "../../declaration"
import RequestModal from "./DataRequestFormModal";
import DataRequestFormModal from "./DataRequestFormModal";
let myHeaders = new Headers();
myHeaders.append("api-key", "abc");
let myInit = { method: 'GET',
    headers: myHeaders,
};

export default function DataList(props : {DataSubjectID : number}) {
    const [data, setData] = useState<Data[]>([])
    useEffect(() => {
        fetch("http://localhost:3000/data/getAllByDataSubjectId/" + props.DataSubjectID, myInit)
            .then(res => res.json())
            .then(data => {
                setData(data.data)
                console.log(data)
            })

    }, []);

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Data</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Data Type</Th>
                        <Th>Source</Th>
                        <Th>Creation Date</Th>
                        <Th>Action</Th>

                    </Tr>
                </Thead>
                <Tbody>

                    {data.map((data, i) => {  return (
                        <Tr key={i}>
                            <Td>{data.gdpr_datatype.dataTypeName}</Td>
                            <Td>{data.source}</Td>
                            <Td>{data.creationDate}</Td>

                            <Td> <DataRequestFormModal DataID={data.dataID} DataSubjectID={data.dataSubjectID}/> </Td>
                        </Tr>
                    ) })}

                </Tbody>

            </Table>
        </TableContainer>

    )
}
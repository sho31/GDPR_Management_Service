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
            .then(async data => {
                console.log(data)
                let dataList = []
                for (const d of data.data) {
                    console.log(d)
                    let init = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                    if(!d.isDeleted){
                        d.oldValue = await fetch('http://localhost:2000/getContent?id=' + d.data_ID_ref + "&dataType=" + d.gdpr_datatype.dataTypeName + "&attributeName=" + d.attributeName).then(res => res.json().then(data => {
                            console.log("fetch",data);
                            if (data.status === false) {
                                console.log("not found")
                            }else {
                                return data.data
                            }
                        }));
                        dataList.push(d)
                    }
                }
                setData(dataList)
                console.log("final",data)
            })

    }, []);

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Data</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Attribute name</Th>
                        <Th>Value</Th>
                        <Th>Source</Th>
                        <Th>Creation Date</Th>
                        <Th>Action</Th>

                    </Tr>
                </Thead>
                <Tbody>

                    {data.map((data, i) => {  return (
                        <Tr key={i}>
                            <Td>{data.attributeName}</Td>
                            <Td>{data.oldValue}</Td>
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
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
import DataRequestFormModal from "./DataRequestFormModal";
import DataRequestFORGETFormModal from "./DataRequestFORGETFormModal";



export default function DataList(props : {DataSubjectID : number, apiKey : string}) {
    const [data, setData] = useState<Data[]>([])
    const [dataPortability, setDataPortability] = useState<any[]>([])

    let myHeaders = new Headers();
    myHeaders.append("api-key", props.apiKey);
    let myInit = { method: 'GET',
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(process.env.REACT_APP_GDPRMS_URL + "/data/getAllByDataSubjectId/" + props.DataSubjectID, myInit)
            .then(res => res.json())
            .then(async data => {
                let dataList = []
                let dataPortabilityList = []
                console.log(data)
                for (const d of data.data) {
                    console.log("data",d)
                    let dataportabilityElement : any = {attributeName : d.attributeName}
                    let init = {
                        method: 'GET',
                        headers: myHeaders,
                    };
                    if(!d.isDeleted){
                        try{
                            d.oldValue = await fetch(process.env.REACT_APP_API_ENDPOINT_GET_DATA_CONTENT + d.data_ID_ref + "&dataType=" + d.gdpr_datatype.dataTypeName + "&attributeName=" + d.attributeName).then(res => res.json().then(data => {
                                console.log("fetch",data);
                                if (data.status === false) {
                                    console.log("not found")
                                }else {
                                    return data.data
                                }
                            }));
                            dataportabilityElement[d.attributeName] = d.oldValue
                        }catch(e){
                            console.log("could not fetch data content value", e)
                        }
                        dataList.push(d)
                        dataPortabilityList.push(dataportabilityElement)
                    }
                }
                setData(dataList)
                setDataPortability(dataPortabilityList)
                console.log("final",data)
            })

    }, []);

    return (
        <>
            <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(dataPortability))}`}
                download="PersonalData.json"
                style= {{ display: 'block',
                    width: '115px',
                    height: '25px',
                    background: '#4E9CAF',
                    padding: '10px',
                    textAlign: 'center',
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'bold',
                    lineHeight: '25px'}}
            >
                {`Download Personal Data (RIGHT TO PORTABILITY)`}
            </a>
            <DataRequestFORGETFormModal DataSubjectID={props.DataSubjectID} apiKey={props.apiKey}/>

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
                            <Td> <DataRequestFormModal DataID={data.dataID} DataSubjectID={data.dataSubjectID} apiKey={props.apiKey}/> </Td>
                        </Tr>
                    ) })}

                </Tbody>

            </Table>
        </TableContainer>
        </>

    )
}
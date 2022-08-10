export type Data  = {
    creationDate: string,
    dataConservation: number,
    dataID: number,
    dataSubjectID: number,
    dataTypeID: number,
    data_ID_ref: number,
    source : string,
    attributeName: string,
    deletionDate: string,
    oldValue : string,
    gdpr_datatype : DataType,
};
export type DataSubject = {
    apiKey: null;
    dataSubjectCategoryID: number;
    dataSubjectID: number
    data_subject_id_ref: number;
    tutorID: number;
}

export type DataType = {
    dataTypeID: number;
    dataTypeName: string
}

export type DataRequest= {
    DataRequestID: number;
    claim: string;
    claimDate: string;
    newValue: string | null;
    oldValue: string | null;
    dataReqType: string;
    dataSubjectID: number;
    dataID: number;
    gdpr_data : Data;
    gdpr_datasubject : DataSubject;
    gdpr_datatype : DataType;
}

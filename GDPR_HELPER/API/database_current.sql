create table gdpr_datasubjectcategory
(
  dsCategoryName varchar(25) not null,
  locationID     varchar(40) null,
  dsCategoryID   int auto_increment
    primary key
)
  collate = utf8mb4_unicode_ci;

create table gdpr_datatype
(
  dataTypeName varchar(40) not null,
  dataTypeID   int auto_increment
    primary key
)
  collate = utf8mb4_unicode_ci;

create table gdpr_personaldatacategory
(
  PDCategoryID             int auto_increment
    primary key,
  personalDataCategoryName varchar(150) null
)
  collate = utf8mb4_unicode_ci;

create table gdpr_provider
(
  providerID   int auto_increment
    primary key,
  prName       varchar(40)  not null,
  prAddress    varchar(250) not null,
  prPostalCode varchar(40)  null,
  prCity       varchar(40)  null,
  prPhone      varchar(40)  null,
  prEmail      varchar(40)  null,
  prCountry    varchar(50)  null
)
  collate = utf8mb4_unicode_ci;

create table gdpr_tutor
(
  tutorID   int auto_increment
    primary key,
  tutorName varchar(40)  not null,
  country   varchar(100) null
)
  collate = utf8mb4_unicode_ci;

create table gdpr_datasubject
(
  dataSubjectID         int auto_increment
    primary key,
  data_subject_id_ref   int default 0 not null,
  tutorID               int           null,
  dataSubjectCategoryID int           null,
  constraint const2
    unique (data_subject_id_ref),
  constraint gdpr_datasubject_gdpr_datasubjectcategory_dsCategoryID_fk
    foreign key (dataSubjectCategoryID) references gdpr_datasubjectcategory (dsCategoryID),
  constraint gdpr_datasubject_gdpr_tutor_tutorID_fk
    foreign key (tutorID) references gdpr_tutor (tutorID)
)
  collate = utf8mb4_unicode_ci;

create table gdpr_data
(
  dataID                 int auto_increment
    primary key,
  source                 varchar(25) null,
  dataConservation       int         null,
  isPersonal             tinyint(1)  null,
  personalDataCategoryID int         null,
  isModifiable           tinyint(1)  null,
  dataTypeID             int         null,
  data_ID_ref            int         null,
  dataSubjectID          int         null,
  creationDate           datetime    null,
  lastModificationDate   datetime    null,
  deletionDate           datetime    null,
  constraint gdpr_data_gdpr_datasubject_dataSubjectID_fk
    foreign key (dataSubjectID) references gdpr_datasubject (dataSubjectID),
  constraint gdpr_data_ibfk_1
    foreign key (dataTypeID) references gdpr_datatype (dataTypeID),
  constraint gdpr_data_ibfk_2
    foreign key (personalDataCategoryID) references gdpr_personaldatacategory (PDCategoryID)
)
  collate = utf8mb4_unicode_ci;

create index personalDataCategory
  on gdpr_data (personalDataCategoryID);

create table gdpr_datarequest
(
  DataRequestID int auto_increment
    primary key,
  claim         varchar(250) null,
  claimDate     datetime     null,
  newValue      varchar(250) null,
  dataReqType   varchar(250) not null,
  dataSubjectID int          null,
  dataID        int          null,
  oldValue      varchar(250) null,
  constraint gdpr_datarequest_ibfk_1
    foreign key (dataID) references gdpr_data (dataID),
  constraint gdpr_datarequest_ibfk_2
    foreign key (dataSubjectID) references gdpr_datasubject (dataSubjectID)
)
  collate = utf8mb4_unicode_ci;

create index data
  on gdpr_datarequest (dataID);

create index dataSubject
  on gdpr_datarequest (dataSubjectID);

create index gdpr_datarequest_gdpr_datarequesttype_dataReqTypeID_fk
  on gdpr_datarequest (dataReqType);

create table gdpr_datarequestanswer
(
  dataRequestAnswerId int auto_increment
    primary key,
  acceptedRequest     tinyint(1)           null,
  justification       varchar(150)         null,
  DataRequestID       int                  null,
  processedAnswer     tinyint(1) default 0 null,
  constraint gdpr_datarequestanswer_gdpr_datarequest_DataRequestID_fk
    foreign key (DataRequestID) references gdpr_datarequest (DataRequestID)
)
  collate = utf8mb4_unicode_ci;

create index datarequest
  on gdpr_datarequestanswer (DataRequestID);

create index country
  on gdpr_tutor (country);


create table nutricionalcoaching._prisma_migrations
(
  id                  varchar(36)                               not null
    primary key,
  checksum            varchar(64)                               not null,
  finished_at         datetime(3)                               null,
  migration_name      varchar(255)                              not null,
  logs                text                                      null,
  rolled_back_at      datetime(3)                               null,
  started_at          datetime(3)  default CURRENT_TIMESTAMP(3) not null,
  applied_steps_count int unsigned default '0'                  not null
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_context
(
  environmentName varchar(100) not null
    primary key
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_country
(
  countryName varchar(100) not null
    primary key
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_dataconsumercategory
(
  dcCategoryID   int auto_increment
    primary key,
  dcCategoryName varchar(40) null
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_dataconsumer
(
  dataConsumerID int auto_increment
    primary key,
  dconsumerName  varchar(40)  not null,
  dcCategory     int          null,
  country        varchar(100) null,
  constraint gdpr_dataconsumer_ibfk_1
    foreign key (dcCategory) references nutricionalcoaching.gdpr_dataconsumercategory (dcCategoryID),
  constraint gdpr_dataconsumer_ibfk_2
    foreign key (country) references nutricionalcoaching.gdpr_country (countryName)
)
  collate = utf8mb4_unicode_ci;

create index country
  on nutricionalcoaching.gdpr_dataconsumer (country);

create index dcCategory
  on nutricionalcoaching.gdpr_dataconsumer (dcCategory);

create table nutricionalcoaching.gdpr_datasubjectcategory
(
  dsCategoryName varchar(25) not null,
  locationID     varchar(40) null,
  dsCategoryID   int         not null
    primary key
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_datasubject
(
  dataSubjectID       int           not null
    primary key,
  data_subject_id_ref int default 0 not null,
  dsCategory          varchar(40)   null,
  tutor               int           null,
  constraint gdpr_datasubject_gdpr_datasubjectcategory_dsCategoryID_fk
    foreign key (dataSubjectID) references nutricionalcoaching.gdpr_datasubjectcategory (dsCategoryID)
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_contract
(
  contractID     int auto_increment
    primary key,
  signaturedate  date null,
  expirationDate date null,
  dataSubject    int  null,
  constraint gdpr_contract_ibfk_1
    foreign key (dataSubject) references nutricionalcoaching.gdpr_datasubject (dataSubjectID)
)
  collate = utf8mb4_unicode_ci;

create index dataSubject
  on nutricionalcoaching.gdpr_contract (dataSubject);

create index const1
  on nutricionalcoaching.gdpr_datasubject (dsCategory);

create index const2
  on nutricionalcoaching.gdpr_datasubject (data_subject_id_ref);

create table nutricionalcoaching.gdpr_datatype
(
  dataTypeName varchar(40) not null,
  dataTypeID   int         not null
    primary key
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_ontology
(
  ontologyName varchar(100) not null
    primary key,
  context      varchar(100) null,
  constraint gdpr_ontology_ibfk_1
    foreign key (context) references nutricionalcoaching.gdpr_context (environmentName)
)
  collate = utf8mb4_unicode_ci;

create index context
  on nutricionalcoaching.gdpr_ontology (context);

create table nutricionalcoaching.gdpr_personaldatacategory
(
  PDCategoryID         int          not null
    primary key,
  personalDataCategory varchar(150) null
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_data
(
  dataID               int         not null
    primary key,
  source               varchar(25) null,
  dataConservation     int         null,
  isPersonal           tinyint(1)  null,
  dataTypeName         varchar(40) null,
  personalDataCategory int         null,
  isModifiable         tinyint(1)  null,
  constraint gdpr_data_ibfk_1
    foreign key (dataID) references nutricionalcoaching.gdpr_datatype (dataTypeID),
  constraint gdpr_data_ibfk_2
    foreign key (personalDataCategory) references nutricionalcoaching.gdpr_personaldatacategory (PDCategoryID)
)
  collate = utf8mb4_unicode_ci;

create index dataTypeName
  on nutricionalcoaching.gdpr_data (dataTypeName);

create index personalDataCategory
  on nutricionalcoaching.gdpr_data (personalDataCategoryID);

create table nutricionalcoaching.gdpr_datarequest
(
  DataRequestID int          not null
    primary key,
  claim         varchar(250) null,
  claimDate     datetime     null,
  newValue      varchar(250) null,
  dataReqType   varchar(25)  null,
  dataSubject   int          null,
  data          int          null,
  constraint gdpr_datarequest_ibfk_1
    foreign key (data) references nutricionalcoaching.gdpr_data (dataID),
  constraint gdpr_datarequest_ibfk_2
    foreign key (dataSubject) references nutricionalcoaching.gdpr_datasubject (dataSubjectID)
)
  collate = utf8mb4_unicode_ci;

create index data
  on nutricionalcoaching.gdpr_datarequest (dataID);

create index dataSubject
  on nutricionalcoaching.gdpr_datarequest (dataSubjectID);

create table nutricionalcoaching.gdpr_datarequestanswer
(
  dataRequestAnswerid int          not null
    primary key,
  answer              tinyint(1)   null,
  justification       varchar(150) null,
  datarequest         int          null,
  constraint gdpr_datarequestanswer_ibfk_1
    foreign key (datarequest) references nutricionalcoaching.gdpr_datarequest (DataRequestID)
)
  collate = utf8mb4_unicode_ci;

create index datarequest
  on nutricionalcoaching.gdpr_datarequestanswer (datarequest);

create table nutricionalcoaching.gdpr_processing
(
  processingID       int          not null
    primary key,
  processingName     varchar(25)  null,
  processingType     varchar(25)  null,
  processingCategory varchar(25)  null,
  creationDate       date         null,
  updatingDate       date         null,
  isService          tinyint(1)   null,
  context            varchar(100) null,
  constraint gdpr_processing_ibfk_1
    foreign key (context) references nutricionalcoaching.gdpr_context (environmentName)
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_consent
(
  consentID   int auto_increment
    primary key,
  startDate   date null,
  endDate     date null,
  processing  int  null,
  contract    int  null,
  dataSubject int  null,
  constraint gdpr_consent_ibfk_1
    foreign key (processing) references nutricionalcoaching.gdpr_processing (processingID),
  constraint gdpr_consent_ibfk_2
    foreign key (contract) references nutricionalcoaching.gdpr_contract (contractID),
  constraint gdpr_consent_ibfk_3
    foreign key (dataSubject) references nutricionalcoaching.gdpr_datasubject (dataSubjectID)
)
  collate = utf8mb4_unicode_ci;

create index contract
  on nutricionalcoaching.gdpr_consent (contract);

create index dataSubject
  on nutricionalcoaching.gdpr_consent (dataSubject);

create index processing
  on nutricionalcoaching.gdpr_consent (processing);

create table nutricionalcoaching.gdpr_datausage
(
  id             int auto_increment
    primary key,
  personalStatus tinyint(1) default 0 null,
  C              tinyint(1) default 0 null,
  r              tinyint(1) default 0 null,
  u              tinyint(1) default 0 null,
  d              tinyint(1) default 0 null,
  data           int                  null,
  processing     int                  null,
  constraint gdpr_datausage_ibfk_1
    foreign key (data) references nutricionalcoaching.gdpr_data (dataID),
  constraint gdpr_datausage_ibfk_2
    foreign key (processing) references nutricionalcoaching.gdpr_processing (processingID)
)
  collate = utf8mb4_unicode_ci;

create index data
  on nutricionalcoaching.gdpr_datausage (data);

create index processing
  on nutricionalcoaching.gdpr_datausage (processing);

create table nutricionalcoaching.gdpr_personaldatareception
(
  data         int not null,
  processing   int not null,
  dataConsumer int not null,
  primary key (data, processing, dataConsumer),
  constraint gdpr_personaldatareception_ibfk_1
    foreign key (data) references nutricionalcoaching.gdpr_data (dataID),
  constraint gdpr_personaldatareception_ibfk_2
    foreign key (processing) references nutricionalcoaching.gdpr_processing (processingID),
  constraint gdpr_personaldatareception_ibfk_3
    foreign key (dataConsumer) references nutricionalcoaching.gdpr_dataconsumer (dataConsumerID)
)
  collate = utf8mb4_unicode_ci;

create index dataConsumer
  on nutricionalcoaching.gdpr_personaldatareception (dataConsumer);

create index processing
  on nutricionalcoaching.gdpr_personaldatareception (processing);

create index context
  on nutricionalcoaching.gdpr_processing (context);

create table nutricionalcoaching.gdpr_provider
(
  providerID   int auto_increment
    primary key,
  prName       varchar(40)  not null,
  username     varchar(25)  null,
  prAdress     varchar(250) not null,
  prPostalCode varchar(40)  null,
  city         varchar(40)  null,
  prPhone      varchar(40)  null,
  prEmail      varchar(40)  null,
  country      varchar(50)  null
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_purpose
(
  purposeID   int auto_increment
    primary key,
  description varchar(200) not null,
  type        varchar(10)  null,
  processing  int          null,
  constraint gdpr_purpose_ibfk_1
    foreign key (processing) references nutricionalcoaching.gdpr_processing (processingID)
)
  collate = utf8mb4_unicode_ci;

create index processing
  on nutricionalcoaching.gdpr_purpose (processing);

create table nutricionalcoaching.gdpr_tutor
(
  tutorID   int auto_increment
    primary key,
  tutorName varchar(40)  not null,
  username  varchar(25)  null,
  country   varchar(100) null,
  constraint gdpr_tutor_ibfk_1
    foreign key (country) references nutricionalcoaching.gdpr_country (countryName)
)
  collate = utf8mb4_unicode_ci;

create index country
  on nutricionalcoaching.gdpr_tutor (country);


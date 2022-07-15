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

create table nutricionalcoaching.gdpr_datarequesttype
(
  dataReqTypeID   int         not null
    primary key,
  dataReqTypeName varchar(50) null
);

create table nutricionalcoaching.gdpr_datasubjectcategory
(
  dsCategoryName varchar(25) not null,
  locationID     varchar(40) null,
  dsCategoryID   int         not null
    primary key
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_datatype
(
  dataTypeName varchar(40) not null,
  dataTypeID   int         not null
    primary key
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_personaldatacategory
(
  PDCategoryID             int          not null
    primary key,
  personalDataCategoryName varchar(150) null
)
  collate = utf8mb4_unicode_ci;

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

create table nutricionalcoaching.gdpr_tutor
(
  tutorID   int auto_increment
    primary key,
  tutorName varchar(40)  not null,
  username  varchar(25)  null,
  country   varchar(100) null
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_datasubject
(
  dataSubjectID         int           not null
    primary key,
  data_subject_id_ref   int default 0 not null,
  dsCategory            varchar(40)   null,
  tutorID               int           null,
  dataSubjectCategoryID int           null,
  constraint gdpr_datasubject_gdpr_datasubjectcategory_dsCategoryID_fk
    foreign key (dataSubjectCategoryID) references nutricionalcoaching.gdpr_datasubjectcategory (dsCategoryID),
  constraint gdpr_datasubject_gdpr_tutor_tutorID_fk
    foreign key (tutorID) references nutricionalcoaching.gdpr_tutor (tutorID)
)
  collate = utf8mb4_unicode_ci;

create table nutricionalcoaching.gdpr_data
(
  dataID               int         not null
    primary key,
  source               varchar(25) null,
  dataConservation     int         null,
  isPersonal           tinyint(1)  null,
  personalDataCategory int         null,
  isModifiable         tinyint(1)  null,
  dataTypeID           int         null,
  data_ID_ref          int         null,
  dataSubjectID        int         null,
  constraint gdpr_data_gdpr_datasubject_dataSubjectID_fk
    foreign key (dataSubjectID) references nutricionalcoaching.gdpr_datasubject (dataSubjectID),
  constraint gdpr_data_ibfk_1
    foreign key (dataTypeID) references nutricionalcoaching.gdpr_datatype (dataTypeID),
  constraint gdpr_data_ibfk_2
    foreign key (personalDataCategory) references nutricionalcoaching.gdpr_personaldatacategory (PDCategoryID)
)
  collate = utf8mb4_unicode_ci;

create index personalDataCategory
  on nutricionalcoaching.gdpr_data (personalDataCategoryID);

create table nutricionalcoaching.gdpr_datarequest
(
  DataRequestID int          not null
    primary key,
  claim         varchar(250) null,
  claimDate     datetime     null,
  newValue      varchar(250) null,
  dataReqType   int          null,
  dataSubject   int          null,
  dataID        int          null,
  oldValue      varchar(250) null,
  constraint gdpr_datarequest_gdpr_datarequesttype_dataReqTypeID_fk
    foreign key (dataReqType) references nutricionalcoaching.gdpr_datarequesttype (dataReqTypeID),
  constraint gdpr_datarequest_ibfk_1
    foreign key (dataID) references nutricionalcoaching.gdpr_data (dataID),
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
  dataRequestAnswerid int                  not null
    primary key,
  answer              tinyint(1)           null,
  justification       varchar(150)         null,
  DataRequestID       int                  null,
  processedAnswer     tinyint(1) default 0 null,
  constraint gdpr_datarequestanswer_gdpr_datarequest_DataRequestID_fk
    foreign key (DataRequestID) references nutricionalcoaching.gdpr_datarequest (DataRequestID)
)
  collate = utf8mb4_unicode_ci;

create index datarequest
  on nutricionalcoaching.gdpr_datarequestanswer (DataRequestID);

create index const1
  on nutricionalcoaching.gdpr_datasubject (dsCategory);

create index const2
  on nutricionalcoaching.gdpr_datasubject (data_subject_id_ref);

create index country
  on nutricionalcoaching.gdpr_tutor (country);


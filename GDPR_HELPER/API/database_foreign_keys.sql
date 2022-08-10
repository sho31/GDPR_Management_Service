alter table gdpr_data
  add constraint gdpr_data_gdpr_datasubject_dataSubjectID_fk
    foreign key (dataSubjectID) references gdpr_datasubject (dataSubjectID);

alter table gdpr_data
  add constraint gdpr_data_ibfk_1
    foreign key (dataTypeID) references gdpr_datatype (dataTypeID);

alter table gdpr_data
  add constraint gdpr_data_ibfk_2
    foreign key (personalDataCategoryID) references gdpr_personaldatacategory (PDCategoryID);


alter table gdpr_datarequest
  add constraint gdpr_datarequest_ibfk_1
    foreign key (dataID) references gdpr_data (dataID);

alter table gdpr_datarequest
  add constraint gdpr_datarequest_ibfk_2
    foreign key (dataSubjectID) references gdpr_datasubject (dataSubjectID);

alter table gdpr_datarequestanswer
  add constraint gdpr_datarequestanswer_gdpr_datarequest_DataRequestID_fk
    foreign key (DataRequestID) references gdpr_datarequest (DataRequestID);

alter table gdpr_datasubject
  add constraint gdpr_datasubject_gdpr_datasubjectcategory_dsCategoryID_fk
    foreign key (dataSubjectCategoryID) references gdpr_datasubjectcategory (dsCategoryID);

alter table gdpr_datasubject
  add constraint gdpr_datasubject_gdpr_tutor_tutorID_fk
    foreign key (tutorID) references gdpr_tutor (tutorID);


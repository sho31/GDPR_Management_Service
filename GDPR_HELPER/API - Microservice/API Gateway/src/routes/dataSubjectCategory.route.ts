class DataSubjectCategoryRoute {
  public path = '/data-subject-category';
  public target = process.env.GDPRMS_ACTOR_MANAGEMENT_MICROSERVICE_URL + this.path;
}

export default DataSubjectCategoryRoute;

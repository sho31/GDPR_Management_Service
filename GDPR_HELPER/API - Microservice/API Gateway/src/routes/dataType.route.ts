class DataTypeRoute {
  public path = '/dataType';
  public target = process.env.GDPRMS_DATA_MANAGEMENT_MICROSERVICE_URL + this.path;
}

export default DataTypeRoute;

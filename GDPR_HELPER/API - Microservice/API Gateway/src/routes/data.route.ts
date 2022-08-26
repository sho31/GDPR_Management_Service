class DataRoute {
  public path = '/data';
  public target = process.env.GDPRMS_DATA_MANAGEMENT_MICROSERVICE_URL + this.path;
}
export default DataRoute;

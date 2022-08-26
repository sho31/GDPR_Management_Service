class DataRequestsRoute {
  public path = '/dataRequest';
  public target = process.env.GDPRMS_REQUEST_MANAGEMENT_MICROSERVICE_URL + this.path;
}
export default DataRequestsRoute;

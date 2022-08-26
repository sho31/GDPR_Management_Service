class ProviderRoute {
  public path = '/provider';
  public target = process.env.GDPRMS_ACTOR_MANAGEMENT_MICROSERVICE_URL + this.path;
}

export default ProviderRoute;

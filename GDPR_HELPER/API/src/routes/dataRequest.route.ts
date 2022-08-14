import { Router } from 'express';
import DataRequestsController from '@controllers/dataRequest.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class DataRequestsRoute implements Routes {
  public path = '/dataRequest';
  public router = Router();
  public dataRequestsController = new DataRequestsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, apiKeyAuthMiddleware, this.dataRequestsController.getDataRequests);
    this.router.get(`${this.path}/getAllUnanswered`, apiKeyAuthMiddleware, this.dataRequestsController.getUnansweredDataRequests);
    this.router.get(
      `${this.path}/getAllByDataSubjectId/:dataSubjectID(\\d+)`,
      apiKeyAuthMiddleware,
      this.dataRequestsController.getDataRequestsByDataSubjectId,
    ); //Method used by datasubject
    this.router.get(
      `${this.path}/getByDataRequestAnswerId/:dataRequestAnswerId(\\d+)`,
      apiKeyAuthMiddleware,
      this.dataRequestsController.getDataRequestByAnswerId,
    );
    this.router.get(`${this.path}/getById/:DataRequestID(\\d+)`, apiKeyAuthMiddleware, this.dataRequestsController.getDataRequestById);
    this.router.post(`${this.path}/create`, apiKeyAuthMiddleware, this.dataRequestsController.createDataRequest);
    this.router.put(`${this.path}/update/:DataRequestID(\\d+)`, apiKeyAuthMiddleware, this.dataRequestsController.updateDataRequest);
    this.router.delete(`${this.path}/delete/:DataRequestID(\\d+)`, apiKeyAuthMiddleware, this.dataRequestsController.deleteDataRequest);
  }
}

export default DataRequestsRoute;

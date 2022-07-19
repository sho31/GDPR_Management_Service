import { Router } from 'express';
import DataRequestsController from '@controllers/dataRequest.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DataRequestsRoute implements Routes {
  public path = '/dataRequest';
  public router = Router();
  public dataRequestsController = new DataRequestsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, this.dataRequestsController.getDataRequests);
    this.router.get(`${this.path}/getAllUnanswered`, this.dataRequestsController.getUnansweredDataRequests);
    this.router.get(`${this.path}/getById/:DataRequestID(\\d+)`, this.dataRequestsController.getDataRequestById);
    this.router.post(`${this.path}/create`, this.dataRequestsController.createDataRequest);
    this.router.put(`${this.path}/update/:DataRequestID(\\d+)`, this.dataRequestsController.updateDataRequest);
    this.router.delete(`${this.path}/delete/:DataRequestID(\\d+)`, this.dataRequestsController.deleteDataRequest);
  }
}

export default DataRequestsRoute;

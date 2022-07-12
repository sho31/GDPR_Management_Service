import { Router } from 'express';
import DataRequestsController from '@controllers/dataRequest.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DataRequestsRoute implements Routes {
  public path = '/dataRequests';
  public router = Router();
  public dataRequestsController = new DataRequestsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dataRequestsController.getDataRequests);
    this.router.get(`${this.path}/:id(\\d+)`, this.dataRequestsController.getDataRequestById);
    this.router.post(`${this.path}`, this.dataRequestsController.createDataRequest);
    this.router.put(`${this.path}/:id(\\d+)`, this.dataRequestsController.updateDataRequest);
    this.router.delete(`${this.path}/:id(\\d+)`, this.dataRequestsController.deleteDataRequest);
  }
}

export default DataRequestsRoute;

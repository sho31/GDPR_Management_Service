import { Router } from 'express';
import DataController from '@controllers/data.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DataRoute implements Routes {
  public path = '/data';
  public router = Router();
  public dataController = new DataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dataController.getDatas);
    this.router.get(`${this.path}/:id(\\d+)`, this.dataController.getDataById);
    this.router.post(`${this.path}`, this.dataController.createData);
    this.router.put(`${this.path}/:id(\\d+)`, this.dataController.updateData);
    this.router.delete(`${this.path}/:id(\\d+)`, this.dataController.deleteData);
  }
}

export default DataRoute;

import { Router } from 'express';
import DataTypeController from '@controllers/dataType.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DataTypeRoute implements Routes {
  public path = '/dataType';
  public router = Router();
  public dataTypeController = new DataTypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.dataTypeController.getDataTypes);
    this.router.get(`${this.path}/:id(\\d+)`, this.dataTypeController.getDataTypeById);
    this.router.post(`${this.path}`, this.dataTypeController.createDataType);
    this.router.put(`${this.path}/:id(\\d+)`, this.dataTypeController.updateDataType);
    this.router.delete(`${this.path}/:id(\\d+)`, this.dataTypeController.deleteDataType);
  }
}

export default DataTypeRoute;

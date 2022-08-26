import { Router } from 'express';
import DataTypeController from '@controllers/dataType.controller';
import { Routes } from '@interfaces/routes.interface';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class DataTypeRoute implements Routes {
  public path = '/dataType';
  public router = Router();
  public dataTypeController = new DataTypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, apiKeyAuthMiddleware, this.dataTypeController.getDataTypes);
    this.router.get(`${this.path}/getById/:dataTypeID(\\d+)`, apiKeyAuthMiddleware, this.dataTypeController.getDataTypeById);
    this.router.post(`${this.path}/create`, apiKeyAuthMiddleware, this.dataTypeController.createDataType);
    this.router.put(`${this.path}/update/:dataTypeID(\\d+)`, apiKeyAuthMiddleware, this.dataTypeController.updateDataType);
    this.router.delete(`${this.path}/delete/:dataTypeID(\\d+)`, apiKeyAuthMiddleware, this.dataTypeController.deleteDataType);
  }
}

export default DataTypeRoute;

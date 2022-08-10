import { Router } from 'express';
import DataTypeController from '@controllers/dataType.controller';
import { Routes } from '@interfaces/routes.interface';

class DataTypeRoute implements Routes {
  public path = '/dataType';
  public router = Router();
  public dataTypeController = new DataTypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, this.dataTypeController.getDataTypes);
    this.router.get(`${this.path}/getById/:dataTypeID(\\d+)`, this.dataTypeController.getDataTypeById);
    this.router.post(`${this.path}/create`, this.dataTypeController.createDataType);
    this.router.put(`${this.path}/update/:dataTypeID(\\d+)`, this.dataTypeController.updateDataType);
    this.router.delete(`${this.path}/delete/:dataTypeID(\\d+)`, this.dataTypeController.deleteDataType);
  }
}

export default DataTypeRoute;

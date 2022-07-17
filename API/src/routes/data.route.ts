import { Router } from 'express';
import DataController from '@controllers/data.controller';
import { Routes } from '@interfaces/routes.interface';

class DataRoute implements Routes {
  public path = '/data';
  public router = Router();
  public dataController = new DataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, this.dataController.getData);
    this.router.get(`${this.path}/getById/:id(\\d+)`, this.dataController.getDataById);
    this.router.post(`${this.path}/create`, this.dataController.createData);
    this.router.put(`${this.path}/update/:id(\\d+)`, this.dataController.updateData);
    this.router.delete(`${this.path}/delete/:id(\\d+)`, this.dataController.deleteData);
  }
}

export default DataRoute;
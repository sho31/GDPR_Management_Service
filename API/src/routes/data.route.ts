import { Router } from 'express';
import DataController from '@controllers/data.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DatasRoute implements Routes {
  public path = '/datas';
  public router = Router();
  public datasController = new DataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.datasController.getDatas);
    this.router.get(`${this.path}/:id(\\d+)`, this.datasController.getDataById);
    this.router.post(`${this.path}`, this.datasController.createData);
    this.router.put(`${this.path}/:id(\\d+)`, this.datasController.updateData);
    this.router.delete(`${this.path}/:id(\\d+)`, this.datasController.deleteData);
  }
}

export default DatasRoute;

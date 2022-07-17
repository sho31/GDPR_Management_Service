import { Router } from 'express';
import DataSubjectController from '@controllers/dataSubject.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class DataSubjectsRoute implements Routes {
  public path = '/dataSubjects';
  public router = Router();
  public dataSubjectController = new DataSubjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, this.dataSubjectController.getDataSubjects);
    this.router.get(`${this.path}/getById/:id(\\d+)`, this.dataSubjectController.getDataSubjectById);
    this.router.post(`${this.path}/create`, this.dataSubjectController.createDataSubject);
    this.router.put(`${this.path}/update/:id(\\d+)`, this.dataSubjectController.updateDataSubject);
    this.router.delete(`${this.path}/delete/:id(\\d+)`, this.dataSubjectController.deleteDataSubject);
  }
}

export default DataSubjectsRoute;

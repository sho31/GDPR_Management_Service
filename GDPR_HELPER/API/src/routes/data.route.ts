import { Router } from 'express';
import DataController from '@controllers/data.controller';
import { Routes } from '@interfaces/routes.interface';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class DataRoute implements Routes {
  public path = '/data';
  public router = Router();
  public dataController = new DataController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, apiKeyAuthMiddleware, this.dataController.getData);

    this.router.get(`${this.path}/getAllByDataSubjectId/:dataSubjectID(\\d+)`, apiKeyAuthMiddleware, this.dataController.getDataByDataSubjectId); //Method used by datasubject
    this.router.get(
      `${this.path}/getAllWithoutRequestByDataSubjectId/:dataSubjectID(\\d+)`,
      apiKeyAuthMiddleware,
      this.dataController.getDataWithoutRequestsByDataSubjectId,
    ); //Method used by datasubject
    this.router.get(`${this.path}/getById/:dataID(\\d+)`, apiKeyAuthMiddleware, this.dataController.getDataById);
    this.router.post(`${this.path}/create`, apiKeyAuthMiddleware, this.dataController.createData); //Method used by datasubject
    this.router.put(`${this.path}/update/:dataID(\\d+)`, apiKeyAuthMiddleware, this.dataController.updateData);
    this.router.delete(`${this.path}/delete/:dataID(\\d+)`, apiKeyAuthMiddleware, this.dataController.deleteData);
    this.router.delete(
      `${this.path}/deleteAllFromDataSubject/:dataSubjectID(\\d+)`,
      apiKeyAuthMiddleware,
      this.dataController.deleteAllFromDataSubject,
    );
  }
}

export default DataRoute;

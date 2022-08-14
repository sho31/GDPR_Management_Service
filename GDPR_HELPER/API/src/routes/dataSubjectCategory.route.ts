import { Router } from 'express';
import DataSubjectCategoriesController from '@controllers/dataSubjectCategoriesController';
import { Routes } from '@interfaces/routes.interface';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class DataSubjectCategoryRoute implements Routes {
  public path = '/data-subject-category';
  public router = Router();
  public DataSubjectCategoryController = new DataSubjectCategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, apiKeyAuthMiddleware, this.DataSubjectCategoryController.getAllDataSubjectCategory);
    this.router.get(`${this.path}/getById/:dsCategoryID`, apiKeyAuthMiddleware, this.DataSubjectCategoryController.getDataSubjectCategoryById);
    this.router.post(`${this.path}/create`, apiKeyAuthMiddleware, this.DataSubjectCategoryController.createDataSubjectCategory); //TODO : Validation middleware
    this.router.delete(`${this.path}/delete/:dsCategoryID`, apiKeyAuthMiddleware, this.DataSubjectCategoryController.deleteDataSubjectCategory);
  }
}

export default DataSubjectCategoryRoute;

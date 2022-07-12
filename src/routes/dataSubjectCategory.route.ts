import { Router } from 'express';
import DataSubjectCategoriesController from '@controllers/dataSubjectCategoriesController';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import {gdpr_datasubjectcategory} from "@prisma/client";

class DataSubjectCategoryRoute implements Routes {
  public path = '/data-subject-category';
  public router = Router();
  public DataSubjectCategoryController = new DataSubjectCategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.DataSubjectCategoryController.getAllDataSubjectCategory);
    this.router.get(`${this.path}/:dsCategory`, this.DataSubjectCategoryController.getDataSubjectCategoryById);
    this.router.post(`${this.path}`, this.DataSubjectCategoryController.createDataSubjectCategory);//TODO : Validation middleware
    this.router.delete(`${this.path}/:dsCategory`, this.DataSubjectCategoryController.deleteDataSubjectCategory);
  }
}

export default DataSubjectCategoryRoute;

import { Router } from 'express';
import PersonalDataCategoryController from '@controllers/personalDataCategory.controller';
import { Routes } from '@interfaces/routes.interface';

class PersonalDataCategoryRoute implements Routes {
  public path = '/personalDataCategory';
  public router = Router();
  public personalDataCategoryController = new PersonalDataCategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.personalDataCategoryController.getPersonalDataCategories);
    this.router.get(`${this.path}/:id(\\d+)`, this.personalDataCategoryController.getPersonalDataCategoryById);
    this.router.post(`${this.path}`, this.personalDataCategoryController.createPersonalDataCategory);
    this.router.put(`${this.path}/:id(\\d+)`, this.personalDataCategoryController.updatePersonalDataCategory);
    this.router.delete(`${this.path}/:id(\\d+)`, this.personalDataCategoryController.deletePersonalDataCategory);
  }
}

export default PersonalDataCategoryRoute;

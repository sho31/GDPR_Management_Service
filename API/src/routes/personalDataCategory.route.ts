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
    this.router.get(`${this.path}/getAll`, this.personalDataCategoryController.getPersonalDataCategories);
    this.router.get(`${this.path}/getById/:id(\\d+)`, this.personalDataCategoryController.getPersonalDataCategoryById);
    this.router.post(`${this.path}/create`, this.personalDataCategoryController.createPersonalDataCategory);
    this.router.put(`${this.path}/update/:id(\\d+)`, this.personalDataCategoryController.updatePersonalDataCategory);
    this.router.delete(`${this.path}/delete/:id(\\d+)`, this.personalDataCategoryController.deletePersonalDataCategory);
  }
}

export default PersonalDataCategoryRoute;

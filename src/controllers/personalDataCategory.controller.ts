import { NextFunction, Request, Response } from 'express';
import { gdpr_personaldatacategory } from '@prisma/client';
import personalDataCategorieservice from '@services/personalDataCategory.service';

class PersonalDataCategoriesController {
  public personalDataCategorieservice = new personalDataCategorieservice();

  public getPersonalDataCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPersonalDataCategoriesData: gdpr_personaldatacategory[] = await this.personalDataCategorieservice.findAllPersonalDataCategory();

      res.status(200).json({ data: findAllPersonalDataCategoriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPersonalDataCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.id);
      const findOnePersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategorieservice.findPersonalDataCategoryById(personalDataCategoryId);

      res.status(200).json({ data: findOnePersonalDataCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryData: gdpr_personaldatacategory = req.body;
      const createPersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategorieservice.createPersonalDataCategory(personalDataCategoryData);

      res.status(201).json({ data: createPersonalDataCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.id);
      const personalDataCategoryData: gdpr_personaldatacategory = req.body;
      const updatePersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategorieservice.updatePersonalDataCategory(personalDataCategoryId, personalDataCategoryData);

      res.status(200).json({ data: updatePersonalDataCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.id);
      const deletePersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategorieservice.deletePersonalDataCategory(personalDataCategoryId);

      res.status(200).json({ data: deletePersonalDataCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PersonalDataCategoriesController;

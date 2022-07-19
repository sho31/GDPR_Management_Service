import { NextFunction, Request, Response } from 'express';
import { gdpr_personaldatacategory } from '@prisma/client';
import personalDataCategoryService from '@services/personalDataCategory.service';

class PersonalDataCategoriesController {
  public personalDataCategoryService = new personalDataCategoryService();

  public getPersonalDataCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('getPersonalDataCategories');
      const findAllPersonalDataCategoriesData: gdpr_personaldatacategory[] = await this.personalDataCategoryService.findAllPersonalDataCategory();

      res.status(200).json({ data: findAllPersonalDataCategoriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPersonalDataCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.PDCategoryID);
      const findOnePersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategoryService.findPersonalDataCategoryById(
        personalDataCategoryId,
      );

      res.status(200).json({ data: findOnePersonalDataCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryData: gdpr_personaldatacategory = req.body;
      const createPersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategoryService.createPersonalDataCategory(
        personalDataCategoryData,
      );

      res.status(201).json({ data: createPersonalDataCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.PDCategoryID);
      const personalDataCategoryData: gdpr_personaldatacategory = req.body;
      const updatePersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategoryService.updatePersonalDataCategory(
        personalDataCategoryId,
        personalDataCategoryData,
      );

      res.status(200).json({ data: updatePersonalDataCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.PDCategoryID);
      const deletePersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategoryService.deletePersonalDataCategory(
        personalDataCategoryId,
      );

      res.status(200).json({ data: deletePersonalDataCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PersonalDataCategoriesController;

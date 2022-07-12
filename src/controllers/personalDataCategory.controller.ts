import { NextFunction, Request, Response } from 'express';
import { PersonalDataCategory } from '@prisma/client';
import { CreatePersonalDataCategoryDto } from '@dtos/personalDataCategories.dto';
import personalDataCategorieservice from '@services/personalDataCategories.service';

class PersonalDataCategoriesController {
  public personalDataCategorieservice = new personalDataCategorieservice();

  public getPersonalDataCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPersonalDataCategoriesData: PersonalDataCategory[] = await this.personalDataCategorieservice.findAllPersonalDataCategory();

      res.status(200).json({ data: findAllPersonalDataCategoriesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getPersonalDataCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.id);
      const findOnePersonalDataCategoryData: PersonalDataCategory = await this.personalDataCategorieservice.findPersonalDataCategoryById(personalDataCategoryId);

      res.status(200).json({ data: findOnePersonalDataCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryData: CreatePersonalDataCategoryDto = req.body;
      const createPersonalDataCategoryData: PersonalDataCategory = await this.personalDataCategorieservice.createPersonalDataCategory(personalDataCategoryData);

      res.status(201).json({ data: createPersonalDataCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.id);
      const personalDataCategoryData: CreatePersonalDataCategoryDto = req.body;
      const updatePersonalDataCategoryData: PersonalDataCategory = await this.personalDataCategorieservice.updatePersonalDataCategory(personalDataCategoryId, personalDataCategoryData);

      res.status(200).json({ data: updatePersonalDataCategoryData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePersonalDataCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const personalDataCategoryId = Number(req.params.id);
      const deletePersonalDataCategoryData: PersonalDataCategory = await this.personalDataCategorieservice.deletePersonalDataCategory(personalDataCategoryId);

      res.status(200).json({ data: deletePersonalDataCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default PersonalDataCategoriesController;

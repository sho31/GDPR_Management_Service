import { NextFunction, Request, Response } from 'express';
import { gdpr_datasubjectcategory } from '@prisma/client';
import DataSubjectCategoryService from '@services/dataSubjectCategory.service';

class DataSubjectCategoriesController {
  public dataSubjectCategoryService = new DataSubjectCategoryService();

  public getAllDataSubjectCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDataSubjectCategoryData: gdpr_datasubjectcategory[] = await this.dataSubjectCategoryService.findAllDataSubjectCategory();

      res.status(200).json({ data: findAllDataSubjectCategoryData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataSubjectCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dsCategory = req.params.dsCategoryID;
      const findOneDataSubjectCategoryData: gdpr_datasubjectcategory = await this.dataSubjectCategoryService.findDataSubjectCategoryById(dsCategory);

      res.status(200).json({ data: findOneDataSubjectCategoryData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDataSubjectCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectCategoryData: gdpr_datasubjectcategory = req.body;
      const createDataSubjectCategoryData: gdpr_datasubjectcategory = await this.dataSubjectCategoryService.createDataSubjectCategory(
        dataSubjectCategoryData,
      );

      res.status(201).json({ data: createDataSubjectCategoryData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDataSubjectCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dsCategory = req.params.dsCategoryID;
      const deleteDataSubjectCategoryData: gdpr_datasubjectcategory = await this.dataSubjectCategoryService.deleteDataSubjectCategory(dsCategory);

      res.status(200).json({ data: deleteDataSubjectCategoryData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataSubjectCategoriesController;

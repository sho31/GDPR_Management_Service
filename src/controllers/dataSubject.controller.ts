import { NextFunction, Request, Response } from 'express';
import { gdpr_datasubject } from '@prisma/client';
import dataSubjectService from '@services/dataSubject.service';

class DataSubjectsController {
  public dataSubjectService = new dataSubjectService();

  public getDataSubjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDataSubjectsData: gdpr_datasubject[] = await this.dataSubjectService.findAllDataSubject();

      res.status(200).json({ data: findAllDataSubjectsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataSubjectById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectId = Number(req.params.id);
      const findOneDataSubjectData: gdpr_datasubject = await this.dataSubjectService.findDataSubjectById(dataSubjectId);

      res.status(200).json({ data: findOneDataSubjectData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDataSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectData: gdpr_datasubject = req.body;
      const createDataSubjectData: gdpr_datasubject = await this.dataSubjectService.createDataSubject(dataSubjectData);

      res.status(201).json({ data: createDataSubjectData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDataSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectId = Number(req.params.id);
      const dataSubjectData: gdpr_datasubject = req.body;
      const updateDataSubjectData: gdpr_datasubject = await this.dataSubjectService.updateDataSubject(dataSubjectId, dataSubjectData);

      res.status(200).json({ data: updateDataSubjectData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDataSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectId = Number(req.params.id);
      const deleteDataSubjectData: gdpr_datasubject = await this.dataSubjectService.deleteDataSubject(dataSubjectId);

      res.status(200).json({ data: deleteDataSubjectData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataSubjectsController;

import { NextFunction, Request, Response } from 'express';
import { gdpr_data, gdpr_datarequest } from '@prisma/client';
import { BatchPayload } from '@/types/generalTypes';
import dataService from '@services/data.service';

class DataController {
  public dataService = new dataService();

  public getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllData: gdpr_data[] = await this.dataService.findAllData();

      res.status(200).json({ data: findAllData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public getDataByDataSubjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectID = Number(req.params.dataSubjectID);
      const findDataRequestsData: gdpr_data[] = await this.dataService.findAllDataBySubjectId(dataSubjectID);

      res.status(200).json({ data: findDataRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataWithoutRequestsByDataSubjectId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectID = Number(req.params.dataSubjectID);
      const findDataRequestsData: gdpr_data[] = await this.dataService.findAllDataWithoutDataRequestBySubjectId(dataSubjectID);

      res.status(200).json({ data: findDataRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.dataID);
      const findOneDataData: gdpr_data = await this.dataService.findDataById(dataId);

      res.status(200).json({ data: findOneDataData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: gdpr_data = req.body;
      const createDataData: gdpr_data = await this.dataService.createData(data);

      res.status(201).json({ data: createDataData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.dataID);
      const data: gdpr_data = req.body;
      const updateDataData: gdpr_data = await this.dataService.updateData(dataId, data);

      res.status(200).json({ data: updateDataData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.dataID);
      const deleteDataData: gdpr_data = await this.dataService.deleteData(dataId);

      res.status(200).json({ data: deleteDataData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAllFromDataSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectID = Number(req.params.dataSubjectID);
      const deletedData: BatchPayload = await this.dataService.deleteAllFromDataSubject(dataSubjectID);

      res.status(200).json({ data: deletedData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
  public flagAsDeleted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.dataID);
      const deleteDataData: gdpr_data = await this.dataService.flagAsDeleted(dataId);

      res.status(200).json({ data: deleteDataData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public flagAllAsDeletedFromDataSubject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataSubjectID = Number(req.params.dataSubjectID);
      const deletedData: gdpr_data[] = await this.dataService.flagAllFromDataSubjectAsDeleted(dataSubjectID);

      res.status(200).json({ data: deletedData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataController;

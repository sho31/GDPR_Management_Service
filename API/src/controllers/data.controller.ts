import { NextFunction, Request, Response } from 'express';
import { gdpr_data } from '@prisma/client';
import dataService from '@services/data.service';

class DataController {
  public dataService = new dataService();

  public getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDatasData: gdpr_data[] = await this.dataService.findAllData();

      res.status(200).json({ data: findAllDatasData, message: 'findAll' });
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
      const dataData: gdpr_data = req.body;
      const createDataData: gdpr_data = await this.dataService.createData(dataData);

      res.status(201).json({ data: createDataData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.dataID);
      const dataData: gdpr_data = req.body;
      const updateDataData: gdpr_data = await this.dataService.updateData(dataId, dataData);

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
}

export default DataController;

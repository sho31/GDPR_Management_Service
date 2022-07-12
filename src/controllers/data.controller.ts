import { NextFunction, Request, Response } from 'express';
import { gdpr_data } from '@prisma/client';
import { CreateDataDto } from '@dtos/datas.dto';
import dataService from '@services/datas.service';

class DataController {
  public dataService = new dataService();

  public getDatas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDatasData: Data[] = await this.dataService.findAllData();

      res.status(200).json({ data: findAllDatasData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.id);
      const findOneDataData: Data = await this.dataService.findDataById(dataId);

      res.status(200).json({ data: findOneDataData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataData: CreateDataDto = req.body;
      const createDataData: Data = await this.dataService.createData(dataData);

      res.status(201).json({ data: createDataData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.id);
      const dataData: CreateDataDto = req.body;
      const updateDataData: Data = await this.dataService.updateData(dataId, dataData);

      res.status(200).json({ data: updateDataData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataId = Number(req.params.id);
      const deleteDataData: Data = await this.dataService.deleteData(dataId);

      res.status(200).json({ data: deleteDataData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataController;

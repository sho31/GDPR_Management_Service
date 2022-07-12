import { NextFunction, Request, Response } from 'express';
import { DataRequest } from '@prisma/client';
import { CreateDataRequestDto } from '@dtos/dataRequests.dto';
import dataRequestService from '@services/dataRequests.service';

class DataRequestsController {
  public dataRequestService = new dataRequestService();

  public getDataRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDataRequestsData: DataRequest[] = await this.dataRequestService.findAllDataRequest();

      res.status(200).json({ data: findAllDataRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestId = Number(req.params.id);
      const findOneDataRequestData: DataRequest = await this.dataRequestService.findDataRequestById(dataRequestId);

      res.status(200).json({ data: findOneDataRequestData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDataRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestData: CreateDataRequestDto = req.body;
      const createDataRequestData: DataRequest = await this.dataRequestService.createDataRequest(dataRequestData);

      res.status(201).json({ data: createDataRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDataRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestId = Number(req.params.id);
      const dataRequestData: CreateDataRequestDto = req.body;
      const updateDataRequestData: DataRequest = await this.dataRequestService.updateDataRequest(dataRequestId, dataRequestData);

      res.status(200).json({ data: updateDataRequestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDataRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestId = Number(req.params.id);
      const deleteDataRequestData: DataRequest = await this.dataRequestService.deleteDataRequest(dataRequestId);

      res.status(200).json({ data: deleteDataRequestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataRequestsController;

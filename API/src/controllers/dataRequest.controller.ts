import { NextFunction, Request, Response } from 'express';
import { gdpr_datarequest } from '@prisma/client';
import dataRequestService from '@services/dataRequest.service';

class DataRequestsController {
  public dataRequestService = new dataRequestService();

  public getDataRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDataRequestsData: gdpr_datarequest[] = await this.dataRequestService.findAllDataRequest();

      res.status(200).json({ data: findAllDataRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public getUnansweredDataRequests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDataRequestsData: gdpr_datarequest[] = await this.dataRequestService.findAllUnansweredDataRequest();

      res.status(200).json({ data: findAllDataRequestsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataRequestById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestId = Number(req.params.DataRequestID);
      const findOneDataRequestData: gdpr_datarequest = await this.dataRequestService.findDataRequestById(dataRequestId);

      res.status(200).json({ data: findOneDataRequestData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDataRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestData: gdpr_datarequest = req.body;
      const createDataRequestData: gdpr_datarequest = await this.dataRequestService.createDataRequest(dataRequestData);

      res.status(201).json({ data: createDataRequestData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDataRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestId = Number(req.params.DataRequestID);
      const dataRequestData: gdpr_datarequest = req.body;
      const updateDataRequestData: gdpr_datarequest = await this.dataRequestService.updateDataRequest(dataRequestId, dataRequestData);

      res.status(200).json({ data: updateDataRequestData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDataRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataRequestId = Number(req.params.DataRequestID);
      const deleteDataRequestData: gdpr_datarequest = await this.dataRequestService.deleteDataRequest(dataRequestId);

      res.status(200).json({ data: deleteDataRequestData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataRequestsController;

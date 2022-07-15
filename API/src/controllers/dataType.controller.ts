import { NextFunction, Request, Response } from 'express';
import { gdpr_datatype } from '@prisma/client';
import dataTypeService from '@services/dataType.service';

class DataTypesController {
  public dataTypeService = new dataTypeService();

  public getDataTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDataTypesData: gdpr_datatype[] = await this.dataTypeService.findAllDataType();

      res.status(200).json({ data: findAllDataTypesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeId = Number(req.params.id);
      const findOneDataTypeData: gdpr_datatype = await this.dataTypeService.findDataTypeById(dataTypeId);

      res.status(200).json({ data: findOneDataTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDataType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeData: gdpr_datatype = req.body;
      const createDataTypeData: gdpr_datatype = await this.dataTypeService.createDataType(dataTypeData);

      res.status(201).json({ data: createDataTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDataType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeId = Number(req.params.id);
      const dataTypeData: gdpr_datatype = req.body;
      const updateDataTypeData: gdpr_datatype = await this.dataTypeService.updateDataType(dataTypeId, dataTypeData);

      res.status(200).json({ data: updateDataTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDataType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeId = Number(req.params.id);
      const deleteDataTypeData: gdpr_datatype = await this.dataTypeService.deleteDataType(dataTypeId);

      res.status(200).json({ data: deleteDataTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataTypesController;

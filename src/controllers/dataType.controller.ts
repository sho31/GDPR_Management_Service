import { NextFunction, Request, Response } from 'express';
import { DataType } from '@prisma/client';
import { CreateDataTypeDto } from '@dtos/dataTypes.dto';
import dataTypeService from '@services/dataTypes.service';

class DataTypesController {
  public dataTypeService = new dataTypeService();

  public getDataTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDataTypesData: DataType[] = await this.dataTypeService.findAllDataType();

      res.status(200).json({ data: findAllDataTypesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDataTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeId = Number(req.params.id);
      const findOneDataTypeData: DataType = await this.dataTypeService.findDataTypeById(dataTypeId);

      res.status(200).json({ data: findOneDataTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDataType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeData: CreateDataTypeDto = req.body;
      const createDataTypeData: DataType = await this.dataTypeService.createDataType(dataTypeData);

      res.status(201).json({ data: createDataTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDataType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeId = Number(req.params.id);
      const dataTypeData: CreateDataTypeDto = req.body;
      const updateDataTypeData: DataType = await this.dataTypeService.updateDataType(dataTypeId, dataTypeData);

      res.status(200).json({ data: updateDataTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDataType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataTypeId = Number(req.params.id);
      const deleteDataTypeData: DataType = await this.dataTypeService.deleteDataType(dataTypeId);

      res.status(200).json({ data: deleteDataTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default DataTypesController;

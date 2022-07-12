import { NextFunction, Request, Response } from 'express';
import { Provider } from '@prisma/client';
import { CreateProviderDto } from '@dtos/providers.dto';
import providerService from '@services/providers.service';

class ProvidersController {
  public providerService = new providerService();

  public getProviders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllProvidersData: Provider[] = await this.providerService.findAllProvider();

      res.status(200).json({ data: findAllProvidersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProviderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerId = Number(req.params.id);
      const findOneProviderData: Provider = await this.providerService.findProviderById(providerId);

      res.status(200).json({ data: findOneProviderData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerData: CreateProviderDto = req.body;
      const createProviderData: Provider = await this.providerService.createProvider(providerData);

      res.status(201).json({ data: createProviderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerId = Number(req.params.id);
      const providerData: CreateProviderDto = req.body;
      const updateProviderData: Provider = await this.providerService.updateProvider(providerId, providerData);

      res.status(200).json({ data: updateProviderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerId = Number(req.params.id);
      const deleteProviderData: Provider = await this.providerService.deleteProvider(providerId);

      res.status(200).json({ data: deleteProviderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProvidersController;

import { NextFunction, Request, Response } from 'express';
import { gdpr_provider } from '@prisma/client';
import providerService from '@services/provider.service';

class ProvidersController {
  public providerService = new providerService();

  public getProviders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllProvidersData: gdpr_provider[] = await this.providerService.findAllProvider();

      res.status(200).json({ data: findAllProvidersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProviderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerId = Number(req.params.id);
      const findOneProviderData: gdpr_provider = await this.providerService.findProviderByID(providerId);

      res.status(200).json({ data: findOneProviderData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerData: gdpr_provider = req.body;
      const createProviderData: gdpr_provider = await this.providerService.createProvider(providerData);

      res.status(201).json({ data: createProviderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerId = Number(req.params.id);
      const providerData: gdpr_provider = req.body;
      const updateProviderData: gdpr_provider = await this.providerService.updateProvider(providerId, providerData);

      res.status(200).json({ data: updateProviderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const providerId = Number(req.params.id);
      const deleteProviderData: gdpr_provider = await this.providerService.deleteProvider(providerId);

      res.status(200).json({ data: deleteProviderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProvidersController;

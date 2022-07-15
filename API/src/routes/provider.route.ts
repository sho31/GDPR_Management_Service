import { Router } from 'express';
import ProviderController from '@controllers/provider.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ProviderRoute implements Routes {
  public path = '/provider';
  public router = Router();
  public providerController = new ProviderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.providerController.getProviders);
    this.router.get(`${this.path}/:id(\\d+)`, this.providerController.getProviderById);
    this.router.post(`${this.path}`, this.providerController.createProvider);
    this.router.put(`${this.path}/:id(\\d+)`, this.providerController.updateProvider);
    this.router.delete(`${this.path}/:id(\\d+)`, this.providerController.deleteProvider);
  }
}

export default ProviderRoute;

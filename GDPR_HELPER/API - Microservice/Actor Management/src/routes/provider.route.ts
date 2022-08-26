import { Router } from 'express';
import ProviderController from '@controllers/provider.controller';
import { Routes } from '@interfaces/routes.interface';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class ProviderRoute implements Routes {
  public path = '/provider';
  public router = Router();
  public providerController = new ProviderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, apiKeyAuthMiddleware, this.providerController.getProviders);
    this.router.get(`${this.path}/getById/:providerID(\\d+)`, apiKeyAuthMiddleware, this.providerController.getProviderById);
    this.router.post(`${this.path}/create`, apiKeyAuthMiddleware, this.providerController.createProvider);
    this.router.put(`${this.path}/update/:providerID(\\d+)`, apiKeyAuthMiddleware, this.providerController.updateProvider);
    this.router.delete(`${this.path}/delete/:providerID(\\d+)`, apiKeyAuthMiddleware, this.providerController.deleteProvider);
  }
}

export default ProviderRoute;

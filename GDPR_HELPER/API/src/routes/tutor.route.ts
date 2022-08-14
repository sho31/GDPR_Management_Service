import { Router } from 'express';
import TutorController from '@controllers/tutor.controller';
import { Routes } from '@interfaces/routes.interface';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class TutorRoute implements Routes {
  public path = '/tutor';
  public router = Router();
  public tutorController = new TutorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, apiKeyAuthMiddleware, this.tutorController.getTutors);
    this.router.get(`${this.path}/getById/:tutorID(\\d+)`, apiKeyAuthMiddleware, this.tutorController.getTutorById);
    this.router.post(`${this.path}/create`, apiKeyAuthMiddleware, this.tutorController.createTutor);
    this.router.put(`${this.path}/update/:tutorID(\\d+)`, apiKeyAuthMiddleware, this.tutorController.updateTutor);
    this.router.delete(`${this.path}/delete/:tutorID(\\d+)`, apiKeyAuthMiddleware, this.tutorController.deleteTutor);
  }
}

export default TutorRoute;

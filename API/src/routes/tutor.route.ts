import { Router } from 'express';
import TutorController from '@controllers/tutor.controller';
import { Routes } from '@interfaces/routes.interface';

class TutorRoute implements Routes {
  public path = '/tutor';
  public router = Router();
  public tutorController = new TutorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tutorController.getTutors);
    this.router.get(`${this.path}/:id(\\d+)`, this.tutorController.getTutorById);
    this.router.post(`${this.path}`, this.tutorController.createTutor);
    this.router.put(`${this.path}/:id(\\d+)`, this.tutorController.updateTutor);
    this.router.delete(`${this.path}/:id(\\d+)`, this.tutorController.deleteTutor);
  }
}

export default TutorRoute;

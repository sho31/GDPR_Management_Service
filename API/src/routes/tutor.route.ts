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
    this.router.get(`${this.path}/getAll`, this.tutorController.getTutors);
    this.router.get(`${this.path}/getById/:id(\\d+)`, this.tutorController.getTutorById);
    this.router.post(`${this.path}/create`, this.tutorController.createTutor);
    this.router.put(`${this.path}/update/:id(\\d+)`, this.tutorController.updateTutor);
    this.router.delete(`${this.path}/delete/:id(\\d+)`, this.tutorController.deleteTutor);
  }
}

export default TutorRoute;

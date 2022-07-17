import { Router } from 'express';
import AnswersController from '@controllers/answer.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AnswersRoute implements Routes {
  public path = '/answers';
  public router = Router();
  public answersController = new AnswersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, this.answersController.getAnswers);
    this.router.get(`${this.path}/getById/:id(\\d+)`, this.answersController.getAnswerById);
    this.router.post(`${this.path}/create`, this.answersController.createAnswer);
    this.router.put(`${this.path}/update/:id(\\d+)`, this.answersController.updateAnswer);
    this.router.delete(`${this.path}/delete/:id(\\d+)`, this.answersController.deleteAnswer);
  }
}

export default AnswersRoute;

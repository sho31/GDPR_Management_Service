import { Router } from 'express';
import AnswersController from '@controllers/answer.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class AnswersRoute implements Routes {
  public path = '/dataRequestAnswer';
  public router = Router();
  public answersController = new AnswersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, this.answersController.getAnswers);
    this.router.get(`${this.path}/getAllUnprocessedDataRequestAnswers`, this.answersController.getUnprocessedAnswers);
    this.router.get(`${this.path}/getById/:dataRequestAnswerId(\\d+)`, this.answersController.getAnswerById);
    this.router.post(`${this.path}/create`, this.answersController.createAnswer);
    this.router.put(`${this.path}/update/:dataRequestAnswerId(\\d+)`, this.answersController.updateAnswer);
    this.router.put(`${this.path}/process/:dataRequestAnswerId(\\d+)`, this.answersController.processAnswer);
    this.router.delete(`${this.path}/delete/:dataRequestAnswerId(\\d+)`, this.answersController.deleteAnswer);
  }
}

export default AnswersRoute;

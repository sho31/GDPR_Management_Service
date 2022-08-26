import { Router } from 'express';
import AnswersController from '@controllers/answer.controller';
import { Routes } from '@interfaces/routes.interface';
import apiKeyAuthMiddleware from '@middlewares/apiKey.middleware';

class AnswersRoute implements Routes {
  public path = '/dataRequestAnswer';
  public router = Router();
  public answersController = new AnswersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/getAll`, apiKeyAuthMiddleware, this.answersController.getAnswers);
    this.router.get(`${this.path}/getAllUnprocessedDataRequestAnswers`, apiKeyAuthMiddleware, this.answersController.getUnprocessedAnswers);
    this.router.get(`${this.path}/getById/:dataRequestAnswerId(\\d+)`, apiKeyAuthMiddleware, this.answersController.getAnswerById);
    this.router.post(`${this.path}/create`, apiKeyAuthMiddleware, this.answersController.createAnswer);
    this.router.put(`${this.path}/update/:dataRequestAnswerId(\\d+)`, apiKeyAuthMiddleware, this.answersController.updateAnswer);
    this.router.put(`${this.path}/process/:dataRequestAnswerId(\\d+)`, apiKeyAuthMiddleware, this.answersController.processAnswer);
    this.router.delete(`${this.path}/delete/:dataRequestAnswerId(\\d+)`, apiKeyAuthMiddleware, this.answersController.deleteAnswer);
  }
}

export default AnswersRoute;

import { NextFunction, Request, Response } from 'express';
import { gdpr_datarequestanswer } from '@prisma/client';
import answerService from '@services/answer.service';

class AnswersController {
  public answerService = new answerService();

  public getAnswers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAnswersData: gdpr_datarequestanswer[] = await this.answerService.findAllAnswer();

      res.status(200).json({ data: findAllAnswersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
  public getUnprocessedAnswers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAnswersData: gdpr_datarequestanswer[] = await this.answerService.findAllUnprocessedAnswer();

      res.status(200).json({ data: findAllAnswersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAnswerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const answerId = Number(req.params.dataRequestAnswerId);
      const findOneAnswerData: gdpr_datarequestanswer = await this.answerService.findAnswerById(answerId);

      res.status(200).json({ data: findOneAnswerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAnswer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const answerData: gdpr_datarequestanswer = req.body;
      const createAnswerData: gdpr_datarequestanswer = await this.answerService.createAnswer(answerData);
      res.status(201).json({ data: createAnswerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAnswer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const answerId = Number(req.params.dataRequestAnswerId);
      const answerData: gdpr_datarequestanswer = req.body;
      const updateAnswerData: gdpr_datarequestanswer = await this.answerService.updateAnswer(answerId, answerData);

      res.status(200).json({ data: updateAnswerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public processAnswer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const answerId = Number(req.params.dataRequestAnswerId);
      const updateAnswerData: gdpr_datarequestanswer = await this.answerService.processAnswer(answerId);
      res.status(200).json({ data: updateAnswerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAnswer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const answerId = Number(req.params.dataRequestAnswerId);
      const deleteAnswerData: gdpr_datarequestanswer = await this.answerService.deleteAnswer(answerId);

      res.status(200).json({ data: deleteAnswerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AnswersController;

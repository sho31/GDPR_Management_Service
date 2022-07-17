import { NextFunction, Request, Response } from 'express';
import { gdpr_tutor } from '@prisma/client';
import tutorService from '@services/tutor.service';

class TutorsController {
  public tutorService = new tutorService();

  public getTutors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllTutorsData: gdpr_tutor[] = await this.tutorService.findAllTutor();

      res.status(200).json({ data: findAllTutorsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTutorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tutorId = Number(req.params.id);
      const findOneTutorData: gdpr_tutor = await this.tutorService.findTutorById(tutorId);

      res.status(200).json({ data: findOneTutorData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tutorData: gdpr_tutor = req.body;
      const createTutorData: gdpr_tutor = await this.tutorService.createTutor(tutorData);

      res.status(201).json({ data: createTutorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tutorId = Number(req.params.id);
      const tutorData: gdpr_tutor = req.body;
      const updateTutorData: gdpr_tutor = await this.tutorService.updateTutor(tutorId, tutorData);

      res.status(200).json({ data: updateTutorData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTutor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tutorId = Number(req.params.id);
      const deleteTutorData: gdpr_tutor = await this.tutorService.deleteTutor(tutorId);

      res.status(200).json({ data: deleteTutorData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TutorsController;

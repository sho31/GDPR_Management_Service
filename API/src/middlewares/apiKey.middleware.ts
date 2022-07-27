import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, CustomRequest } from '@interfaces/auth.interface';

const apiKeyAuthMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const apiKey: string = req.headers['api-key'];
    console.info(apiKey);
    console.log(req.path);
    if (apiKey === 'abc') {
      next();
    } else {
      next(new HttpException(401, 'Wrong api key'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong or no api key provided'));
  }
};

export default apiKeyAuthMiddleware;

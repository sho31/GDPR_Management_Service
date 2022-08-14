import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { PrismaClient, gdpr_datasubject } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, CustomRequest } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';

const dataSubjects = new PrismaClient().gdpr_datasubject;

const getApiKeyFromUser = async function (dataSubjectId: number): Promise<String> {
  if (isEmpty(dataSubjectId)) throw new HttpException(400, 'There is no  dataSubjectID provided');

  const findDataSubject: gdpr_datasubject = await dataSubjects.findUnique({ where: { dataSubjectID: dataSubjectId } });
  console.log('findDataSubject', findDataSubject);
  if (!findDataSubject) throw new HttpException(409, 'There is no dataSubject with the given ID');

  return findDataSubject.apiKey;
};

//true if the key corresponds to the secret key of the data subject
const checkApiKeyDataSubject = async (dataSubjectID: number, apiKeyHeader: String) => {
  console.log('eeee');

  const apiKeyFromDataSubject = await getApiKeyFromUser(dataSubjectID);
  console.log('apiKeyFromDataSubject', apiKeyFromDataSubject);
  console.log('eeee');

  return apiKeyFromDataSubject === apiKeyHeader;
};
const checkApiKeyAdmin = async (apiKeyHeader: String) => {
  return apiKeyHeader === process.env.ADMIN_API_KEY;
};

const apiKeyAuthMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const apiKeyHeader: string = req.headers['api-key'];
    console.info(apiKeyHeader);
    console.log('path', req.path);
    console.log('body', req.body);
    console.log('query', req.params);

    if (req.path.includes('/data/getAllByDataSubjectId/') || req.path.includes('/dataRequest/create')) {
      if (req.path.includes('/data/getAllByDataSubjectId/')) {
        if (await checkApiKeyDataSubject(Number(req.params.dataSubjectID), apiKeyHeader)) {
          next();
        } else {
          next(new HttpException(401, 'Wrong or no api key provided'));
        }
      } else {
        if (await checkApiKeyDataSubject(Number(req.body.dataSubjectID), apiKeyHeader)) {
          next();
        } else {
          next(new HttpException(401, 'Wrong or no api key provided'));
        }
      }
    } else {
      //Admin methods
      if (await checkApiKeyAdmin(apiKeyHeader)) {
        next();
      } else {
        next(new HttpException(401, 'Wrong or no api key provided'));
      }
    }
  } catch (error) {
    next(new HttpException(401, error.message));
  }
};

export default apiKeyAuthMiddleware;

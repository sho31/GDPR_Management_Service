import { gdpr_datarequestanswer, gdpr_datarequest, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import fetch from 'node-fetch';
import DataService from '@services/data.service';
import dataRequestService from '@services/dataRequest.service';

class AnswerService {
  public dataService = new DataService();
  public dataRequestService = new dataRequestService();

  public answers = new PrismaClient({
    errorFormat: 'minimal',
  }).gdpr_datarequestanswer;

  public async findAllAnswer(): Promise<gdpr_datarequestanswer[]> {
    return await this.answers.findMany();
  }
  public async findAllUnprocessedAnswer(): Promise<gdpr_datarequestanswer[]> {
    return await this.answers.findMany({
      where: { processedAnswer: false },
      include: {
        gdpr_datarequest: {
          include: { gdpr_data: true },
        },
      },
    });
  }

  public async findAnswerById(dataRequestAnswerId: number): Promise<gdpr_datarequestanswer> {
    if (isEmpty(dataRequestAnswerId)) throw new HttpException(400, 'There is no dataRequestAnswerId provided');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerId: dataRequestAnswerId } });
    if (!findAnswer) throw new HttpException(404, 'There is no answer with the given id ' + dataRequestAnswerId);

    return findAnswer;
  }

  public async createAnswer(answerData: gdpr_datarequestanswer): Promise<gdpr_datarequestanswer> {
    if (isEmpty(answerData)) throw new HttpException(400, 'There is no answerData');
    if (answerData.processedAnswer === undefined) {
      answerData.processedAnswer = false;
    }
    try {
      console.log(answerData);
      const res = await this.answers.create({
        data: {
          acceptedRequest: Boolean(answerData.acceptedRequest),
          justification: answerData.justification,
          processedAnswer: Boolean(answerData.processedAnswer),
          DataRequestID: Number(answerData.DataRequestID),
        },
      });
      const dataRequest = await this.dataRequestService.findDataRequestById(answerData.DataRequestID);
      if (dataRequest.dataReqType === 'DELETION' && answerData.acceptedRequest === true) {
        await this.dataService.flagAsDeleted(answerData.DataRequestID);
      }
      if (dataRequest.dataReqType === 'FORGET' && answerData.acceptedRequest === true) {
        const request: gdpr_datarequest = await this.dataRequestService.findDataRequestById(answerData.DataRequestID);
        await this.dataService.flagAllFromDataSubjectAsDeleted(request.dataSubjectID);
      }
      fetch(process.env.API_ENDPOINT_PROCESS_DATA_REQUEST_ANSWERS);
      return res;
      //Call the api endpoint to notify the application that an answer has been created
    } catch (e) {
      throw new HttpException(400, 'Data in the body is not valid :\n ' + e);
    }
  }

  public async updateAnswer(dataRequestAnswerId: number, answerData: gdpr_datarequestanswer): Promise<gdpr_datarequestanswer> {
    if (isEmpty(answerData)) throw new HttpException(400, 'There is no answerData provided');
    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerId: dataRequestAnswerId } });
    if (!findAnswer) throw new HttpException(404, 'There is no answer with this id ' + dataRequestAnswerId);

    return await this.answers.update({
      where: { dataRequestAnswerId: dataRequestAnswerId },
      data: {
        acceptedRequest: Boolean(answerData.acceptedRequest),
        justification: answerData.justification,
        processedAnswer: Boolean(answerData.processedAnswer),
        DataRequestID: Number(answerData.DataRequestID),
      },
    });
  }
  public async processAnswer(dataRequestAnswerId: number): Promise<gdpr_datarequestanswer> {
    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerId: dataRequestAnswerId } });
    if (!findAnswer) throw new HttpException(404, 'There is no answer with this id ' + dataRequestAnswerId);

    return await this.answers.update({
      where: { dataRequestAnswerId: dataRequestAnswerId },
      data: {
        acceptedRequest: Boolean(findAnswer.acceptedRequest),
        justification: findAnswer.justification,
        processedAnswer: Boolean(true),
        DataRequestID: Number(findAnswer.DataRequestID),
      },
    });
  }

  public async deleteAnswer(dataRequestAnswerId: number): Promise<gdpr_datarequestanswer> {
    if (isEmpty(dataRequestAnswerId)) throw new HttpException(400, 'There is no  DataRequestAnswer ID provided');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerId: dataRequestAnswerId } });
    if (!findAnswer) throw new HttpException(404, 'There is no DataRequestAnswer  with the given ID');

    return await this.answers.delete({ where: { dataRequestAnswerId: dataRequestAnswerId } });
  }
}

export default AnswerService;

import { gdpr_datarequestanswer, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class AnswerService {
  public answers = new PrismaClient({
    errorFormat: 'minimal',
  }).gdpr_datarequestanswer;

  public async findAllAnswer(): Promise<gdpr_datarequestanswer[]> {
    return await this.answers.findMany();
  }
  public async findAllUnprocessedAnswer(): Promise<gdpr_datarequestanswer[]> {
    return await this.answers.findMany({ where: { processedAnswer: false } });
  }

  public async findAnswerById(dataRequestAnswerId: number): Promise<gdpr_datarequestanswer> {
    if (isEmpty(dataRequestAnswerId)) throw new HttpException(400, 'There is no dataRequestAnswerId');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerId: dataRequestAnswerId } });
    if (!findAnswer) throw new HttpException(409, 'There is no answer');

    return findAnswer;
  }

  public async createAnswer(answerData: gdpr_datarequestanswer): Promise<gdpr_datarequestanswer> {
    if (isEmpty(answerData)) throw new HttpException(400, 'There is no answerData');
    if (answerData.processedAnswer === undefined) {
      answerData.processedAnswer = false;
    }
    try {
      console.log(answerData);
      return await this.answers.create({
        data: {
          acceptedRequest: Boolean(answerData.acceptedRequest),
          justification: answerData.justification,
          processedAnswer: Boolean(answerData.processedAnswer),
          DataRequestID: Number(answerData.DataRequestID),
        },
      });
    } catch (e) {
      throw new HttpException(400, 'Data in the body is not valid :\n ' + e);
    }
  }

  public async updateAnswer(dataRequestAnswerId: number, answerData: gdpr_datarequestanswer): Promise<gdpr_datarequestanswer> {
    if (isEmpty(answerData)) throw new HttpException(400, 'There is no answerData');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerId: dataRequestAnswerId } });
    if (!findAnswer) throw new HttpException(409, 'There is no answer wigth this id ' + dataRequestAnswerId);

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
    if (!findAnswer) throw new HttpException(409, 'There is no answer wigth this id ' + dataRequestAnswerId);

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
    if (isEmpty(dataRequestAnswerId)) throw new HttpException(400, 'There is no dataRequestAnswerId');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerId: dataRequestAnswerId } });
    if (!findAnswer) throw new HttpException(409, 'There is no answer');

    return await this.answers.delete({ where: { dataRequestAnswerId: dataRequestAnswerId } });
  }
}

export default AnswerService;

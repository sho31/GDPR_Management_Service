import { gdpr_datarequestanswer, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class AnswerService {
  public answers = new PrismaClient().gdpr_datarequestanswer;

  public async findAllAnswer(): Promise<gdpr_datarequestanswer[]> {
    return await this.answers.findMany();
  }

  public async findAnswerById(dataRequestAnswerid: number): Promise<gdpr_datarequestanswer> {
    if (isEmpty(dataRequestAnswerid)) throw new HttpException(400, 'There is no dataRequestAnswerid');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerid: dataRequestAnswerid } });
    if (!findAnswer) throw new HttpException(409, 'There is no answer');

    return findAnswer;
  }

  public async createAnswer(answerData: gdpr_datarequestanswer): Promise<gdpr_datarequestanswer> {
    if (isEmpty(answerData)) throw new HttpException(400, 'There is no answerData');
    return await this.answers.create({ data: { ...answerData } });
  }

  public async updateAnswer(dataRequestAnswerid: number, answerData: gdpr_datarequestanswer): Promise<gdpr_datarequestanswer> {
    if (isEmpty(answerData)) throw new HttpException(400, 'There is no answerData');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerid: dataRequestAnswerid } });
    if (!findAnswer) throw new HttpException(409, 'There is no answer');

    return await this.answers.update({ where: { dataRequestAnswerid: dataRequestAnswerid }, data: { ...answerData } });
  }

  public async deleteAnswer(dataRequestAnswerid: number): Promise<gdpr_datarequestanswer> {
    if (isEmpty(dataRequestAnswerid)) throw new HttpException(400, 'There is no dataRequestAnswerid');

    const findAnswer: gdpr_datarequestanswer = await this.answers.findUnique({ where: { dataRequestAnswerid: dataRequestAnswerid } });
    if (!findAnswer) throw new HttpException(409, 'There is no answer');

    return await this.answers.delete({ where: { dataRequestAnswerid: dataRequestAnswerid } });
  }
}

export default AnswerService;

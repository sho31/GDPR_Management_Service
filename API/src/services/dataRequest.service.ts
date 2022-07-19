import { gdpr_datarequestanswer, gdpr_datarequest, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DataRequestService {
  public dataRequests = new PrismaClient().gdpr_datarequest;

  public async findAllDataRequest(): Promise<gdpr_datarequest[]> {
    return await this.dataRequests.findMany();
  }
  public async findAllUnansweredDataRequest(): Promise<gdpr_datarequest[]> {
    return await this.dataRequests.findMany({ include: { gdpr_datarequestanswer: true } });
  }

  public async findDataRequestById(dataRequestId: number): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestId)) throw new HttpException(400, 'There is no dataRequestId');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!findDataRequest) throw new HttpException(409, 'There is no dataRequest');

    return findDataRequest;
  }

  public async createDataRequest(dataRequestData: gdpr_datarequest): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestData)) throw new HttpException(400, 'There is no dataRequestData');
    return await this.dataRequests.create({ data: { ...dataRequestData } });
  }

  public async updateDataRequest(dataRequestId: number, dataRequestData: gdpr_datarequest): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestData)) throw new HttpException(400, 'There is no dataRequestData');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!findDataRequest) throw new HttpException(409, 'There is no dataRequest');
    return await this.dataRequests.update({ where: { DataRequestID: dataRequestId }, data: { ...dataRequestData } });
  }

  public async deleteDataRequest(dataRequestId: number): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestId)) throw new HttpException(400, 'There is no dataRequestId');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!findDataRequest) throw new HttpException(409, 'There is no dataRequest');

    return await this.dataRequests.delete({ where: { DataRequestID: dataRequestId } });
  }
}

export default DataRequestService;

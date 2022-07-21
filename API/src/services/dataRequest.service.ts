import { gdpr_datarequest, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { dataRequestType } from '@/types/generalTypes';

class DataRequestService {
  public dataRequests = new PrismaClient().gdpr_datarequest;

  public async findAllDataRequest(): Promise<gdpr_datarequest[]> {
    return await this.dataRequests.findMany();
  }
  public async findAllUnansweredDataRequest(): Promise<gdpr_datarequest[]> {
    let dr: any[] = await this.dataRequests.findMany({ include: { gdpr_datarequestanswer: true } });
    dr = dr.filter(d => d.gdpr_datarequestanswer.length === 0);
    return dr;
  }
  public async findAllDataRequestBySubjectId(dataSubjectID: number): Promise<gdpr_datarequest[]> {
    if (isEmpty(dataSubjectID)) throw new HttpException(400, 'There is no dataSubjectID');

    const findDataRequest: gdpr_datarequest[] = await this.dataRequests.findMany({ where: { dataSubjectID: dataSubjectID } });
    if (!findDataRequest) throw new HttpException(409, 'There is no dataSubjectID');

    return findDataRequest;
  }
  public async findDataRequestByAnswerId(dataRequestAnswerId: number): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestAnswerId)) throw new HttpException(400, 'There is no dataRequestId');

    const findDataRequest: gdpr_datarequest[] = await this.dataRequests.findMany({
      where: { gdpr_datarequestanswer: { some: { dataRequestAnswerId: dataRequestAnswerId } } },
    });
    if (!findDataRequest) throw new HttpException(409, 'There is no dataRequest');

    return findDataRequest[0];
  }
  public async findDataRequestById(dataRequestId: number): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestId)) throw new HttpException(400, 'There is no dataRequestId');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!findDataRequest) throw new HttpException(409, 'There is no dataRequest');

    return findDataRequest;
  }

  public async createDataRequest(dataRequestData: gdpr_datarequest): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestData)) throw new HttpException(400, 'There is no dataRequestData');
    if (!(dataRequestData.dataReqType in dataRequestType))
      throw new HttpException(401, 'The data Request Type is not valid : it must be RECTIFICATION or DELETION');

    return await this.dataRequests.create({
      data: {
        claim: dataRequestData.claim,
        claimDate: new Date(),
        newValue: dataRequestData.newValue,
        oldValue: dataRequestData.oldValue,
        dataReqType: dataRequestData.dataReqType,
        dataSubjectID: Number(dataRequestData.dataSubjectID),
        dataID: Number(dataRequestData.dataID),
      },
    });
  }

  public async updateDataRequest(dataRequestId: number, dataRequestData: gdpr_datarequest): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestData)) throw new HttpException(400, 'There is no dataRequestData');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!(dataRequestData.dataReqType in dataRequestType))
      throw new HttpException(401, 'The data Request Type is not valid : it must be RECTIFICATION or DELETION');
    if (!findDataRequest) throw new HttpException(409, 'There is no dataRequest');
    return await this.dataRequests.update({
      where: { DataRequestID: dataRequestId },
      data: {
        claim: dataRequestData.claim,
        claimDate: new Date(),
        newValue: dataRequestData.newValue,
        oldValue: dataRequestData.oldValue,
        dataReqType: dataRequestData.dataReqType,
        dataSubjectID: Number(dataRequestData.dataSubjectID),
        dataID: Number(dataRequestData.dataID),
      },
    });
  }

  public async deleteDataRequest(dataRequestId: number): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestId)) throw new HttpException(400, 'There is no dataRequestId');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!findDataRequest) throw new HttpException(409, 'There is no dataRequest');

    return await this.dataRequests.delete({ where: { DataRequestID: dataRequestId } });
  }
}

export default DataRequestService;

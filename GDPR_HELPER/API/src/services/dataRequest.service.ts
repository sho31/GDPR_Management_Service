import { gdpr_datarequest, gdpr_datatype, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { dataRequestType } from '@/types/generalTypes';

class DataRequestService {
  public dataRequests = new PrismaClient().gdpr_datarequest;

  public async findAllDataRequest(): Promise<gdpr_datarequest[]> {
    return await this.dataRequests.findMany({
      include: {
        gdpr_datasubject: true,
        gdpr_data: {
          include: {
            gdpr_datatype: true,
          },
        },
      },
    });
  }
  public async findAllUnansweredDataRequest(): Promise<gdpr_datarequest[]> {
    let dr: any[] = await this.dataRequests.findMany({
      include: {
        gdpr_datasubject: true,
        gdpr_data: {
          include: {
            gdpr_datatype: true,
          },
        },
        gdpr_datarequestanswer: true,
      },
    });
    dr = dr.filter(d => d.gdpr_datarequestanswer.length === 0);
    return dr;
  }
  public async findAllDataRequestBySubjectId(dataSubjectID: number): Promise<gdpr_datarequest[]> {
    if (isEmpty(dataSubjectID)) throw new HttpException(400, 'There is no dataSubjectID provided');

    const findDataRequest: gdpr_datarequest[] = await this.dataRequests.findMany({ where: { dataSubjectID: dataSubjectID } });
    if (!findDataRequest) throw new HttpException(404, 'There is no Data Request with the given dataSubjectID');

    return findDataRequest;
  }
  public async findDataRequestByAnswerId(dataRequestAnswerId: number): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestAnswerId)) throw new HttpException(400, 'There is no  dataRequestAnswer ID provided');

    const findDataRequest: gdpr_datarequest[] = await this.dataRequests.findMany({
      where: { gdpr_datarequestanswer: { some: { dataRequestAnswerId: dataRequestAnswerId } } },
    });
    if (!findDataRequest) throw new HttpException(404, 'There is no DataRequest with the given dataRequestAnswer ID');

    return findDataRequest[0];
  }
  public async findDataRequestById(dataRequestId: number): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestId)) throw new HttpException(400, 'There is no dataRequestId provided');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!findDataRequest) throw new HttpException(404, 'There is no dataRequest with the given dataRequestId');

    return findDataRequest;
  }

  public async createDataRequest(dataRequestData: gdpr_datarequest): Promise<gdpr_datarequest> {
    if (isEmpty(dataRequestData)) throw new HttpException(400, 'There is no dataRequest Data');
    if (!(dataRequestData.dataReqType in dataRequestType))
      throw new HttpException(401, 'The data Request Type is not valid : it must be RECTIFICATION, DELETION, or FORGET');

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
    if (isEmpty(dataRequestData)) throw new HttpException(400, 'There is no dataRequestData provided');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!(dataRequestData.dataReqType in dataRequestType))
      throw new HttpException(401, 'The data Request Type is not valid : it must be RECTIFICATION, DELETION, or FORGET');
    if (!findDataRequest) throw new HttpException(404, 'There is no dataRequest with the given dataRequestId');
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
    if (isEmpty(dataRequestId)) throw new HttpException(400, 'There is no dataRequestId provided');

    const findDataRequest: gdpr_datarequest = await this.dataRequests.findUnique({ where: { DataRequestID: dataRequestId } });
    if (!findDataRequest) throw new HttpException(404, 'There is no dataRequest with the given dataRequestId');

    return await this.dataRequests.delete({ where: { DataRequestID: dataRequestId } });
  }
}

export default DataRequestService;

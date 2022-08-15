import { gdpr_data, gdpr_datarequest, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { BatchPayload } from '@/types/generalTypes';

class DataService {
  public datas = new PrismaClient().gdpr_data;
  public dataRequests = new PrismaClient().gdpr_datarequest;

  public async findAllData(): Promise<gdpr_data[]> {
    const allData: gdpr_data[] = await this.datas.findMany();
    return allData;
  }
  public async findAllDataWithoutDataRequestBySubjectId(dataSubjectID: number): Promise<gdpr_data[]> {
    const dataIDsInRequests = await this.dataRequests.findMany({ include: { gdpr_data: { select: { dataID: true } } } });
    const ids = dataIDsInRequests.map(d => d.dataID);
    return await this.datas.findMany({
      where: {
        NOT: {
          dataID: { in: ids },
        },
        dataSubjectID: dataSubjectID,
      },
      include: { gdpr_datatype: true },
    });
  }
  public async findAllUnansweredDataRequest(): Promise<gdpr_datarequest[]> {
    let dr: any[] = await this.dataRequests.findMany({ include: { gdpr_datarequestanswer: true } });
    dr = dr.filter(d => d.gdpr_datarequestanswer.length === 0);
    return dr;
  }
  public async findAllDataBySubjectId(dataSubjectID: number): Promise<gdpr_data[]> {
    if (isEmpty(dataSubjectID)) throw new HttpException(400, 'There is no  dataSubject ID provided');

    const findData: gdpr_data[] = await this.datas.findMany({ where: { dataSubjectID: dataSubjectID }, include: { gdpr_datatype: true } });
    if (!findData) throw new HttpException(404, 'There is no data with the given dataSubjectID');
    console.log('data', findData);
    return findData;
  }
  public async findDataById(dataID: number): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, 'There is no  data ID provided');

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(404, 'There is no data with the given ID');

    return findData;
  }

  public async createData(data: gdpr_data): Promise<gdpr_data> {
    if (isEmpty(data)) throw new HttpException(400, 'There is no Data data provided');
    let dataConservation = null;
    let isPersonal = null;
    let isModifiable = null;
    if (data.dataConservation) {
      dataConservation = Number(data.dataConservation);
    }
    if (data.isPersonal) {
      isPersonal = Boolean(data.isPersonal);
    }
    if (data.isModifiable) {
      isModifiable = Boolean(data.isModifiable);
    }
    return await this.datas.create({
      data: {
        source: data.source,
        attributeName: data.attributeName,
        dataConservation: dataConservation,
        isPersonal: isPersonal,
        isModifiable: isModifiable,
        data_ID_ref: data.data_ID_ref,
        dataSubjectID: Number(data.dataSubjectID),
        dataTypeID: Number(data.dataTypeID),
      },
    });
  }

  public async updateData(dataID: number, data: gdpr_data): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, 'There is no  Data ID provided');
    if (isEmpty(data)) throw new HttpException(400, 'There is no  Data data provided');

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(404, 'There is no  Data with the given ID');

    return await this.datas.update({
      where: { dataID: dataID },
      data: {
        source: data.source,
        dataConservation: Number(data.dataConservation),
        isPersonal: Boolean(data.isPersonal),
        isModifiable: Boolean(data.isModifiable),
        data_ID_ref: data.data_ID_ref,
        dataSubjectID: Number(data.dataSubjectID),
        dataTypeID: Number(data.dataTypeID),
      },
    });
  }
  public async flagAsDeleted(dataID: number): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, 'There is no dataID provided');

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(404, 'There is no data with the given ID');

    return await this.datas.update({
      where: { dataID: dataID },
      data: { isDeleted: true },
    });
  }
  public async flagAllFromDataSubjectAsDeleted(dataSubjectID: number): Promise<gdpr_data[]> {
    if (isEmpty(dataSubjectID)) throw new HttpException(400, 'There is no dataSubjectID');

    const findData: gdpr_data[] = await this.datas.findMany({ where: { dataSubjectID: dataSubjectID } });
    if (!findData) throw new HttpException(404, 'There is no data with the given dataSubjectID');
    for (const d of findData) {
      await this.datas.update({
        where: { dataID: d.dataID },
        data: { isDeleted: true },
      });
    }
    return findData;
  }

  public async deleteData(dataID: number): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, 'There is no dataID');

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(404, 'There is no data with the given dataID');

    return await this.datas.delete({ where: { dataID: dataID } });
  }

  public async deleteAllFromDataSubject(dataSubjectID: number): Promise<BatchPayload> {
    if (isEmpty(dataSubjectID)) throw new HttpException(400, 'There is no dataSubjectID');

    const findData: gdpr_data[] = await this.datas.findMany({ where: { dataSubjectID: dataSubjectID } });
    if (!findData) throw new HttpException(404, 'There is no data with this dataSubjectID');

    return await this.datas.deleteMany({ where: { dataSubjectID: dataSubjectID } });
  }
}

export default DataService;

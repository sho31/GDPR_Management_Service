import { gdpr_data, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { BatchPayload } from '@/types/generalTypes';

class DataService {
  public datas = new PrismaClient().gdpr_data;

  public async findAllData(): Promise<gdpr_data[]> {
    const allData: gdpr_data[] = await this.datas.findMany();
    return allData;
  }

  public async findDataById(dataID: number): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, 'There is no dataID');

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(409, 'There is no data');

    return findData;
  }

  public async createData(data: gdpr_data): Promise<gdpr_data> {
    if (isEmpty(data)) throw new HttpException(400, 'There is no data');
    return await this.datas.create({
      data: {
        source: data.source,
        dataConservation: Number(data.dataConservation),
        isPersonal: Boolean(data.isPersonal),
        isModifiable: Boolean(data.isModifiable),
        data_ID_ref: Number(data.data_ID_ref),
        personalDataCategoryID: Number(data.personalDataCategoryID),
        dataSubjectID: Number(data.dataSubjectID),
        dataTypeID: Number(data.dataTypeID),
      },
    });
  }

  public async updateData(dataID: number, data: gdpr_data): Promise<gdpr_data> {
    if (isEmpty(data)) throw new HttpException(400, 'There is no data');

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(409, 'There is no data');

    return await this.datas.update({
      where: { dataID: dataID },
      data: {
        source: data.source,
        dataConservation: Number(data.dataConservation),
        isPersonal: Boolean(data.isPersonal),
        isModifiable: Boolean(data.isModifiable),
        data_ID_ref: Number(data.data_ID_ref),
        personalDataCategoryID: Number(data.personalDataCategoryID),
        dataSubjectID: Number(data.dataSubjectID),
        dataTypeID: Number(data.dataTypeID),
      },
    });
  }

  public async deleteData(dataID: number): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, 'There is no dataID');

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(409, 'There is no data');

    return await this.datas.delete({ where: { dataID: dataID } });
  }

  public async deleteAllFromDataSubject(dataSubjectID: number): Promise<BatchPayload> {
    if (isEmpty(dataSubjectID)) throw new HttpException(400, 'There is no dataSubjectID');

    const findData: gdpr_data[] = await this.datas.findMany({ where: { dataSubjectID: dataSubjectID } });
    if (!findData) throw new HttpException(409, 'There is no data with this dataSubjectID');

    return await this.datas.deleteMany({ where: { dataSubjectID: dataSubjectID } });
  }
}

export default DataService;

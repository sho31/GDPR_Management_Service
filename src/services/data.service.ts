import {gdpr_data, PrismaClient} from '@prisma/client';
import {HttpException} from '@exceptions/HttpException';
import {isEmpty} from '@utils/util';

class DataService {
  public datas = new PrismaClient().gdpr_data;

  public async findAllData(): Promise<gdpr_data[]> {
    const allData: gdpr_data[] = await this.datas.findMany();
    return allData;
  }

  public async findDataById(dataID: number): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, "There is no dataID");

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(409, "There is no data");

    return findData;
  }

  public async createData(data: gdpr_data): Promise<gdpr_data> {
    if (isEmpty(data)) throw new HttpException(400, "There is no data");
    return await this.datas.create({data: {...data}});
  }


  public async updateData(dataID: number, data: gdpr_data): Promise<gdpr_data> {
    if (isEmpty(data)) throw new HttpException(400, "There is no data");

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(409, "There is no data");

    return await this.datas.update({where: {dataID: dataID}, data: {...data}});
  }

  public async deleteData(dataID: number): Promise<gdpr_data> {
    if (isEmpty(dataID)) throw new HttpException(400, "There is no dataID");

    const findData: gdpr_data = await this.datas.findUnique({ where: { dataID: dataID } });
    if (!findData) throw new HttpException(409, "There is no data");

    return await this.datas.delete({where: {dataID: dataID}});
  }
}

export default DataService;

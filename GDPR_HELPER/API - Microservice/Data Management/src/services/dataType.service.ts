import { gdpr_datatype, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DataTypeService {
  public dataType = new PrismaClient().gdpr_datatype;

  public async findAllDataType(): Promise<gdpr_datatype[]> {
    const allDataType: gdpr_datatype[] = await this.dataType.findMany();
    return allDataType;
  }

  public async findDataTypeById(dataTypeID: number): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeID)) throw new HttpException(400, 'There is no  DataType ID provided');

    const findDataType: gdpr_datatype = await this.dataType.findUnique({
      where: { dataTypeID: dataTypeID },
    });
    if (!findDataType) throw new HttpException(404, 'There is no DataType with the given ID');

    return findDataType;
  }

  public async createDataType(dataTypeData: gdpr_datatype): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeData)) throw new HttpException(400, 'There is no  DataType Data provided');

    return await this.dataType.create({ data: { ...dataTypeData } });
  }
  public async updateDataType(dataTypeId: number, dataTypeData: gdpr_datatype): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeData)) throw new HttpException(400, 'There is no  DataType data provided');
    if (isEmpty(dataTypeId)) throw new HttpException(400, 'There is no  DataType ID provided');

    const findDataType: gdpr_datatype = await this.dataType.findUnique({ where: { dataTypeID: dataTypeId } });
    if (!findDataType) throw new HttpException(404, 'There is no  DataType with the given ID');
    return await this.dataType.update({ where: { dataTypeID: dataTypeId }, data: { ...dataTypeData } });
  }

  public async deleteDataType(dataTypeID: number): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeID)) throw new HttpException(400, 'Please provide a dataTypeId');

    const findDataType: gdpr_datatype = await this.dataType.findUnique({
      where: { dataTypeID: dataTypeID },
    });
    if (!findDataType) throw new HttpException(404, 'There is no dataType with the given ID');
    //TODO : check if there is any dataSubject with this dataTypeID
    return await this.dataType.delete({ where: { dataTypeID: dataTypeID } });
  }
}

export default DataTypeService;

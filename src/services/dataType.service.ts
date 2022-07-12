import { hash } from 'bcrypt';
import { PrismaClient,gdpr_datatype } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DataTypeService {
  public dataTypes = new PrismaClient().gdpr_datatype;

  public async findAllDataType(): Promise<gdpr_datatype[]> {
    const allDataType: gdpr_datatype[] = await this.dataTypes.findMany();
    return allDataType;
  }

  public async findDataTypeById(dataTypeId: number): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeId)) throw new HttpException(400, "There is no dataTypeId");

    const findDataType: gdpr_datatype = await this.dataTypes.findUnique({ where: { id: dataTypeId } });
    if (!findDataType) throw new HttpException(409, "There is no dataType");

    return findDataType;
  }

  public async createDataType(dataTypeData: gdpr_datatype): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeData)) throw new HttpException(400, "There is no dataTypeData");

    const findDataType: gdpr_datatype = await this.dataTypes.findUnique({ where: { email: dataTypeData.email } });
    if (findDataType) throw new HttpException(409, `You're email ${dataTypeData.email} already exists`);

    const hashedPassword = await hash(dataTypeData.password, 10);
    const createDataTypeData: gdpr_datatype = await this.dataTypes.create({ data: { ...dataTypeData, password: hashedPassword } });
    return createDataTypeData;
  }

  public async updateDataType(dataTypeId: number, dataTypeData: gdpr_datatype): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeData)) throw new HttpException(400, "There is no dataTypeData");

    const findDataType: gdpr_datatype = await this.dataTypes.findUnique({ where: { id: dataTypeId } });
    if (!findDataType) throw new HttpException(409, "There is no dataType");
    const updateDataTypeData = await this.dataTypes.update({ where: { id: dataTypeId }, data: { ...dataTypeData} });
    return updateDataTypeData;
  }

  public async deleteDataType(dataTypeId: number): Promise<gdpr_datatype> {
    if (isEmpty(dataTypeId)) throw new HttpException(400, "There is no dataTypeId");

    const findDataType: gdpr_datatype = await this.dataTypes.findUnique({ where: { id: dataTypeId } });
    if (!findDataType) throw new HttpException(409, "There is no dataType");

    const deleteDataTypeData = await this.dataTypes.delete({ where: { id: dataTypeId } });
    return deleteDataTypeData;
  }
}

export default DataTypeService;

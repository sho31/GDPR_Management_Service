import { gdpr_datasubjectcategory, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DataSubjectCategoryService {
  public datasubjectcategories = new PrismaClient().gdpr_datasubjectcategory;

  public async findAllDataSubjectCategory(): Promise<gdpr_datasubjectcategory[]> {
    const allDataSubjectCategory: gdpr_datasubjectcategory[] = await this.datasubjectcategories.findMany();
    return allDataSubjectCategory;
  }

  public async findDataSubjectCategoryById(dsCategoryID: number): Promise<gdpr_datasubjectcategory> {
    if (isEmpty(dsCategoryID)) throw new HttpException(400, 'There is no  DataSubjectCategoryID provided');

    const findDataSubjectCategory: gdpr_datasubjectcategory = await this.datasubjectcategories.findUnique({ where: { dsCategoryID: dsCategoryID } });
    if (!findDataSubjectCategory) throw new HttpException(404, 'There is no DataSubjectCategory with the given ID');

    return findDataSubjectCategory;
  }

  public async createDataSubjectCategory(dataSubjectCategoryData: gdpr_datasubjectcategory): Promise<gdpr_datasubjectcategory> {
    if (isEmpty(dataSubjectCategoryData)) throw new HttpException(400, 'There is no  DataSubjectCategory Data provided');

    return await this.datasubjectcategories.create({ data: { ...dataSubjectCategoryData } });
  }

  public async deleteDataSubjectCategory(dsCategoryID: number): Promise<gdpr_datasubjectcategory> {
    if (isEmpty(dsCategoryID)) throw new HttpException(400, 'There is no  DataSubjectCategory ID provided');

    const findDataSubjectCategory: gdpr_datasubjectcategory = await this.datasubjectcategories.findUnique({ where: { dsCategoryID: dsCategoryID } });
    if (!findDataSubjectCategory) throw new HttpException(404, 'There is no DataSubjectCategory with the given ID');
    //TODO : check if there is any dataSubject with this dsCategoryID
    return await this.datasubjectcategories.delete({ where: { dsCategoryID: dsCategoryID } });
  }
}

export default DataSubjectCategoryService;

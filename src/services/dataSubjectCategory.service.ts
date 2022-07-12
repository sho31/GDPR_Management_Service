import {gdpr_datasubjectcategory, PrismaClient} from '@prisma/client';
import {HttpException} from '@exceptions/HttpException';
import {isEmpty} from '@utils/util';

class DataSubjectCategoryService {
  public datasubjectcategories = new PrismaClient().gdpr_datasubjectcategory;

  public async findAllDataSubjectCategory(): Promise<gdpr_datasubjectcategory[]> {
    const allDataSubjectCategory: gdpr_datasubjectcategory[] = await this.datasubjectcategories.findMany();
    return allDataSubjectCategory;
  }

  public async findDataSubjectCategoryById(dsCategory: string): Promise<gdpr_datasubjectcategory> {
    if (isEmpty(dsCategory)) throw new HttpException(400, "Please provide a dataSubjectCategoryId");

    const findDataSubjectCategory: gdpr_datasubjectcategory = await this.datasubjectcategories.findUnique({ where: { dsCategory: dsCategory } });
    if (!findDataSubjectCategory) throw new HttpException(409, "There is no dataSubjectCategory with this name");

    return findDataSubjectCategory;
  }

  public async createDataSubjectCategory(dataSubjectCategoryData: gdpr_datasubjectcategory): Promise<gdpr_datasubjectcategory> {
    if (isEmpty(dataSubjectCategoryData)) throw new HttpException(400, "There is no dataSubjectCategoryData");

    const findDataSubjectCategory: gdpr_datasubjectcategory = await this.datasubjectcategories.findUnique({ where: { dsCategory: dataSubjectCategoryData.dsCategory } });
    if (findDataSubjectCategory) throw new HttpException(409, `This dsCategory ${dataSubjectCategoryData.dsCategory} already exists`);

    return await this.datasubjectcategories.create({data: {...dataSubjectCategoryData}});
  }

  public async deleteDataSubjectCategory(dsCategory: string): Promise<gdpr_datasubjectcategory> {
    if (isEmpty(dsCategory)) throw new HttpException(400, "Please provide a dataSubjectCategoryId");

    const findDataSubjectCategory: gdpr_datasubjectcategory = await this.datasubjectcategories.findUnique({ where: { dsCategory: dsCategory } });
    if (!findDataSubjectCategory) throw new HttpException(409, "There is no dataSubjectCategory with this name");
    //TODO : check if there is any dataSubject with this dsCategory
    const deleteDataSubjectCategoryData = await this.datasubjectcategories.delete({ where: { dsCategory: dsCategory } });
    return deleteDataSubjectCategoryData;
  }
}

export default DataSubjectCategoryService;

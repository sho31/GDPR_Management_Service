import { gdpr_personaldatacategory, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class PersonalDataCategoryService {
  public personalDataCategory = new PrismaClient().gdpr_personaldatacategory;

  public async findAllPersonalDataCategory(): Promise<gdpr_personaldatacategory[]> {
    const allPersonalDataCategory: gdpr_personaldatacategory[] = await this.personalDataCategory.findMany();
    return allPersonalDataCategory;
  }

  public async findPersonalDataCategoryById(PDCategoryID: number): Promise<gdpr_personaldatacategory> {
    if (isEmpty(PDCategoryID)) throw new HttpException(400, 'Please provide a pDCategoryID');

    const findPersonalDataCategory: gdpr_personaldatacategory = await this.personalDataCategory.findUnique({
      where: { PDCategoryID: PDCategoryID },
    });
    if (!findPersonalDataCategory) throw new HttpException(409, 'There is no personalDataCategory with this name');

    return findPersonalDataCategory;
  }

  public async updatePersonalDataCategory(
    pDCategoryID: number,
    personalDataCategoryData: gdpr_personaldatacategory,
  ): Promise<gdpr_personaldatacategory> {
    if (isEmpty(personalDataCategoryData)) throw new HttpException(400, 'There is no personalDataCategoryData');

    const findPersonalDataCategory: gdpr_personaldatacategory = await this.personalDataCategory.findUnique({
      where: { PDCategoryID: pDCategoryID },
    });
    if (!findPersonalDataCategory) throw new HttpException(409, 'There is no personalDataCategory');
    return await this.personalDataCategory.update({
      where: { PDCategoryID: pDCategoryID },
      data: { ...personalDataCategoryData },
    });
  }
  public async createPersonalDataCategory(personalDataCategoryData: gdpr_personaldatacategory): Promise<gdpr_personaldatacategory> {
    if (isEmpty(personalDataCategoryData)) throw new HttpException(400, 'There is no personalDataCategoryData');

    return await this.personalDataCategory.create({ data: { ...personalDataCategoryData } });
  }

  public async deletePersonalDataCategory(PDCategoryID: number): Promise<gdpr_personaldatacategory> {
    if (isEmpty(PDCategoryID)) throw new HttpException(400, 'Please provide a pDCategoryID');

    const findPersonalDataCategory: gdpr_personaldatacategory = await this.personalDataCategory.findUnique({
      where: { PDCategoryID: PDCategoryID },
    });
    if (!findPersonalDataCategory) throw new HttpException(409, 'There is no personalDataCategory with this name');
    //TODO : check if there is any dataSubject with this PDCategoryID
    return await this.personalDataCategory.delete({ where: { PDCategoryID: PDCategoryID } });
  }
}

export default PersonalDataCategoryService;

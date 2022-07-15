import { hash } from 'bcrypt';
import { PrismaClient, gdpr_personaldatacategory } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class PersonalDataCategorieservice {
  public personalDataCategories = new PrismaClient().gdpr_personaldatacategory;

  public async findAllPersonalDataCategory(): Promise<gdpr_personaldatacategory[]> {
    const allPersonalDataCategory: gdpr_personaldatacategory[] = await this.personalDataCategories.findMany();
    return allPersonalDataCategory;
  }

  public async findPersonalDataCategoryById(personalDataCategoryId: number): Promise<gdpr_personaldatacategory> {
    if (isEmpty(personalDataCategoryId)) throw new HttpException(400, "There is no  personalDataCategoryId");

    const findPersonalDataCategory: gdpr_personaldatacategory = await this.personalDataCategories.findUnique({ where: { id: personalDataCategoryId } });
    if (!findPersonalDataCategory) throw new HttpException(409, "There is no  personalDataCategory");

    return findPersonalDataCategory;
  }

  public async createPersonalDataCategory(personalDataCategoryData: gdpr_personaldatacategory): Promise<gdpr_personaldatacategory> {
    if (isEmpty(personalDataCategoryData)) throw new HttpException(400, "There is no  personalDataCategoryData");

    const findPersonalDataCategory: gdpr_personaldatacategory = await this.personalDataCategories.findUnique({ where: { email: personalDataCategoryData.email } });
    if (findPersonalDataCategory) throw new HttpException(409, `You're email ${personalDataCategoryData.email} already exists`);

    const hashedPassword = await hash(personalDataCategoryData.password, 10);
    const createPersonalDataCategoryData: gdpr_personaldatacategory = await this.personalDataCategories.create({ data: { ...personalDataCategoryData, password: hashedPassword } });
    return createPersonalDataCategoryData;
  }

  public async updatePersonalDataCategory(personalDataCategoryId: number, personalDataCategoryData: gdpr_personaldatacategory): Promise<PersonalDataCategory> {
    if (isEmpty(personalDataCategoryData)) throw new HttpException(400, "There is no  personalDataCategoryData");

    const findPersonalDataCategory: gdpr_personaldatacategory = await this.personalDataCategories.findUnique({ where: { id: personalDataCategoryId } });
    if (!findPersonalDataCategory) throw new HttpException(409, "There is no  personalDataCategory");

    const hashedPassword = await hash(personalDataCategoryData.password, 10);
    const updatePersonalDataCategoryData = await this.personalDataCategories.update({ where: { id: personalDataCategoryId }, data: { ...personalDataCategoryData, password: hashedPassword } });
    return updatePersonalDataCategoryData;
  }

  public async deletePersonalDataCategory(personalDataCategoryId: number): Promise<gdpr_personaldatacategory> {
    if (isEmpty(personalDataCategoryId)) throw new HttpException(400, "There is no  personalDataCategoryId");

    const findPersonalDataCategory: gdpr_personaldatacategory = await this.personalDataCategories.findUnique({ where: { id: personalDataCategoryId } });
    if (!findPersonalDataCategory) throw new HttpException(409, "There is no  personalDataCategory");

    const deletePersonalDataCategoryData = await this.personalDataCategories.delete({ where: { id: personalDataCategoryId } });
    return deletePersonalDataCategoryData;
  }
}

export default PersonalDataCategorieservice;

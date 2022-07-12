import { hash } from 'bcrypt';
import { PrismaClient, gdpr_provider } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class ProviderService {
  public providers = new PrismaClient().gdpr_provider;

  public async findAllProvider(): Promise<gdpr_provider[]> {
    const allProvider: gdpr_provider[] = await this.providers.findMany();
    return allProvider;
  }

  public async findProviderByID(providerID: number): Promise<gdpr_provider> {
    if (isEmpty(providerID)) throw new HttpException(400, "There is no  providerID");

    const findProvider: gdpr_provider = await this.providers.findUnique({ where: { providerID: providerID } });
    if (!findProvider) throw new HttpException(409, "There is no  provider");

    return findProvider;
  }

  public async createProvider(providerData: gdpr_provider): Promise<gdpr_provider> {
    if (isEmpty(providerData)) throw new HttpException(400, "There is no  providerData");

    const allProvider: gdpr_provider[] = await this.providers.findMany();
    if (allProvider.length >= 1) throw new HttpException(409, `There can only be one provider`);

    const createProviderData: gdpr_provider = await this.providers.create({ data: { ...providerData } });
    return createProviderData;
  }

  public async updateProvider(providerID: number, providerData: gdpr_provider): Promise<gdpr_provider> {
    if (isEmpty(providerData)) throw new HttpException(400, "There is no  providerData");

    const findProvider: gdpr_provider = await this.providers.findUnique({ where: { providerID: providerID } });
    if (!findProvider) throw new HttpException(409, "There is no  provider");

    const updateProviderData = await this.providers.update({ where: { providerID: providerID }, data: { ...providerData} });
    return updateProviderData;
  }

  public async deleteProvider(providerID: number): Promise<gdpr_provider> {
    if (isEmpty(providerID)) throw new HttpException(400, "There is no  providerID");

    const findProvider: gdpr_provider = await this.providers.findUnique({ where: { providerID: providerID } });
    if (!findProvider) throw new HttpException(409, "There is no  provider");

    const deleteProviderData = await this.providers.delete({ where: { providerID: providerID } });
    return deleteProviderData;
  }
}

export default ProviderService;

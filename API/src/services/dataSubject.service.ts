import { gdpr_datasubject, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class DataSubjectService {
  public dataSubjects = new PrismaClient().gdpr_datasubject;

  public async findAllDataSubject(): Promise<gdpr_datasubject[]> {
    return await this.dataSubjects.findMany();
  }

  public async findDataSubjectById(dataSubjectId: number): Promise<gdpr_datasubject> {
    if (isEmpty(dataSubjectId)) throw new HttpException(400, 'There is no  dataSubjectID provided');

    const findDataSubject: gdpr_datasubject = await this.dataSubjects.findUnique({ where: { dataSubjectID: dataSubjectId } });
    if (!findDataSubject) throw new HttpException(409, 'There is no dataSubject with the given ID');

    return findDataSubject;
  }
  public async findDataSubjectByIdRef(dataSubjectIdRef: number): Promise<gdpr_datasubject> {
    if (isEmpty(dataSubjectIdRef)) throw new HttpException(400, 'There is no  dataSubjectIDRef provided');

    const findDataSubject: gdpr_datasubject = await this.dataSubjects.findUnique({ where: { data_subject_id_ref: dataSubjectIdRef } });
    if (!findDataSubject) throw new HttpException(409, 'There is no dataSubject with the given ID Ref');

    return findDataSubject;
  }

  public async createDataSubject(dataSubjectData: gdpr_datasubject): Promise<gdpr_datasubject> {
    if (isEmpty(dataSubjectData)) throw new HttpException(400, 'There is no  dataSubjectData');
    return await this.dataSubjects.create({ data: { ...dataSubjectData } });
  }

  public async updateDataSubject(dataSubjectId: number, dataSubjectData: gdpr_datasubject): Promise<gdpr_datasubject> {
    if (isEmpty(dataSubjectData)) throw new HttpException(400, 'There is no  dataSubject Data provided');
    const findDataSubject: gdpr_datasubject = await this.dataSubjects.findUnique({ where: { dataSubjectID: dataSubjectId } });
    if (!findDataSubject) throw new HttpException(409, 'There is no dataSubject');
    return await this.dataSubjects.update({ where: { dataSubjectID: dataSubjectId }, data: { ...dataSubjectData } });
  }

  public async deleteDataSubject(dataSubjectId: number): Promise<gdpr_datasubject> {
    if (isEmpty(dataSubjectId)) throw new HttpException(400, 'There is no dataSubjectId');

    const findDataSubject: gdpr_datasubject = await this.dataSubjects.findUnique({ where: { dataSubjectID: dataSubjectId } });
    if (!findDataSubject) throw new HttpException(409, 'There is no  dataSubject');

    return await this.dataSubjects.delete({ where: { dataSubjectID: dataSubjectId } });
  }
}

export default DataSubjectService;

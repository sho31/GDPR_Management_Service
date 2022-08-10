import { gdpr_tutor, PrismaClient } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class TutorService {
  public tutors = new PrismaClient().gdpr_tutor;

  public async findAllTutor(): Promise<gdpr_tutor[]> {
    return await this.tutors.findMany();
  }

  public async findTutorById(tutorID: number): Promise<gdpr_tutor> {
    if (isEmpty(tutorID)) throw new HttpException(400, 'There is no tutorID');

    const findTutor: gdpr_tutor = await this.tutors.findUnique({ where: { tutorID: tutorID } });
    if (!findTutor) throw new HttpException(409, 'There is no tutor');

    return findTutor;
  }

  public async createTutor(tutorData: gdpr_tutor): Promise<gdpr_tutor> {
    if (isEmpty(tutorData)) throw new HttpException(400, 'There is no tutorData');
    return await this.tutors.create({ data: { ...tutorData } });
  }

  public async updateTutor(tutorID: number, tutorData: gdpr_tutor): Promise<gdpr_tutor> {
    if (isEmpty(tutorData)) throw new HttpException(400, 'There is no tutorData');

    const findTutor: gdpr_tutor = await this.tutors.findUnique({ where: { tutorID: tutorID } });
    if (!findTutor) throw new HttpException(409, 'There is no tutor');

    return await this.tutors.update({ where: { tutorID: tutorID }, data: { ...tutorData } });
  }

  public async deleteTutor(tutorID: number): Promise<gdpr_tutor> {
    if (isEmpty(tutorID)) throw new HttpException(400, 'There is no tutorID');

    const findTutor: gdpr_tutor = await this.tutors.findUnique({ where: { tutorID: tutorID } });
    if (!findTutor) throw new HttpException(409, 'There is no tutor');

    return await this.tutors.delete({ where: { tutorID: tutorID } });
  }
}

export default TutorService;

import ActiveStudentsRepository from '../repositories/active_students';

class ActiveStudentsService {
  private activeStudentsRepository: ActiveStudentsRepository;

  constructor() {
    this.activeStudentsRepository = new ActiveStudentsRepository();
  }

  async findAll() {
    try {
      return await this.activeStudentsRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch active students: ${error.message}`);
    }
  }

  async getActiveStudentsCountPerCourse() {
    try {
      const activeStudents = await this.activeStudentsRepository.countByCourse();
      const allActiveStudents = await this.activeStudentsRepository.countAll();
      const response = {
        activeStudents,
        activeStudentCount: allActiveStudents
      }
      return response;
    } catch (error) {
      throw new Error(`Failed to get active students count per course: ${error.message}`);
    }
  }
}

export default ActiveStudentsService; 
import db from '../models/index.js';

export default class employeeService {
    static proto = 'employee.proto';

    static async create(employee) {
      const { companyService } = process.client;

      const company = await companyService.get({ id: employee.companyId }, this.metadata);
      const output = await (new db.Employee({ userId: this.user.id, ...employee, company })).save();

      return { id: output._id };
    }

    static async list({ companyId }) {
      const { companyService } = process.client;

      const company = await companyService.get({ id: companyId }, this.metadata);
      const employees = await db.Employee.find({ userId: this.user.id, companyId: company._id });

      return { employees };
    }
}

import db from '../models/index.js';

export default class statisticService {
    static proto = 'statistic.proto';

    static async get({ id }) {
      const { companyService, employeeService } = process.client;
      const company = await companyService.get({ id }, this.metadata);
      const employeeData = await employeeService.list({ companyId: id }, this.metadata);

      const output = await db.Statistic.create({
        name: company.name,
      });

      return { id: output.id, name: company.name, count: employeeData.employees.length };
    }
}

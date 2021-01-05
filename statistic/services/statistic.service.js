export default class statisticService {
    static proto = 'statistic.proto';

    static async get({ id }) {
      const { companyService, employeeService } = process.client;
      const company = await companyService.get({ id }, this.metadata);
      const employeeData = await employeeService.list({ companyId: id }, this.metadata);
      return { id: company.id, name: company.name, count: employeeData.employees.length };
    }
}

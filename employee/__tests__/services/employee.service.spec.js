/* eslint-disable no-undef */

import EmployeeService from '../../services/employee.service.js';

describe('employee.service.js', () => {
  it('If EmployeeService is initialized, response is EmployeeService', () => {
    expect(EmployeeService).toHaveProperty('proto');
  });
});

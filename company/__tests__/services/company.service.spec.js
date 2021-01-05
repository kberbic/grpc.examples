/* eslint-disable no-undef */

import CompanyService from '../../services/company.service.js';

describe('company.service.js', () => {
    it('If CompanyService is initialized, response is CompanyService', () => {
        expect(CompanyService).toHaveProperty("proto");
    });
});

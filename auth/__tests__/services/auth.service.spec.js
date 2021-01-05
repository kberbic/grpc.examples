/* eslint-disable no-undef */

import AuthService from '../../services/auth.service.js';

describe('auth.service.js', () => {
    it('If AuthService is initialized, response is AuthService', () => {
        expect(AuthService).toHaveProperty("proto");
    });
});

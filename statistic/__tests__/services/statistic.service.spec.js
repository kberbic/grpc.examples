/* eslint-disable no-undef */

import StatisticService from '../../services/statistic.service.js';

describe('statistic.service.js', () => {
    it('If StatisticService is initialized, response is StatisticService', () => {
        expect(StatisticService).toHaveProperty("proto");
    });
});

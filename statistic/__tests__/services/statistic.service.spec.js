/* eslint-disable no-undef */
import statisticService from '../../services/statistic.service.js';

describe('statistic.service.js', () => {
  it('If statisticService is initialized, static field "proto" exist in statisticService', () => {
    expect(statisticService).toHaveProperty('proto');
  });
});

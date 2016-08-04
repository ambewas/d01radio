import moment from 'moment';
import { timeLeft } from '../moments.js';
jest.unmock('moment');
jest.unmock('pluralize');
jest.unmock('../moments.js'); // unmock to use the actual implementation of sum
describe('timeLeft', () => {
  it('returns a time from the start date to the end date provided', () => {
    const startTime = moment('2016-08-04 13:23:25');
    const radioReleaseDate = moment('2016-08-05 14:25:20');
    const timeString = timeLeft(startTime, radioReleaseDate);
    expect(timeString).toBe('1 day, 1 hour, 1 minute, and 55 seconds');
  });
});
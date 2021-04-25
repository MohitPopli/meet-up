import { FirebaseDTO, MapMentorHours } from './util';

describe('MapMentorHours', () => {
  test('should map correct mentor data', () => {
    const dates = ['2021-04-25T12:00:00.00Z', '2021-04-25T15:00:00.00Z', '2021-04-26T12:00:00.00Z'];
    const mockDTO: FirebaseDTO = {
      '12123': {
        data: dates[0],
        message: 'meeting scheduled',
      },
      '12124': {
        data: dates[1],
        message: 'meeting scheduled',
      },
      '12125': {
        data: dates[2],
        message: 'meeting scheduled',
      },
    };

    const expectedObject = [
      { date: 25, month: 3, year: 2021, time: ['20', '23'] },
      { date: 26, month: 3, year: 2021, time: ['20'] },
    ];

    // console.log(MapMentorHours(mockDTO));
    expect(MapMentorHours(mockDTO)).toMatchObject(expectedObject);
  });
});

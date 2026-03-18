jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
}));

import axios from 'axios';
import DonorService from './DonorService';

describe('DonorService', () => {

  test('getAllDonors calls API', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const res = await DonorService.getAllDonors();

    expect(axios.get).toHaveBeenCalled();
    expect(res.data).toEqual([]);
  });

  test('addDonor calls API', async () => {
    const donor = { name: 'Test' };
    axios.post.mockResolvedValue({ data: donor });

    const res = await DonorService.addDonor(donor);

    expect(axios.post).toHaveBeenCalled();
    expect(res.data).toEqual(donor);
  });

});
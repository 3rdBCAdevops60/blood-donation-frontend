jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
}));

import axios from 'axios';
import DonorService from './DonorService';

describe('DonorService', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // important
  });

  test('getAllDonors calls API', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const res = await DonorService.getAllDonors();

    expect(axios.get).toHaveBeenCalledWith(expect.any(String));
    expect(res.data).toEqual([]);
  });

  test('addDonor calls API', async () => {
    const donor = { name: 'Test' };
    axios.post.mockResolvedValue({ data: donor });

    const res = await DonorService.addDonor(donor);

    expect(axios.post).toHaveBeenCalled();
    expect(res.data).toEqual(donor);
  });

  test('deleteDonor calls API', async () => {
    axios.delete.mockResolvedValue({ data: {} });

    const res = await DonorService.deleteDonor(1);

    expect(axios.delete).toHaveBeenCalledWith(expect.any(String));
    expect(res.data).toEqual({});
  });

  test('updateDonor calls API', async () => {
    const donor = { name: 'Updated' };
    axios.put.mockResolvedValue({ data: donor });

    const res = await DonorService.updateDonor(1, donor);

    expect(axios.put).toHaveBeenCalled();
    expect(res.data).toEqual(donor);
  });

});
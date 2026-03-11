import axios from "axios";

const BASE_URL = "https://blood-donation-backend-8r7h.onrender.com/api/donors";

class DonorService {

  getAllDonors() {
    return axios.get(BASE_URL);
  }

  getDonorsByBloodGroup(bloodGroup) {
    return axios.get(`${BASE_URL}/blood/${bloodGroup}`);
  }

  addDonor(donor) {
    return axios.post(BASE_URL, donor);
  }

  deleteDonor(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }

  updateDonor(id, donor) {
    return axios.put(`${BASE_URL}/${id}`, donor);
  }

}

export default new DonorService();
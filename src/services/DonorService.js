import axios from "axios";

// Allow overriding backend base URL so Vercel/localhost can talk to Render API
const API_BASE = (process.env.REACT_APP_API_BASE_URL || "https://blood-donation-backend-8r7h.onrender.com").replace(/\/$/, "");
const BASE_URL = `${API_BASE}/api/donors`;

const LOCAL_STORAGE_KEY = "donors";

class DonorService {

  loadFromLocalStorage() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  saveToLocalStorage(donors) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(donors));
  }

  getAllDonors() {
    return axios.get(BASE_URL)
      .catch(() => {
        const localDonors = this.loadFromLocalStorage();
        return { data: localDonors };
      });
  }

  getDonorsByBloodGroup(bloodGroup) {
    return axios.get(`${BASE_URL}/blood/${bloodGroup}`);
  }

  addDonor(donor) {
    const newDonor = { ...donor, id: Date.now() };
    const donors = this.loadFromLocalStorage();
    donors.push(newDonor);
    this.saveToLocalStorage(donors);

    return axios.post(BASE_URL, donor)
      .catch(() => {
        return { data: newDonor };
      });
  }

  deleteDonor(id) {
    const donors = this.loadFromLocalStorage();
    const filtered = donors.filter(d => d.id !== id);
    this.saveToLocalStorage(filtered);

    return axios.delete(`${BASE_URL}/${id}`)
      .catch(() => {
        return { data: {} };
      });
  }

  updateDonor(id, donor) {
    const donors = this.loadFromLocalStorage();
    const index = donors.findIndex(d => d.id === id);
    if (index !== -1) {
      donors[index] = { ...donor, id };
      this.saveToLocalStorage(donors);
    }

    return axios.put(`${BASE_URL}/${id}`, donor)
      .catch(() => {
        return { data: donor };
      });
  }
}

const donorService = new DonorService();
export default donorService;

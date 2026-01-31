import { useState } from "react";
import DonorService from "../services/DonorService";

function AddDonor() {
  const [donor, setDonor] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    available: true
  });

  const saveDonor = () => {
    DonorService.addDonor(donor)
      .then(() => alert("Donor Added Successfully"));
  };

  return (
    <div>
      <h2>Add Donor</h2>

      <input placeholder="Name"
        onChange={e => setDonor({ ...donor, name: e.target.value })} />

      <input placeholder="Blood Group"
        onChange={e => setDonor({ ...donor, bloodGroup: e.target.value })} />

      <input placeholder="City"
        onChange={e => setDonor({ ...donor, city: e.target.value })} />

      <button onClick={saveDonor}>Save</button>
    </div>
  );
}

export default AddDonor;

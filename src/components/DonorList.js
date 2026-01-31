import React, { useEffect, useState } from "react";
import DonorService from "../services/DonorService";
import "./DonorList.css";

const DonorList = () => {

  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);

  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const [filterBG, setFilterBG] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editDonor, setEditDonor] = useState(null);

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = () => {
    DonorService.getAllDonors().then(res => {
      setDonors(res.data);
      setFilteredDonors(res.data);
    });
  };

  // 🔹 Add donor
  const addDonor = () => {
    const donor = { name, bloodGroup, city, available: true };
    DonorService.addDonor(donor).then(() => {
      loadDonors();
      setName(""); setBloodGroup(""); setCity("");
    });
  };

  // 🔹 Delete donor
  const deleteDonor = (id) => {
    DonorService.deleteDonor(id).then(loadDonors);
  };

  // 🔹 Toggle availability
  const toggleAvailability = (donor) => {
    DonorService.updateDonor(donor.id, {
      ...donor,
      available: !donor.available
    }).then(loadDonors);
  };

  // 🔹 Filter by blood group
  const filterDonors = (bg) => {
    setFilterBG(bg);
    if (bg === "") {
      setFilteredDonors(donors);
    } else {
      setFilteredDonors(donors.filter(d => d.bloodGroup === bg));
    }
  };

  // 🔹 Open edit modal
  const openEditModal = (donor) => {
    setEditDonor({ ...donor });
    setShowModal(true);
  };

  // 🔹 Save edited donor
  const saveEdit = () => {
    DonorService.updateDonor(editDonor.id, editDonor).then(() => {
      setShowModal(false);
      loadDonors();
    });
  };

  return (
    <div className="container">
      <h1>Blood Donation Management System</h1>

      {/* Add Donor */}
      <h2>Add Donor</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Blood Group" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} />
      <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
      <button className="add-btn" onClick={addDonor}>Add</button>

      <hr />

      {/* Filter */}
      <h3>Filter by Blood Group</h3>
      <select value={filterBG} onChange={e => filterDonors(e.target.value)}>
        <option value="">All</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>O+</option><option>O-</option>
        <option>AB+</option><option>AB-</option>
      </select>

      {/* Table */}
      <h2>View All Donors</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>City</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDonors.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.bloodGroup}</td>
              <td>{d.city}</td>
              <td>{d.available ? "Yes" : "No"}</td>
              <td>
                <button className="toggle-btn" onClick={() => toggleAvailability(d)}>
                  Toggle
                </button>
                <button className="edit-btn" onClick={() => openEditModal(d)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => deleteDonor(d.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Donor</h3>
            <input value={editDonor.name}
              onChange={e => setEditDonor({ ...editDonor, name: e.target.value })} />
            <input value={editDonor.bloodGroup}
              onChange={e => setEditDonor({ ...editDonor, bloodGroup: e.target.value })} />
            <input value={editDonor.city}
              onChange={e => setEditDonor({ ...editDonor, city: e.target.value })} />
            <br />
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorList;

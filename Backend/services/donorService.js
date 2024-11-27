const Donor = require('../models/donorModel');

const DonorService = {
  async createDonor(donorData) {
    return Donor.create(donorData);
  },

  async getDonorsByid(donorId) {
    if (donorId) {
      const [donor] = await Donor.findById(donorId);
      return donor;
    }
    return Donor.findAll();
  },

  async getDonorsByEmail(email) {
    if (email) {
        const [donor] = await Donor.findByEmail(email); // Change from findById to findByEmail
        return donor;
    }
    return Donor.findAll();
},


  async getDonors() {
    const donor = await Donor.findAll();  
    return donor; 
},


async updateDonorEmail(email, donorData) {
  const result = await Donor.update(email, donorData);
  if (result.affectedRows === 0) throw new Error("Donor not found");
  return result;
}
,

async updateDonor(id, donorData) {
  const result = await Donor.update(id, donorData);
  if (result.affectedRows === 0) throw new Error("Donor not found");
  return result;
}
,

  async deleteDonor(donorId) {
    const result = await Donor.deleteById(donorId);
    if (result.affectedRows === 0) throw new Error('Donor not found');
    return result;
  }
};

module.exports = DonorService;

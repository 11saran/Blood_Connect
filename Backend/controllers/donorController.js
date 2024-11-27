// controllers/donorController.js
const DonorService = require('../services/donorService');

const DonorController = {
  async createDonor(req, res) {
    const { first_name, last_name, dob, gender, contact_number, email, address, nic_number, blood_type, medication, medication_list, donated_blood, donation_dates, user_email } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !gender) {
        return res.status(400).json({ message: 'First name, last name, email, and gender are required.' });
    }

    // Log incoming data for inspection
    console.log('Received data:', req.body);
    try {
      const donorData = req.body; 
      await DonorService.createDonor(donorData);
      res.status(201).json({ message: 'Donor created successfully' });
    } catch (err) {
        console.log(err)
      res.status(400).json({ message: err.message });
    }
  },

  async getDonorsById(req, res) {
    try {
      const donorId = req.params.id;
      const donors = await DonorService.getDonors(donorId);
      res.status(200).json(donors);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching donors' });
    }
  },

  async getDonorsByEmail(req, res) {
    try {
        const donorEmail = req.params.email; // Make sure this matches the route
        const donors = await DonorService.getDonorsByEmail(donorEmail);
        res.status(200).json(donors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching donors' });
    }
},



  async getDonors(req, res) {
    try {
        const donors = await DonorService.getDonors();
      res.status(200).json(donors);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching donors' });
    }
  },

  async updateDonor(req, res) {
    try {
        const email = req.params.email; // Extracting email from the URL
        const donorData = req.body; // Getting the updated donor data from the request body
        const result = await DonorService.updateDonor(email, donorData);

        if (!result) throw new Error("Donor not found");
        res.status(200).json({ message: "Donor updated successfully" });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
,
  
async updateDonorID(req, res) {
  try {
    const donorId = req.params.id;
    const donorData = req.body;
    console.log(`Updating donor with ID: ${donorId}`, donorData); // Log the ID and data
    await DonorService.updateDonor(donorId, donorData);
    res.status(200).json({ message: 'Donor updated successfully' });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(404).json({ message: err.message });
  }
},


  async deleteDonor(req, res) {
    try {
      const donorId = req.params.id;
      await DonorService.deleteDonor(donorId);
      res.status(200).json({ message: 'Donor deleted successfully' });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};

module.exports = DonorController;

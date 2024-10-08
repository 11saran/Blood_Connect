const express = require('express');
const dbConn = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Route to register a donor
app.post('/donors', (req, res) => {
    const { first_name, last_name, dob, gender, contact_number, email, address, nic_number, blood_type, medication, medication_list, donated_blood, donation_dates, donation_locations, consents, permanentDonor } = req.body;

   
    if (!first_name || !last_name || !dob || !gender || !email || !address || !blood_type || !medication || donated_blood === undefined || 
        !donation_dates || !donation_locations || consents === undefined || permanentDonor === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `INSERT INTO donors (first_name, last_name, dob, gender, contact_number, email, address, nic_number, blood_type, medication, medication_list, 
                    donated_blood, donation_dates, donation_locations, consents, 
                    permanentDonor) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    
    dbConn.query(query, [first_name, last_name, dob, gender, contact_number, email,address, nic_number, blood_type, medication, medication_list, donated_blood, donation_dates, donation_locations, consents, permanentDonor
    ], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to register donor.' });
        }
        res.status(201).json({ message: 'Donor registered successfully!', donorId: result.insertId });
    });
});

// Route to update donor information
app.put('/donors/:id', (req, res) => {
    const donorId = req.params.id;
    const { first_name, last_name, dob, gender, contact_number, email, address, nic_number, blood_type, medication, medication_list, donated_blood, donation_dates, donation_locations, consents, permanentDonor } = req.body;

   
    if (!first_name || !last_name || !dob || !gender || !email || !address || 
        !blood_type || !medication || donated_blood === undefined || 
        !donation_dates || !donation_locations || 
        consents === undefined || permanentDonor === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `UPDATE donors 
                   SET first_name = ?, last_name = ?, dob = ?, gender = ?, 
                       contact_number = ?, email = ?, address = ?, nic_number = ?, 
                       blood_type = ?, medication = ?, medication_list = ?, 
                       donated_blood = ?, donation_dates = ?, 
                       donation_locations = ?, consents = ?, 
                       permanentDonor = ? 
                   WHERE id = ?`;

    dbConn.query(query, [
        first_name, last_name, dob, gender, contact_number, email, 
        address, nic_number, blood_type, medication, medication_list, 
        donated_blood, donation_dates, donation_locations, consents, 
        permanentDonor, donorId
    ], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to update donor.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Donor not found.' });
        }
        res.status(200).json({ message: 'Donor updated successfully!' });
    });
});

// Route to get donor by ID
app.get('/donors/:id', (req, res) => {
    const donorId = req.params.id;

   
    if (isNaN(donorId)) {
        return res.status(400).json({ error: 'Invalid donor ID format. It should be a number.' });
    }

    const query = `SELECT * FROM donors WHERE id = ?`;

    dbConn.query(query, [donorId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to retrieve donor due to a server error.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Donor not found.' });
        }
        res.status(200).json(results[0]); // Return the first (and should be only) result
    });
});

// Route to delete donor by ID
app.delete('/donors/:id', (req, res) => {
    const donorId = req.params.id;

    const query = `DELETE FROM donors WHERE id = ?`;

    dbConn.query(query, [donorId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Failed to delete donor.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Donor not found.' });
        }
        res.status(200).json({ message: 'Donor deleted successfully!' });
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

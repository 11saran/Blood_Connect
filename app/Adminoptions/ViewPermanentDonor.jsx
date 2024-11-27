import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewPermanentDonor = () => {
    const router = useRouter();
    const [donors, setDonors] = useState([]);
    const [donorEmail, setDonorEmail] = useState(null);
    const [donorData, setDonorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    // Checkbox states
    const [checkedItems, setCheckedItems] = useState({
        checkup: false,
        eligibility: false,
        screening: false,
    });

    // Update checkbox state
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    // Check if all checkboxes are selected
    const allChecked = Object.values(checkedItems).every(Boolean);

    const handleAddToPermanentDonor = async () => {
        if (allChecked) {
            try {
                // First, update the donor status
                const donorResponse = await fetch(`http://localhost:5000/api-donor/updateID/${donorData.id}`, {
                    method: 'PUT', // Use 'PUT' for updating
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        permanentDonor: "yes", // Setting the permanentDonor field to "yes"
                    }),
                });

                if (!donorResponse.ok) {
                    throw new Error('Failed to update donor status');
                }

                const donorResult = await donorResponse.json();
                console.log(donorResult); // Log donor update result

                // Proceed to update the appointment status using user_email
                const appointmentResponse = await fetch(`http://localhost:5000/api-appointments/updateAppointment/${donorData.userEmail}`, {
                    method: 'PUT', // Use 'PUT' for updating
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status: "Completed", // Updating appointment status to "Completed"
                    }),
                });

                if (!appointmentResponse.ok) {
                    throw new Error('Failed to update appointment status');
                }

                const appointmentResult = await appointmentResponse.json();
                console.log(appointmentResult); // Log appointment update result
                // toast.success('Permanent donor added successfully!');
                toast.success("Permanent donor added successfully!", {
                    autoClose: 900,
                    onClose: () =>         router.push("Adminoptions/PermanentDonorrequest"),
                  });

            } catch (error) {
                console.error('Error:', error);
                // Optionally, show an error message to the user
            }
        }
    };


    useEffect(() => {
        const fetchDonorData = async () => {
            try {
                const email = await AsyncStorage.getItem('DonorEmail');

                if (email) {
                    console.log('Retrieved DonorEmail:', email);

                    // Fetch the donor data using the retrieved email
                    const response = await axios.get(`http://localhost:5000/api-donor/peticulardonor/${email}`);

                    setDonorData(response.data); // Assuming the API returns the donor data as expected
                } else {
                    console.error('No DonorEmail found');
                    setError('No donor email found');
                }
            } catch (err) {
                console.error('Error fetching donor data:', err);
                setError('Failed to fetch donor data');
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchDonorData();
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Optionally show a loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Display any errors
    }

    // Navigate to request detail view
    const handleBack = async (email) => {
        router.push("Adminoptions/PermanentDonorrequest");

    };


    return (
        <div style={styles.container}>
            <ToastContainer/>
            <div style={styles.header}>
                <button style={styles.backButton} onClick={handleBack}>
                    <Ionicons name="arrow-back-outline" color="white" size="20"></Ionicons>
                </button>
            </div>
            <div style={styles.card}>
                <h2 style={styles.header}>Donor Information</h2>

                <p><strong>Name:</strong> {donorData.first_name} {donorData.last_name}</p>
                <p><strong>Blood Type:</strong> {donorData.blood_type}</p>
                <p><strong>Contact:</strong> {donorData.contact_number}</p>
                <p><strong>Location:</strong> {donorData.address}</p>
                <p><strong>NIC:</strong> {donorData.nic_number}</p>

                {donorData.donated_blood === "yes" && (
                    <>
                        <p><strong>Donation Dates:</strong> {donorData.donation_dates}</p>
                        <p><strong>Donation Locations:</strong> {donorData.donation_locations}</p>
                    </>
                )}

                {donorData.medication === "yes" && (
                    <p><strong>Medication List:</strong> {donorData.medication_list}</p>
                )}

                <h3 style={styles.subHeader}>Medical Eligibility Check</h3>
                <div style={styles.checklist}>
                    <label>
                        <input
                            type="checkbox"
                            name="checkup"
                            checked={checkedItems.checkup}
                            onChange={handleCheckboxChange}
                        />
                        Medical check-up includes hemoglobin levels, blood pressure, pulse, and body temperature to ensure safe donation.
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="eligibility"
                            checked={checkedItems.eligibility}
                            onChange={handleCheckboxChange}
                        />
                        Weight, medical history, iron levels, and recent health conditions are assessed for donor eligibility.
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="screening"
                            checked={checkedItems.screening}
                            onChange={handleCheckboxChange}
                        />
                        Screening for infectious diseases is done to ensure blood safety for recipients.
                    </label>
                </div>

                <button
                    style={{
                        ...styles.addButton,
                        backgroundColor: allChecked ? '#db0304' : '#ccc',
                        cursor: allChecked ? 'pointer' : 'not-allowed',
                    }}
                    onClick={handleAddToPermanentDonor}
                    disabled={!allChecked}
                >
                    Add to Permanent Donor
                </button>
            </div>
        </div>
    );
};

// Styles
const styles = {
    backButton: {
        backgroundColor: '#db0304',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '10px',
        marginLeft: 10,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '10px',
        padding: '10px',
    },
    container: {
        padding: '20px',
    },
    card: {
        padding: '20px',
        maxWidth: '500px',
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        transition: 'transform 0.2s',
    },
    header: {
        marginBottom: '10px',
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
    },
    subHeader: {
        marginTop: '20px',
        fontSize: '20px',
        fontWeight: '500',
        color: '#333',
    },
    checklist: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    addButton: {
        padding: '10px',
        fontSize: '16px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        width: '100%',
        transition: 'background-color 0.3s',
    },
};

export default ViewPermanentDonor;

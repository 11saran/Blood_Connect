import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';



const AddDonorToRecipient = () => {
    const router = useRouter();

    const [recipientInfo, setRecipientInfo] = useState({});
    const [permanentDonors, setPermanentDonors] = useState([]);
    const [compatibleDonors, setCompatibleDonors] = useState([]);
    const [assignedDonors, setAssignedDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [assignedDonorDetails, setAssignedDonorDetails] = useState([]); 
    const [assignedDonorEmails, setAssignedDonorEmails] = useState([]); 
    const navigation = useNavigation(); 

    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    // Fetch recipient data
    useEffect(() => {
        const fetchRecipientInfo = async () => {
            try {
                const recipientId = await AsyncStorage.getItem('recipientId');
                if (recipientId) {
                    const response = await axios.get(`http://localhost:5000/api-recipients/recipient/${recipientId}`);
                    setRecipientInfo(response.data);
                }
            } catch (error) {
                console.error("Error fetching recipient data:", error);
            }
        };
        fetchRecipientInfo();
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // Fetch permanent donors
    useEffect(() => {
        const fetchPermanentDonors = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api-donor/donor');
                const filteredDonors = response.data.filter(donor => donor.permanentDonor === "yes");
                setPermanentDonors(filteredDonors);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching donors:", error);
                setLoading(false);
            }
        };

        fetchPermanentDonors();
    }, []);

    // Filter compatible donors by blood type

    const fetchAssignedDonors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api-donations/donations');
            console.log('Full response from fetching donations:', response.data);

            if (Array.isArray(response.data)) {
                const filteredDonors = response.data.filter(donation =>
                    donation.recipient_email === recipientInfo.recipient_email
                );

                // Set the emails of assigned donors
                const donorEmails = filteredDonors.map(donation => donation.donor_email);
                setAssignedDonorEmails(donorEmails);

                // Fetch each donor's details based on donor_email
                const allDonorsResponse = await axios.get('http://localhost:5000/api-donor/donor');
                const allDonors = allDonorsResponse.data;

                const donorDetails = filteredDonors.map(donation =>
                    allDonors.filter(donor => donor.userEmail === donation.donor_email)
                ).flat();

                setAssignedDonorDetails(donorDetails);
                console.log('Filtered donor details:', donorDetails);
            } else {
                console.error("Expected response.data to be an array, but received:", typeof response.data);
            }
        } catch (error) {
            console.error("Error fetching assigned donors:", error);
        }
    };


    useEffect(() => {
        if (recipientInfo.recipient_email) {
            fetchAssignedDonors();
        }
    }, [recipientInfo]);

    // Filter compatible donors by blood type and not already assigned
    useEffect(() => {
        const filteredCompatibleDonors = permanentDonors.filter(
            donor => donor.blood_type === recipientInfo.blood_type &&
                !assignedDonorEmails.includes(donor.userEmail) // Exclude already assigned donors
        );
        setCompatibleDonors(filteredCompatibleDonors);
    }, [permanentDonors, recipientInfo, assignedDonorEmails]);


    // Handle adding donor to recipient
    const handleAddDonor = async (donor_email) => {
        try {
            const response = await axios.post(`http://localhost:5000/api-donations/create`, {
                recipient_email: recipientInfo.recipient_email, // Ensure recipientId is correct
                donor_email,
            });

            if (response.status === 200) {
                toast.success("Donor added to recipient successfully!")
                // Refresh assigned donors
                fetchAssignedDonors();
            }
        } catch (error) {
            toast.error("Failed to add donor to recipient. Please try again." );

            console.error("Error adding donor to recipient:", error);
            // alert("Failed to add donor to recipient. Please try again.");
        }
    };

    // Handle deleting donor from recipient
    const handleDeleteDonor = async (userEmail) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api-donations/delete-donation/${userEmail}`);
    
            if (response.status === 200) {
                toast.success("Donor removed from recipient successfully!")
                // Refresh assigned donors
                fetchAssignedDonors();
            }
        } catch (error) {
            toast.error("Failed to remove donor. Please try again." );

            console.error("Error deleting donor:", error);
            // Alert.alert("Error", "Failed to remove donor. Please try again.");
        }
    };

    const handleBack = () => {
        router.push("Adminoptions/ManageRecipient");

        // console.log("Add recipient button clicked");
    };
    

    if (loading) return <Text>Loading...</Text>;
    const age = recipientInfo.date_of_birth ? calculateAge(recipientInfo.date_of_birth) : "N/A";

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Recipient Info Card */}
        <ToastContainer />
        <div style={styles.header}>
          <button style={styles.backButton} onClick={handleBack}>
            <Ionicons
              name="arrow-back-outline"
              color="white"
              size="20"
            ></Ionicons>
          </button>
        </div>
        <View style={styles.recipientCard}>
          <Text style={styles.title}>
            {recipientInfo.first_name} {recipientInfo.last_name}
          </Text>
          <Text style={styles.info}>
            <b>Blood Type:</b> {recipientInfo.blood_type}
          </Text>
          <Text style={styles.info}>
            <b>Age:</b> {age}
          </Text>
          <Text style={styles.info}>
            <b>Medication:</b> {recipientInfo.recipient_medication}
          </Text>
          <Text style={styles.info}>
            <b>Disease:</b> {recipientInfo.recipient_disease}
          </Text>
        </View>

        {/* Assigned Donors List */}
        <Text style={styles.sectionTitle}>Assigned Permanent Donors</Text>
        {assignedDonorDetails.map((donor) => (
          <View key={donor.userEmail} style={styles.donorCard}>
            <View style={styles.donorInfo}>
              <Text style={styles.donorName}>
                {donor.first_name} {donor.last_name}
              </Text>
              <Text> {donor.blood_type}</Text>
            </View>
            <Ionicons
              name="trash-outline"
              size={24}
              color="#db0304"
              onPress={() => handleDeleteDonor(donor.userEmail)}
            />
          </View>
        ))}

        {/* Compatible Donors List */}
        <Text style={styles.sectionTitle}>Compatible Permanent Donors</Text>
        {compatibleDonors.map((donor) => (
          <View key={donor.id} style={styles.donorCard}>
            <View style={styles.donorInfo}>
              <Text style={styles.donorName}>
                {donor.first_name} {donor.last_name}
              </Text>
              <Text>Blood Type: {donor.blood_type} </Text>
            </View>
            <Button
              title={
                <Ionicons name="add-circle-outline" size={24} color="white" />
              }
              onPress={() => handleAddDonor(donor.userEmail)}
              color="#db0304"
            />
          </View>
        ))}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: '#db0304',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '10px',
        marginLeft:10,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop:'10px',
        padding:'10px',
    },
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    recipientCard: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#db0304',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    info: {
        fontSize: 16,
        color: '#666',
        marginVertical: 2,
    },
    donorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 8,
    },
    donorInfo: {
        flex: 1,
    },
    donorName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default AddDonorToRecipient;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

const PermanentDonorRequest = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const navigation = useNavigation();

  // Fetch donor data from API
  const fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api-donor/donor");
      setDonors(response.data); // Assuming the response contains an array of donors
      console.log("donor:", response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Failed to load donors.");
    }
  };

  // Fetch requests from API
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api-appointments/appointment"
      );
      const appointments = response.data;

      // Filter and enrich appointments with donor data based on matching email
      const filteredRequests = appointments
        .filter((appointment) => appointment.status === "Scheduled") // Add filter for status
        .map((appointment) => {
          const matchingDonor = donors.find(
            (donor) => donor.userEmail === appointment.user_email
          );
          if (matchingDonor) {
            // Merge appointment with donor details for display
            return {
              ...appointment,
              donorName: `${matchingDonor.first_name} ${matchingDonor.last_name}`, // Add donor name
              blood_type: matchingDonor.blood_type,
              contact_number: matchingDonor.contact_number,
              address: matchingDonor.address,
            };
          }
          return null; // Exclude if no matching donor found
        })
        .filter(Boolean); // Remove null values

      setRequests(filteredRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests.");
    }
  };

  const handleBack = () => {
    router.push("Adminoptions/ManagePermanentDonor");

    // console.log("Add recipient button clicked");
  };

  useEffect(() => {
    fetchDonors(); // Fetch donors first
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if (donors.length > 0) {
      fetchRequests(); // Fetch requests after donors are loaded
    }
  }, [donors]);

  // Navigate to request detail view
  const handleCardClick = async (email) => {
    try {
      console.log(email);
      await AsyncStorage.setItem("DonorEmail", email);
      router.push("Adminoptions/ViewPermanentDonor");
    } catch (error) {
      console.error("Error saving email to AsyncStorage:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <Ionicons
            name="arrow-back-outline"
            color="white"
            size="20"
          ></Ionicons>
        </button>
      </div>

      <ToastContainer />
      <h1 style={styles.title}>Permanent Donor Requests</h1>
        <div style={styles.cardContainer}>
          {requests.map((request) => (
            <div
              key={request.id}
              style={styles.card}
              onClick={() => handleCardClick(request.user_email)}
            >
              <div style={styles.recipientInfo}>
                <div style={styles.recipientName}>{request.donorName}</div>
                <div style={styles.info}>Blood Type: {request.blood_type}</div>
              </div>
              <div style={styles.buttonGroup}>
                <button style={styles.iconButton}>
                  <Ionicons
                    name="chevron-forward-outline"
                    color="white"
                    size="16"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

// Styling
const styles = {
  backButton: {
    backgroundColor: "#db0304",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "10px",
    marginLeft: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: "10px",
    padding: "10px",
  },
  title: {
    fontSize: 30,
    fontFamily: "inter-bold",
    padding: 15,
    marginVertical: 10,
    color: Colors.BLACK,
    top: 15,
  },
  container: {
    padding: "20px",
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    maxHeight: "85vh",
    overflowY: "auto",
    padding: "10px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "500px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    cursor: "pointer",
  },
  recipientInfo: {
    flex: 1,
    textAlign: "left",
  },
  recipientName: {
    fontSize: "18px",
    color: "#000000",
  },
  info: {
    marginTop: "5px",
    color: "#555",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  iconButton: {
    backgroundColor: "#db0304",
    border: "none",
    padding: "8px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};

export default PermanentDonorRequest;

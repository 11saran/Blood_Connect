import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";

const ManagePermanentDonor = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [donors, setDonors] = useState([]);

  const handleBack = () => {
    router.push("(tabs)Admin/Home");
  };

  const handleNewRequest = () => {
    router.push("Adminoptions/PermanentDonorrequest");
  };

  const handleView = () => {
    router.push("(tabs)Admin/Home");
  };

  // Fetch donors from API
  const fetchDonors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api-donor/donor");
      // Filter permanent donors
      const permanentDonors = response.data.filter(
        (donor) => donor.permanentDonor === "yes"
      );
      setDonors(permanentDonors);
    } catch (error) {
      console.error("Error fetching donors:", error);
      toast.error("Failed to load donors.");
    }
  };

  useEffect(() => {
    fetchDonors();

    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleCardClick = (donorId) => {
    // router.push(`/donor/${donorId}`); // Adjust the route according to your navigation structure
  };

  const handleDeleteClick = async (donorId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api-donor/updateID/${donorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ permanentDonor: "no" }),
        }
      );

      if (response.ok) {
        toast.success(" Permanent donor delete successfully");
        fetchDonors();
        // Handle success, e.g., show a success message or update the UI
        console.log("Donor status updated to 'no'.");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to update donor status.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <Ionicons
            name="arrow-back-outline"
            color="white"
            size="20"
          ></Ionicons>
        </button>
        <button style={styles.addButton} onClick={handleNewRequest}>
          New Requests
        </button>
      </div>

      <div style={styles.cardContainer}>
        {donors.map((donor) => (
          <div
            key={donor.id}
            style={styles.card}
            onClick={() => handleCardClick(donor.id)}
          >
            <div style={styles.recipientInfo}>
              <div style={styles.recipientName}>
                {donor.first_name} {donor.last_name}
              </div>
              <div style={styles.info}>{donor.blood_type}</div>
              <div style={styles.info}>{donor.contact_number}</div>
              <div style={styles.info}>{donor.address}</div>
            </div>
            <div style={styles.buttonGroup}>
              {/* Add any action buttons here, e.g., Edit, Delete */}
              <button
                style={styles.iconButton}
                onClick={() => handleDeleteClick(donor.id)}
              >
                <Ionicons name="trash-outline" color="white" size="16" />
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
  container: {
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: 20,
    fontFamily: "inter-extrabold",
    padding: 15,
    marginVertical: 10,
    color: Colors.BLACK,
    top: 15,
  },
  backButton: {
    backgroundColor: "#db0304",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "10px",
  },
  addButton: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#db0304",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "inter",
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
  },
  recipientInfo: {
    flex: 1,
    textAlign: "left",
  },
  recipientName: {
    fontSize: "18px",
    color: "#000000",
    margin: 5,
    fontWeight: "bold",
    fontFamily: "inter-bold",
  },
  info: {
    fontSize: "15px",
    color: "#000000",
    margin: 5,
    fontFamily: "inter",
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

export default ManagePermanentDonor;

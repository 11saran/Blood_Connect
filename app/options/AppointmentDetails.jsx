import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons if not already installed
import { useNavigation, useRouter } from "expo-router";
import Modal from "react-native-modal";
import { toast, ToastContainer } from "react-toastify";


export default function AppointmentDetails() {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const router = useRouter();

  const navigation = useNavigation();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        if (!userEmail) {
          setError("User email not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api-appointments/appointment/${userEmail}`);
        if (!response.ok) {
          throw new Error("Failed to fetch appointment details.");
        }

        const data = await response.json();
        if (data) {
          setAppointment(data);
        } else {
          setError("No ongoing appointment found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
    navigation.setOptions({ headerShown: false });

  }, []);


  // Format the date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}Z`);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });
  };
  

  const handleEdit = () => {
    // Add edit functionality here
    console.log("Edit appointment");
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api-appointments/delete-appointment/${appointment.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Navigate back to the previous screen after deletion
        toast.success("Appointment deleted successfully.", {
          onClose: () => router.push("(tabs)/Home"),
        });

      } else {
        const errorData = await response.json();
        alert(`Failed to delete appointment: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("An error occurred while deleting the appointment. Please try again.");
    }
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.RED1} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ToastContainer />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={Colors.BLACK} />
      </TouchableOpacity>
      {/* Delete Confirmation Modal */}
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to delete this appointment?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => { toggleModal(); handleDelete(); }}>
              <Text style={styles.confirmText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {appointment ? (
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Appointment Details</Text>
            <View style={styles.iconContainer}>
              {/* <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
                <Ionicons name="pencil" size={20} color={Colors.BLACK} />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={toggleModal} style={styles.iconButton}>
                <Ionicons name="trash" size={20} color={Colors.RED1} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{formatDate(appointment.appointment_date)}</Text>

          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{formatTime(appointment.appointment_time)}</Text>

          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{appointment.location}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{appointment.status}</Text>
          </View>
          {appointment.status === "Completed" && (
        <Text style={styles.analysisMessage}>
          Your health screening results are being processed. Permanent donor status will be granted upon approval.
        </Text>
      )}
        </View>
        
      ) : (
      <Text style={styles.noAppointmentText}>No ongoing appointment found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  analysisMessage: {
    fontSize: 16,
    color: "blue",
    marginTop: 10,
    fontStyle: "italic",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  modalButtons: { flexDirection: "row" },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  cancelText: { color: "#555", fontSize: 16 },
  confirmText: { color: "white", fontSize: 16 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  card: {
    width: Dimensions.get("window").width * 0.9,
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.WHITE1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.RED1,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.BLACK,
  },
  value: {
    fontSize: 18,
    color: Colors.DARK_GRAY,
  },
  errorText: {
    fontSize: 16,
    color: Colors.RED1,
    textAlign: "center",
  },
  noAppointmentText: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: "center",
  },
});

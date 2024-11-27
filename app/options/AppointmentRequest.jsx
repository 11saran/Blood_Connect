import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  Picker,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppointmentRequest() {
  const router = useRouter();
  const navigation = useNavigation();
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const today = new Date().toISOString().split('T')[0];
  const [selectedCity, setSelectedCity] = useState(""); // Add state for selected city

  const cities = [
    "Colombo", "Mount Lavinia", "Kesbewa", "Maharagama", "Moratuwa",
    "Ratnapura", "Negombo", "Kandy", "Sri Jayewardenepura Kotte", "Kalmunai",
    "Trincomalee", "Galle", "Jaffna", "Athurugiriya", "Weligama", "Matara",
    "Kolonnawa", "Gampaha", "Puttalam", "Badulla", "Kalutara", "Bentota",
    "Mannar", "Kurunegala","Batticalo"
  ];



  const defaultTimes = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00",
  ];

  useEffect(() => {
    if (date) fetchBookedSlots();
    navigation.setOptions({ headerShown: false });
  }, [date]);

  const fetchBookedSlots = async () => {
    try {

      const response = await fetch(`http://localhost:5000/api-appointments/available-slots?date=${date}`);
      const availableSlots = await response.json(); // Directly use the available slots returned
      setAvailableSlots(availableSlots); // Set available slots directly

    } catch (error) {
      console.error("Error fetching booked slots:", error);
      Alert.alert("Error", "Could not fetch available slots.");
    }
  };

  const handleAppointmentRequest = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");

    if (!date || !selectedSlot || !selectedCity) {
      Alert.alert("Incomplete Selection", "Please select date, time, and location.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api-appointments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: userEmail,
          appointment_date: date,
          appointment_time: selectedSlot,
          location: selectedCity,
        }),
      });

      if (response.ok) {
        toast.success("Appointment request submitted. Awaiting confirmation.", {
          onClose: () => router.push("(tabs)/Home"),
        });
      } else {
        toast.error("Could not create appointment request.");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Could not create appointment request.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ToastContainer />
      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Blood Connect</Text>
          <Image source={require('../../assets/images/header.png')} style={styles.headerImage} />
        </View>
        <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
          <Text style={styles.titleText}>Request Permanent Donor Appointment</Text>
          <Text style={styles.descriptionText}>
            To become a permanent donor, a medical check-up is required.
          </Text>
          {/* City Picker */}
          <Text style={styles.sectionTitle}>Select location:</Text>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a city" value="" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
          {/* Date Picker */}
          <Text style={styles.sectionTitle}>Select check-up date:</Text>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-picker"
            style={styles.dateInput}
            min={today} // Set the minimum date to today
          />

          {/* Time Slots */}
          <Text style={styles.slotTitle}>Available Time Slots:</Text>
          <FlatList
            data={availableSlots}
            keyExtractor={(item) => item}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedSlot(item)}
                style={[
                  styles.slotButton,
                  selectedSlot === item && styles.selectedSlotButton
                ]}
              >
                <Text style={[
                  styles.slotText,
                  selectedSlot === item && styles.selectedSlotText
                ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity onPress={handleAppointmentRequest} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Request Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    backgroundColor: Colors.HEADER,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontFamily: 'inter-bold',
    fontSize: 38,
    color: Colors.WHITE,
  },
  headerImage: {
    marginLeft: 'auto',
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  dateInput: {
    padding: 10,
    borderRadius: 8,
    border: "1.5px solid #db0304",
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  picker: {
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height:40,
    borderColor:"#db0304",
  },
  slotTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#db0304",
  },
  slotButton: {
    padding: 10,
    margin: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderColor: "#db0304",
    borderWidth: 1,
  },
  selectedSlotButton: {
    backgroundColor: "#db0304",
    borderWidth: 0,
  },
  slotText: {
    color: "black",
    textAlign: "center",
  },
  selectedSlotText: {
    color: "white",
  },
  submitButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  submitButton: {
    backgroundColor: "#db0304",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

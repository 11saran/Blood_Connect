import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

export default function HomeScreen({ navigation }) {
  const images = [
    { id: 1, src: require("./../../assets/images/image1.png") },
    { id: 2, src: require("./../../assets/images/image2.png") },
    { id: 3, src: require("./../../assets/images/image3.png") },
    { id: 4, src: require("./../../assets/images/image4.png") },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [donorStatus, setDonorStatus] = useState("new");
  const [appointmentStatus, setAppointmentStatus] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDonorStatus = async () => {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (!userEmail) {
        setDonorStatus("new");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api-donor/donor");
        const donors = await response.json();
        const donor = donors.find((d) => d.userEmail === userEmail);

        if (donor) {
          if (donor.permanentDonor === "yes") {
            setDonorStatus("permanent");
          } else {
            setDonorStatus("donor");
          }
        } else {
          setDonorStatus("new");
        }
      } catch (error) {
        console.error("Error fetching donor data:", error);
      }
    };

    fetchDonorStatus();
  }, []);

  const handleBecomePermanentDonor = async () => {
    const userEmail = await AsyncStorage.getItem("userEmail");

    try {
      const response = await fetch("http://localhost:5000/api-appointments/appointment");
      const appointments = await response.json();
      const ongoingAppointment = appointments.find(
        (appointment) => appointment.user_email === userEmail
      );

      if (ongoingAppointment) {       
       
        router.push("options/AppointmentDetails");
      } else {
        // Navigate to AppointmentRequest if no ongoing appointment
        router.push("options/AppointmentRequest");
      }
    } catch (error) {
      console.error("Error checking appointment status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={images[currentImageIndex].src}
        style={styles.imageSlider}
        resizeMode="cover"
      />

      <Text style={styles.title}>
        Join Blood Connect - Your Chance to Make a Difference!
      </Text>

      <View style={styles.gridContainer}>
        {donorStatus === "new" && (
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => router.push("options/MeAsDonor")}>
              <Image
                source={require("./../../assets/images/h1Image.png")}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Me as Donor</Text>
            </TouchableOpacity>
          </View>
        )}

        {donorStatus === "donor" && (
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={handleBecomePermanentDonor}>
              <Image
                source={require("./../../assets/images/h2Image.png")}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Become Permanent Donor</Text>
            </TouchableOpacity>
          </View>
        )}

        {donorStatus === "permanent" && (
          <View style={styles.gridItem}>
            <TouchableOpacity onPress={() => router.push("options/PermanentDonorInfo")}>
              <Image
                source={require("./../../assets/images/h3Image.png")}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Permanent Donation Schedule</Text>
            </TouchableOpacity>
          </View>
        )}

        {appointmentStatus && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Appointment Status: {appointmentStatus}
            </Text>
          </View>
        )}

        <View style={styles.gridItem}>
          <TouchableOpacity onPress={() => router.push("options/Disease")}>
            <Image
              source={require("./../../assets/images/h3Image.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Disease</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.gridItem}>
          <TouchableOpacity
            onPress={() => router.push("Screens/UserCampListScreen")}
          >
            <Image
              source={require("./../../assets/images/h4Image.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Camp Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageSlider: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 20,
    fontFamily: "inter-extrabold",
    padding: 15,
    marginVertical: 10,
    color: Colors.BLACK,
    top: 15,
  },
  gridContainer: {
    width: 327,
    height: 318,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: Colors.WHITE1,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 0.51,
    top: 55,
  },
  gridItem: {
    backgroundColor: Colors.RED1,
    marginVertical: 15,
    marginHorizontal: 15,
    height: 130,
    width: 130,
    borderRadius: 20,
  },
  optionIcon: {
    width: 58,
    height: 58,
    marginBottom: 10,
    alignSelf: 'center',
    top: 10,
  },
  optionText: {
    fontSize: 16,
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "inter-extrabold",
    padding: 15,
    top: -15
  },
  statusContainer: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: Colors.YELLOW,
    borderRadius: 10,
    marginTop: 10,
  },
  statusText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontFamily: "inter-semibold",
  },
});

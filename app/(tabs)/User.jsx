import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function User() {
  const [availableToDonate, setAvailableToDonate] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [allowTracking, setAllowTracking] = React.useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donorData, setDonorData] = useState(null);

  // Custom toggle switch component
  const CustomToggle = ({ isEnabled, toggleSwitch }) => {
    return (
      <TouchableOpacity
        style={[
          styles.switchContainer,
          isEnabled ? styles.switchEnabled : styles.switchDisabled,
        ]}
        onPress={toggleSwitch}
      >
        <View
          style={[
            styles.switchThumb,
            isEnabled ? styles.switchThumbEnabled : styles.switchThumbDisabled,
          ]}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          console.log("Retrieved DonorEmail:", email);

          // Fetch the donor data using the retrieved email
          const response = await axios.get(
            `http://localhost:5000/api-donor/peticulardonor/${email}`
          );

          setDonorData(response.data); // Assuming the API returns the donor data as expected
        } else {
          console.error("No DonorEmail found");
          setError("No donor email found");
        }
      } catch (err) {
        console.error("Error fetching donor data:", err);
        setError("Failed to fetch donor data");
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

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons
          style={styles.icon}
          color="white"
          size={120}
          name="person-circle-outline"
        />
        <Text style={styles.username}>
          {donorData.first_name}
          <br />
          {donorData.last_name}
        </Text>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            padding: 10,
            borderRadius: 15,
            marginTop: 10,
            width: 336,
          }}
        >
          <View style={styles.details}>
            <Text style={styles.bloodTypeHed}>Blood Type:</Text>
            <Text style={styles.bloodType}>{donorData.blood_type}</Text>
          </View>
        </View>
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        {/* <View style={styles.row}>
          <Text style={styles.label}>Available to Donate</Text>
          <CustomToggle
            isEnabled={availableToDonate}
            toggleSwitch={() => setAvailableToDonate(!availableToDonate)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Notification</Text>
          <CustomToggle
            isEnabled={notification}
            toggleSwitch={() => setNotification(!notification)}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Allow Tracking</Text>
          <CustomToggle
            isEnabled={allowTracking}
            toggleSwitch={() => setAllowTracking(!allowTracking)}
          />
        </View> */}

        <View style={styles.manageAddress}>
          <Text
            onPress={() => router.push("options/ManageInfo")}
            style={styles.label}
          >
            Manage Info
          </Text>
          <TouchableOpacity onPress={() => router.push("options/ManageInfo")}>
            <FontAwesome name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => router.push("auth/Login/Login")}
          >
            <MaterialIcons name="logout" size={30} color="#A80F1E" />
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
  header: {
    backgroundColor: Colors.RED,
    paddingVertical: 40,
    alignItems: "center",
    height: 325,
  },
  icon: {
    width: 120, // Set width
    height: 120, // Set height
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    backgroundColor: Colors.WHITE,
    top: 10,
  },
  username: {
    fontSize: 24,
    color: Colors.WHITE,
    fontFamily: "inter-bold",
    fontSize: 36,
    alignItems: "center",
    justifyContent: "space-around",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  bloodType: {
    fontSize: 32,
    color: Colors.RED,
    fontFamily: "inter-extrabold",
  },
  bloodTypeHed: {
    fontSize: 30,
    color: Colors.RED,
    fontFamily: "inter-bold",
  },
  rating: {
    fontSize: 24,
    color: Colors.YELLOW,
    marginVertical: 5,
  },
  nextDonationDate: {
    fontSize: 16,
    color: Colors.RED,
    fontFamily: "inter-extrabold",
  },
  nextDonation: {
    fontSize: 12,
    color: Colors.BLACK,
    fontFamily: "inter-bold",
  },
  body: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontFamily: "inter-extrabold",
    fontSize: 16,
  },
  switchContainer: {
    width: 50,
    height: 30,
    borderRadius: 20,
    padding: 3,
    justifyContent: "center",
  },
  switchEnabled: {
    backgroundColor: Colors.RED,
  },
  switchDisabled: {
    backgroundColor: Colors.ASE,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
  },
  switchThumbEnabled: {
    alignSelf: "flex-end",
  },
  switchThumbDisabled: {
    alignSelf: "flex-start",
  },
  manageAddress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  logoutText: {
    color: Colors.BLACK,
    fontSize: 16,
    fontFamily: "inter-extrabold",
  },
});

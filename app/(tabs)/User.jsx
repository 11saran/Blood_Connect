import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

export default function User() {
  const [availableToDonate, setAvailableToDonate] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [allowTracking, setAllowTracking] = React.useState(false);

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

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Raja Mukesh</Text>
        <View
          style={{
            backgroundColor: Colors.WHITE,
            padding: 10,
            borderRadius: 15,
            marginTop: 10,
            width: 336,
            height: 70,
          }}
        >
          <View style={styles.details}>
            <Text style={styles.bloodType}>A+</Text>
            <Text style={styles.rating}>★★★★★</Text>
            <Text style={styles.nextDonationDate}>10.01.2025</Text>
          </View>
          <View style={{ marginLeft: 220, top: -10 }}>
            <Text style={styles.nextDonation}>Next Donation</Text>
          </View>
        </View>
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        <View style={styles.row}>
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
        </View>

        <View style={styles.manageAddress}>
          <Text style={styles.label}>Manage Address</Text>
          <TouchableOpacity>
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: Colors.WHITE,
    borderWidth: 2,
    backgroundColor: Colors.WHITE,
    top:10
  },
  username: {
    fontSize: 24,
    color: Colors.WHITE,
    fontFamily: "inter-bold",
    fontSize: 36,
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
  label:{
     fontFamily:"inter-extrabold",
     fontSize:16
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

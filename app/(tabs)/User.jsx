import React from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
export default function User() {
  const [availableToDonate, setAvailableToDonate] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [allowTracking, setAllowTracking] = React.useState(false);
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
          <View style={styles.switchContainer}>
            <Switch
              value={availableToDonate}
              onValueChange={() => setAvailableToDonate(!availableToDonate)}
              trackColor={{ false: Colors.GRAY, true: Colors.RED }}
              thumbColor={availableToDonate ? Colors.WHITE : Colors.GRAY}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Notification</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={notification}
              onValueChange={() => setNotification(!notification)}
              trackColor={{ false: Colors.GRAY, true: Colors.RED }}
              thumbColor={notification ? Colors.WHITE : Colors.GRAY}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Allow Tracking</Text>
          <View style={styles.switchContainer}>
            <Switch
              value={allowTracking}
              onValueChange={() => setAllowTracking(!allowTracking)}
              trackColor={{ false: Colors.GRAY, true: Colors.RED }}
              thumbColor={allowTracking ? Colors.WHITE : Colors.GRAY}
            />
          </View>
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
    fontSize: 13,
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
  switchContainer: {
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }],
  },
  label: {
    fontSize: 16,
    fontFamily: "inter-extrabold",
    color: Colors.BLACK,
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

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router } from "expo-router";

export default function AddAlert() {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [location, setLocation] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>
      <View>
        <Text style={styles.title}>Find Donor</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Choose Blood Type</Text>
        <View style={styles.bloodTypeContainer}>
          {bloodTypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.radioButton,
                selectedBloodType === type && styles.radioButtonSelected,
              ]}
              onPress={() => setSelectedBloodType(type)}
            >
              <View style={styles.outerCircle}>
                {selectedBloodType === type && (
                  <View style={styles.innerCircle} />
                )}
              </View>
              <Text style={styles.radioText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.locationInputContainer}>
          <TextInput
            style={styles.locationInput}
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
          />
          <EvilIcons name="location" size={24} color="black" />
        </View>

        <TouchableOpacity style={styles.findDonorButton}>
          <Text style={styles.findDonorButtonText}>Find Donor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("(tabs)/Home")}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  headerContainer: {
    backgroundColor: Colors.HEADER,
    marginTop: 0,
    height: 100,
    flexDirection: "row",
    borderRadius: 5,
  },
  headerText: {
    fontFamily: "inter-bold",
    fontSize: 38,
    top: 25,
    marginLeft: 5,
    color: Colors.WHITE,
  },
  headerImage: {
    top: 45,
    marginLeft: 70,
  },
  title: {
    fontSize: 32,
    fontFamily: "inter-bold",
    color: Colors.RED,
    marginVertical: 20,
    alignSelf: "center",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "inter-semibold",
    marginBottom: 10,
    color: Colors.BLACK,
    alignSelf: "flex-start",
  },
  bloodTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    top:15
  },
  radioButton: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
    width: "25%",
  },
  radioButtonSelected: {
    backgroundColor: "#d32f2f",
    borderColor: "#d32f2f",
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#999",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "#d32f2f",
  },
  radioButtonSelected: {
    borderColor: "#d32f2f",
  },
  radioText: {
    marginTop: 0,
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },

  radioTextSelected: {
    color: "#fff",
  },
  locationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginBottom: 20,
    width: 332,
    height: 40,
    top: 29,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "inter-bold",
  },
  findDonorButton: {
    backgroundColor: Colors.RED,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    top: 250,
    height: 36.24,
    width: 303,
  },
  findDonorButtonText: {
    color: Colors.WHITE,
    fontFamily: "inter-bold",
    fontSize: 24,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#757C82",
    fontFamily: "inter-bold",
    alignItems: "center",
    top: 280,
    height: 30,
    width: 161.59,
    borderRadius: 10,
    justifyContent: "center",
  },
  backButtonText: {
    color: Colors.WHITE,
    fontFamily: "inter-bold",
    fontSize: 16,
  },
});

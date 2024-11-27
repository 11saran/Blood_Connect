import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { router } from "expo-router";

const Manageinfo = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    const fetchUserInfo = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        const response = await axios.get(
          `http://localhost:5000/api-donor/peticulardonor/${email}`
        );
        setUserInfo(response.data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigation]);

  const handleEdit = () => {
    router.push("options/EditInfo");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header1Container}>
        <Text style={styles.header1Text}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Donor Information</Text>
            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          {userInfo ? (
            <>
              <Text style={styles.infoText}>
                Name: {userInfo.first_name}
                {userInfo.last_name}
              </Text>
              <Text style={styles.infoText}>Date Of Birth: {userInfo.dob}</Text>
              <Text style={styles.infoText}>Gender: {userInfo.gender}</Text>
              <Text style={styles.infoText}>
                Contact Number: {userInfo.contact_number}
              </Text>
              <Text style={styles.infoText}>Email: {userInfo.email}</Text>
              <Text style={styles.infoText}>
                Address: {userInfo.address_line1}
                <br></br>
                {userInfo.address_line2}
                <br></br>
                {userInfo.state}
                <br></br>
                {userInfo.city}
                <br></br>
                {userInfo.postal_code}
                <br></br>
                {userInfo.country}
              </Text>
              <Text style={styles.infoText}>NIC: {userInfo.nic_number}</Text>
              <Text style={styles.infoText}>
                Blood Group: {userInfo.blood_type}
              </Text>
              {userInfo.donated_blood === "yes" && (
                <>
                  <p>
                    <strong>Donation Dates:</strong> {userInfo.donation_dates}
                  </p>
                  <p>
                    <strong>Donation Locations:</strong>{" "}
                    {userInfo.donation_locations}
                  </p>
                </>
              )}

              {userInfo.medication === "yes" && (
                <p>
                  <strong>Medication List:</strong> {userInfo.medication_list}
                </p>
              )}
            </>
          ) : (
            <Text style={styles.errorText}>No user information available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header1Container: {
    backgroundColor: Colors.HEADER,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  header1Text: {
    fontFamily: "inter-bold",
    fontSize: 36,
    color: Colors.WHITE,
  },
  headerImage: {
    top: 10,
    marginLeft: 15,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.RED,
  },
  editButton: {
    backgroundColor: Colors.RED,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Manageinfo;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Picker,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import axios from "axios";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

export default function AddAlert() {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const navigation = useNavigation();

  const cities = [
    "Colombo",
    "Mount Lavinia",
    "Kesbewa",
    "Maharagama",
    "Moratuwa",
    "Vavuniya",
    "Ratnapura",
    "Negombo",
    "Kandy",
    "Sri Jayewardenepura Kotte",
    "Kalmunai",
    "Trincomalee",
    "Galle",
    "Jaffna",
    "Athurugiriya",
    "Batticalo",
    "Matara",
    "Kolonnawa",
    "Gampaha",
    "Puttalam",
    "Badulla",
    "Kalutara",
    "Bentota",
    "Mannar",
    "Kurunegala",
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Function to fetch donors from API and filter them
  const bloodTypeCompatibility = {
    "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "O+": ["A+", "B+", "AB+", "O+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "A+": ["A+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "AB-": ["AB+", "AB-"],
    "AB+": ["AB+"],
  };

  // Function to fetch donors from API and filter them
  const findDonors = async () => {
    console.log("clicked");
    console.log("selected blood type:", selectedBloodType);
    try {
      const response = await axios.get("http://localhost:5000/api-donor/donor");
      const donorData = response.data;

      // Filter donors based on blood type, location, donation date, and permanentDonor field
      const filtered = donorData.filter((donor) => {
        const isLocationMatch = location
          ? donor.city.toLowerCase().includes(location.toLowerCase())
          : true;
        console.log("chosen location:", location);
        console.log("database location:", donor.city);

        const isBloodTypeMatch = selectedBloodType
          ? bloodTypeCompatibility[selectedBloodType]?.includes(
              donor.blood_type
            )
          : true;
        console.log(
          "compatable blood type:",
          bloodTypeCompatibility[selectedBloodType]
        );
        console.log("isBloodTypeMatch:", isBloodTypeMatch);

        // Calculate if the donor's last donation was more than 4 months ago
        const lastDonationDate = moment(donor.donation_dates);
        const fourMonthsAgo = moment().subtract(4, "months");
        const canDonate =
          !donor.donation_dates || lastDonationDate.isBefore(fourMonthsAgo);

        // Check if permanentDonor is not "yes" (it should be anything other than "yes")
        const isNotPermanentDonor = donor.permanentDonor !== "yes";

        return (
          isLocationMatch &&
          isBloodTypeMatch &&
          canDonate &&
          isNotPermanentDonor
        );
      });

      setFilteredDonors(filtered);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Find Donor</Text>
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
          <Picker
            selectedValue={location}
            onValueChange={(itemValue) => setLocation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Location" value="" />
            {cities.map((city) => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>

          {/* Display filtered donors */}
          <FlatList
            data={filteredDonors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.donorCard}>
                <Text style={styles.donorName}>
                  Name: {item.first_name}
                  {item.last_name}
                </Text>
                <Text style={styles.donorContact}>
                  Contact: {item.contact_number}
                </Text>
                <Text style={styles.donorBloodType}>
                  Blood Type: {item.blood_type}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noDonorsText}>No matching donors found.</Text>
            }
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.findDonorButton} onPress={findDonors}>
        <Text style={styles.findDonorButtonText}>Find Donor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: Colors.HEADER,
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "inter-bold",
    color: Colors.RED,
    marginVertical: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
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
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    width: "25%",
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
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    height: 40,
    width: "100%",
    borderColor: "#db0304",
    marginBottom: 20,
  },
  findDonorButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: Colors.RED,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "90%",
  },
  findDonorButtonText: {
    color: Colors.WHITE,
    fontFamily: "inter-bold",
    fontSize: 24,
  },
  donorCard: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  donorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  donorContact: {
    fontSize: 16,
    color: "#555",
  },
  donorBloodType: {
    fontSize: 16,
    color: "#555",
  },
  noDonorsText: {
    fontSize: 18,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});

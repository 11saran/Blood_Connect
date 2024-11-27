import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect } from 'react';
import Colors from "../../constants/Colors";

const CampDetailsScreen = () => {
  const { title, date, time, location, organizer } = useLocalSearchParams();

  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{title || "Blood Donation Camps"}</Text>
        <Text style={styles.detailsText}>
          Join us for a blood donation camp to save lives!
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Date and Time: </Text>
          {date || "July 24, 2024, 10:00 AM"}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Location: </Text>
          {location || "Downtown Community Center"}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.label}>Organizer: </Text>
          {organizer || "Blood Bank ABC"}
        </Text>
      </View>

      {/* Action Labels */}
      <View style={styles.labelContainer}>
        <View style={styles.labelBox}>
          <Text style={styles.labelText}>Free Health Checkup</Text>
        </View>
        <View style={styles.labelBox}>
          <Text style={styles.labelText}>Refreshments Provided</Text>
        </View>
        <View style={styles.labelBox}>
          <Text style={styles.labelText}>Community Support</Text>
        </View>
      </View>

      {/* Register Button */}
     {/* <TouchableOpacity
        style={styles.registerButton}
        onPress={() =>
          router.push({
            pathname: '/Screens/RegisterScreen',
            params: { title, date, time, location, organizer },
          })
        }
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>*/}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
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
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "inter-bold",
    color: Colors.RED,
    fontSize: 25,
  },
  detailsText: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left',
  },
  label: {
    fontWeight: 'bold',
  },
  labelContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  labelBox: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    width: '95%',
    alignItems: 'center',
  },
  labelText: {
    color: "#fff",
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: Colors.RED,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    top: 90,
    height: 36.24,
    width: 303,
    marginHorizontal: 50,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "inter-bold",
    fontSize: 24,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#757C82",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    top: 110,
    height: 36.24,
    width: 303,
    marginHorizontal: 50,
  },
  backButtonText: {
    color: Colors.WHITE,
    fontFamily: "inter-bold",
    fontSize: 24,
    textAlign: "center",
  },
});

export default CampDetailsScreen;

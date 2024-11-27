import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";

const data = [
  {
    id: "1",
    name: "Raja Mukesh",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "A+",
  },
  {
    id: "2",
    name: "Varan Kumar",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "AB+",
  },
  {
    id: "3",
    name: "Nimala Suresh",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "O+",
  },
  {
    id: "4",
    name: "Kamala Nirosh",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "A+",
  },
];

const EmergencyList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bloodBank}>{item.bloodBank}</Text>
        <Text style={styles.bloodType}>{item.bloodType}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Blood Connect</Text>
        <Image
          source={require("../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>
      <view>
        <Text style={styles.heading}>Notification</Text>
      </view>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#d32f2f",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
  },
  headerIcon: {
    fontSize: 24,
    color: "#fff",
  },
 
});

export default EmergencyList;

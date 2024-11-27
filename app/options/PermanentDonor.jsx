import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";

// Sample data
const data = [
  {
    id: 1,
    name: 'Amala Maheswararaj',
    address: 'Mallakam, Kilinochchi',
    bloodType: "O+",
    avatar: require("./../../assets/images/avathar.jpeg"),
    isVerified: true,
    lastDonationDate: "2024-04-29",
    availability: "yes",
  },
  {
    id: 2,
    name: 'Thavarasa Tharsan',
    address: 'Sandilipai, Jaffna',
    bloodType: 'O+',
    avatar: require("./../../assets/images/avathar1.jpeg"),
    isVerified: true,
    lastDonationDate: "2023-09-29",
    availability: "yes",
  },
  {
    id: 3,
    name: 'Aananthavel Nithursan',
    address: 'Nelijadi, Jaffna',
    bloodType: 'O+',
    avatar: require("./../../assets/images/avathar2.jpeg"),
    isVerified: true,
    lastDonationDate: "2023-08-19",
    availability: "yes",
  },
  {
    id: 4,
    name: "Michael Johnsin",
    address: 'Kuppilan, Jaffna',
    bloodType: "O+",
    avatar: require("./../../assets/images/avathar3.jpeg"),
    isVerified: true,
    lastDonationDate: "2024-01-15",
    availability: "No",
  },
];

// Star component for verification
const VerificationStar = ({ isVerified }) => (
  <Text style={styles.star}>
    {isVerified ? '★' : '☆'}
  </Text>
);

const PermanentDonorList = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedBloodType, setSelectedBloodType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  const bloodTypes = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];

  const locations = [
    'Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 
  ];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    filterDonors();
  }, [selectedBloodType, selectedLocation]);

  // Function to filter donors
  const filterDonors = () => {
    let filtered = data;
    if (selectedBloodType) {
      filtered = filtered.filter(donor => donor.bloodType === selectedBloodType);
    }
    if (selectedLocation) {
      filtered = filtered.filter(donor => donor.address.includes(selectedLocation));
    }
    setFilteredData(filtered);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(prev => (prev === location ? null : location)); 
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.avatar} style={styles.avatarImage} />
      <View style={styles.info}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <VerificationStar isVerified={item.isVerified} />
        </View>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.bloodType}>{item.bloodType}</Text>
        <TouchableOpacity 
          onPress={() => router.push({
            pathname: "options/ViewPermanentDonor",
            params: { donor: JSON.stringify(item) }
          })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFilterButton = (title, options, selectedValue, onSelect) => (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>{title}:</Text>
      <View style={styles.filterGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.filterButton, selectedValue === option && styles.filterButtonSelected]}
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.filterButtonText, selectedValue === option && styles.filterButtonTextSelected]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Blood Connect</Text>
          <Image source={require("./../../assets/images/header.png")} style={styles.headerImage} />
        </View>
        <Text style={styles.title}>Permanent Donors</Text>

        {renderFilterButton("Blood Type", bloodTypes, selectedBloodType, setSelectedBloodType)}
        {renderFilterButton("Location", locations, selectedLocation, handleLocationSelect)}

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: Colors.HEADER,
    height: 100,
    flexDirection: "row",
    borderRadius: 5,
  },
  headerTitle: {
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
  list: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: 350,
    height: 136,
    alignSelf: 'center',
  },
  avatarImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontFamily: "inter-bold",
    marginRight: 5,
  },
  address: {
    fontSize: 15,
  },
  bloodType: {
    fontSize: 15,
  },
  button: {
    backgroundColor: Colors.RED,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  star: {
    fontSize: 36,
    color: 'gold',
    marginLeft: 5,
  },
  filterContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 18,
    fontFamily: "inter-bold",
    color: Colors.RED,
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  filterButton: {
    backgroundColor: Colors.LIGHTGREY,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
    width: '22%', 
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: Colors.RED,
  },
  filterButtonText: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  filterButtonTextSelected: {
    color: Colors.WHITE,
  },
});

export default PermanentDonorList;

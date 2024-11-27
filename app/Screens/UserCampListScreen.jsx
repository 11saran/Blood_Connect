import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";

const UserCampListScreen = () => {
  const [campList, setCampList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch camps from the API
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api-camp/camps');
        setCampList(response.data);  // Assuming the response is an array of camps
        setLoading(false);
      } catch (error) {
        console.error('Error fetching camps:', error);
        setError('Failed to load camps');
        setLoading(false);
      }
    };

    fetchCamps();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleViewCamp = (camp) => {
    router.push({
      pathname: 'Screens/CampDetailsScreen',
      params: {
        id: camp.id,
        title: camp.title,
        date: camp.date,
        time: camp.time,
        location: camp.location,
      },
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.RED} style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>
      <Text style={styles.title}>Upcoming Blood Donation Camps</Text>
      {campList.map((camp) => (
        <View key={camp.id} style={styles.campCard}>
          {/* Display the camp image */}
          <Image source={{ uri: camp.image }} style={styles.campImage} />
          <View style={styles.campInfoContainer}>
            <Text style={styles.campTitle}>{camp.title}</Text>
            <Text style={styles.campDetails}>Date: {camp.date}</Text>
            <Text style={styles.campDetails}>Time: {camp.time}</Text>
            <Text style={styles.campDetails}>Location: {camp.location}</Text>
            
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleViewCamp(camp)}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
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
  title: {
    fontSize: 32,
    fontFamily: "inter-bold",
    color: Colors.RED,
    marginVertical: 20,
    alignSelf: "center",
  },
  campCard: {
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
    height: 'auto',
    alignSelf: 'center',
  },
  campImage: {
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  campInfoContainer: {
    flex: 1, // Allow the text container to take up the remaining space
  },
  campTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  campDetails: {
    fontSize: 14,
    marginVertical: 2,
  },
  viewButton: {
    backgroundColor: Colors.RED,
    height: 30,
    width: 161.59,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.RED,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UserCampListScreen;

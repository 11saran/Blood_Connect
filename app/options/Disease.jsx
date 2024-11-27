import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from "../../constants/Colors";


export default function Disease() {
  const navigation = useNavigation();
  const [diseases, setDiseases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Fetch diseases data from the API
    const fetchDiseases = async () => {
      try {
        const response = await fetch('http://localhost:5000/api-disease/disease');  // Call the API
        if (!response.ok) {
          throw new Error('Failed to fetch diseases');
        }
        const data = await response.json();
        setDiseases(data);  // Set the fetched data
        setLoading(false);   // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message);
        setLoading(false);  // Stop loading on error as well
      }
    };

    fetchDiseases();  // Trigger the API call
  }, []);


  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDisease = ({ item }) => (

    <View style={styles.card}>

      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('options/view', {
          name: item.name,
          symptoms: item.symptoms,
          transmission: item.transmission,
          prevention: item.prevention,
          image: item.image,
          details: item.details
        })}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>

  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
      <ScrollView style={styles.Scontainer}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Blood Connect</Text>
          <Image
            source={require("./../../assets/images/header.png")}
            style={styles.headerImage}
          />
        </View>
        <View style={styles.container}>

          <Text style={styles.header}>BLOOD DISEASES</Text>

          <FlatList
            data={filteredDiseases}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderDisease}
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>

  );
}

const styles = StyleSheet.create({
  Scontainer: {
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
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'red',
    fontFamily: 'inter-extrabold',
    shadowColor: 'red',


  },
  searchBar: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'mistyrose',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderColor: 'black',
    borderBottomWidth: 5,

  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'red',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
});
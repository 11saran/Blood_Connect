import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter,useNavigation } from 'expo-router';
import Colors from "../../constants/Colors";

const DiseaseDetailsScreen = () => {
  const { name , symptoms, transmission, prevention, image } = useLocalSearchParams();
  

  // States to control the visibility of different sections
  const [showSymptoms, setShowSymptoms] = useState(true);
  const [showTransmission, setShowTransmission] = useState(true);
  const [showPrevention, setShowPrevention] = useState(true);

  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.header1Container}>
        <Text style={styles.headerText}>{name || 'Disease Details'}</Text>
      </View>

      {/* Disease Image */}
      <Image source={{ uri: image }} style={styles.diseaseImage} />

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Disease Name: {name}</Text>
        
        {/* Toggleable Symptoms Section */}
        <TouchableOpacity onPress={() => setShowSymptoms(!showSymptoms)}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
        </TouchableOpacity>
        {showSymptoms && <Text style={styles.details}>{symptoms}</Text>}

        {/* Toggleable Transmission Section */}
        <TouchableOpacity onPress={() => setShowTransmission(!showTransmission)}>
          <Text style={styles.sectionTitle}>Transmission</Text>
        </TouchableOpacity>
        {showTransmission && <Text style={styles.details}>{transmission}</Text>}

        {/* Toggleable Prevention Section */}
        <TouchableOpacity onPress={() => setShowPrevention(!showPrevention)}>
          <Text style={styles.sectionTitle}>Prevention</Text>
        </TouchableOpacity>
        {showPrevention && <Text style={styles.details}>{prevention}</Text>}
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex:1,
    backgroundColor: "white",
},
header1Container: {
  backgroundColor: Colors.HEADER,
  marginTop:-10,
  height: 50,
  flexDirection: "row",
  borderRadius: 5,
},
headerText: {
  fontFamily: "inter-bold",
  fontSize: 38,
  top: 25,
  marginLeft:15,
  color: Colors.WHITE,
},
headerImage: {
  top:-9,
  marginLeft:330,
},
  headerContainer: {
    backgroundColor: Colors.HEADER,
    paddingVertical: 35,
    paddingHorizontal:15,
    elevation:5,
    marginBottom:30,
    height:100
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  diseaseImage: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  card: {
    backgroundColor:'mistyrose',
    padding: 20,
    borderRadius: 15,
    margin: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderColor:'black',
    borderBottomWidth:5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.RED,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.RED,
    marginTop: 10,
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: Colors.RED,
    borderRadius: 10,
    alignItems: 'center',
    padding: 12,
    margin: 20,
    elevation: 2,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  
});

export default DiseaseDetailsScreen;
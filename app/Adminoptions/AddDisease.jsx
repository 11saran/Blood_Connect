import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker'; 
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors'; 
import axios from 'axios';


const AdminDiseaseAddScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [transmission, setTransmission] = useState('');
  const [prevention, setPrevention] = useState('');
  const [image, setImage] = useState(null);

  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [detailsError, setDetailsError] = useState('');
  const [symptomsError, setSymptomsError] = useState('');
  const [transmissionError, setTransmissionError] = useState('');
  const [preventionError, setPreventionError] = useState('');
  const [imageError, setImageError] = useState('');

  const router = useRouter();
  const navigation = useNavigation(); // useNavigation hook to access navigation

  useEffect(() => {
    // Ensure header is hidden
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]); // Only runs when navigation changes

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      
      setImage(result.assets[0].uri);
      setImageError('');
    }
  };

  const handleSubmit = async () => {
    let isValid = true;

    // Clear previous error messages
    setNameError('');
    setDescriptionError('');
    setDetailsError('');
    setSymptomsError('');
    setTransmissionError('');
    setPreventionError('');
    setImageError('');

    // Validation
    if (!name) {
      setNameError('Please enter the disease name');
      isValid = false;
    }
    if (!description) {
      setDescriptionError('Please enter a description');
      isValid = false;
    }
    if (!details) {
      setDetailsError('Please enter detailed information');
      isValid = false;
    }
    if (!symptoms) {
      setSymptomsError('Please enter symptoms');
      isValid = false;
    }
    if (!transmission) {
      setTransmissionError('Please enter transmission details');
      isValid = false;
    }
    if (!prevention) {
      setPreventionError('Please enter prevention methods');
      isValid = false;
    }
    if (!image) {
      setImageError('Please upload an image');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newDisease = new FormData();
    newDisease.append('name', name);
    newDisease.append('description', description);
    newDisease.append('details', details);
    newDisease.append('symptoms', symptoms);
    newDisease.append('transmission', transmission);
    newDisease.append('prevention', prevention);
    // Fetch the image and append it to the FormData
    const response = await fetch(image);
    const blob = await response.blob();
    newDisease.append('image', blob, 'image.jpg'); // Use a default filename or the actual file name if available

    



    
  

    try {
      const response = await axios.post('http://localhost:5000/api-disease/createdisease', newDisease, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      if (response.status === 201) {
        alert('Disease added successfully!');
        console.log('Disease added successfully!');
        
        // Reset form
        setName('');
        setDescription('');
        setDetails('');
        setSymptoms('');
        setTransmission('');
        setPrevention('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error saving disease data:', error);
      alert('Failed to add disease. Please try again.');
    }
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header1Container}>
        <Text style={styles.header1Text}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>
    <ScrollView style={styles.container}>
      
      <View style={styles.container}>
        <Text style={styles.subHeader}>Add New Disease</Text>

        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.imagePreview} />
          </View>
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>No Image Selected</Text>
          </View>
        )}

        {imageError ? <Text style={styles.errorText}>{imageError}</Text> : null}

        <TouchableOpacity style={styles.imageButtonSmall} onPress={pickImage}>
          <Text   value={image}
          onChangeText={setImage} style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Disease Name</Text>
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          placeholder="Enter disease name"
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.input, descriptionError ? styles.inputError : null]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
        />
        {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}

        <Text style={styles.inputLabel}>Details</Text>
        <TextInput
          style={[styles.input, detailsError ? styles.inputError : null]}
          placeholder="Enter detailed information"
          value={details}
          onChangeText={setDetails}
        />
        {detailsError ? <Text style={styles.errorText}>{detailsError}</Text> : null}

        <Text style={styles.inputLabel}>Symptoms</Text>
        <TextInput
          style={[styles.input, symptomsError ? styles.inputError : null]}
          placeholder="Enter symptoms"
          value={symptoms}
          onChangeText={setSymptoms}
        />
        {symptomsError ? <Text style={styles.errorText}>{symptomsError}</Text> : null}

        <Text style={styles.inputLabel}>Transmission</Text>
        <TextInput
          style={[styles.input, transmissionError ? styles.inputError : null]}
          placeholder="Enter transmission details"
          value={transmission}
          onChangeText={setTransmission}
        />
        {transmissionError ? <Text style={styles.errorText}>{transmissionError}</Text> : null}

        <Text style={styles.inputLabel}>Prevention</Text>
        <TextInput
          style={[styles.input, preventionError ? styles.inputError : null]}
          placeholder="Enter prevention methods"
          value={prevention}
          onChangeText={setPrevention}
        />
        {preventionError ? <Text style={styles.errorText}>{preventionError}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor:'white',
    height: 100,
    justifyContent: 'center',

  },
  headerText: {
    fontFamily: 'inter-bold',
    fontSize: 24,
    color: 'red',
    top:0,
    marginLeft:15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
},
header1Container: {
  backgroundColor: Colors.HEADER,
  marginTop: 0,
  height:100,
  flexDirection: "row",
  borderRadius: 5,
},
header1Text: {
  fontFamily: "inter-bold",
  fontSize: 35,
  top:10,
  marginLeft:15,
  color: Colors.WHITE,
},
headerImage: {
  top:45,
  marginLeft:150,
},
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.RED,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  inputError: {
    borderColor: 'red', // Change border color if there's an error
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  imageButton: {
    backgroundColor: Colors.RED,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 300,
  },
  imageButtonSmall: {
    backgroundColor: Colors.RED,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#aaa',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AdminDiseaseAddScreen;
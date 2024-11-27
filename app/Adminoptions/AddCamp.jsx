import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import axios from 'axios';

const AdminCampAddScreen = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [imageError, setImageError] = useState('');

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {

    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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

    setTitleError('');
    setDateError('');
    setTimeError('');
    setLocationError('');
    setImageError('');

    if (!title) {
      setTitleError('Please enter the camp title');
      isValid = false;
    }
    if (!date) {
      setDateError('Please enter the date ');
      isValid = false;
    }
    if (!time) {
      setTimeError('Please enter the time');
      isValid = false;
    }
    if (!location) {
      setLocationError('Please enter the location');
      isValid = false;
    }
    if (!image) {
      setImageError('Please upload an image');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newCamp = new FormData();
    newCamp.append('title', title);
    newCamp.append('date', date);
    newCamp.append('time', time);
    newCamp.append('location', location);

    // Fetch the image and append it to the FormData
    const response = await fetch(image);
    const blob = await response.blob();
    newCamp.append('image', blob, 'image.jpg'); // Use a default filename or the actual file name if available


    try {
      console.log(newCamp);
      const response = await axios.post('http://localhost:5000/api-camp/createcamp', newCamp, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Camp added successfully!');
        console.log('Camp added successfully!');

        // Reset form

        setTime('');
        setDate('');
        setTitle('');
        setLocation('');
        setImage(null);
      }
    } catch (error) {
      console.error('Error saving Camp data:', error);
      alert('Failed to add Camp. Please try again.');
    }





  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.subHeader}>Add New Blood Donation Camp</Text>

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
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Camp Title</Text>
        <TextInput
          style={[styles.input, titleError ? styles.inputError : null]}
          placeholder="Enter camp title"
          value={title}
          onChangeText={setTitle}
        />
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
        {/* <TextInput
          style={[styles.input, dateError ? styles.inputError : null]}
          placeholder="Enter camp date"
          value={date}
          onChangeText={setDate}
        />
        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null} */}
        <Text style={styles.inputLabel}>Camp Date</Text>





        {Platform.OS === 'web' ? (

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={styles.inputDate}

          />
        ) : (
          <TextInput
            style={[styles.input, dateError && styles.inputError]}
            value={date}
            onFocus={() => setShowDatePicker(true)}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={Colors.GRAY}
          />
        )}

        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {dateError ? (
            <Text style={styles.errorText}>{dateError}</Text>
          ) : null}
        </View>


        {/*web vies*/}
        <Text style={styles.inputLabel}>Camp Time</Text>

        {Platform.OS === 'web' ? (
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={styles.inputTime}
          />
        ) : (
          <>
            <TextInput
              style={[styles.input, timeError ? styles.inputError : null]}
              value={time}
              onFocus={() => setShowTimePicker(true)} // Show time picker when focused
              placeholder="HH:MM AM/PM"
              placeholderTextColor={Colors.GRAY}
            />
            {showTimePicker && (
              // Render your TimePicker component here when showTimePicker is true
              <YourTimePickerComponent
                selectedTime={time}
                onTimeChange={(newTime) => {
                  setTime(newTime);
                  setShowTimePicker(false); // Hide the time picker after selection
                }}
                onCancel={() => setShowTimePicker(false)} // Optionally handle cancel action
              />
            )}
          </>
        )}

        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {timeError ? <Text style={styles.errorText}>{timeError}</Text> : null}
        </View>
        {/*web view*/}


        {/* <Text style={styles.inputLabel}>Camp Time</Text>
        <TextInput
          style={[styles.input, timeError ? styles.inputError : null]}
          placeholder="Enter camp time"
          value={time}
          onChangeText={setTime}
        />
        {timeError ? <Text style={styles.errorText}>{timeError}</Text> : null} */}

        <Text style={styles.inputLabel}>Camp Location</Text>
        <TextInput
          style={[styles.input, locationError ? styles.inputError : null]}
          placeholder="Enter camp location"
          value={location}
          onChangeText={setLocation}
        />
        {locationError ? <Text style={styles.errorText}>{locationError}</Text> : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    marginLeft: 70, // Adjusted to make sure it's not too far off
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
    marginHorizontal: 10, // Added margin for spacing
  },
  inputDate: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: 350,
    fontFamily: "inter-medium",
    fontSize: 16,
    height: 20,
    alignSelf: "center",
  },
  inputTime:{
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: 350,
    fontFamily: "inter-medium",
    fontSize: 16,
    height: 20,
    alignSelf: "center",
  },
  inputError: {
    borderColor: 'red', // Change border color if there's an error
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10, // Added margin for spacing
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
    alignSelf: 'center',
  },
  imagePlaceholderText: {
    color: '#999',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AdminCampAddScreen;

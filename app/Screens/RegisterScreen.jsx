import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors'; // Ensure to define color constants or import them accordingly
import axios from 'axios';

export default function RegisterScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [errors, setErrors] = useState({});
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!form.firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!form.lastName) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!form.dob) {
      newErrors.dob = "Date of birth is required";
      valid = false;
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.dob)) {
      newErrors.dob = "Date format should be DD/MM/YYYY";
      valid = false;
    }
    if (!form.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }
    if (!form.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(form.contactNumber)) {
      newErrors.contactNumber = "Contact number should be 10 digits";
      valid = false;
    }
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!form.address) {
      newErrors.address = "Address is required";
      valid = false;
    }
    if (!selectedBloodType) {
      newErrors.bloodType = "Blood type is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const requestBody = {
        firstName: form.firstName,
        lastName: form.lastName,
        dob: form.dob,
        gender: form.gender,
        contactNumber: form.contactNumber,
        email: form.email,
        address: form.address,
        bloodType: selectedBloodType,
      };

      try {
        const response = await axios.post("http://localhost:5000/register", requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data);
        router.push("/Screens/SuccessScreen"); // Assuming you have a success screen
      } catch (error) {
        Alert.alert(
          "Registration Error",
          error.response?.data?.error || "An error occurred during registration."
        );
      }
    } else {
      Alert.alert("Error", "Please correct the errors in the form.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image source={require("./../../assets/images/header.png")} style={styles.headerImage} />
      </View>

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.formTitle}>Register</Text>

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={[styles.input, { width: '40%', marginLeft: 10 }]}
              placeholder="First name"
              value={form.firstName}
              onChangeText={(text) => handleChange("firstName", text)}
            />
            <TextInput
              style={[styles.input, { width: '45%', marginLeft: 20 }]}
              placeholder="Last name"
              value={form.lastName}
              onChangeText={(text) => handleChange("lastName", text)}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Date Of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={form.dob}
            onChangeText={(text) => handleChange("dob", text.replace(/[^0-9/]/g, ''))}
            keyboardType="numeric"
            maxLength={10}
          />
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Gender</Text>
          <View style={styles.radioContainer}>
            {["male", "female", "other"].map((genderOption) => (
              <TouchableOpacity
                key={genderOption}
                style={[styles.radioButton, form.gender === genderOption && styles.radioButtonSelected]}
                onPress={() => handleChange("gender", genderOption)}
              >
                <View style={styles.outerCircle}>
                  {form.gender === genderOption && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>
                  {genderOption.charAt(0).toUpperCase() + genderOption.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            value={form.contactNumber}
            onChangeText={(text) => handleChange("contactNumber", text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={10}
          />
          {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={form.address}
            onChangeText={(text) => handleChange("address", text)}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.inputLabel}>Choose Blood Type</Text>
          <View style={styles.bloodTypeContainer}>
            {bloodTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.radioButton, selectedBloodType === type && styles.radioButtonSelected]}
                onPress={() => setSelectedBloodType(type)}
              >
                <View style={styles.outerCircle}>
                  {selectedBloodType === type && <View style={styles.innerCircle} />}
                </View>
                <Text style={styles.radioText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.bloodType && <Text style={styles.errorText}>{errors.bloodType}</Text>}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      backgroundColor: Colors.HEADER,  // Assuming you have a color for the header
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    headerText: {
      fontFamily: "inter-bold",
      fontSize: 28,  // Reduced size for better visibility
      color: Colors.WHITE,
      textAlign: 'center',
      flex: 1,
    },
    headerImage: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    formTitle: {
      marginTop: 10,
      textAlign: "center",
      fontFamily: "inter-bold",
      color: Colors.RED,
      fontSize: 25,
    },
    section: {
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    inputLabel: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: Colors.LIGHT_GREY,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      fontSize: 16,
      color: Colors.DARK_GREY,
    },
    radioContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 5,
    },
    outerCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.GRAY,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    innerCircle: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: Colors.WHITE,
    },
    radioButtonSelected: {
      borderColor: Colors.PRIMARY,
    },
    radioText: {
      fontSize: 16,
      color: Colors.DARK_GREY,
    },
    bloodTypeContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginVertical: 10,
    },
    buttonContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      backgroundColor: Colors.RED,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      height: 50,  // Increased button height for visibility
      width: 300,  // Ensure width is enough for all text
      marginHorizontal: 20,
    },
    buttonText: {
      color: Colors.WHITE,
      fontSize: 18,  // Adjusted for readability
      fontWeight: "bold",
    },
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  });
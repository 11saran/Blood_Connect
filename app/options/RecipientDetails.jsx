import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function RecipientDetails() {
  const router = useRouter();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    bloodType: "",
    address: "",
    reasonForRequest: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
    // Clear the error for this field if it exists
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: null }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.lastName) newErrors.lastName = "Last name is required";
    if (!form.bloodType) newErrors.bloodType = "Blood Type is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.reasonForRequest) newErrors.reasonForRequest = "Reason for Request is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", form);
      router.push("options/SuccessfullySubmitted");
    } else {
      Alert.alert("Error", "Please correct the errors in the form.");
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image source={require("./../../assets/images/header.png")} style={styles.headerImage} />
      </View>

      <Text style={styles.formTitle}>Recipient Details</Text>

      <View style={styles.section}>
        <Text style={styles.inputLabel}>Recipient Name</Text>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="First name"
            value={form.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
          />
          <TextInput
            style={[styles.input, styles.nameInput]}
            placeholder="Last name"
            value={form.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
          />
        </View>
        <View style={styles.errorContainer}>
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.inputLabel}>Blood Type</Text>
        <View style={styles.radioContainer}>
          {bloodTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={styles.radioButton}
              onPress={() => handleChange("bloodType", type)}
            >
              <View style={[styles.radioCircle, form.bloodType === type && styles.selectedRadio]} />
              <Text style={styles.radioText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.bloodType && <Text style={styles.errorText}>{errors.bloodType}</Text>}
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
        <Text style={styles.inputLabel}>Reason for request</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your reason"
          value={form.reasonForRequest}
          onChangeText={(text) => handleChange("reasonForRequest", text)}
        />
        {errors.reasonForRequest && <Text style={styles.errorText}>{errors.reasonForRequest}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
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
  formTitle: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "inter-bold",
    color: Colors.RED,
    fontSize: 25,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: "inter-bold",
    marginBottom: 10,
  },
  nameInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.INPUT,
    fontSize: 16,
    height: 40,
  },
  nameInput: {
    width: '48%',
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '25%',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.INPUT,
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: Colors.RED,
    borderColor: Colors.RED,
  },
  radioText: {
    fontSize: 16,
    fontFamily: "inter-regular",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: Colors.RED,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
  },
  backButton: {
    backgroundColor: Colors.BLACK,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: "inter-bold",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
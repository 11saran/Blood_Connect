import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert,ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function MeAsDonor() {
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
    nicNumber: "",
  });
  const [errors, setErrors] = useState({});

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
    if (!form.nicNumber) {
      newErrors.nicNumber = "NIC number is required";
      valid = false;
    } else if (!/^\d{12}$/.test(form.nicNumber)) {
      newErrors.nicNumber = "NIC number should be 12 digits";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      router.push("options/MedicalHistory");
    } else {
      Alert.alert("Error", "Please correct the errors in the form.");
    }
  };

  return (
    <ScrollView style={{ height: "100%", backgroundColor: Colors.WHITE }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image source={require("./../../assets/images/header.png")} style={styles.headerImage} />
      </View>

      <Text style={styles.formTitle}>Donor Registration Form</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        {/* Full Name */}
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
        <View style={{ flexDirection: 'row', columnGap:40, marginHorizontal: 10,marginTop:10 }}>
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        </View>

      </View>

      {/* Date of Birth */}
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
        <View style={{ marginLeft:30,marginTop:10 }}>
        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
        </View>
      </View>

      {/* Gender */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Gender</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity style={styles.radioButton} onPress={() => handleChange("gender", "male")}>
            <View style={[styles.radioCircle, form.gender === "male" && styles.selectedRadio]} />
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton} onPress={() => handleChange("gender", "female")}>
            <View style={[styles.radioCircle, form.gender === "female" && styles.selectedRadio]} />
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton} onPress={() => handleChange("gender", "other")}>
            <View style={[styles.radioCircle, form.gender === "other" && styles.selectedRadio]} />
            <Text style={styles.radioText}>Other</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft:30 }}>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
        </View>
      </View>

      {/* Contact Number */}
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
        <View style={{ marginLeft:30,marginTop:10 }}>
        {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}
        </View>
      </View>

      {/* Email */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <View style={{ marginLeft:30,marginTop:10 }}>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
      </View>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={form.address}
          onChangeText={(text) => handleChange("address", text)}
        />
        <View style={{ marginLeft:30, marginTop:10 }}>
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        </View>
      </View>

      {/* NIC Number */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>NIC Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter NIC number"
          value={form.nicNumber}
          onChangeText={(text) => handleChange("nicNumber", text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={12}
        />
        <View style={{ marginLeft:30 , marginTop:10}}>
        {errors.nicNumber && <Text style={styles.errorText}>{errors.nicNumber}</Text>}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push("/Home")} style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit} style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 10,
    textAlign: "center",
    fontFamily: "inter-bold",
    color: Colors.RED,
    fontSize: 25,
  },
  section: {
    marginTop: 20,
    backgroundColor: Colors.WHITE,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "inter-bold",
    fontWeight: "400",
    marginLeft: 10,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: "inter-bold",
    fontWeight: "400",
    marginLeft: 10,
  },
  input: {
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    top: 20,
    width: 350,
    fontFamily: "inter-medium",
    borderColor: Colors.INPUT,
    fontSize: 16,
    height: 40,
    alignSelf: "center",
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000', 
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: 'green', 
    borderColor: 'green',
  },
  radioText: {
    fontSize: 16,
    fontFamily: "inter-regular",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#000000',  
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '35%',
    margin:20,
  },
  nextButton: {
    backgroundColor: '#FF0000',  
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '35%',
    margin:20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginTop: 5,
  },
});
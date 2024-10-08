import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert,ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function MeAsDonor() {
  const router = useRouter();
  const navigation = useNavigation();
  
  const [form1, setForm1] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    contact_number: "",
    email: "",
    address: "",
    nic_number: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  const handleChange = (name, value) => {
    setForm1({
      ...form1,
      [name]: value,
    });
  };

    const validateForm1 = () => {
    let valid = true;
    let newErrors = {};

    if (!form1.first_name) {
      newErrors.first_name = "First name is required";
      valid = false;
    }
    if (!form1.last_name) {
      newErrors.last_name = "Last name is required";
      valid = false;
    }
    if (!form1.dob) {
      newErrors.dob = "Date of birth is required";
      valid = false;
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form1.dob)) {
      newErrors.dob = "Date format should be DD/MM/YYYY";
      valid = false;
    }
    if (!form1.gender) {
      newErrors.gender = "Gender is required";
      valid = false;
    }
    if (!form1.contact_number) {
      newErrors.contact_number = "Contact number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(form1.contact_number)) {
      newErrors.contact_number = "Contact number should be 10 digits";
      valid = false;
    }
    if (!form1.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form1.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!form1.address) {
      newErrors.address = "Address is required";
      valid = false;
    }
    
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm1()) {
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
            value={form1.first_name}
            onChangeText={(text) => handleChange("first_name", text)}
          />
          <TextInput
            style={[styles.input, { width: '45%', marginLeft: 20 }]}
            placeholder="Last name"
            value={form1.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
        </View>
        <View style={{ flexDirection: 'row', columnGap:40, marginHorizontal: 10,marginTop:10 }}>
          {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}
          {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}
        </View>

      </View>

      {/* Date of Birth */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Date Of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={form1.dob}
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
            <View style={[styles.radioCircle, form1.gender === "male" && styles.selectedRadio]} />
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton} onPress={() => handleChange("gender", "female")}>
            <View style={[styles.radioCircle, form1.gender === "female" && styles.selectedRadio]} />
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioButton} onPress={() => handleChange("gender", "other")}>
            <View style={[styles.radioCircle, form1.gender === "other" && styles.selectedRadio]} />
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
          value={form1.contact_number}
          onChangeText={(text) => handleChange("contact_number", text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={10}
        />
        <View style={{ marginLeft:30,marginTop:10 }}>
        {errors.contact_number && <Text style={styles.errorText}>{errors.contact_number}</Text>}
        </View>
      </View>

      {/* Email */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          value={form1.email}
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
          value={form1.address}
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
          value={form1.nic_number}
          onChangeText={(text) => handleChange("nic_number", text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={12}
        />
         
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


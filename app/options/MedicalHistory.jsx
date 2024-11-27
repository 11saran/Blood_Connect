import {Platform, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';

export default function MedicalHistory() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [form2, setForm2] = useState({
    blood_type: "",
    medication: "",
    medication_list: "",
    donated_blood: "",
    donation_dates: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    console.log("Form 1 data received:", params); // Debugging to check if Form1 data is passed
  }, [params]);

  const handleChange = (name, value) => {
    setForm2(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validateForm2 = () => {
    let valid = true;
    const newErrors = {};

    if (!form2.blood_type) {
      newErrors.blood_type = "Blood type is required.";
      valid = false;
    }

    if (!form2.medication) {
      newErrors.medication = "Please specify if you are on any medication.";
      valid = false;
    }

    if (form2.medication === 'Yes' && !form2.medication_list) {
      newErrors.medication_list = "Please provide the list of medications you are taking.";
      valid = false;
    }

    if (!form2.donated_blood) {
      newErrors.donated_blood = "Please specify if you have donated blood before.";
      valid = false;
    }

    if (form2.donated_blood === 'Yes') {
      if (!form2.donation_dates) {
        newErrors.donation_dates = "Please provide the dates of blood donations.";
        valid = false;
      }

     
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChangeDate = (event) => {
    const date = event.target.value;
    setForm2({ ...form2, donation_dates: date });
  };


  const handleSubmit = () => {
    if (validateForm2()) {
      const combinedData = { ...params, ...form2 }; // Combine Form 1 and Form 2 data
      console.log("Combined data:", combinedData); // Debugging combined data

      // Pass the combined data to the Consent page
      router.push({
        pathname: "options/Consent",
        params: combinedData, // Pass combined data to Consent page
      });
    } else {
      Alert.alert("Error", "Please correct the errors in the form.");
    }
  };

  return (
    <ScrollView>
      <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
        {/* Header */}
        <View style={{
          backgroundColor: Colors.HEADER,
          marginTop: 0,
          height: 100,
          flexDirection: "row",
          borderRadius: 5,
        }}>
          <Text style={{
            fontFamily: "inter-bold",
            fontSize: 38,
            top: 25,
            marginLeft: 5,
            color: Colors.WHITE,
          }}>
            Blood Connect
          </Text>
          <Image
            source={require("./../../assets/images/header.png")}
            style={{ top: 45, marginLeft: 70 }}
          />
        </View>

        <View>
          <Text style={{
            marginTop: 20,
            marginLeft: 20,
            textAlign: "left",
            fontFamily: "inter-bold",
            color: Colors.BLACK,
            fontSize: 25,
          }}>
            Medical History:
          </Text>
        </View>

        {/* Blood Type */}
        <View style={{ marginTop: 20, backgroundColor: Colors.WHITE }}>
          <Text style={styles.label}>Blood Type</Text>

          {/* First Row */}
          <View style={styles.radioContainer}>
            {['A+', 'A-', 'B+', 'B-'].map(type => (
              <TouchableOpacity
                key={type}
                style={styles.radioButton}
                onPress={() => handleChange('blood_type', type)}
              >
                <View style={[styles.radioCircle, form2.blood_type === type && styles.selectedRadio]} />
                <Text style={styles.radioText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Second Row */}
          <View style={styles.radioContainer}>
            {['AB+', 'AB-', 'O+', 'O-'].map(type => (
              <TouchableOpacity
                key={type}
                style={styles.radioButton}
                onPress={() => handleChange('blood_type', type)}
              >
                <View style={[styles.radioCircle, form2.blood_type === type && styles.selectedRadio]} />
                <Text style={styles.radioText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ marginLeft: 30, marginTop: 10 }}>
            {errors.blood_type && <Text style={styles.errorText}>{errors.blood_type}</Text>}
          </View>
        </View>

        {/* Medications */}
        <View style={{ marginTop: 20, backgroundColor: Colors.WHITE }}>
          <Text style={styles.label}>Any current medications?</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('medication', 'Yes')}>
              <View style={[styles.radioCircle, form2.medication === 'Yes' && styles.selectedRadio]} />
              <Text style={styles.radioText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('medication', 'No')}>
              <View style={[styles.radioCircle, form2.medication === 'No' && styles.selectedRadio]} />
              <Text style={styles.radioText}>No</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 30, marginTop: 10 }}>
            {errors.medication && <Text style={styles.errorText}>{errors.medication}</Text>}
          </View>

          {/* Medication list input (only show if 'Yes') */}
          {form2.medication === 'Yes' && (
            <TextInput
              style={styles.input}
              placeholder="Enter list of medications"
              value={form2.medication_list}
              onChangeText={(text) => handleChange('medication_list', text)}
            />
          )}
        </View>

        {/* Blood Donation */}
        <View style={{ marginTop: 20, backgroundColor: Colors.WHITE }}>
          <Text style={styles.label}>Have you donated blood before?</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('donated_blood', 'Yes')}>
              <View style={[styles.radioCircle, form2.donated_blood === 'Yes' && styles.selectedRadio]} />
              <Text style={styles.radioText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioButton} onPress={() => handleChange('donated_blood', 'No')}>
              <View style={[styles.radioCircle, form2.donated_blood === 'No' && styles.selectedRadio]} />
              <Text style={styles.radioText}>No</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 30, marginTop: 10 }}>
            {errors.donated_blood && <Text style={styles.errorText}>{errors.donated_blood}</Text>}
          </View>

          {form2.donated_blood === 'Yes' && (
            <>
              {Platform.OS === 'web' ? (

                <input
                  type="date"
                  value={form2.donation_dates}
                  onChange={handleChangeDate}
                  style={styles.inputDate}

                />
              ) : (
                <TextInput
                  style={[styles.input, errors.donation_dates && styles.inputError]}
                  value={form2.donation_dates}
                  onFocus={() => setShowDatePicker(true)}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={Colors.GRAY}
                />
              )}
              
            </>
          )}
        </View>


        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.push("./MeAsDonor")} style={styles.backButton}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.nextButton}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  inputDate:{
    width: 350,  height: 40,
    borderWidth: 3,
    borderRadius: 10,
    fontFamily: "inter-medium",
    borderColor: Colors.INPUT,
    fontSize: 16,
    height: 40,
    alignSelf: "center",
  },
  input: {
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 20,
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
    marginTop: 40,
  },
  backButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '35%',
    margin: 20,
  },
  nextButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '35%',
    margin: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontFamily: "inter-bold",
    fontWeight: "400",
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    marginTop: 5,
  },
});

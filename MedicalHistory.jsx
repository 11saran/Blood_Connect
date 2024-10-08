import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function MedicalHistory() {
  const router = useRouter();
  const navigation = useNavigation();

  const [blood_type, setBloodType] = useState(""); 
  const [medication, setMedication] = useState(""); 
  const [medication_list, setMedicationList] = useState(""); 
  const [donated_blood, setDonatedBlood] = useState("");  
  const [donation_dates, setDonationDates] = useState(""); 
  const [donation_locations, setDonationLocations] = useState(""); 

  const [errors, setErrors] = useState({});


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const validateForm2 = () => {
    const newErrors = {};

    if (!blood_type) {
        newErrors.blood_type = "Blood type is required.";
    }

    if (!medication) {
        newErrors.medication = "Please specify if you are on any medication.";
    }

    if (medication === 'Yes' && !medication_list) {
        newErrors.medication_list = "Please provide the list of medications you are taking.";
    }

    if (!donated_blood) {
        newErrors.donated_blood = "Please specify if you have donated blood before.";
    }

    if (donated_blood === 'Yes') {
        if (!donation_dates) {
            newErrors.donation_dates = "Please provide the dates of blood donations.";
        }

        if (!donation_locations) {
            newErrors.donation_locations = "Please provide the locations of blood donations.";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
};


  const handleSubmit = () => {
    if (validateForm2()) {
      router.push("options/Consent");
    } else {
      Alert.alert("Error", "Please correct the errors in the form.");
    }
  };

  const handleNext = () => {
    if (!validateForm2()) return;

  };
  

  return (
    <ScrollView>
      <View style={{ height: "100%", backgroundColor: Colors.WHITE }}>
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
                  onPress={() => setBloodType(type)}
                >
                  <View style={[styles.radioCircle, blood_type === type && styles.selectedRadio]} />
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
                  onPress={() => setBloodType(type)}
                >
                  <View style={[styles.radioCircle, blood_type === type && styles.selectedRadio]} />
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
            <TouchableOpacity style={styles.radioButton} onPress={() => setMedication('Yes')}>
              <View style={[styles.radioCircle, medication === 'Yes' && styles.selectedRadio]} />
              <Text style={styles.radioText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioButton} onPress={() => setMedication('No')}>
              <View style={[styles.radioCircle, medication === 'No' && styles.selectedRadio]} />
              <Text style={styles.radioText}>No</Text>
            </TouchableOpacity>
            </View>
            <View style={{ marginLeft:30,marginTop:10 }}>
            {errors.medication && <Text style={styles.errorText}>{errors.medication}</Text>}
            </View>
          

          {/* Medication list input (only show if 'Yes') */}
          {medication === 'Yes' && (
            <TextInput
              style={styles.input}
              placeholder="Enter list of medications"
              value={medication_list}
              onChangeText={setMedicationList}
            />
          )}
        </View>

        {/* Blood Donation */}
        <View style={{ marginTop: 20, backgroundColor: Colors.WHITE }}>
          <Text style={styles.label}>Have you donated blood before?</Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.radioButton} onPress={() => setDonatedBlood('Yes')}>
              <View style={[styles.radioCircle, donated_blood === 'Yes' && styles.selectedRadio]} />
              <Text style={styles.radioText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.radioButton} onPress={() => setDonatedBlood('No')}>
              <View style={[styles.radioCircle, donated_blood === 'No' && styles.selectedRadio]} />
              <Text style={styles.radioText}>No</Text>
            </TouchableOpacity>
            </View>
            <View style={{ marginLeft:30,marginTop:10 }}>
            {errors.donated_blood && <Text style={styles.errorText}>{errors.donated_blood}</Text>}
            </View>
          

          {donated_blood === 'Yes' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter donation dates (DD/MM/YYYY)"
                value={donation_dates}
                onChangeText={setDonationDates}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter donation locations"
                value={donation_locations}
                onChangeText={setDonationLocations}
              />
            </>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => router.push("options/MeAsDonor")}
            style={styles.backButton}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            style={styles.nextButton}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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

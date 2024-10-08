import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function Consent() {
  const router = useRouter();
  const navigation = useNavigation();

  const [consents, setConsent] = useState("");  
  const [permanentDonor, setPermanentDonor] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
/*
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
  
  const [blood_type, setBloodType] = useState(""); 
  const [medication, setMedication] = useState(""); 
  const [medication_list, setMedicationList] = useState(""); 
  const [donated_blood, setDonatedBlood] = useState("");  
  const [donation_dates, setDonationDates] = useState(""); 
  const [donation_locations, setDonationLocations] = useState(""); 

*/
  const validateForm3 = () => {
    let isValid = true;
    const newErrors = {};

    if (!consents) {
      isValid = false;
      newErrors.consents = "Please select an option for consent.";
    }

    if (!permanentDonor) {
      isValid = false;
      newErrors.permanentDonor = "Please select an option for becoming a permanent donor.";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm3()) {
          router.push("options/SuccessfullyRegisterDonor");
        } else {
          Alert.alert("Error", "Please correct the errors in the form.");
        }
      };
/*
  const handleSubmit = () => {
    if (validateForm3()) {
      const formData = {
        ...form1,
        blood_type:blood_type,
        medication:medication,
        medication_list:medication_list,
        donated_blood:donated_blood,
        donation_dates:donation_dates,
        donation_locations:donation_locations,
        consents: consents,
        permanentDonor: permanentDonor
      };

      axios.post('http://localhost:3000/donors', formData)
      .then(response => {
        Alert.alert('Success', 'Form submitted successfully.');
        router.push("options/SuccessfullyRegisterDonor");
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to submit form. Please try again.');
      });
    } else {
      Alert.alert("Error", "Please correct the errors in the form.");
    }
  };

     */ 

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
            style={{
              top: 45,
              marginLeft: 70,
            }}
          />
        </View>

        <View>
          <Text style={{
            marginTop: 20,
            marginLeft: 20,
            textAlign: "left",
            fontFamily: "inter-bold",
            color: Colors.BLACK,
            fontSize: 30,
          }}>
            Consent:
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "500",
            marginLeft: 15,
          }}>
            I consent to the collection and use of my personal and medical information for blood donation purposes.
          </Text>
          <View style={styles.radioContainer}>
            <TouchableOpacity style={styles.radioButton} onPress={() => setConsent('Agree')}>
              <View style={[styles.radioCircle, consents === 'Agree' && styles.selectedRadio]} />
              <Text style={styles.radioText}>Agree</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.radioButton} onPress={() => setConsent('Disagree')}>
              <View style={[styles.radioCircle, consents === 'Disagree' && styles.selectedRadio]} />
              <Text style={styles.radioText}>Disagree</Text>
            </TouchableOpacity>
          </View>
          {errors.consents && <Text style={styles.errorText}>{errors.consents}</Text>}
        </View>

        <View>
          <Text style={{
            marginTop: 20,
            marginLeft: 20,
            textAlign: "left",
            fontFamily: "inter-bold",
            color: Colors.BLACK,
            fontSize: 30,
          }}>
            Permanent Donor
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "500",
            marginLeft: 10,
          }}>
            Join as a permanent donor to help patients who need regular blood transfusions. By becoming a permanent donor, you provide consistent, lifesaving blood for a specific recipient.
          </Text>
          <View style={{ marginTop: 25 }}>
            <Text style={{
              fontSize: 23,
              fontFamily: "inter-bold",
              fontWeight: "500",
              marginLeft: 10,
            }}>
              Would you like to become a permanent donor?
            </Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity style={styles.radioButton} onPress={() => setPermanentDonor('Yes')}>
                <View style={[styles.radioCircle, permanentDonor === 'Yes' && styles.selectedRadio]} />
                <Text style={styles.radioText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.radioButton} onPress={() => setPermanentDonor('No')}>
                <View style={[styles.radioCircle, permanentDonor === 'No' && styles.selectedRadio]} />
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
            {errors.permanentDonor && <Text style={styles.errorText}>{errors.permanentDonor}</Text>}
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => router.push("options/MeAsDonor")}
              style={styles.backButton}
            >
              <Text style={styles.buttonText}>Review</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.nextButton}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    margin: 20
  },
  nextButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '35%',
    margin: 20
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginLeft: 15,
    marginTop: 5,
  },
});

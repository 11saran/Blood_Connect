import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';

// Checkbox Component
const Checkbox = ({ isChecked, onToggle }) => (
  <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, isChecked && styles.checked]} />
  </TouchableOpacity>
);

export default function Consent() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [formData, setFormData] = useState({
    ...params,
    consents: '',
    permanentDonor: '',
  });

  const [errors, setErrors] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    console.log("Data from previous forms:", params);
  }, [params]);

  const validateForm = () => {
    const newErrors = {};
    if (!isCheckboxChecked) newErrors.consents = 'You must agree to the terms.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log('Submitting data:', {
      ...formData,
      consents: isCheckboxChecked,
    });
    if (validateForm()) {
      console.log('hi');
      try {
        const response = await fetch('http://localhost:5000/api-donor/createdonor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            consents: isCheckboxChecked, 
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        Alert.alert('Success', 'Form submitted successfully.');
        router.push('options/SuccessfullyRegisterDonor');
      } catch (error) {
        console.error('Error submitting form:', error);
        Alert.alert('Error', 'Failed to submit form. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please correct the errors in the form.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Blood Connect</Text>
        <Image source={require('../../assets/images/header.png')} style={styles.headerImage} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consent:</Text>
        <View style={styles.checkboxRow}>
          <Checkbox isChecked={isCheckboxChecked} onToggle={() => setIsCheckboxChecked(!isCheckboxChecked)} />
          <Text style={styles.question} onPress={() => setIsCheckboxChecked(!isCheckboxChecked)}>
            I consent to the collection and use of my personal and medical information for blood donation purposes.
          </Text>
        </View>
        {errors.consents && <Text style={styles.errorText}>{errors.consents}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.nextButton, !isCheckboxChecked && styles.disabledButton]} // Apply disabled styles
          disabled={!isCheckboxChecked} // Disable if the checkbox is not checked
        >
          <Text style={styles.buttonText}>Submit</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontFamily: 'inter-bold',
    fontSize: 38,
    color: Colors.WHITE,
  },
  headerImage: {
    marginLeft: 'auto',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontFamily: 'inter-bold',
    fontSize: 30,
    color: Colors.BLACK,
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxContainer: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  checkbox: {
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: Colors.WHITE,
  },
  checked: {
    backgroundColor: '#FF0000', // Change color for checked state
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'end',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Grey color for disabled state
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

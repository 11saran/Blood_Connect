import { View, Text, TextInput, StyleSheet, Image, Picker, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Ionicons } from "@expo/vector-icons";



const AdminRecipientAddScreen = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [recipient_email, setEmail] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [blood_type, setBloodType] = useState('');
    const [date_of_birth, setDOB] = useState('');
    const [address_line1, setAddressLine1] = useState('');
    const [address_line2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postal_code, setPostalCode] = useState('');
    const [country, setCountry] = useState('');



    const [description, setDescription] = useState('');
    const [recipient_medication, setRecipientMedication] = useState('');
    const [recipient_disease, setRecipientDisease] = useState('');

    const [FirstNameError, setFirstNameError] = useState('');
    const [LastNameError, setLastNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PhoneNumberError, setPhoneNumberError] = useState('');
    const [BloodTypeError, setBloodTypeError] = useState('');
    const [DateOfBirthError, setDateOfBirthError] = useState('');
    // const [addressLine2Error, setaddressLine2Error] = useState('');
    const [AddressLine1Error, setaddressLine1Error] = useState('');
    const [stateError, setstateError] = useState('');
    const [postalCodeError, setpostalCodeError] = useState('');
    const [cityError, setCityError] = useState('');

    const [countryError, setcountryError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [RecipientMedicationError, setRecipientMedicationError] = useState('');
    const [RecipientDiseaseError, setRecipientDiseaseError] = useState('');


    const router = useRouter();
    const navigation = useNavigation(); // useNavigation hook to access navigation

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const cities = [
        "Colombo", "Mount Lavinia", "Kesbewa", "Maharagama", "Moratuwa",
        "Ratnapura", "Negombo", "Kandy", "Sri Jayewardenepura Kotte", "Kalmunai",
        "Trincomalee", "Galle", "Jaffna", "Athurugiriya", "Weligama", "Matara",
        "Kolonnawa", "Gampaha", "Puttalam", "Badulla", "Kalutara", "Bentota",
        "Mannar", "Kurunegala"
    ];


    const handleSubmit = async () => {
        let isValid = true;

        
        // Validation
        if (!first_name) {
            setFirstNameError('Please enter the First Name');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        // Last Name validation
        if (!last_name) {
            setLastNameError('Please enter the Last Name');
            isValid = false;
        } else {
            setLastNameError('');
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        if (!recipient_email) {
            setEmailError('Please enter Email');
            isValid = false;
        } else if (!emailPattern.test(recipient_email)) {
            setEmailError('Please enter a valid Email');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Phone number validation (10 digits)
        const phonePattern = /^\d{10}$/; // Only allows 10 digits
        if (!phone_number) {
            setPhoneNumberError('Please enter Phone number');
            isValid = false;
        } else if (!phonePattern.test(phone_number)) {
            setPhoneNumberError('Please enter a valid 10-digit Phone number');
            isValid = false;
        } else {
            setPhoneNumberError('');
        }

        // Blood type validation
        const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        if (!blood_type) {
            setBloodTypeError('Please enter Blood Type');
            isValid = false;
        } else if (!validBloodTypes.includes(blood_type.toUpperCase())) {
            setBloodTypeError('Please enter a valid Blood Type (e.g., A+, O-)');
            isValid = false;
        } else {
            setBloodTypeError('');
        }

        // Date of birth validation
        if (!date_of_birth) {
            setDateOfBirthError('Please enter Date of birth');
            isValid = false;
        } else {
            setDateOfBirthError('');
        }

        // Country validation
        if (!country) {
            setcountryError('Please enter Country');
            isValid = false;
        } else {
            setcountryError('');
        }

        // Postal code validation (5 digits as an example)
        const postalCodePattern = /^\d{5}$/; // Modify as per your country's postal code format
        if (!postal_code) {
            setpostalCodeError('Please enter Postal Code');
            isValid = false;
        } else if (!postalCodePattern.test(postal_code)) {
            setpostalCodeError('Please enter a valid 5-digit Postal Code');
            isValid = false;
        } else {
            setpostalCodeError('');
        }

        // Address Line 1 validation
        if (!address_line1) {
            setaddressLine1Error('Please enter Address Line 1');
            isValid = false;
        } else {
            setaddressLine1Error('');
        }

        // City validation
        if (!city) {
            setCityError('Please enter City');
            isValid = false;
        } else {
            setCityError('');
        }

        // State validation
        if (!state) {
            setstateError('Please enter State');
            isValid = false;
        } else {
            setstateError('');
        }

        // Description validation
        if (!description) {
            setDescriptionError('Please enter Description');
            isValid = false;
        } else {
            setDescriptionError('');
        }

        // Recipient medication validation
        if (!recipient_medication) {
            setRecipientMedicationError('Please enter Recipient medication');
            isValid = false;
        } else {
            setRecipientMedicationError('');
        }

        // Recipient disease validation
        if (!recipient_disease) {
            setRecipientDiseaseError('Please enter Recipient disease');
            isValid = false;
        } else {
            setRecipientDiseaseError('');
        }
        if (!isValid) {
            return;
        }

        const newRecipient = new FormData();
        newRecipient.append('first_name', first_name);
        newRecipient.append('last_name', last_name);
        newRecipient.append('recipient_email', recipient_email);
        newRecipient.append('phone_number', phone_number);
        newRecipient.append('blood_type', blood_type);
        newRecipient.append('date_of_birth', date_of_birth);
        newRecipient.append('address_line1', address_line1);
        newRecipient.append('address_line2', address_line2);
        newRecipient.append('city', city);
        newRecipient.append('state', state);
        newRecipient.append('country', country);
        newRecipient.append('postal_code', postal_code);
        newRecipient.append('description', description);
        newRecipient.append('recipient_medication', recipient_medication);
        newRecipient.append('recipient_disease', recipient_disease);





        try {
            const response = await axios.post('http://localhost:5000/api-recipients/create', newRecipient, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                toast.success("Recipient added successfully!")

                // alert('Recipient added successfully!');
                // console.log('Recipient added successfully!');

                // Reset form
                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setBloodType('');
                setDOB('');
                setCountry('');
                setPostalCode('');
                setState('');
                setCity('');
                setAddressLine2('');
                setAddressLine1('');
                setDescription('');
                setRecipientMedication('');
                setRecipientDisease('');
            }
        } catch (error) {
            toast.error("Failed to add Recipient. Please try again.");
            console.error('Error saving Recipient data:', error);
            // alert('Failed to add Recipient. Please try again.');
        }
    };

    const handleBack = () => {
        router.push("Adminoptions/ManageRecipient");

        // console.log("Add recipient button clicked");
    };

    return (
      <View style={styles.container}>
        {/* Header */}
        <ToastContainer />

        <div style={styles.header}>
          <button style={styles.backButton} onClick={handleBack}>
            <Ionicons
              name="arrow-back-outline"
              color="white"
              size="20"
            ></Ionicons>
          </button>
        </div>
        <ScrollView style={styles.container}>
          <View style={styles.container}>
            <Text style={styles.subHeader}>Add New Patient</Text>

            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={[styles.input, FirstNameError ? styles.inputError : null]}
              placeholder="Enter First name"
              value={first_name}
              onChangeText={setFirstName}
            />
            {FirstNameError ? (
              <Text style={styles.errorText}>{FirstNameError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={[styles.input, LastNameError ? styles.inputError : null]}
              placeholder="Enter Last name"
              value={last_name}
              onChangeText={setLastName}
            />
            {LastNameError ? (
              <Text style={styles.errorText}>{LastNameError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[styles.input, EmailError ? styles.inputError : null]}
              placeholder="Enter Email"
              value={recipient_email}
              onChangeText={setEmail}
            />
            {EmailError ? (
              <Text style={styles.errorText}>{EmailError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={[
                styles.input,
                PhoneNumberError ? styles.inputError : null,
              ]}
              placeholder="Enter Phone Number"
              value={phone_number}
              onChangeText={setPhoneNumber}
            />
            {PhoneNumberError ? (
              <Text style={styles.errorText}>{PhoneNumberError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Blood Type</Text>
            <View style={styles.radioGroup}>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.radioButton,
                      blood_type === type ? styles.radioButtonSelected : null,
                    ]}
                    onPress={() => setBloodType(type)}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        blood_type === type ? styles.radioCircleSelected : null,
                      ]}
                    />
                    <Text style={styles.radioLabel}>{type}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
            {BloodTypeError ? (
              <Text style={styles.errorText}>{BloodTypeError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Date of Birth</Text>

            {Platform.OS === "web" ? (
              <input
                type="date"
                value={date_of_birth}
                onChange={(e) => setDOB(e.target.value)}
                style={styles.inputDate}
              />
            ) : (
              <>
                <TextInput
                  style={[
                    styles.input,
                    DateOfBirthError ? styles.inputError : null,
                  ]}
                  value={date_of_birth}
                  onFocus={() => setDOB(true)}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={Colors.GRAY}
                />
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date(recipientData.date_of_birth || Date.now())} // Default to today if no date is set
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                )}
              </>
            )}
            {DateOfBirthError ? (
              <Text style={styles.errorText}>{DateOfBirthError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Address line 1</Text>
            <TextInput
              style={[
                styles.input,
                AddressLine1Error ? styles.inputError : null,
              ]}
              placeholder="Enter Street Address"
              value={address_line1}
              onChangeText={setAddressLine1}
            />
            {AddressLine1Error ? (
              <Text style={styles.errorText}>{AddressLine1Error}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Address Line 2</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Apt, Suite, etc. (Optional)"
              value={address_line2}
              onChangeText={setAddressLine2}
            />

            <Text style={styles.inputLabel}>City</Text>
            {/* <TextInput
                        style={[styles.input, cityError ? styles.inputError : null]}
                        placeholder="Enter City"
                        value={city}
                        onChangeText={setCity}
                    /> */}
            <Picker
              selectedValue={city}
              // onChangeText={setCity}
              onValueChange={(itemValue) => setCity(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a city" value="" />
              {cities.map((city) => (
                <Picker.Item key={city} label={city} value={city} />
              ))}
            </Picker>
            {cityError ? (
              <Text style={styles.errorText}>{cityError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>State</Text>
            <TextInput
              style={[styles.input, stateError ? styles.inputError : null]}
              placeholder="Enter State"
              value={state}
              onChangeText={setState}
            />
            {stateError ? (
              <Text style={styles.errorText}>{stateError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Postal Code</Text>
            <TextInput
              style={[styles.input, postalCodeError ? styles.inputError : null]}
              placeholder="Enter Postal Code"
              value={postal_code}
              onChangeText={setPostalCode}
            />
            {postalCodeError ? (
              <Text style={styles.errorText}>{postalCodeError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Country</Text>
            <TextInput
              style={[styles.input, countryError ? styles.inputError : null]}
              placeholder="Enter Country"
              value={country}
              onChangeText={setCountry}
            />
            {countryError ? (
              <Text style={styles.errorText}>{countryError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[
                styles.input,
                descriptionError ? styles.inputError : null,
              ]}
              placeholder="Enter Description"
              value={description}
              onChangeText={setDescription}
            />
            {descriptionError ? (
              <Text style={styles.errorText}>{descriptionError}</Text>
            ) : null}

            <Text style={styles.inputLabel}>Disease</Text>
            <TextInput
              style={[
                styles.input,
                RecipientDiseaseError ? styles.inputError : null,
              ]}
              placeholder="Enter Recipient Disease info"
              value={recipient_disease}
              onChangeText={setRecipientDisease}
            />
            {RecipientDiseaseError ? (
              <Text style={styles.errorText}>{RecipientDiseaseError}</Text>
            ) : null}
            <Text style={styles.inputLabel}>Medication</Text>
            <TextInput
              style={[
                styles.input,
                RecipientMedicationError ? styles.inputError : null,
              ]}
              placeholder="Enter Recipient Medication info"
              value={recipient_medication}
              onChangeText={setRecipientMedication}
            />
            {RecipientMedicationError ? (
              <Text style={styles.errorText}>{RecipientMedicationError}</Text>
            ) : null}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
    picker: {
        // padding: 10,
        paddingLeft: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    inputDate: {
        marginRight: 8,
        marginLeft: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginHorizontal: 10,
    },
    backButton: {
        backgroundColor: '#db0304',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '10px',
        marginLeft: 10,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '10px',
        padding: '10px',
    },
    radioGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
        padding: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
        marginBottom: 8,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#777',
        marginRight: 6,
    },
    radioCircleSelected: {
        backgroundColor: '#db0304',
        borderColor: '#db0304',
    },
    radioLabel: {
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        backgroundColor: 'white',
        height: 100,
        justifyContent: 'center',

    },
    headerText: {
        fontFamily: 'inter-bold',
        fontSize: 24,
        color: 'red',
        top: 0,
        marginLeft: 15,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header1Container: {
        backgroundColor: Colors.HEADER,
        marginTop: 0,
        height: 100,
        flexDirection: "row",
        borderRadius: 5,
    },
    header1Text: {
        fontFamily: "inter-bold",
        fontSize: 36,
        marginLeft: 15,
        color: Colors.WHITE,
    },
    headerImage: {
        top: 45,
        marginLeft: 150,
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

export default AdminRecipientAddScreen;
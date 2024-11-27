import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditRecipient = () => {
    const [recipientId, setRecipientId] = useState(null);
    const navigation = useNavigation();



    const [recipientData, setRecipientData] = useState({
        first_name: '',
        last_name: '',
        recipient_email: '',
        phone_number: '',
        blood_type: '',
        date_of_birth: '',
        address: '',
        description: '',
        recipient_medication: '',
        recipient_disease: '',


    });



    const [FirstNameError, setFirstNameError] = useState('');
    const [LastNameError, setLastNameError] = useState('');
    const [EmailError, setEmailError] = useState('');
    const [PhoneNumberError, setPhoneNumberError] = useState('');
    const [BloodTypeError, setBloodTypeError] = useState('');
    const [DateOfBirthError, setDateOfBirthError] = useState('');
    const [AddressError, setAddressError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [RecipientMedicationError, setRecipientMedicationError] = useState('');
    const [RecipientDiseaseError, setRecipientDiseaseError] = useState('');


    useEffect(() => {
        // Ensure header is hidden
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);


    useEffect(() => {
        const fetchRecipient = async () => {
            try {
                const id = await AsyncStorage.getItem('recipientId');
                console.log(id);
                if (id) {
                    setRecipientId(id);
                    fetchRecipientData(id);
                } else {
                    Alert.alert("Error", "No recipient ID found in storage");
                }
            } catch (error) {
                console.error("Failed to retrieve recipient ID from storage", error);
            }
        };
        fetchRecipient();

    }, []);

    const fetchRecipientData = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api-recipients/recipient/${id}`);
            if (response.ok) {
                const data = await response.json();
                setRecipientData(data);  // Ensure data structure matches backend response
            } else {
                Alert.alert("Error", "Failed to fetch recipient data");
            }
        } catch (error) {
            console.error("Error fetching recipient data", error);
            Alert.alert("Error", "An error occurred while fetching data");
        }
    };

    const handleInputChange = (name, value) => {
        setRecipientData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateFields = () => {
        let valid = true;

        // Validate First Name
        if (!recipientData.first_name) {
            setFirstNameError("First name is required.");
            valid = false;
        } else if (recipientData.first_name.length < 2) {
            setFirstNameError("First name must be at least 2 characters long.");
            valid = false;
        } else {
            setFirstNameError("");
        }

        // Validate Last Name
        if (!recipientData.last_name) {
            setLastNameError("Last name is required.");
            valid = false;
        } else if (recipientData.last_name.length < 2) {
            setLastNameError("Last name must be at least 2 characters long.");
            valid = false;
        } else {
            setLastNameError("");
        }

        // Validate Recipient Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!recipientData.recipient_email) {
            setEmailError("Recipient email is required.");
            valid = false;
        } else if (!emailRegex.test(recipientData.recipient_email)) {
            setEmailError("Please enter a valid email address.");
            valid = false;
        } else {
            setEmailError("");
        }

        // Validate Phone Number
        const phoneRegex = /^[0-9]{10}$/; // Adjust the regex according to your requirements
        if (!recipientData.phone_number) {
            setPhoneNumberError("Phone number is required.");
            valid = false;
        } else if (!phoneRegex.test(recipientData.phone_number)) {
            setPhoneNumberError("Please enter a valid 10-digit phone number.");
            valid = false;
        } else {
            setPhoneNumberError("");
        }

        // Validate Blood Type
        const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
        if (!recipientData.blood_type) {
            setBloodTypeError("Blood type is required.");
            valid = false;
        } else if (!validBloodTypes.includes(recipientData.blood_type)) {
            setBloodTypeError("Please select a valid blood type.");
            valid = false;
        } else {
            setBloodTypeError("");
        }

        // Validate Date of Birth
        if (!recipientData.date_of_birth) {

            setDateOfBirthError("Date of birth is required.");
            valid = false;
        } else {
            setDateOfBirthError("");
        }

        // Validate Address
        if (!recipientData.address) {
            setAddressError("Address is required.");
            valid = false;
        } else if (recipientData.address.length < 5) {
            setAddressError("Address must be at least 5 characters long.");
            valid = false;
        } else {
            setAddressError("");
        }

        // Validate Description
        if (!recipientData.description) {
            setDescriptionError("Description is required.");
            valid = false;
        } else {
            setDescriptionError("");
        }

        // Validate Recipient Medication
        if (!recipientData.recipient_medication) {
            setRecipientMedicationError("Recipient medication is required.");
            valid = false;
        } else {
            setRecipientMedicationError("");
        }

        // Validate Recipient Disease
        if (!recipientData.recipient_disease) {
            setRecipientDiseaseError("Recipient disease is required.");
            valid = false;
        } else {
            setRecipientDiseaseError("");
        }

        return valid;
    };


    const handleSave = async () => {
        if (!validateFields()) return;

        try {
            const response = await fetch(`http://localhost:5000/api-recipients/update-recipient/${recipientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipientData),
            });

            if (response.ok) {

                toast.success("Recipient updated successfully!", {
                    autoClose: 900,
                    onClose: () =>   navigation.goBack(),
                  });
              
            } else {
                Alert.alert("Error", "Failed to update recipient");
            }
        } catch (error) {
            console.error("Error updating recipient", error);
            Alert.alert("Error", "An error occurred while updating recipient");
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed

        return `${year}-${month}-${day}`;
    };

    // console.log(recipientData.date_of_birth)
    return (
        <View style={styles.container}>
                        <ToastContainer />

            <View style={styles.header1Container}>
                <Text style={styles.header1Text}>Blood Connect</Text>
                <Image
                    source={require("./../../assets/images/header.png")}
                    style={styles.headerImage}
                />
            </View>
            <ScrollView style={styles.container}>

                <View style={styles.container}>
                    <Text style={styles.subHeader}> Edit Recipient</Text>


                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput
                        style={[styles.input, FirstNameError ? styles.inputError : null]}
                        placeholder="Enter First name"
                        value={recipientData.first_name}
                        onChangeText={(text) => handleInputChange('first_name', text)}

                    />
                    {FirstNameError ? <Text style={styles.errorText}>{FirstNameError}</Text> : null}

                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput
                        style={[styles.input, LastNameError ? styles.inputError : null]}
                        placeholder="Enter Last name"
                        value={recipientData.last_name}
                        onChangeText={(text) => handleInputChange('last_name', text)}

                    />
                    {LastNameError ? <Text style={styles.errorText}>{LastNameError}</Text> : null}

                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={[styles.input, EmailError ? styles.inputError : null]}
                        placeholder="Enter Email"
                        value={recipientData.recipient_email}
                        onChangeText={(text) => handleInputChange('recipient_email', text)}

                    />
                    {EmailError ? <Text style={styles.errorText}>{EmailError}</Text> : null}

                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        style={[styles.input, PhoneNumberError ? styles.inputError : null]}
                        placeholder="Enter Phone Number"
                        value={recipientData.phone_number}
                        onChangeText={(text) => handleInputChange('phone_number', text)}

                    />
                    {PhoneNumberError ? <Text style={styles.errorText}>{PhoneNumberError}</Text> : null}


                    <Text style={styles.inputLabel}>Blood Type</Text>
                    <View style={styles.radioGroup}>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.radioButton,
                                    recipientData.blood_type === type ? styles.radioButtonSelected : null
                                ]}
                                onPress={() => handleInputChange('blood_type', type)} // Update state through handler
                            >
                                <View style={[
                                    styles.radioCircle,
                                    recipientData.blood_type === type ? styles.radioCircleSelected : null
                                ]} />
                                <Text style={styles.radioLabel}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {BloodTypeError ? <Text style={styles.errorText}>{BloodTypeError}</Text> : null}



                    <Text style={styles.inputLabel}>Date of Birth</Text>
                    {Platform.OS === 'web' ? (
                        <input
                            type="date"
                            value={recipientData.date_of_birth}
                            onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                            style={styles.inputDate}
                        />
                    ) : (
                        <>
                            <TextInput
                                style={[styles.input, DateOfBirthError ? styles.inputError : null]}
                                value={recipientData.date_of_birth}

                                onFocus={() => setShowDatePicker(true)}
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
                    {DateOfBirthError ? <Text style={styles.errorText}>{DateOfBirthError}</Text> : null}

                    <Text style={styles.inputLabel}>Address</Text>
                    <TextInput
                        style={[styles.input, AddressError ? styles.inputError : null]}
                        placeholder="Enter Address"
                        value={recipientData.address}
                        onChangeText={(text) => handleInputChange('address', text)}

                    />
                    {AddressError ? <Text style={styles.errorText}>{AddressError}</Text> : null}

                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={[styles.input, descriptionError ? styles.inputError : null]}
                        placeholder="Enter Description"
                        value={recipientData.description}
                        onChangeText={(text) => handleInputChange('description', text)}

                    />
                    {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}


                    <Text style={styles.inputLabel}>Disease</Text>
                    <TextInput
                        style={[styles.input, RecipientDiseaseError ? styles.inputError : null]}
                        placeholder="Enter Recipient Disease info"
                        value={recipientData.recipient_disease}
                        onChangeText={(text) => handleInputChange('recipient_disease', text)}

                    />
                    {RecipientDiseaseError ? <Text style={styles.errorText}>{RecipientDiseaseError}</Text> : null}
                    <Text style={styles.inputLabel}>Medication</Text>
                    <TextInput
                        style={[styles.input, RecipientMedicationError ? styles.inputError : null]}
                        placeholder="Enter Recipient Medication info"
                        value={recipientData.recipient_medication}
                        onChangeText={(text) => handleInputChange('recipient_medication', text)}

                    />
                    {RecipientMedicationError ? <Text style={styles.errorText}>{RecipientMedicationError}</Text> : null}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.imageButton} onPress={handleSave}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

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

export default EditRecipient;

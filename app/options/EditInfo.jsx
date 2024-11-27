import React, { useEffect, useState, forwardRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ScrollView,
    Image,
    Picker,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cities = [
    "Colombo", "Mount Lavinia", "Kesbewa", "Maharagama", "Moratuwa",
    "Ratnapura", "Negombo", "Kandy", "Sri Jayewardenepura Kotte", "Kalmunai",
    "Trincomalee", "Galle", "Jaffna", "Athurugiriya", "Weligama", "Matara",
    "Kolonnawa", "Gampaha", "Puttalam", "Badulla", "Kalutara", "Bentota",
    "Mannar", "Kurunegala"
];


const EditUser = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

        const fetchUserInfo = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                const response = await axios.get(`http://localhost:5000/api-donor/peticulardonor/${email}`);
                setUserInfo(response.data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch user info');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [navigation]);

    const handleInputChange = (field, value) => {
        setUserInfo((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleSave = async () => {
        // Validate required fields
        let valid = true;
        let newErrors = {};

        if (!userInfo.first_name) {
            newErrors.first_name = 'First name is required';
            valid = false;
        }
        if (!userInfo.last_name) {
            newErrors.last_name = 'Last name is required';
            valid = false;
        }
        if (!userInfo.email) {
            newErrors.email = 'Email is required';
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }



        try {
            console.log(userInfo);
            const response = await fetch(`http://localhost:5000/api-donor/updateID/${userInfo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });


            if (response.ok) {

                toast.success("User updated successfully!", {
                    autoClose: 900,
                    onClose: () => navigation.goBack(),
                });

            } else {
                Alert.alert("Error", "Failed to update User");
            }
        } catch (error) {
            console.error("Error updating recipient", error);
            Alert.alert("Error", "An error occurred while updating recipient");
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            handleInputChange('dob', selectedDate.toISOString().split('T')[0]);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ToastContainer />

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Blood Connect</Text>
                <Image
                    source={require('./../../assets/images/header.png')}
                    style={styles.headerImage}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.subHeader}>Edit Recipient</Text>

                {/* First Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>First Name</Text>

                    <TextInput
                        style={[styles.input, errors.first_name && styles.inputError]}
                        placeholder="Enter First name"
                        value={userInfo.first_name}
                        onChangeText={(text) => handleInputChange('first_name', text)}
                    />
                    {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}
                </View>

                {/* Last Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput
                        style={[styles.input, errors.last_name && styles.inputError]}
                        placeholder="Enter Last name"
                        value={userInfo.last_name}
                        onChangeText={(text) => handleInputChange('last_name', text)}
                    />
                    {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}
                </View>

                {/* Date of Birth */}




                <View style={styles.section}>
                    <Text style={styles.inputLabel}>Date Of Birth</Text>
                    {/* {Platform.OS === 'web' ? (

                        <input
                            type="date"
                            value={userInfo.dob}
                            onChangeText={(text) => handleInputChange('dob', text)}
                            style={styles.inputDate}

                        />
                    ) : (
                        <TextInput
                            style={[styles.input, errors.dob && styles.inputError]}
                            value={userInfo.dob}
                            onFocus={() => setShowDatePicker(true)}
                            placeholder="MM/DD/YYYY"
                            placeholderTextColor={Colors.GRAY}
                        />
                    )} */}




                    {/*  from other edit   */}



                    {Platform.OS === 'web' ? (
                        <input
                            type="date"
                            value={userInfo.dob}
                            onChange={(e) => handleInputChange('dob', e.target.value)}
                            style={styles.inputDate}
                        />
                    ) : (
                        <>
                            <TextInput
                                style={[styles.input, DateOfBirthError ? styles.inputError : null]}
                                value={userInfo.dob}

                                onFocus={() => setShowDatePicker(true)}
                                placeholder="MM/DD/YYYY"
                                placeholderTextColor={Colors.GRAY}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    value={new Date(userInfo.dob || Date.now())} // Default to today if no date is set
                                    mode="date"
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}
                        </>
                    )}






                    <View style={{ marginLeft: 30, marginTop: 10 }}>
                        {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}
                    </View>
                </View>







                {/* Gender */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Gender</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Gender"
                        value={userInfo.gender}
                        onChangeText={(text) => handleInputChange('gender', text)}
                    />
                </View>

                {/* Phone Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        style={[styles.input, errors.contact_number && styles.inputError]}
                        placeholder="Enter Phone Number"
                        value={userInfo.contact_number}
                        onChangeText={(text) => handleInputChange('contact_number', text)}
                        keyboardType="phone-pad"
                    />
                    {errors.contact_number && <Text style={styles.errorText}>{errors.contact_number}</Text>}
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="Enter Email"
                        value={userInfo.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                {/* Address */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Address"
                        value={userInfo.address}
                        onChangeText={(text) => handleInputChange('address', text)}
                    />
                </View>

                {/* Address */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Address Line 1</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Address Line 1"
                        value={userInfo.address_line1}
                        onChangeText={(text) => handleInputChange("address_line1", text)}
                    />
                    {errors.address_line1 && (
                        <Text style={styles.errorText}>{errors.address_line1}</Text>
                    )}
                </View>
                <View style={styles.inputGroup}>

                    <Text style={styles.inputLabel}>Address Line 2 (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Apartment, Suite, etc."
                        value={userInfo.address_line2}
                        onChangeText={(text) => handleInputChange("address_line2", text)}
                    />
                </View>
                <View style={styles.inputGroup}>

                    <Text style={styles.inputLabel}>City</Text>
                    {/* <TextInput
                         style={styles.input}
                         placeholder="Enter city"
                        value={userInfo.city}
                         onChangeText={(text) => handleInputChange("city", text)}
                       /> */}


                    <Picker
                        selectedValue={userInfo.city}
                        onValueChange={(itemValue) => handleInputChange("city", itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a city" value="city" />
                        {cities.map((city) => (
                            <Picker.Item key={city} label={city} value={city} />
                        ))}
                    </Picker>
                    {errors.city && (
                        <Text style={styles.errorText}>{errors.city}</Text>
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>State/Province/Region</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter state/province/region"
                        value={userInfo.state}
                        onChangeText={(text) => handleInputChange("state", text)}
                    />
                    {errors.state && (
                        <Text style={styles.errorText}>{errors.state}</Text>
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Postal Code</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter postal code"
                        value={userInfo.postal_code}
                        onChangeText={(text) => handleInputChange("postal_code", text)}
                    />
                    {errors.postal_code && (
                        <Text style={styles.errorText}>{errors.postal_code}</Text>
                    )}
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Country</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter country"
                        value={userInfo.country}
                        onChangeText={(text) => handleInputChange("country", text)}
                    />
                    {errors.country && (
                        <Text style={styles.errorText}>{errors.country}</Text>
                    )}
                </View>

                {/* NIC Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>NIC Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter NIC Number"
                        value={userInfo.nic_number}
                        onChangeText={(text) => handleInputChange('nic_number', text)}
                    />
                </View>

                {/* Blood Type */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Blood Type</Text>
                    <View style={styles.radioContainer}>
                        {['A+', 'A-', 'B+', 'B-'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={styles.radioButton}
                                onPress={() => handleInputChange('blood_type', type)}
                            >
                                <View
                                    style={[
                                        styles.radioCircle,
                                        userInfo.blood_type === type && styles.selectedRadio,
                                    ]}
                                />
                                <Text style={styles.radioText}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.radioContainer}>
                        {['AB+', 'AB-', 'O+', 'O-'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={styles.radioButton}
                                onPress={() => handleInputChange('blood_type', type)}
                            >
                                <View
                                    style={[
                                        styles.radioCircle,
                                        userInfo.blood_type === type && styles.selectedRadio,
                                    ]}
                                />
                                <Text style={styles.radioText}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {errors.blood_type && <Text style={styles.errorText}>{errors.blood_type}</Text>}
                </View>

                {/* Medication */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Any current medications?</Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => handleInputChange('medication', 'Yes')}
                        >
                            <View
                                style={[
                                    styles.radioCircle,
                                    userInfo.medication === 'Yes' && styles.selectedRadio,
                                ]}
                            />
                            <Text style={styles.radioText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => handleInputChange('medication', 'No')}
                        >
                            <View
                                style={[
                                    styles.radioCircle,
                                    userInfo.medication === 'No' && styles.selectedRadio,
                                ]}
                            />
                            <Text style={styles.radioText}>No</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.medication && <Text style={styles.errorText}>{errors.medication}</Text>}

                    {/* Medication list input (only show if 'Yes') */}
                    {userInfo.medication === 'Yes' && (
                        <TextInput
                            style={[styles.input, styles.medicationInput]}
                            placeholder="Enter list of medications"
                            value={userInfo.medication_list}
                            onChangeText={(text) => handleInputChange('medication_list', text)}
                        />
                    )}
                </View>

                {/* Blood Donation */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Have you donated blood before?</Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => handleInputChange('donated_blood', 'Yes')}
                        >
                            <View
                                style={[
                                    styles.radioCircle,
                                    userInfo.donated_blood === 'Yes' && styles.selectedRadio,
                                ]}
                            />
                            <Text style={styles.radioText}>Yes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => handleInputChange('donated_blood', 'No')}
                        >
                            <View
                                style={[
                                    styles.radioCircle,
                                    userInfo.donated_blood === 'No' && styles.selectedRadio,
                                ]}
                            />
                            <Text style={styles.radioText}>No</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.donated_blood && <Text style={styles.errorText}>{errors.donated_blood}</Text>}

                    {userInfo.donated_blood === 'Yes' && (
                        <View style={styles.donationSection}>
                            <Text style={styles.donationLabel}>Donation Dates</Text>
                            {/* {Platform.OS === 'web' ? (
                                <TextInput
                                    style={styles.inputDate}
                                    placeholder="YYYY-MM-DD"
                                    value={userInfo.donation_dates}
                                    onChangeText={(text) => handleInputChange('donation_dates', text)}
                                />
                            ) : (
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <TextInput
                                        style={[styles.input, errors.donation_dates && styles.inputError]}
                                        value={userInfo.donation_dates}
                                        placeholder="MM/DD/YYYY"
                                        placeholderTextColor={Colors.GRAY}
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            )}
                            {showDatePicker && Platform.OS !== 'web' && (
                                <DateTimePicker
                                    value={userInfo.donation_dates ? new Date(userInfo.donation_dates) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(false);
                                        if (selectedDate) {
                                            handleInputChange('donation_dates', selectedDate.toISOString().split('T')[0]);
                                        }
                                    }}
                                />
                            )}

 */}

                            {/*fron other edit */}

                            {Platform.OS === 'web' ? (
                        <input
                            type="date"
                            value={userInfo.donation_dates}
                            onChange={(e) => handleInputChange('donation_dates', e.target.value)}
                            style={styles.inputDate}
                        />
                    ) : (
                        <>
                            <TextInput
                                style={[styles.input, DateOfBirthError ? styles.inputError : null]}
                                value={userInfo.donation_dates}

                                onFocus={() => setShowDatePicker(true)}
                                placeholder="MM/DD/YYYY"
                                placeholderTextColor={Colors.GRAY}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    value={new Date(userInfo.donation_dates || Date.now())} // Default to today if no date is set
                                    mode="date"
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}
                        </>
                    )}

                        </View>
                    )}
                </View>



                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND,
    },
    loadingText: {
        fontSize: 18,
        color: Colors.TEXT,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.HEADER,
        padding: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerText: {
        fontFamily: 'inter-bold',
        fontSize: 28,
        color: Colors.WHITE,
    },
    headerImage: {
        width: 50,
        height: 50,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    scrollContainer: {
        padding: 20,
    },
    subHeader: {
        fontSize: 24,
        fontFamily: 'inter-bold',
        color: Colors.PRIMARY,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: 'inter-medium',
        color: Colors.TEXT,
        marginBottom: 5,
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.INPUT,
        fontSize: 16,
        backgroundColor: Colors.WHITE,
    },
    inputError: {
        borderColor: 'red',
    },
    inputDate: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.INPUT,
        fontSize: 16,
        backgroundColor: Colors.WHITE,
        color: Colors.TEXT,
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
        backgroundColor: '#db0304',
        borderColor: '#000000',
    },
    radioText: {
        fontSize: 16,
        fontFamily: 'inter-medium',
        color: Colors.TEXT,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    medicationInput: {
        marginTop: 10,
    },
    donationSection: {
        marginTop: 15,
    },
    donationLabel: {
        fontSize: 16,
        fontFamily: 'inter-medium',
        color: Colors.TEXT,
        marginTop: 10,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    submitButton: {
        backgroundColor: "#db0304",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontFamily: 'inter-bold',
    },
    picker: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.INPUT,
        fontSize: 16,
        backgroundColor: Colors.WHITE,
    },
});

export default EditUser;

import {
  Platform,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MeAsDonor() {
  const router = useRouter();
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState("");

  const [form1, setForm1] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    gender: "",
    contact_number: "",
    email: "",
    address: "",
    country: "",
    postal_code: "",
    state: "",
    city: "",
    address_line2: "",
    address_line1: "",
    nic_number: "",
    userEmail: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getEmail = async () => {
      try {
        const U_email = await AsyncStorage.getItem("userEmail");
        if (U_email) {
          setUserEmail(U_email);
          setForm1((prev) => ({ ...prev, userEmail: U_email })); // Set userEmail in form state
          console.log(userEmail);
        }
      } catch (error) {
        console.error("Failed to fetch email from storage", error);
      }
    };

    getEmail();
    navigation.setOptions({ headerShown: false });
  }, []);

  const cities = [
    "Colombo",
    "Mount Lavinia",
    "Kesbewa",
    "Maharagama",
    "Moratuwa",
    "Vavuniya",
    "Ratnapura",
    "Negombo",
    "Kandy",
    "Sri Jayewardenepura Kotte",
    "Kalmunai",
    "Trincomalee",
    "Galle",
    "Jaffna",
    "Athurugiriya",
    "Batticalo",
    "Matara",
    "Kolonnawa",
    "Gampaha",
    "Puttalam",
    "Badulla",
    "Kalutara",
    "Bentota",
    "Mannar",
    "Kurunegala",
  ];

  const handleChange = (name, value) => {
    setForm1({
      ...form1,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
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
    } else if (!/^\d{4}[-\/]\d{2}[-\/]\d{2}$/.test(form1.dob)) {
      newErrors.dob = "Date format should be YYYY/MM/DD";
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
    if (!form1.address_line1) {
      newErrors.address_line1 = "Address line 1 is required";
      valid = false;
    }
    // if (!form1.address_line2) {
    //   newErrors.address = "Address line 2 is required";
    //   valid = false;
    // }
    if (!form1.city) {
      newErrors.city = "City is required";
      valid = false;
    }
    if (!form1.state) {
      newErrors.state = "State is required";
      valid = false;
    }
    if (!form1.postal_code) {
      newErrors.postal_code = "Postal Code is required";
      valid = false;
    }
    if (!form1.country) {
      newErrors.country = "Country is required";
      valid = false;
    }
    if (!form1.nic_number) {
      newErrors.nic_number = "NIC Number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChangeDate = (event) => {
    const date = event.target.value;

    // Update the form state with the new date
    setForm1({ ...form1, dob: date });

    // Check if the date is empty
    if (!date) {
      // If the date is empty, set an appropriate error message
      setErrors((prevErrors) => ({
        ...prevErrors,
        dob: "Date of birth is required", // Adjust the key and message as needed
      }));
    } else {
      // If a date is entered, clear any error message for 'dob'
      setErrors((prevErrors) => ({
        ...prevErrors,
        dob: "", // Clear the error
      }));
    }
  };

  const handleSubmit = () => {
    if (validateForm1()) {
      // Pass form1 data as query params to the MedicalHistory page
      router.push({
        pathname: "options/MedicalHistory",
        params: { ...form1, userEmail: form1.userEmail }, // Include userEmail
      });
    } else {
      Alert.alert("Error", "Please correct the errors in the form.");
    }
  };

  return (
    <ScrollView style={{ height: "100%", backgroundColor: Colors.WHITE }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blood Connect</Text>
        <Image
          source={require("./../../assets/images/header.png")}
          style={styles.headerImage}
        />
      </View>

      <Text style={styles.formTitle}>Donor Registration Form</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        {/* Full Name */}
        <Text style={styles.inputLabel}>Full Name</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={[styles.input, { width: "40%", marginLeft: 10 }]}
            placeholder="First name"
            value={form1.first_name}
            onChangeText={(text) => handleChange("first_name", text)}
          />
          <TextInput
            style={[styles.input, { width: "45%", marginLeft: 20 }]}
            placeholder="Last name"
            value={form1.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            columnGap: 40,
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          {errors.first_name ? (
            <>
              <Text style={styles.errorText}>{errors.first_name}</Text>
            </>
          ) : null}
          <>
            {errors.last_name ? (
              <Text style={styles.errorText}>{errors.last_name}</Text>
            ) : null}
          </>
        </View>
      </View>

      {/* Date of Birth */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Date Of Birth</Text>
        {Platform.OS === "web" ? (
          <input
            type="date"
            value={form1.dob}
            onChange={handleChangeDate}
            style={styles.inputDate}
          />
        ) : (
          <TextInput
            style={[styles.input, errors.dob && styles.inputError]}
            value={form1.dob}
            onFocus={() => setShowDatePicker(true)}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={Colors.GRAY}
          />
        )}

        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.dob ? (
            <Text style={styles.errorText}>{errors.dob}</Text>
          ) : null}
        </View>
      </View>

      {/* Gender */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Gender</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleChange("gender", "male")}
          >
            <View
              style={[
                styles.radioCircle,
                form1.gender === "male" && styles.selectedRadio,
              ]}
            />
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleChange("gender", "female")}
          >
            <View
              style={[
                styles.radioCircle,
                form1.gender === "female" && styles.selectedRadio,
              ]}
            />
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleChange("gender", "other")}
          >
            <View
              style={[
                styles.radioCircle,
                form1.gender === "other" && styles.selectedRadio,
              ]}
            />
            <Text style={styles.radioText}>Other</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 30 }}>
          {errors.gender ? (
            <Text style={styles.errorText}>{errors.gender}</Text>
          ) : null}
        </View>
      </View>

      {/* Contact Number */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Contact Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter contact number"
          value={form1.contact_number}
          onChangeText={(text) =>
            handleChange("contact_number", text.replace(/[^0-9]/g, ""))
          }
          keyboardType="numeric"
          maxLength={10}
        />
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.contact_number ? (
            <Text style={styles.errorText}>{errors.contact_number}</Text>
          ) : null}
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
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>
      </View>

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Address Line 1</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Address Line 1"
          value={form1.address_line1}
          onChangeText={(text) => handleChange("address_line1", text)}
        />
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.address_line1 ? (
            <Text style={styles.errorText}>{errors.address_line1}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Address Line 2 (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Apartment, Suite, etc."
          value={form1.address_line2}
          onChangeText={(text) => handleChange("address_line2", text)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.inputLabel}>City</Text>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={form1.city}
          onChangeText={(text) => handleChange("city", text)}
        /> */}

        <Picker
          selectedValue={form1.city}
          onValueChange={(itemValue) => handleChange("city", itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a city" value="" />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.city ? (
            <Text style={styles.errorText}>{errors.city}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.inputLabel}>State/Province/Region</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter state/province/region"
          value={form1.state}
          onChangeText={(text) => handleChange("state", text)}
        />
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.state ? (
            <Text style={styles.errorText}>{errors.state}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Postal Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter postal code"
          value={form1.postal_code}
          onChangeText={(text) => handleChange("postal_code", text)}
        />
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.postal_code ? (
            <Text style={styles.errorText}>{errors.postal_code}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.inputLabel}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter country"
          value={form1.country}
          onChangeText={(text) => handleChange("country", text)}
        />
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.country ? (
            <Text style={styles.errorText}>{errors.country}</Text>
          ) : null}
        </View>
      </View>

      {/* NIC Number */}
      <View style={styles.section}>
        <Text style={styles.inputLabel}>NIC Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter NIC number"
          value={form1.nic_number}
          onChangeText={(text) =>
            handleChange("nic_number", text.replace(/[^0-9]/g, ""))
          }
          keyboardType="numeric"
          maxLength={12}
        />
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          {errors.nic_number ? (
            <Text style={styles.errorText}>{errors.nic_number}</Text>
          ) : null}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("(tabs)/Home")}
          style={styles.backButton}
        >
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
  picker: {
    // padding: 10,
    paddingLeft: 10,
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

  inputDate: {
    width: 350,
    height: 40,
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
    top: 20,
    width: 350,
    fontFamily: "inter-medium",
    borderColor: Colors.INPUT,
    fontSize: 16,
    height: 40,
    alignSelf: "center",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: "green",
    borderColor: "green",
  },
  radioText: {
    fontSize: 16,
    fontFamily: "inter-regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  backButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    width: "35%",
    margin: 20,
  },
  nextButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    width: "35%",
    margin: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginLeft: 10,
    marginTop: 5,
  },
});

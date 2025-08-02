import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Ionicons } from "@expo/vector-icons";

const AdminRecipientAddScreen = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    recipient_email: "",
    phone_number: "",
    blood_type: "",
    date_of_birth: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    description: "",
    recipient_medication: "",
    recipient_disease: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const cities = [
    "Colombo",
    "Mount Lavinia",
    "Kesbewa",
    "Maharagama",
    "Moratuwa",
    "Ratnapura",
    "Negombo",
    "Kandy",
    "Sri Jayewardenepura Kotte",
    "Kalmunai",
    "Trincomalee",
    "Galle",
    "Jaffna",
    "Athurugiriya",
    "Weligama",
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

  // ✅ Handle input change
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  // ✅ Validation
  const validate = () => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const postalPattern = /^\d{5}$/;
    const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    if (!formData.first_name) tempErrors.first_name = "First name is required";
    if (!formData.last_name) tempErrors.last_name = "Last name is required";
    if (!formData.recipient_email)
      tempErrors.recipient_email = "Email is required";
    else if (!emailPattern.test(formData.recipient_email))
      tempErrors.recipient_email = "Invalid email format";
    if (!formData.phone_number)
      tempErrors.phone_number = "Phone number is required";
    else if (!phonePattern.test(formData.phone_number))
      tempErrors.phone_number = "Phone number must be 10 digits";
    if (!formData.blood_type)
      tempErrors.blood_type = "Blood type is required";
    else if (!validBloodTypes.includes(formData.blood_type.toUpperCase()))
      tempErrors.blood_type = "Invalid blood type";
    if (!formData.date_of_birth)
      tempErrors.date_of_birth = "Date of birth is required";
    if (!formData.address_line1)
      tempErrors.address_line1 = "Address line 1 is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.country) tempErrors.country = "Country is required";
    if (!formData.postal_code)
      tempErrors.postal_code = "Postal code is required";
    else if (!postalPattern.test(formData.postal_code))
      tempErrors.postal_code = "Postal code must be 5 digits";
    if (!formData.description)
      tempErrors.description = "Description is required";
    if (!formData.recipient_medication)
      tempErrors.recipient_medication = "Medication info is required";
    if (!formData.recipient_disease)
      tempErrors.recipient_disease = "Disease info is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ✅ Submit data
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api-recipients/create",
        {
          user_id: 3, // example user ID
          ...formData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Recipient added successfully!");
        setFormData({
          first_name: "",
          last_name: "",
          recipient_email: "",
          phone_number: "",
          blood_type: "",
          date_of_birth: "",
          address_line1: "",
          address_line2: "",
          city: "",
          state: "",
          postal_code: "",
          country: "",
          description: "",
          recipient_medication: "",
          recipient_disease: "",
        });
      }
    } catch (error) {
      toast.error("Failed to add Recipient. Please try again.");
      console.error("Error saving Recipient data:", error.response?.data || error);
    }
  };

  const handleBack = () => {
    router.push("Adminoptions/ManageRecipient");
  };

  return (
    <View style={styles.container}>
      <ToastContainer />
      <div style={styles.header}>
        <button style={styles.backButton} onClick={handleBack}>
          <Ionicons name="arrow-back-outline" color="white" size="20" />
        </button>
      </div>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.subHeader}>Add New Patient</Text>

          {/* First Name */}
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={[styles.input, errors.first_name && styles.inputError]}
            placeholder="Enter First name"
            value={formData.first_name}
            onChangeText={(text) => handleChange("first_name", text)}
          />
          {errors.first_name && (
            <Text style={styles.errorText}>{errors.first_name}</Text>
          )}

          {/* Last Name */}
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={[styles.input, errors.last_name && styles.inputError]}
            placeholder="Enter Last name"
            value={formData.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
          {errors.last_name && (
            <Text style={styles.errorText}>{errors.last_name}</Text>
          )}

          {/* Email */}
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, errors.recipient_email && styles.inputError]}
            placeholder="Enter Email"
            value={formData.recipient_email}
            onChangeText={(text) => handleChange("recipient_email", text)}
          />
          {errors.recipient_email && (
            <Text style={styles.errorText}>{errors.recipient_email}</Text>
          )}

          {/* Phone Number */}
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={[styles.input, errors.phone_number && styles.inputError]}
            placeholder="Enter Phone Number"
            value={formData.phone_number}
            onChangeText={(text) => handleChange("phone_number", text)}
          />
          {errors.phone_number && (
            <Text style={styles.errorText}>{errors.phone_number}</Text>
          )}

          {/* Blood Type */}
          <Text style={styles.inputLabel}>Blood Type</Text>
          <View style={styles.radioGroup}>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.radioButton,
                  formData.blood_type === type && styles.radioButtonSelected,
                ]}
                onPress={() => handleChange("blood_type", type)}
              >
                <View
                  style={[
                    styles.radioCircle,
                    formData.blood_type === type && styles.radioCircleSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.blood_type && (
            <Text style={styles.errorText}>{errors.blood_type}</Text>
          )}

          {/* Date of Birth */}
          <Text style={styles.inputLabel}>Date of Birth</Text>
          {Platform.OS === "web" ? (
            <input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              style={styles.inputDate}
            />
          ) : (
            <TextInput
              style={[styles.input, errors.date_of_birth && styles.inputError]}
              placeholder="MM/DD/YYYY"
              value={formData.date_of_birth}
              onChangeText={(text) => handleChange("date_of_birth", text)}
            />
          )}
          {errors.date_of_birth && (
            <Text style={styles.errorText}>{errors.date_of_birth}</Text>
          )}

          {/* City Dropdown */}
          <Text style={styles.inputLabel}>City</Text>
          <Picker
            selectedValue={formData.city}
            onValueChange={(value) => handleChange("city", value)}
            style={styles.picker}
          >
            <Picker.Item label="Select a city" value="" />
            {cities.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

          {/* State */}
          <Text style={styles.inputLabel}>State</Text>
          <TextInput
            style={[styles.input, errors.state && styles.inputError]}
            placeholder="Enter State"
            value={formData.state}
            onChangeText={(text) => handleChange("state", text)}
          />
          {errors.state && (
            <Text style={styles.errorText}>{errors.state}</Text>
          )}

          {/* Postal Code */}
          <Text style={styles.inputLabel}>Postal Code</Text>
          <TextInput
            style={[styles.input, errors.postal_code && styles.inputError]}
            placeholder="Enter Postal Code"
            value={formData.postal_code}
            onChangeText={(text) => handleChange("postal_code", text)}
          />
          {errors.postal_code && (
            <Text style={styles.errorText}>{errors.postal_code}</Text>
          )}

          {/* Country */}
          <Text style={styles.inputLabel}>Country</Text>
          <TextInput
            style={[styles.input, errors.country && styles.inputError]}
            placeholder="Enter Country"
            value={formData.country}
            onChangeText={(text) => handleChange("country", text)}
          />
          {errors.country && (
            <Text style={styles.errorText}>{errors.country}</Text>
          )}

          {/* Description */}
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.input, errors.description && styles.inputError]}
            placeholder="Enter Description"
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          {/* Disease */}
          <Text style={styles.inputLabel}>Disease</Text>
          <TextInput
            style={[
              styles.input,
              errors.recipient_disease && styles.inputError,
            ]}
            placeholder="Enter Disease Info"
            value={formData.recipient_disease}
            onChangeText={(text) => handleChange("recipient_disease", text)}
          />
          {errors.recipient_disease && (
            <Text style={styles.errorText}>{errors.recipient_disease}</Text>
          )}

          {/* Medication */}
          <Text style={styles.inputLabel}>Medication</Text>
          <TextInput
            style={[
              styles.input,
              errors.recipient_medication && styles.inputError,
            ]}
            placeholder="Enter Medication Info"
            value={formData.recipient_medication}
            onChangeText={(text) => handleChange("recipient_medication", text)}
          />
          {errors.recipient_medication && (
            <Text style={styles.errorText}>{errors.recipient_medication}</Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.imageButton} onPress={handleSubmit}>
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
    paddingLeft: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  inputDate: {
    marginRight: 8,
    marginLeft: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  backButton: {
    backgroundColor: "#db0304",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    padding: "10px",
    marginLeft: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    marginTop: "10px",
    padding: "10px",
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    padding: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#777",
    marginRight: 6,
  },
  radioCircleSelected: {
    backgroundColor: "#db0304",
    borderColor: "#db0304",
  },
  radioLabel: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.RED,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  inputError: {
    borderColor: "red",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  imageButton: {
    backgroundColor: Colors.RED,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 300,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default AdminRecipientAddScreen;

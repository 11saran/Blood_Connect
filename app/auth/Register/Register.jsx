import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,

  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import axios from "axios";
import Colors from "../../../constants/Colors";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function Register() {
  const router = useRouter();
  const navigation = useNavigation();
  const [form, setForm] = useState({
    selectedRole: "user",
    email: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "", adminCode: "" ,confirmPassword:""});


  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    
  }, []);

 

// Validation function
const validateForm = () => {
  let valid = true;
  const newErrors = { email: "", password: "", confirmPassword: "", adminCode: "" };

  // Email validation
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Please enter a valid email address.";
    valid = false;
  }

  // Password validation (min 8 chars, at least one uppercase, one lowercase, and one number)
  if (!form.password || form.password.length < 8 ||
      !/[A-Z]/.test(form.password) || 
      !/[a-z]/.test(form.password) || 
      !/[0-9]/.test(form.password)) {
    newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
    valid = false;
  }

  // Confirm Password validation
  if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match.";
    valid = false;
  }

  // Admin Code validation (if role is admin)
  if (form.selectedRole === "admin" && !form.adminCode) {
    newErrors.adminCode = "Admin code is required for admin registration.";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

// Update handleRegister function to use validateForm
const handleRegister = async () => {
  if (!validateForm()) {
    return; // Stop if validation fails
  }

  const requestBody = {
    role: form.selectedRole,
    email: form.email,
    password: form.password,
    adminCode: form.selectedRole === "admin" ? form.adminCode : null,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/api-users/register",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    Alert.alert("Success", "User registered successfully");
    router.push("/auth/Register/SuccessfullyRegistered");
  } catch (error) {
    Alert.alert("Error", error.response?.data?.message || "An error occurred during registration.");
  }
};

const handleInputChange = (name, value) => {
  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE,
      }}
    >
      <ToastContainer position="top-right" theme="light" autoClose={3000} hideProgressBar />

      <View style={styles.imageContainer}>
        <Image
          source={require("./../../../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <Text
        style={{
          marginTop: 20,
          textAlign: "center",
          fontFamily: "inter-bold",
          color: Colors.RED,
          fontSize: 38,
        }}
      >
        Register As
      </Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleInputChange("selectedRole", "user")}
        >
          <View
            style={
              form.selectedRole === "user"
                ? styles.radioCircleSelected
                : styles.radioCircle
            }
          />
          <Text style={styles.radioText}>User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => handleInputChange("selectedRole", "admin")}
        >
          <View
            style={
              form.selectedRole === "admin"
                ? styles.radioCircleSelected
                : styles.radioCircle
            }
          />
          <Text style={styles.radioText}>Admin</Text>
        </TouchableOpacity>
      </View>

      {form.selectedRole === "admin" && (
        <View style={styles.inputWrapper}>
          <View style={styles.inputWithIcon}>
            <Ionicons
              name="finger-print-outline" // Email icon
              size={20}
              color={Colors.GRAY}
              style={styles.icon} // Positioning for the icon
            />
            <TextInput
              style={[styles.input, errors.adminCode && styles.inputError]}

              placeholder="Admin code"
              value={form.adminCode}
              onChangeText={(text) => handleInputChange("adminCode", text)}
              placeholderTextColor={Colors.GRAY}

            />

            {errors.adminCode ? (
              <>
                <Ionicons
                  name="alert-circle-outline"
                  size={20}
                  color={Colors.RED}
                  style={styles.errorIcon}
                />

              </>
            ) : null}
          </View>
          {errors.adminCode ? (
            <>
              <Text style={styles.errorText}>{errors.adminCode}</Text>


            </>
          ) : null}
        </View>
      )}

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputWithIcon}>
          <Ionicons
            name="mail-outline" // Email icon
            size={20}
            color={Colors.GRAY}
            style={styles.icon}
          />
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => handleInputChange("email", text.toLowerCase())}
            placeholderTextColor={Colors.GRAY}
          />

          {errors.email ? (
            <>
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={Colors.RED}
                style={styles.errorIcon}
              />

            </>
          ) : null}
        </View>
        {errors.email ? (
          <>
            <Text style={styles.errorText}>{errors.email}</Text>

          </>
        ) : null}
      </View>


      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputWithIcon}>
          <Ionicons
            name="lock-closed-outline" // Lock icon for password
            size={20}
            color={Colors.GRAY}
            style={styles.icon} // Positioning for the lock icon
          />
          <TextInput
            secureTextEntry={true} // To hide password input
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            value={form.password}
            onChangeText={(text) => handleInputChange("password", text)}
            placeholderTextColor={Colors.GRAY}
          />
          {errors.password ? (
            <>
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={Colors.RED}
                style={styles.errorIcon}
              />

            </>
          ) : null}
        </View>
        {errors.password ? (
          <>
            <Text style={styles.errorText}>{errors.password}</Text>


          </>
        ) : null}
      </View>
      {/*confirm  Password Input */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputWithIcon}>
          <Ionicons
            name="lock-closed-outline" // Lock icon for password
            size={20}
            color={Colors.GRAY}
            style={styles.icon} // Positioning for the lock icon
          />
          <TextInput
            secureTextEntry={true} // To hide password input
            style={[styles.input, errors.confirmPassword && styles.inputError]}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            placeholderTextColor={Colors.GRAY}
          />
          {errors.confirmPassword ? (
            <>
              <Ionicons
                name="alert-circle-outline"
                size={20}
                color={Colors.RED}
                style={styles.errorIcon}
              />

            </>
          ) : null}
        </View>
        {errors.confirmPassword ? (
          <>
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>


          </>
        ) : null}
      </View>



      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={{
          color: Colors.WHITE,
          textAlign: "center",
          fontFamily: "inter-bold",
          fontSize: 24,
        }}>Register</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => router.push("auth/Login/Login")}>
          <Text style={styles.registerText}>
            Already have an Account? <Text style={styles.registerLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ImageBackground
          source={require("./../../../assets/images/login-bg1.png")}
          style={styles.backgroundImage}
          resizeMode="cover" 
        >

        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 
  imageContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flex: 1, 
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },

  container: {
    flex: 1, 
  },
  backgroundImage: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%',
    height: '100%', 
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  inputWrapper: {
    marginTop: 10,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 50,  
    paddingLeft: 40, 
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.BLACK,
  },
  icon: {
    position: 'absolute',
    left: 10, 
    zIndex: 1,
  },
  inputError: {
    borderColor: Colors.RED,
  },
  errorIcon: {
    position: "absolute",
    right: 10,
  },
  errorText: {
    color: Colors.RED,
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 5,
  },
  loginButton: {
    padding: 15,
    backgroundColor: Colors.RED,
    borderRadius: 15,
    marginTop: 20,
    height: 55,
    width: "80%",
    alignSelf: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#828383",
    fontFamily: "inter-medium",
    fontSize: 13,
    paddingRight: 25,
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.RED,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.RED,
    backgroundColor: Colors.RED,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "inter-medium",
  },



  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  orText: {
    marginHorizontal: 10,
    color: "#000",
    fontFamily: "inter-bold",
    marginTop: 70,
    fontSize: 20,
  },
  line: {
    height: 1,
    width: 150,
    backgroundColor: Colors.RED,
    marginTop: 70,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginRight: 50,
    marginTop: 20,
  },
  socialButtonFacebook: {
    padding: 10,
    borderRadius: 25,
    marginLeft: 60,
  },
  socialButtonGoogle: {
    padding: 10,
    borderRadius: 25,
    marginLeft: 60,
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#828383",
    fontSize: 13,
  },
  registerLink: {
    fontWeight: "bold",
    color: "#828383",
    marginLeft: 5,
    textDecorationLine: "none",
    fontSize: 13,
  },



  registerButton: {
    padding: 15,
    backgroundColor: Colors.RED,
    borderRadius: 15,
    marginTop: 20,
    height: 55,
    width: "80%",
    alignSelf: "center",
  },
});

import {
  View,
  ImageBackground,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../../constants/Colors";
import axios from "axios";
import { Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastStyles.css';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Login() {
  const navigation = useNavigation();
  const router = useRouter();

  const [form, setForm] = useState({
    selectedRole: "user",
    email: "",
    password: "",
    adminCode: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "", adminCode: "" });


  //---------------------------------------------------------------------------------------------------








  const handleLogin = async () => {
    if (!validateForm()) return;

    if (!form.email || !form.password) {
      Alert.alert("Login Failed", "Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api-users/login", {
        email: form.email.trim(),
        password: form.password.trim(),
      });

      const { role, message } = response.data;
      await AsyncStorage.setItem('userEmail', form.email.trim());
     
      Alert.alert("Success", message);
      console.log('login succfull ')

      if (role === "admin") {
        console.log('this is admin')
        router.push("(tabs)Admin/Home");
      } else {
        console.log('this is user ')

        router.push("(tabs)/Home");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred during login.", { className: 'toastify__toast--error' });
      } else if (error.request) {
        toast.error("Network Error: Unable to connect to the server.", { className: 'toastify__toast--error' });
      } else {
        toast.error("An unexpected error occurred. Please try again.", { className: 'toastify__toast--error' });
      }
    }
  };

  //------------------------------------------------------------------------------------------------------------------------

  const handleInputChange = (field, value) => {
    if (field === "selectedRole") {
      const newForm = {
        ...form,
        selectedRole: value,
        adminCode: value === "admin" ? form.adminCode : "",
        fingerprint: "",
        email: "",
        password: ""
      };
      setForm(newForm);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [field]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };


  // Validate email and password
  const validateForm = () => {
    let valid = true;
    let tempErrors = { email: "", password: "", adminCode: "" };

    // Check if the user is an admin
    if (form.selectedRole === "admin") {
      if (!form.adminCode.trim()) {
        tempErrors.adminCode = "Admin Code is required";
        valid = false;
      }
    }

    // Email validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!emailPattern.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation
    if (!form.password.trim()) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);



  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE,
      }}
    >
      <ToastContainer position="top-right" theme="light" autoClose={3000} hideProgressBar />
      <View

      >

        <View style={styles.imageContainer}>
          <Image
            source={require("./../../../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

      </View>
      <View>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontFamily: "inter-bold",
            color: Colors.RED,
            fontSize: 38,
          }}
        >
          Login As
        </Text>
      </View>
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


      {/* Forgot Password */}
     {/* <TouchableOpacity onPress={() => router.push("(tabs)Admin/Home")}>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
     </TouchableOpacity>*/}
      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
      >
        <Text
          style={{
            color: Colors.WHITE,
            textAlign: "center",
            fontFamily: "inter-bold",
            fontSize: 24,
          }}

        >
          Login
        </Text>
      </TouchableOpacity>
      {/* <View style={styles.socialContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButtonFacebook}>
          <Image source={require("./../../../assets/images/facebook.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButtonGoogle}>
          <Image source={require("./../../../assets/images/google.png")} />
        </TouchableOpacity>
      </View> */}
      <View>
        <TouchableOpacity onPress={() => router.push("auth/Register/Register")}>
          <Text style={styles.registerText}>
            Don't have an Account? <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ImageBackground
          source={require("./../../../assets/images/login-bg1.png")}
          style={styles.backgroundImage}
          resizeMode="cover" // or "contain" depending on your needs
        >

        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  imageContainer: {
    justifyContent: 'center', // Centers vertically if the container has enough height
    alignItems: 'center', // Centers horizontally
    flex: 1, // Allows the container to take up full available space
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 200,
  },

  container: {
    flex: 1, // Makes sure the container takes up the full screen height
  },
  backgroundImage: {
    flex: 1, // Makes the image cover the entire container
    justifyContent: 'center', // Aligns content vertically in the center
    alignItems: 'center', // Aligns content horizontally in the center
    width: '100%', // Ensures the image stretches to the full width of the screen
    height: '100%', // Ensures the image stretches to the full height of the screen
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
    height: 50,  // Height of the input field
    paddingLeft: 40, // Add padding for the icon inside the field
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.BLACK,
  },
  icon: {
    position: 'absolute',
    left: 10, // Positioning the icon inside the input
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
});

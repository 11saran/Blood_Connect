import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "./../../../constants/Colors";
import axios from "axios";
import { Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

export default function Login() {
  const navigation = useNavigation();
  const router = useRouter();

  const [form, setForm] = useState({
    selectedRole: "user",
    email: "",
    password: "",
    adminCode: "",
  });

  const [errors, setErrors] = useState({ email: "", password: "" });

  // Validate email and password
  const validateForm = () => {
    let valid = true;
    let tempErrors = { email: "", password: "" };

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
    } else if (form.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api-users/login", {
        email: form.email.trim(),
        password: form.password.trim(),
      });

      const { role, message } = response.data;
      Alert.alert("Success", message);
      console.log('login successful ');

      if (role === "admin") {
        console.log('this is admin');
        router.push("(tabs)Admin/Home");
      } else {
        console.log('this is user');
        router.push("(tabs)/Home");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        Alert.alert("Login Failed", error.response.data.message || "An error occurred during login.");
      } else if (error.request) {
        Alert.alert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
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
      {/* Header */}
      <View
        style={{
          backgroundColor: Colors.HEADER,
          marginTop: 0,
          height: 100,
          flexDirection: "row",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "inter-bold",
            fontSize: 38,
            top: 25,
            marginLeft: 5,
            color: Colors.WHITE,
          }}
        >
          Blood Connect
        </Text>
        <Image
          source={require("./../../../assets/images/header.png")}
          style={{
            top: 45,
            marginLeft: 70,
          }}
        />
      </View>
      {/* Login As */}
      <View>
        <Text
          style={{
            marginTop: 40,
            textAlign: "center",
            fontFamily: "inter-bold",
            color: Colors.RED,
            fontSize: 38,
          }}
        >
          Login As
        </Text>
      </View>
      {/* Role Selection */}
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
      {/* Admin Code Input */}
      {form.selectedRole === "admin" && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Admin Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your admin code"
            value={form.adminCode}
            onChangeText={(text) => handleInputChange("adminCode", text)}
          />
        </View>
      )}
      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputWithIcon}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter your email address"
            value={form.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          {errors.email && (
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color={Colors.RED}
              style={styles.errorIcon}
            />
          )}
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputWithIcon}>
          <TextInput
            secureTextEntry={true}
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          {errors.password && (
            <Ionicons
              name="alert-circle-outline"
              size={20}
              color={Colors.RED}
              style={styles.errorIcon}
            />
          )}
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>
      {/* Forgot Password 
      <TouchableOpacity onPress={() => router.push("(tabs)Admin/Home")}>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
      </TouchableOpacity>*/}
      
      {/* Login Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  inputWrapper: {
    marginTop: 40,
    width: "100%",
    alignItems: "center",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
  },
  input: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    fontFamily: "inter-medium",
    borderColor: Colors.INPUT,
    fontSize: 16,
    height: 45,
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
    marginBottom: 20,
    top: 45,
    width: 303,
    alignSelf: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#007BFF",
    marginTop: 25,
    fontFamily: "inter-medium",
    fontSize: 16,
  },
});

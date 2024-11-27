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
import Ionicons from 'react-native-vector-icons/Ionicons';



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


  // Validate email and password
  const validateForm = () => {
    let valid = true;
    let tempErrors = { email: "", password: "", adminCode: "" };

    // if (!form.adminCode.trim()) {
    //   tempErrors.adminCode = "Admin Code is required";
    //   valid = false;
    // }

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
        Alert.alert("Login Failed", error.response.data.message || "An error occurred during login.");
      } else if (error.request) {
        Alert.alert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      } else {
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  //------------------------------------------------------------------------------------------------------------------------

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
      <View style={styles.inputWrapper}>
        <View style={styles.inputWithIcon}>
          <Ionicons
            name="mail-outline" // Email icon
            size={20}
            color={Colors.GRAY}
            style={styles.icon} // Positioning for the icon
          />
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => handleInputChange("email", text)}
            placeholderTextColor={Colors.GRAY}
          />
        </View>
        
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "inter-bold",
            fontWeight: 600,
            marginLeft: 10,
          }}
        >
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(text) => handleInputChange("password", text)}
        />
      </View>

      {/*<TouchableOpacity onPress={() => router.push("(tabs)Admin/Home")}>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
      </TouchableOpacity>*/}

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
      <View style={styles.socialContainer}>
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
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push("auth/Register/Register")}>
          <Text style={styles.registerText}>
            Don't have an Account?
            <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  label: {
    fontSize: 20,
    fontFamily: "inter-bold",
    marginLeft: 10,
  },
  inputContainer: {
    marginTop: 10,
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
  input: {
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    width: 350,
    fontFamily: "inter-medium",
    borderColor: Colors.INPUT,
    fontSize: 16,
    height: 40,
    alignSelf: "center",
    marginTop: 10,
  },
  loginButton: {
    padding: 15,
    backgroundColor: Colors.RED,
    padding: 3,
    borderRadius: 15,
    marginBottom: 20,
    top: 45,
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
    color: "#3C3636",
    fontSize: 20,
  },
  registerLink: {
    fontWeight: "bold",
    color: "#007BFF",
    textDecorationLine: "underline",
    fontSize: 20,
  },
});

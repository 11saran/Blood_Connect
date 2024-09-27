import {View,Text,Image,TextInput,StyleSheet,TouchableOpacity,} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "./../../../constants/Colors";



export default function Login() {
  const navigation = useNavigation();
  const router=useRouter();
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
          Login
        </Text>
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
          Email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
        />
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
        />
      </View>
      <TouchableOpacity onPress={() => alert("Forgot Password?")}>
        <Text style={styles.forgotPassword}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("(tabs)/Home")}
        style={{
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
        }}
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

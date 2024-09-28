import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,Button
} from "react-native";
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function MeAsDonor() {
      const router = useRouter();
      const navigation = useNavigation();
      useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
       const [form, setForm] = useState({
         firstName: "",
         lastName: "",
         dob: "",
         gender: "",
         contactNumber: "",
         email: "",
         address: "",
         nicNumber: "",
       });

       const handleChange = (name, value) => {
         setForm({
           ...form,
           [name]: value,
         });
       };
  return (
    <View>
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
          source={require("./../../assets/images/header.png")}
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
          Register
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
          Create Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your password"
        />
      </View>
      <View
        style={{
          marginTop: 40,
          backgroundColor: Colors.WHITE,
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
          Confirm Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your confirm password"
        />
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
});

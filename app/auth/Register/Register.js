import { View,Text,Image,TextInput,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '../../../constants/Colors';

export default function Register() {
  const router = useRouter();
   const navigation = useNavigation();
  useEffect (()=>{
    navigation.setOptions({
      headerShown:false
    })
  },[])
  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height:'100%',
    }}>
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
          backgroundColor:Colors.WHITE
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
      <TouchableOpacity
        onPress={() => router.push("auth/Register/SuccessfullyRegistered")}
        style={{
          padding: 15,
          backgroundColor: Colors.RED,
          padding: 3,
          borderRadius: 15,
          marginBottom: 20,
          top: 75,
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
          Register
        </Text>
      </TouchableOpacity>
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

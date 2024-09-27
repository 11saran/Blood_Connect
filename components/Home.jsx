import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";

export default function Home() {
  const router=useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/login.png")}
        style={{
          width: "100%",
          marginTop: 100,
        }}
      />
      <View style={styles.container1}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontFamily: "inter-bold",
              fontSize: 45,
              fontWeight: 800,
              marginTop: 20,
              marginRight: 5,
            }}
          >
            BLOOD
          </Text>
          <Text
            style={{
              fontFamily: "inter-bold",
              fontSize: 45,
              fontWeight: 800,
              marginTop: 20,
              color: Colors.RED,
              marginLeft: 5,
            }}
          >
            CONNECT
          </Text>
        </View>
        <View>
          <Text
            style={{
              marginTop: 50,
              textAlign: "center",
              fontSize: 16,
              fontFamily: "inter-medium",
              marginTop: 30,
            }}
          >
            POWER BY
          </Text>
        </View>
        <View style={styles.linkers}>
          <Text
            style={{
              color: Colors.RED,
              fontFamily: "inter-bold",
              fontSize: 16,
              marginLeft: 75,
            }}
          >
            LIFELINE LINKERS
            <Image
              source={require("./../assets/images/blood.png")}
              style={{
                width: 67,
                height: 54,
              }}
            />
          </Text>
        </View>
        <TouchableOpacity style={styles.button}
          onPress={()=>router.push('auth/Login/Login')}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 17,
              fontFamily: "inter-bold",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    height: "100%",
  },
  container1: {
    backgroundColor: Colors.WHITE,
    height: "100%",
    marginTop: 20,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  linkers: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -15,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.RED,
    borderRadius: 99,
    marginTop: 50,
    width: "90%",
    alignSelf: "center",
  },
});

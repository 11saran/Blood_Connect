import { View, Text, Image,TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';


export default function SuccessfullyRegisterDonor() {
  const router = useRouter();
  const navigation = useNavigation();
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
          top: 115,
        }}
      >
        <Text
          style={{
            fontFamily: "inter-bold",
            color: Colors.RED,
            fontSize: 38,
            marginLeft: 15,
          }}
        >
          Successfully
        </Text>
        <Text
          style={{
            fontFamily: "inter-bold",
            color: Colors.RED,
            fontSize: 38,
            marginLeft: 120,
          }}
        >
          Registered!
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          top: 180,
        }}
      >
          <Image source={require("./../../assets/images/Registration.png")} />
          </View>
        
        <View style={{
          alignItems: "center",
          top: 200,
        }}
      >
        <Text style={{
            fontFamily: "inter-bold",
            color: Colors.BLACK,
            fontSize: 20,
            marginLeft: 10,
          }}
          >
       You’ve successfully registered for the blood donation camp!
       </Text>	
      </View>
      <View
        style={{
          alignItems: "center",
          top: 180,
        }}
      >

      </View>
      <TouchableOpacity onPress={() => router.push("Screens/UserCampListScreen")}>
        <Text
          style={{
            borderColor: Colors.RED,
            borderWidth: 2,
            width: 90,
            color: Colors.RED,
            marginTop: 240,
            marginLeft: "75%",
            fontFamily: "inter-bold",
            fontSize: 20,
            textAlign: "center",
            borderRadius: 20,
          }}
        >
          Done
        </Text>
      </TouchableOpacity>
      </View>
   );
  }
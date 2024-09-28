import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
export default function CampDeatails() {
      const router = useRouter();
      const navigation = useNavigation();
      useEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
  return (
    <View>
      <Text>CampDeatails</Text>
    </View>
  );
}

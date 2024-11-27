import { Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {},
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="home"
              size={30}
              color={focused ? "#A80F1E" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                color: focused ? "#A80F1E" : "black",
                fontFamily: "inter-bold",
                fontSize: 12,
              }}
            >
              HOME
            </Text>
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Notification"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={30}
              color={focused ? "#A80F1E" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                color: focused ? "#A80F1E" : "black",
                fontFamily: "inter-bold",
                fontSize: 15,
              }}
            >
              Notification
            </Text>
          ),
        }}
      />*/}

      <Tabs.Screen
        name="AdminUser"
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={30}
              color={focused ? "#A80F1E" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 12,
                color: focused ? "#A80F1E" : "black",
                fontFamily: "inter-bold",
                fontSize: 12,
              }}
            >
              ADMIN
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
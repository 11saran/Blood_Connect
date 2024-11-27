{/*import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";

const data = [
  {
    id: "1",
    name: "Raja Mukesh",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "A+",
  },
  {
    id: "2",
    name: "Varan Kumar",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "AB+",
  },
  {
    id: "3",
    name: "Nimala Suresh",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "O+",
  },
  {
    id: "4",
    name: "Kamala Nirosh",
    bloodBank: "Jaffna Blood Bank",
    bloodType: "A+",
  },
];

const EmergencyList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.bloodBank}>{item.bloodBank}</Text>
        <Text style={styles.bloodType}>{item.bloodType}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
      <Text style={styles.title}>Emergency situation</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#d32f2f",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  headerIcon: {
    fontSize: 24,
    color: "#fff",
  },
  title: {
    fontSize: 32,
    fontFamily: "inter-bold",
    color: Colors.RED,
    marginVertical: 20,
    alignSelf: "center",
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: 350,
    height: 136,
    alignSelf:'center',
  },
  avatar: {
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
   
   
  },
  avatarText: {
    fontSize: 25,
    color: "#333",
  },

  name: {
    fontSize: 15,
    fontFamily: "inter-bold",
  },
  bloodBank: {
    fontSize: 15,
    fontFamily: "inter-bold",
  },
  bloodType: {
    fontSize: 15,
    fontFamily: "inter-bold",
  },
  button: {
    backgroundColor: Colors.RED,
    height: 30,
    width: 161.59,
    borderRadius: 10,
    justifyContent:"center",

   
  },
  buttonText: {
    color:Colors.WHITE,
    fontFamily: "inter-bold",
    textAlign: "center",
  
  },
});

export default EmergencyList;
*/}
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Colors from "../../constants/Colors";
import { router } from "expo-router";

export default function HomeScreen({ navigation }) {
  // Images for the image slider
  const images = [
    { id: 1, src: require("./../../assets/images/image1.png") },
    { id: 2, src: require("./../../assets/images/image2.png") },
    { id: 3, src: require("./../../assets/images/image3.png") },
    { id: 4, src: require("./../../assets/images/image4.png") },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds interval

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Image slider */}
      <Image
        source={images[currentImageIndex].src}
        style={styles.imageSlider}
        resizeMode="cover"
      />

      {/* Title */}
      <Text style={styles.title}>
        Join Blood Connect - Your Chance to Make a Difference!
      </Text>

      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <TouchableOpacity onPress={() => router.push("options/MeAsDonor")}>
            <Image
              source={require("./../../assets/images/h1Image.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Me as Donor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridItem}>
          <TouchableOpacity
            onPress={() => router.push("options/PermanentDonor")}
          >
            <Image
              source={require("./../../assets/images/h2Image.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Permanent Donor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridItem}>
          <TouchableOpacity onPress={() => router.push("options/Disease")}>
            <Image
              source={require("./../../assets/images/h3Image.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Disease</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridItem}>
          <TouchableOpacity
            onPress={() => router.push("options/CampDeatails")}
          >
            <Image
              source={require("./../../assets/images/h4Image.png")}
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Camp Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageSlider: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 20,
    fontFamily: "inter-extrabold",
    padding: 15,
    marginVertical: 10,
    color: Colors.BLACK,
    top: 15,
  },
  gridContainer: {
    width: 327,
    height: 318,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: Colors.WHITE1,
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 0.51,
    top:55,
    
    
  },
  gridItem: {
    backgroundColor: Colors.RED1,
    marginVertical: 15,
    marginHorizontal: 15,
    height: 130,
    width: 130,
    borderRadius: 20,
    
  
  },
  optionIcon: {
    width: 58,
    height: 58,
    marginBottom: 10,
    alignSelf:'center',
    top:10,
  },
  optionText: {
    fontSize: 16,
    color:Colors.WHITE,
    textAlign: "center",
    fontFamily:"inter-extrabold",
    padding:15,
    top:-15
  },
});

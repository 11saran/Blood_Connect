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

  const options = [
    {
      id: "1",
      title: "Me as Donor",
      icon: require("./../../assets/images/h1Image.png"),
    }, 
    {
      id: "2",
      title: "Permanent Donor",
      icon: require("./../../assets/images/h2Image.png"),
    },
    {
      id: "3",
      title: "Disease",
      icon: require("./../../assets/images/h3Image.png"),
    },
    {
      id: "4",
      title: "Camp Details",
      icon: require("./../../assets/images/h4Image.png"),
    },
  ];

  // Render each option as a button
  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => {
        // Add your navigation or onPress action here
        console.log(`${item.title} pressed`);
      }}
    >
      <Image source={item.icon} style={styles.optionIcon} />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

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

      <View style={{height:400}}>
        <FlatList
          data={options}
          renderItem={renderOption}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
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
    height: 200,
  },
  title: {
    fontSize: 18,
    fontFamily:"inter-extrabold",
    padding:10,
   
    marginVertical: 10,
    color: Colors.BLACK,
    top:48
  },
  grid: {
    justifyContent: "center",
    top: 110,
    padding:50,
    height:275
  },
  optionContainer: {
    backgroundColor: "#e74c3c",
    flex: 1,
    margin: 10,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  optionIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

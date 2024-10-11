import React, { useState, useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { View, Text, TextInput, StyleSheet, FlatList, Image , TouchableOpacity } from 'react-native';


export default function Disease() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const diseases = [
    {
      id: 1,
      name: 'Leukemia',
      description: 'Cancer of the blood or bone marrow.',
      image:'./../../../assets/images/leukemia.png',
      details: 'Leukemia is a group of cancers that usually begin in the bone marrow and result in high numbers of abnormal white blood cells.',
      symptoms: 'Fatigue, frequent infections, fever, easy bruising or bleeding.',
      transmission: 'Not contagious; caused by mutations in the bone marrow cells.',
      prevention: 'There are no known ways to prevent leukemia.',
    },
    {
      id: 2,
      name: 'Anemia',
      description: 'Condition in which the re blood cell count is less than normal.',
      image: './../../../assets/images/nanemia.png',
      details: 'Anemia results in fatigue, weakness, and sometimes shortness of breath.',
      symptoms: 'Fatigue, pale skin, shortness of breath, dizziness.',
      transmission: 'Not contagious; can be caused by iron deficiency, chronic disease, or genetic disorders.',
      prevention: 'Eating a balanced diet rich in iron and vitamin B12.',
    },
    {
      id: 3,
      name: 'Bleeding Disorders',
      description: 'Conditions that affect the way your blood normally clots.',
      image: './../../../assets/images/bleeding.png',
      details: 'Bleeding disorders include hemophilia, von Willebrand disease, and other conditions where clotting is impaired.',
      symptoms: 'Easy bruising, excessive bleeding, joint pain.',
      transmission: 'Not contagious; usually inherited.',
      prevention: 'Regular check-ups and managing underlying conditions.',
    },
    {
      id: 4,
      name: 'Sickle Cell Anemia',
      description: 'A genetic disorder that affects hemoglobin.',
      image: './../../../assets/images/sickle.png',
      details: 'Sickle cell disease causes red blood cells to become rigid and sickle-shaped, blocking blood flow.',
      symptoms: 'Anemia, pain crises, swelling in hands and feet.',
      transmission: 'Inherited from parents; both parents must carry the sickle cell trait.',
      prevention: 'Regular check-ups, hydration, and avoiding extreme temperatures.',
    },
    {
      id: 5,
      name: 'Thalassemia',
      description: 'An inherited blood disorder that affects hemoglobin production.',
      image: './../../../assets/images/thalassemias.png',
      details: 'Thalassemia can cause anemia, fatigue, and weakness.',
      symptoms: 'Fatigue, weakness, pale skin, and jaundice.',
      transmission: 'Inherited; more common in people of Mediterranean, African, and Asian descent.',
      prevention: 'Regular blood transfusions and folic acid supplements.',
    },
    {
      id: 6,
      name: 'Hemophilia',
      description: 'A rare genetic disorder that impairs the body’s ability to make blood clots.',
      image: './../../../assets/images/hemophilla.png',
      details: 'People with hemophilia may bleed easily and have difficulty stopping bleeding after injuries.',
      symptoms: 'Excessive bleeding, joint pain, and easy bruising.',
      transmission: 'Inherited, mostly affects males; females can be carriers.',
      prevention: 'Regular medical check-ups and avoiding activities that cause injuries.',
    },
    {
      id: 7,
      name: 'Multiple Myeloma',
      description: 'A cancer of the plasma cells in the bone marrow.',
      image: './../../../assets/images/myeloma.png',
      details: 'Multiple myeloma leads to the overproduction of abnormal plasma cells, affecting the body’s ability to produce healthy blood cells.',
      symptoms: 'Bone pain, fatigue, recurrent infections, and high calcium levels.',
      transmission: 'Not contagious; exact cause is unknown but linked to genetic factors.',
      prevention: 'No known prevention, but maintaining a healthy lifestyle may help.',
    },
    {
      id: 8,
      name: 'Polycythemia Vera',
      description: 'A blood disorder in which the body produces too many red blood cells.',
      image: './../../../assets/images/polycyth.png',
      details: 'This can lead to increased blood thickness, raising the risk of blood clots.',
      symptoms: 'Headaches, dizziness, itchy skin, and vision problems.',
      transmission: 'Not contagious; linked to mutations in the JAK2 gene.',
      prevention: 'Regular medical check-ups and managing blood viscosity.',
    },
    {
      id: 9,
      name: 'Aplastic Anemia',
      description: 'A rare condition where the bone marrow stops producing enough blood cells.',
      image: './../../../assets/images/aplastic.png',
      details: 'Aplastic anemia can lead to fatigue, higher risk of infections, and uncontrolled bleeding.',
      symptoms: 'Fatigue, frequent infections, easy bruising, and nosebleeds.',
      transmission: 'Not contagious; can be caused by autoimmune diseases, medications, or infections.',
      prevention: 'Avoid exposure to toxins and manage existing health conditions.',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDisease = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('options/view', { 
          name: item.name, 
          symptoms: item.symptoms,
          transmission: item.transmission,
          prevention: item.prevention,
          image: item.image,
          details: item.details 
        })}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BLOOD DISEASES DATABASE</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredDiseases}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDisease}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'red',
    fontFamily: 'inter-extrabold',
    shadowColor:'red',
    
    
  },
  searchBar: {
    padding: 10,
    backgroundColor:'white',
    borderRadius: 10,
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'mistyrose',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    borderColor:'black',
    borderBottomWidth:5,
   
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'red',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
  },
});
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';

const ViewPermanentDonor = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const donor = JSON.parse(params.donor);
  console.log(donor)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={donor.avatar}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{donor.donorName}</Text>
          </View>
        </View>
      </View>

      {/* Donor Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}><Text style={styles.label}>Full Name: </Text>{donor.name}</Text>
        <Text style={styles.infoText}><Text style={styles.label}>Location: </Text>{donor.address}</Text>
        <Text style={styles.infoText}><Text style={styles.label}>Blood Type: </Text>{donor.bloodType}</Text>
        <Text style={styles.infoText}><Text style={styles.label}>Last Donation Date: </Text>{donor.lastDonationDate}</Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Availability: </Text>
          <Text style={[styles.availableText, { color: donor.availability === 'Available' ? 'green' : 'red' }]}>
            {donor.availability}
          </Text>
        </Text>
      </View>

      {/* Add Request Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => router.push({
          pathname: "options/RecipientDetails",
          params: { donorId: donor.id }
        })}
      >
        <Text style={styles.buttonText}>Add Request</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.HEADER,
    height: 250,  
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
    backgroundColor: '#C62828',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  infoContainer: {
    backgroundColor: '#fff',  
    paddingHorizontal: 20,
    paddingTop: 20,  
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  availableText: {
    color: 'green',
  },
  addButton: {
    backgroundColor: '#C62828',
    padding: 15,
    marginVertical: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#bdbdbd',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#424242',
    fontSize: 16,
  },
});

export default ViewPermanentDonor;

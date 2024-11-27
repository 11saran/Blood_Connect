import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";

export default function PermanentDonorInfo() {
    const [donationScheduleStart, setDonationWindowStart] = useState(null);
    const [donationScheduleEnd, setDonationWindowEnd] = useState(null);

    const [isAssigned, setIsAssigned] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPermanentDonorInfo = async () => {
            const userEmail = await AsyncStorage.getItem("userEmail");
            if (!userEmail) return;

            try {
                console.log(userEmail);

                const response = await fetch("http://localhost:5000/api-donations/donations");
                const recipientData = await response.json();
                console.log(recipientData);

                // Check if the user is assigned to a recipient
                const recipient = recipientData.find(
                    (rec) => rec.donor_email === userEmail
                );

                if (recipient) {
                    // Assuming recipient contains donation_window_start and donation_window_end
                    setDonationWindowStart(recipient.donation_window_start);
                    setDonationWindowEnd(recipient.donation_window_end);
                    setIsAssigned(true);
                }
            } catch (error) {
                console.error("Error fetching recipient data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPermanentDonorInfo();
        navigation.setOptions({ headerShown: false });
    }, []);


    // Format date to a human-readable format if it exists
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Permanent Donor Information</Text>

            {isAssigned  ? (
                <View style={styles.card}>
                    <Text style={styles.message}>
                        Congratulations! You have been assigned to a recipient in need. Thank you for your generous support!
                    </Text>
                    <MaterialIcons name="calendar-today" size={24} color={Colors.RED1} />
                    <Text style={styles.subtitle}>We will contact you</Text>
                    {/* <Text style={styles.value}>{formatDate(donationScheduleStart)} to {formatDate(donationScheduleEnd)}</Text> */}
                </View>

            ) : (
                <View style={styles.card}>
                    <Image
                        source={require("./../../assets/images/Registration.png")}
                        style={styles.icon}
                    />
                    <Text style={styles.message}>
                        Congratulations! You are a permanent donor now. We’ll notify you
                        when we assign a matching recipient.
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.BLACK,
        marginBottom: 20,
    },
    card: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.WHITE1,
        borderColor: Colors.RED1,
        borderWidth: 1,
        alignItems: "center",
    },
    subtitle: {
        fontSize: 18,
        color: Colors.BLACK,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",


    },
    value: {
        fontSize: 16,
        color: Colors.DARK,
        
    },
    message: {
        fontSize: 16,
        color: Colors.DARK,
        textAlign: "center",
        marginBottom:10,
    },
    icon: {
        width: 250,
        height: 250,
        marginBottom: 10,
    },
    loadingText: {
        fontSize: 18,
        textAlign: "center",
        color: Colors.GRAY,
    },
});

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AsyncStorage from '@react-native-async-storage/async-storage';




const ManageRecipient = () => {
    const [recipients, setRecipients] = useState([]);
    const router = useRouter();
    const navigation = useNavigation(); // useNavigation hook to access navigation


    // Fetch recipients when the component loads
    useEffect(() => {
        const fetchRecipients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api-recipients/recipients');
                setRecipients(response.data);
            } catch (error) {
                console.error("Error fetching recipients:", error);
            }
        };
        fetchRecipients();
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // Placeholder functions for each action button
    const handleAssign = async (id) => {
        try {
            await AsyncStorage.setItem('recipientId', id);
            router.push('/Adminoptions/AddDonorToRecipient');
            console.log("Assign clicked for recipient:", id);
        } catch (error) {
            console.error("Error saving recipient ID to storage:", error);
        }
    };

    const handleEdit = async (id) => {

        await AsyncStorage.setItem('recipientId', id);
        router.push('/Adminoptions/Editrecipient');
        console.log("Edit clicked for recipient:", id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api-recipients/delete-recipient/${id}`);

            if (response.status === 200) {
                toast.success("Recipient deleted successfully")

                console.log(`Recipient with ID ${id} deleted successfully`);
                // Update the state to remove the deleted recipient from the list
                setRecipients(recipients.filter((recipient) => recipient.id !== id));
            } else {
                toast.error("Failed to delete recipient. Please try again.");

                console.error(`Failed to delete recipient with ID ${id}`);
            }
        } catch (error) {
            toast.error("Failed to add Recipient. Please try again.");

            console.error("Error deleting recipient:", error);
            alert("Failed to delete recipient. Please try again.");
        }
    };


    const handleAddRecipient = () => {
        router.push("Adminoptions/Addrecipient");

        console.log("Add recipient button clicked");
    };


    const handleBack = () => {
        router.push("(tabs)Admin/Home");

        // console.log("Add recipient button clicked");
    };

    return (
        <div style={styles.container}>
        <ToastContainer />
        
        <div style={styles.header}>
            <button style={styles.backButton} onClick={handleBack}>
                <Ionicons name="arrow-back-outline" color="white" size="20"></Ionicons>
            </button>
            <button style={styles.addButton} onClick={handleAddRecipient}>
                Add Recipient
            </button>
        </div>
    
        <div style={styles.cardContainer}>
            {recipients.map((recipient) => (
                <div key={recipient.id} style={styles.card}>
                    <div style={styles.recipientInfo}>
                        <h3 style={styles.recipientName}>{recipient.first_name} {recipient.last_name}</h3>
                        <p>Blood Type: {recipient.blood_type}</p>
                    </div>
                    <div style={styles.buttonGroup}>
                        <button style={styles.iconButton} onClick={() => handleAssign(recipient.id)}>
                            <Ionicons name="person-add-outline" color="white" size="20"></Ionicons>
                        </button>
                        <button style={styles.iconButton} onClick={() => handleEdit(recipient.id)}>
                            <Ionicons name="create-outline" color="white" size="20"></Ionicons>
                        </button>
                        <button style={styles.iconButton} onClick={() => handleDelete(recipient.id)}>
                            <Ionicons name="close-circle-outline" color="white" size="20"></Ionicons>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

// Styling
const styles = {
    container: {
        padding: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    backButton: {
        backgroundColor: '#db0304',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '10px',
    },
    addButton: {
        padding: '10px',
        fontSize: '16px',
        backgroundColor: '#db0304',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        maxHeight: '85vh', // Adds scrolling if needed
        overflowY: 'auto',
        padding: '10px',
    },
    card: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
    },
    recipientInfo: {
        flex: 1,
        textAlign: 'left',
    },
    recipientName: {
        fontSize: '18px',
        color: '#000000',
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
    },
    iconButton: {
        backgroundColor: '#db0304',
        border: 'none',
        padding: '8px',
        borderRadius: '50%',
        cursor: 'pointer',
    },
};

export default ManageRecipient;

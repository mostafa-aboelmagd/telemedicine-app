import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Text, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ensure this is imported if you're using Feather icons
import CustomScroll from '../../../components/scroll';
import CustomTitle from '../../../components/title';
import Footer from '../../../components/footer';
import Custombutton from '../../../components/button';
import { useRoute } from '@react-navigation/native'
import { NEXT_PUBLIC_SERVER_NAME } from '@env';
import { getToken } from '../../../components/getToken';

const { height } = Dimensions.get('window'); // Get the window height

const FurtherDetails = ({ navigation }) => {
    const route = useRoute()
    const { report, diagnosis, medications, appointment_id } = route.params
    const [operations, setOperations] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleFollowUpResponse = async (response) => {
        setModalVisible(false); // Close the modal
        if (response === 'yes') {
            console.log('User selected YES for follow-up appointment');
            await handleSubmit()
            // You can add navigation or other logic for follow-up appointment here
            // e.g., navigation.navigate('FollowUpAppointmentScreen');
        } else {
            navigation.navigate('appointment')
        }
    };
    const clearOperationsInput = () => {
        setOperations(''); // Clear the operations input
    };
    const [specialityReferral, setSpecialityReferral] = useState('');

    const clearSpecialityReferral = () => {
        setSpecialityReferral(''); // Clear the operations input
    };
    const [specialityReferralNotes, setSpecialityReferralNotes] = useState('');

    const clearSpecialityReferralNotes = () => {
        setSpecialityReferralNotes(''); // Clear the operations input
    };
    const handleSubmit = async () => {
        try {
            const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/AppointmentResults/${appointment_id}/submitresults`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getToken()}`,
                },
                body: JSON.stringify(toBeSent),

            });
            console.log('toBeSent', toBeSent);
            // console.log(response);

            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Handle the successful response (e.g., show a message or navigate to another screen)
            console.log(data);
        } catch (error) {
            console.error('Error submitting appointment results:', error);
        }
    };
    const toBeSent = {
        report,
        diagnosis,
        medications,
        operations,
        specialityReferral,
        specialityReferralNotes,
        appointment_id
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomScroll>
                <View style={styles.container}>
                    <View style={styles.titleRow}>
                        <CustomTitle style={styles.textColumn}>Complaint</CustomTitle>
                    </View>
                    <Text style={styles.textProp}>lorem lorem</Text>
                    <View style={styles.titleRow}>
                        <CustomTitle style={styles.textColumn}>
                            Operations
                        </CustomTitle>
                    </View>
                    <View style={styles.textFieldRow}>
                        <TextInput
                            style={styles.textFieldColumn}
                            multiline={true}
                            value={operations}
                            onChangeText={(text) => setOperations(text)}
                            placeholder='Write the operations required here'
                        />
                        {operations.length > 0 && (
                            <TouchableOpacity onPress={clearOperationsInput} style={styles.clearButton}>
                                <Feather name="x-circle" size={24} color="gray" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.titleRow}>
                        <CustomTitle style={styles.textColumn}>
                            Speciality Referral
                        </CustomTitle>
                    </View>
                    <View style={styles.textFieldRow}>
                        <TextInput
                            style={styles.textFieldColumn}
                            multiline={true}
                            value={specialityReferral}
                            onChangeText={(text) => setSpecialityReferral(text)}
                            placeholder='Write the speciality referral here'
                        />
                        {specialityReferral.length > 0 && (
                            <TouchableOpacity onPress={clearSpecialityReferral} style={styles.clearButton}>
                                <Feather name="x-circle" size={24} color="gray" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.titleRow}>
                        <CustomTitle style={styles.textColumn}>
                            Speciality Referral Notes
                        </CustomTitle>
                    </View>
                    <View style={styles.textFieldRow}>
                        <TextInput
                            style={styles.textFieldColumn}
                            multiline={true}
                            value={specialityReferralNotes}
                            onChangeText={(text) => setSpecialityReferralNotes(text)}
                            placeholder='Write the speciality referral Notes here'
                        />
                        {specialityReferralNotes.length > 0 && (
                            <TouchableOpacity onPress={clearSpecialityReferralNotes} style={styles.clearButton}>
                                <Feather name="x-circle" size={24} color="gray" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Custombutton onPress={() => setModalVisible(true)}>
                        Submit
                    </Custombutton>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)} // Allows closing the modal on hardware back press (Android)
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalText}>Do you want a follow-up appointment?</Text>
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={[styles.modalButton, { backgroundColor: 'green' }]}
                                        onPress={() => handleFollowUpResponse('yes')}
                                    >
                                        <Text style={styles.buttonText}>YES</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.modalButton, { backgroundColor: 'red' }]}
                                        onPress={() => handleFollowUpResponse('no')}
                                    >
                                        <Text style={styles.buttonText}>NO</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </CustomScroll>
            <Footer navigation={navigation}></Footer>
        </SafeAreaView>
    );
};

export default FurtherDetails;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    container: {
        backgroundColor: 'lightgrey',
        flexGrow: 1,
        height: height
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    clearButton: {
        margin: '3%',
    },
    textColumn: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 30,
        marginTop: '10%'
    },
    textFieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textFieldColumn: {
        flex: 2,
        textAlignVertical: 'top',
        backgroundColor: 'white',
        height: '100%',
        margin: '7%',
        borderRadius: 20,
        textAlign: 'left',
        padding: '5%',
    },
    titleProp: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
        fontSize: 30
    },
    textProp: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '2%'
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
});

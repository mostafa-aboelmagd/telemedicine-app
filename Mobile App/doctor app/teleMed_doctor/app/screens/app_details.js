import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import { detials } from '../test/data';
import CustomTitle from '../components/title';
import { NEXT_PUBLIC_SERVER_NAME } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (token !== null) {
            // Token retrieved
            return token;
        }
    } catch (e) {
        // error reading value
        console.log('Error retrieving token', e);
    }
    return null;
};

const fetchAppointmentDetails = async () => {
    try {
        const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/appointmentDetails/2`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getToken()}`,

            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching doctor info:', error);
    }
};

export default function App_Details({ navigation, route }) {
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const appointmentId = route.params?.appointmentId; // Get appointment ID from navigation params

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Set loading state to true
                const response = await fetchAppointmentDetails(appointmentId); // Call API with appointment ID
                setAppointmentDetails(response.appointment); // Extract appointment data
                setIsLoading(false); // Set loading state to false after successful fetch
            } catch (error) {
                console.error('Error fetching appointment details:', error);
            }
        };

        fetchData();
    }, [appointmentId]); // Re-run useEffect when appointment ID changes

    const documents = () => {
        navigation.navigate('documents');
    };

    const renderDetails = () => {
        if (isLoading) {
            return <Text>Loading...</Text>;
        }

        const {
            patient_first_name,
            patient_last_name,
            doctor_first_name,
            doctor_last_name,
            doctor_availability_day_hour,
            doctor_specialization,
            appointment_complaint,
            appointmentResults,
            treatmentPlan,
            medications,
        } = appointmentDetails;

        const date = new Date(doctor_availability_day_hour); // Convert timestamp to date object

        return (
            <ScrollView>
                <CustomTitle>Appointment details</CustomTitle>
                <CustomTitle titleStyle={{ color: 'black', fontSize: 24 }}>
                    Patient name: {patient_first_name} {patient_last_name}
                </CustomTitle>
                <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
                    Date: {date.toLocaleDateString()}
                </CustomTitle>
                <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
                    Doctor: {doctor_first_name} {doctor_last_name}
                </CustomTitle>
                <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
                    Speciality: {doctor_specialization}
                </CustomTitle>
                <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
                    Complain: {appointment_complaint}
                </CustomTitle>

                {/* Render diagnosis, report, medication sections using appointmentResults and medications */}
                {appointmentResults.map((result) => (
                    <View key={result.appointment_diagnosis}>
                        <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
                            Diagnosis: {result.appointment_diagnosis}
                        </CustomTitle>
                        <Text style={styles.text}>Report : {result.appointment_report}</Text>
                    </View>
                ))}

                <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
                    Treatment Plan:
                </CustomTitle>
                    <View>
                        <Text style={styles.text}>
                            * Operations: {treatmentPlan.treatment_plan_operations}
                        </Text>
                        <Text style={styles.text}>
                            * Referral: {treatmentPlan.treatment_plan_speciality_referral}
                        </Text>
                        <Text style={styles.text}>
                            * Notes: {treatmentPlan.treatment_plan_referral_notes}
                        </Text>
                    </View>
                <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
                    Medication:
                </CustomTitle>
                {medications.map((medication) => (
                    <View key={medication.medication_id}>
                        <Text style={styles.text}>
                            * {medication.medication_name}
                        </Text>
                        <Text style={styles.text}>
                            -- {medication.medication_dosage}
                        </Text>
                        <Text style={styles.text}>
                            -- Start Date : {medication.medication_start_date.split('T')[0]}
                        </Text>
                        <Text style={styles.text}>
                            -- End Date : {medication.medication_end_date.split('T')[0]}
                        </Text>
                        <Text style={styles.text}>
                            -- Note : {medication.medication_note}
                        </Text>
                    </View>
                ))}
                <CustomTitle titleStyle={{ color: 'black', fontSize: 20, alignItems: 'center' }}>
                    Documents:
                </CustomTitle>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.text}>
                        {/* Add logic to display checks data (treatmentPlan.treatment_plan_operations?) */}
                    </Text>
                    <TouchableOpacity onPress={documents}>
                        <Text style={styles.button}>View</Text>
                    </TouchableOpacity>
                </View>

                {/* <CustomTitle titleStyle={{ color: 'black', fontSize: 20, alignItems: 'center' }}>
                    Operations:
                </CustomTitle> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.text}>
                        {/* Add logic to display operations data (treatmentPlan.treatment_plan_operations?) */}
                    </Text>
                    {/* <TouchableOpacity>
            <Text style={styles.button}>View</Text>
          </TouchableOpacity> */}
                </View>
            </ScrollView>
        );
    };

    return (
        <SafeArea>
            <View style={styles.container}>
                {renderDetails()}
            </View>
        </SafeArea>
    );
};


// export default function App_Detials ({navigation}) {

//     const documents = () => {
//         navigation.navigate('documents')
//     }

// return (
//     <SafeArea>
//       <View style={styles.container}>
//         <CustomTitle>Appointment details</CustomTitle>
//         <ScrollView>
//             <CustomTitle titleStyle={{ color: 'black', fontSize: 24 }}>Patient name</CustomTitle>
//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
//                 Date:
//             </CustomTitle>
//             <Text style={styles.text}>{detials.date}</Text>

//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
//                 Speciality:
//             </CustomTitle>
//             <Text style={styles.text}>{detials.speciality}</Text>

//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
//                 Complain:
//             </CustomTitle>
//             <Text style={styles.text}>{detials.complain}</Text>

//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
//                 Diagnosis:
//             </CustomTitle>
//             <Text style={styles.text}>{detials.diagnosis}</Text>

//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
//                 Report:
//             </CustomTitle>
//             <Text style={styles.text}>{detials.report}</Text>

//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
//                 Medication:
//             </CustomTitle>
//             <Text style={styles.text}>{detials.medication}</Text>

//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20 }}>
//                 Checks:
//             </CustomTitle>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                 <Text style={styles.text}>{detials.checks}</Text>
//                 <TouchableOpacity onPress={documents}>
//                     <Text style={styles.button}>View</Text>
//                 </TouchableOpacity>
//             </View>

//             <CustomTitle titleStyle={{ color: 'black', fontSize: 20, alignItems: 'center' }}>
//                 Operations:
//             </CustomTitle>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Text style={styles.text}>{detials.operations}</Text>
//                 {/* <TouchableOpacity>
//                     <Text style={styles.button}>View</Text>
//                 </TouchableOpacity> */}
//             </View>
//         </ScrollView>
//       </View>
//     </SafeArea>
//   );
// };

const styles = StyleSheet.create({
    container: {
        padding: '5%',
        paddingTop: '10%',
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 15,
        marginBottom: 20,
    },
    button: {
        padding: 5,
        borderRadius: 15,
        fontSize: 15,
        width: 70,
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#1565c0'
    }
})

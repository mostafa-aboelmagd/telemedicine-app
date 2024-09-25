import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, StyleSheet, Dimensions, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Ensure this is imported if you're using Feather icons
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';
import Footer from '../components/footer';
import Custombutton from '../components/button';

const { height } = Dimensions.get('window'); // Get the window height

const FurtherDetails = ({ navigation }) => {
    const [operations, setOperations] = useState('');

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
                    <Custombutton>
                        Submit
                    </Custombutton>
                </View>
            </CustomScroll>
            <Footer navigation={navigation}></Footer>
        </SafeAreaView>
    );
};

export default FurtherDetails;

const styles = StyleSheet.create({
    safeArea:{
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
});

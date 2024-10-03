import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import Custombutton from '../../components/button'; // Assuming you're using a custom button component
import { Feather } from '@expo/vector-icons'; // For clear input icon
import CustomScroll from '../../components/scroll';
import Footer from '../../components/footer';
import { NEXT_PUBLIC_SERVER_NAME } from '@env';
import { getToken } from '../../components/getToken';

const { height } = Dimensions.get('window'); // Get window height for responsive design

const ChangePassword = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // Function to handle the form submission
    const handleSubmit = async () => {
        // Form validation
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            Alert.alert('Error', 'All fields must be filled.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            Alert.alert('Error', 'New passwords do not match.');
            return;
        }

        const requestBody = {
            oldPassword: oldPassword,
            password: newPassword,
            confirmPassword: confirmNewPassword,
        };

        try {
            const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/edit/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getToken()}`, // Assuming you have a function to get the token
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Failed to change password.');
                return;
            }

            const data = await response.json();
            Alert.alert('Success', 'Password changed successfully!');
            console.log(data); // Optional: Handle the response data as needed

            navigation.navigate('profile'); // Navigate back after success
        } catch (error) {
            console.error('Error changing password:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        }
    };


    const toggleOldPasswordVisibility = () => setIsOldPasswordVisible(!isOldPasswordVisible);
    const toggleNewPasswordVisibility = () => setIsNewPasswordVisible(!isNewPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomScroll>

                <View style={styles.container}>
                    {/* Old Password Input */}
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Old Password</Text>
                        <View style={styles.textFieldRow}>
                            <TextInput
                                style={styles.textFieldColumn}
                                secureTextEntry={!isOldPasswordVisible}  // Toggle visibility
                                value={oldPassword}
                                onChangeText={(text) => setOldPassword(text)}
                                placeholder='Enter old password'
                            />
                            <TouchableOpacity onPress={toggleOldPasswordVisibility} style={styles.visibilityButton}>
                                <Feather name={isOldPasswordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                            {oldPassword.length > 0 && (
                                <TouchableOpacity onPress={() => setOldPassword('')} style={styles.clearButton}>
                                    <Feather name="x-circle" size={24} color="gray" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* New Password Input */}
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>New Password</Text>
                        <View style={styles.textFieldRow}>
                            <TextInput
                                style={styles.textFieldColumn}
                                secureTextEntry={!isNewPasswordVisible}  // Toggle visibility
                                value={newPassword}
                                onChangeText={(text) => setNewPassword(text)}
                                placeholder='Enter new password'
                            />
                            <TouchableOpacity onPress={toggleNewPasswordVisibility} style={styles.visibilityButton}>
                                <Feather name={isNewPasswordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                            {newPassword.length > 0 && (
                                <TouchableOpacity onPress={() => setNewPassword('')} style={styles.clearButton}>
                                    <Feather name="x-circle" size={24} color="gray" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Confirm New Password Input */}
                    <View style={styles.inputRow}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <View style={styles.textFieldRow}>
                            <TextInput
                                style={styles.textFieldColumn}
                                secureTextEntry={!isConfirmPasswordVisible}  // Toggle visibility
                                value={confirmNewPassword}
                                onChangeText={(text) => setConfirmNewPassword(text)}
                                placeholder='Rewrite new password'
                            />
                            <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.visibilityButton}>
                                <Feather name={isConfirmPasswordVisible ? "eye" : "eye-off"} size={24} color="gray" />
                            </TouchableOpacity>
                            {confirmNewPassword.length > 0 && (
                                <TouchableOpacity onPress={() => setConfirmNewPassword('')} style={styles.clearButton}>
                                    <Feather name="x-circle" size={24} color="gray" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Submit Button */}
                    <Custombutton onPress={handleSubmit}>
                        Change Password
                    </Custombutton>
                </View>
            </CustomScroll>
            <Footer navigation={navigation} />
        </SafeAreaView>
    );
}


export default ChangePassword;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        backgroundColor: 'lightgrey',
        height: height,
        justifyContent: 'center', // Center content vertically
        paddingHorizontal: 20, // Padding to give space from the edges
    },
    inputRow: {
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textFieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    textFieldColumn: {
        flex: 1,
        fontSize: 16,
        padding: 5,
    },
    clearButton: {
        marginLeft: 10,
    },
    visibilityButton: {
        marginLeft: 10,
    },
});
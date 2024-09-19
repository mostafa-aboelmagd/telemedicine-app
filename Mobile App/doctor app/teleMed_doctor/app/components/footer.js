import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Footer({ navigation }){

    const home = () => {
        navigation.navigate('home page');
    }

    const appointment = () => {
        navigation.navigate('appointment');
    }

    const profile = () => {
        navigation.navigate('profile');
    }

    const request = () => {
        navigation.navigate('request');
    }

    const support = () => {
        navigation.navigate('support');
    }

    return (
        <View style={styles.footer}>

            <View style={styles.container}>
                <Pressable onPress={home}>
                    <MaterialIcons name="home" size={30} style={styles.icon} />
                </Pressable>
                <Text style={styles.text}>Home Page</Text>
            </View>

            <View style={styles.container}>
                <Pressable onPress={appointment}>
                    <AntDesign name="calendar" size={30} color="black" style={styles.icon}/>
                </Pressable>
                <Text style={styles.text}>Appointments</Text>
            </View>

            <View style={styles.container}>
                <Pressable onPress={profile}>
                    <Ionicons name="person" size={30} style={styles.icon} />
                </Pressable>
                <Text style={styles.text}>Profile</Text>
            </View>

            <View style={styles.container}>
                <Pressable onPress={request}>
                    <MaterialCommunityIcons name="email-receive-outline" size={30} style={styles.icon}/>
                </Pressable>
                <Text style={styles.text}>Requests</Text>
            </View>

            <View style={styles.container}>
                <Pressable onPress={support}>
                    <AntDesign name="customerservice" size={30} style={styles.icon} />
                </Pressable>
                <Text style={styles.text}>Support</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },

    icon: {
        color: "#5b5b5b", 
    },

    text: {
        fontSize: 10,
        fontWeight: 'bold',
    },

    container: {
        alignItems: 'center',
        marginRight: '7%'
    }
});


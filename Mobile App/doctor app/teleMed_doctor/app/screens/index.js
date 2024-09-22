import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Custombutton from '../components/button.js';
import SafeArea from '../components/safeArea.js';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Index({ navigation }) {

  const sign = () => {
    navigation.navigate('sign in');
  }

  const register = () => {
    navigation.navigate('register')
  }

  const support = () => {
    navigation.navigate('visitor support');
  }

  return (
    <SafeArea>
      <View style={styles.container}>
        <Text style={[styles.title, {marginTop: '10%'}]}>Welcome to</Text>
        <Text style={styles.title}>Telemedicine</Text>
        <Text style={styles.title}>Pilot</Text>
        <View style={styles.center}>

        <Custombutton>
          Explore our services
        </Custombutton>
        <Custombutton onPress={register}>
          Register now
        </Custombutton>
        <Custombutton onPress={sign}>
          Sign in
        </Custombutton>

        </View>
        <View style={{alignItems:'center', marginTop: '10%'}}>
          <Pressable onPress={support}>
            <AntDesign name="customerservice" size={40} />
          </Pressable>
          <Text style={{fontWeight:'bold'}}>
              Support
          </Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: '10%'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1565c0',
  },
  center: {
    alignItems: 'center',
    marginTop: '50%'
  }
});

import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Custombutton from '../components/button';
import { StatusBar } from 'expo-status-bar';
import SafeArea from '../components/safeArea.js';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomTitle from '../components/title.js';

export default function Login({ navigation }) {

    const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const signIn = () => {
    if (email && password) {
      navigation.navigate('home page');
    } else {
      Alert.alert('You must enter your email and password!')
    }
  }

  const register = () => {
    navigation.navigate('register');
  }

  const vsupport = () => {
    navigation.navigate('visitor support')
  }

  return (
    <SafeArea>
    <View style={styles.container}>
      <View style={styles.container2}>
        <CustomTitle>
          Sign in
        </CustomTitle>
        <View style={[styles.container3, {marginTop: '50%'}]}>  
          <TextInput
            placeholder='example@gmai.com'
            keyboardType='email-address'
            inputType='email'
            value={email}
            onChange={setEmail}
            style={styles.input} 
          />
        </View>

        <View style={styles.container3}>
          <TextInput 
            placeholder='Your Password' 
            secureTextEntry={!showPassword}
            value={password}
            onChange={setPassword}
            style={styles.input} 
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          >
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            size={20}
            color="gray"
          />
          </TouchableOpacity>
        </View>
        <View  style={styles.row}>
          <Text style={styles.text3}>
            Don't have an account?
          </Text> 
          <Pressable style={styles.link} onPress={register}>
            <Text style={styles.register}> Register here </Text>
          </Pressable>
        </View>

        <View style={styles.container4}>
          <Custombutton
            onPress={signIn}>
            <Text>Sign in</Text>
          </Custombutton>
        </View>
      </View>
      <TouchableOpacity onPress={vsupport}
        style={{alignItems:'center', marginTop: '10%'}}>
          <AntDesign name="customerservice" size={40} color="black" />
          <Text style={{fontWeight:'bold'}}>
              Support
          </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Horizontal center
    backgroundColor: '#f0f0f0', // Background color for visibility
  },

  container1: {
    marginTop: '5%',
    alignItems:'center'
  },

  container2: {
    marginTop: '20%',
  },

  row: {
    flexDirection: 'row',
  },

  container3: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    margin: 5,
    alignItems: 'center',
    width: 300,
    marginTop: '5%',
    backgroundColor: '#fff'
  },

  container4: {
    marginTop: "25%",
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: 250,
    height: 40,
    padding: 10,
  },

  icon: {
    flexDirection: 'row',
    padding: 5,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:17,
    // fontFamily: 'PlayfairDisplay-Regular',

  },

  link: {
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    marginBottom: 7,
  },

  text3: {
    marginBottom: 7,
  },

  register:{
    color: 'blue',
  }
});
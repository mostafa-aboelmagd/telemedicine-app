import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, Pressable } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import SafeArea from '../components/safeArea';
import Custombutton from '../components/button';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomTitle from '../components/title';

export default function Register({ navigation }){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conf, setConf] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [speciality, setSpeciality] = useState('');

    const home = () => {
        if (name && email && password && conf) {
          navigation.navigate('home page');
        } else {
          Alert.alert('All fields are required!')
        }
      }

    const login = () => {
        navigation.navigate('sign in')
    }

    const vsupport = () => {
        navigation.navigate('visitor support')
    }

    return (
        <SafeArea>
        <View style={styles.container}>
            
            <View>
                <CustomTitle>
                    Register
                </CustomTitle>
                
                <View style={[styles.container3, {marginTop: '20%'}]}>  
                    <TextInput
                    placeholder='Full Name'
                    value={name}
                    onChange={setName}
                    style={styles.input} 
                    />
                </View>

                <View style={styles.container3}>  
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
                </View>

                <View style={styles.container3}>
                    <TextInput 
                    placeholder='Confirm your Password' 
                    secureTextEntry={!showPassword}
                    value={conf}
                    onChange={setConf}
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

                <View style={styles.container3}>  
                    <TextInput
                    placeholder='Speciality'
                    value={speciality}
                    onChange={setSpeciality}
                    style={styles.input} 
                    />
                </View>

                <View  style={styles.row}>
                    <Text style={styles.text3}>
                    Already have an account?
                    </Text> 
                    <Pressable style={styles.link} onPress={login}>
                        <Text style={styles.sign}> Sign in </Text>
                    </Pressable>
                </View>
            </View>

            <View style={{width: '90%'}}>
                <Custombutton
                onPress={home}>
                    <Text>Sign up</Text>
                </Custombutton>
            </View>
            <TouchableOpacity onPress={vsupport}
            style={{alignItems:'center', marginTop: '10%'}}>
                <AntDesign name="customerservice" size={40} color="black" />
                <Text style={{fontWeight:'bold'}}>
                    Support
                </Text>
            </TouchableOpacity>
        </View>
        </SafeArea>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', // Horizontal center
      backgroundColor: '#f0f0f0',
    },

    container1: {
        marginTop: '5%',
        alignItems: 'center', // Horizontal center
    },
    
    container3: {
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        margin: 10,
        backgroundColor: 'white',
    },

    row: {
        flexDirection: 'row',
    },

    text1: {
        color: 'darkblue',
        fontSize: 30, // Added font size for better visibility
        marginTop: 10, // Space between image and text
    },

    text2: {
        color: '#1565c0',
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
        marginTop: '20%'
    },

    input: {
        width: 270,
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
        fontSize: 17,    
    },
    
    link: {
        borderBottomColor: 'blue',
        borderBottomWidth: 1,
        marginBottom: 7,
    },

    text3: {
        marginBottom: 7,
    },

    sign:{
        color: 'blue',
    }
    
})
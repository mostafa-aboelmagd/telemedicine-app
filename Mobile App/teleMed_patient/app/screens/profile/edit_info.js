import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import SafeArea from '../../components/safeArea';
import CustomTitle from '../../components/title';
import { getToken } from '../../components/getToken';
import { NEXT_PUBLIC_SERVER_NAME } from '@env'
import DateTimePicker from "@react-native-community/datetimepicker";
// import { PullToRefreshView } from '@react-native-community/pull-to-refresh';

export default function EditInfo ({ navigation, route }) {

    const { info } = route.params
    const [message, setMessage] = useState(null)

    const [newInfo, setNewInfo] = useState({
        'firstName': info.firstName,
        'lastName': info.lastName,
        'gender': info.gender,
        'phone': info.phone,
        'birthDate': info.birthDate,
        'residenceCountry': info.residenceCountry,
        'sixtyMinPrice': info.sixtyMinPrice,
        'thirtyMinPrice': info.thirtyMinPrice,
        'specialization': info.specialization,
    })
    const [newlanguages, setNewlanguages] = useState(info.languages)

    // Selecting date constants
    const [birth_date, setBirthDate] = useState(false);
    const [currentPicker, setCurrentPicker] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const showDatePicker = (pickerType) => {
        setCurrentPicker(pickerType);
    
        setShowPicker(true);
        setIsPickerVisible(Platform.OS === "android");
      };

      const onBirthDateChange = (event, selectedDate) => {
        if (event.type === "set" && selectedDate) {
          setBirthDate(selectedDate);
          setNewInfo({ ...newInfo, birthDate: selectedDate })
        }
        // Handle date picker visibility based on platform (Android or iOS)
    
        if (Platform.OS === "android") {
          setShowPicker(false);
          setIsPickerVisible(false);
        } else {
          setShowPicker(false);
        }
        setCurrentPicker(null);
    };
    
    // useEffect(() => {
    //     console.log(newInfo.birthDate)
    //   }, [newInfo.birthDate]);    

    const setInfo = async () => {
        console.log(newInfo)
        try {
          const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/edit/info`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${await getToken()}`,
            },
            body: JSON.stringify({
              ...newInfo,
              'languages': newlanguages
            })
          });
      
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Something went wrong: ${errorMessage}`);
          }
      
          const responseData = await response.json();
          console.log(responseData.doctor)
          const message = responseData.message
          setMessage(message)
          navigation.pop() // Assuming you want to navigate back after success
        } catch (error) {
          console.error('Could not set new data:', error);
        }
      };

    return (
        <SafeArea>
        <View style={{ padding: 10, paddingTop: 20 }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CustomTitle>
                    Edit information
                </CustomTitle>
                <TouchableOpacity onPress={setInfo}>
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{marginBottom: 50}}>
                <Text style={[styles.title]}>First name</Text>                
                <View style={[styles.container3]}>  
                    <TextInput
                    placeholder='First Name'
                    value={newInfo.firstName}
                    onChangeText={value => setNewInfo({ ...newInfo, firstName: value })}
                    style={styles.input}
                    />
                </View>

                <Text style={styles.title}>Last Name</Text> 
                <View style={styles.container3}> 
                    <TextInput
                    placeholder='Last Name'
                    value={newInfo.lastName}
                    onChangeText={value => setNewInfo({ ...newInfo, lastName: value })}
                    style={styles.input} 
                    />
                </View>

                <Text style={styles.title}>Phone Number</Text>                
                <View style={styles.container3}>  
                    <TextInput
                    placeholder='Phone'
                    value={newInfo.phone}
                    onChangeText={value => setNewInfo({ ...newInfo, phone: value })}
                    style={styles.input} 
                    />
                </View>

                <Text style={styles.title}>Birth Date</Text>  
                <View
                style={[
                    styles.container3,
                    { flexDirection: "row", paddingHorizontal: 5 },
                ]}
                >
                <TouchableOpacity onPress={() => showDatePicker("start")}>
                    <Text style={[styles.container3, {paddingHorizontal: 5}]}>
                    {birth_date
                        ? new Date(birth_date).toDateString()
                        : 'Birth Date'}
                    </Text>
                </TouchableOpacity>
                </View>
                
                <Text style={styles.title}>Residence Country</Text>                
                <View style={styles.container3}>  
                <TextInput
                    placeholder='Residence Country'
                    value={newInfo.residenceCountry}
                    onChangeText={value => setNewInfo({ ...newInfo, residenceCountry : value })}
                    style={styles.input}
                    />
                </View>
                
                <Text style={styles.title}>Specialization</Text>                
                <View style={styles.container3}>  
                    <TextInput
                    placeholder='Specialization'
                    value={newInfo.specialization}
                    onChangeText={value => setNewInfo({ ...newInfo, specialization : value })}
                    style={styles.input} 
                    />
                </View>

                <Text style={styles.title}>Languages (Space Between Each Language)</Text>                
                <View style={styles.container3}>  
                    <TextInput
                    placeholder="Languages (comma-separated)"
                    value={newlanguages.join(' ')} // Display languages as comma-separated string
                    onChangeText={text => setNewlanguages(text.split(' ').map(lang => lang.trim()))}
                    style={styles.input}
                    />
                </View>

                <Text style={styles.title}>30 Minutes Price</Text>                
                <View style={styles.container3}>  
                    <TextInput
                    placeholder='30 Minutes Price'
                    value={String(newInfo.thirtyMinPrice)}
                    keyboardType='numeric'
                    onChangeText={value => setNewInfo({ ...newInfo, thirtyMinPrice: String(value) })}
                    style={styles.input}
                    />
                </View>

                <Text style={styles.title}>60 Minutes Price</Text>                
                <View style={styles.container3}>  
                    <TextInput
                    placeholder='60 Minutes Price'
                    value={String(newInfo.sixtyMinPrice)}
                    keyboardType='numeric'
                    onChangeText={value => setNewInfo({ ...newInfo, sixtyMinPrice : String(value) })}
                    style={styles.input} 
                    />
                </View>
                {(showPicker || isPickerVisible) && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={onBirthDateChange}
                />
                )}
                </ScrollView>

        </View>
        </SafeArea>
    );
};

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

    text2: {
        color: '#1565c0',
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
        marginTop: '20%'
    },

    input: {
        width: 300,
        height: 40,
        padding: 10, 
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10
    },
    button: {
        margin: 10,
        padding: 5,
        borderRadius: 10,
        fontSize: 15,
        textAlign: 'center',
        color: '#fff',
        borderColor: 'darkgray',
        backgroundColor: '#1565c0',
    },

})

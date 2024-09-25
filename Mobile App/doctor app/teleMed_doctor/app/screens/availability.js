import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import { doctorAv } from '../test/data';
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';
import { getToken } from '../components/getToken';
import { NEXT_PUBLIC_SERVER_NAME} from '@env';

export default function Availability ({ navigation }) {

    const slots = Object.entries(doctorAv)
    const [isOnline, setIsonline] = useState('L')
    const [selectedDay, setSelectedDay] = useState('')
    const online = () => {
        isOnline == 'L' ? setIsonline('S')
        : setIsonline('L')
    }

    const [added, setAdded] = useState([])
    const [editedslot, setEditedslot] = useState('')

    const slotSrting = (day, hour, state) => {
        setEditedslot(day + '_' + hour + '_' + state)
        setAdded((prevAdded) => [...prevAdded, editedslot]);
        console.log(added)
    }

    // add or remove slots switch
    const [add, setAdd] = useState(true); 
    const toggleSwitch = () => setAdd((previousState) => !previousState);

    const [days, setDays] = useState({
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
    });
    const checkDay = (day) => {
        // Create a new object based on the current days state
        const newDays = Object.keys(days).reduce((acc, key) => {
            if (key === day){
                acc[key] = true
                setSelectedDay(key)
            } else {
                acc[day] = false
            }
            return acc;
        }, {});
        setDays(newDays); // Update the state    
    };

    // Time slots array
    const timeSlots = {
        '01' : false,
        '02' : false,
        '03' : false,
        '04' : false,
        '05' : false,
        '06' : false,
        '07' : false,
        '08' : false,
        '09' : false,
        '10' : false,
        '11' : false,
        '12' : false,
    };
    const checkTime = (slot, time, day, state) => {
        if (time == slot && days[day] && state == isOnline) {
            timeSlots[slot] = true
        } else {
            timeSlots[slot] = false
        }
    }

    const edit = async () => {
            try {
                const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/availability/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getToken()}`,
                },
                body: JSON.stringify({
                    added
                }),
                });
        
                if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Login failed: ${errorMessage}`);
                }
        
                const responseData = await response.json();
                const token = responseData.token; // Assuming the server returns a token
                console.log(responseData)
                // Store the token (e.g., in AsyncStorage or localStorage)
                await AsyncStorage.setItem('userToken', token);
        
                // Navigate to the home page
                navigation.navigate('home page');
            } catch (error) {
                console.error('Login error:', error);
                Alert.alert('Login failed', error.message);
            }
        }

return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{textAlign: 'center'}}>Availability</CustomTitle>

        <View style={{margin: 10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => checkDay('7')}>
                    <Text style={days['7'] ? 
                        [styles.item, {color: 'white', backgroundColor: '#1565c0'}]
                        : [styles.item]
                    }>
                        Sat
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => checkDay('1')}>
                    <Text style={days['1'] ? 
                        [styles.item, {color: 'white', backgroundColor: '#1565c0'}]
                        : [styles.item]
                    }>
                        Sun
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => checkDay('2')}>
                    <Text style={days['2'] ? 
                        [styles.item, {color: 'white', backgroundColor: '#1565c0'}]
                        : [styles.item]
                    }>
                        Mon
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => checkDay('3')}>
                    <Text style={days['3'] ? 
                        [styles.item, {color: 'white', backgroundColor: '#1565c0'}]
                        : [styles.item]
                    }>
                        Tue
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => checkDay('4')}>
                    <Text style={days['4'] ? 
                        [styles.item, {color: 'white', backgroundColor: '#1565c0'}]
                        : [styles.item]
                    }>
                        Wed
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => checkDay('5')}>
                    <Text style={days['5'] ? 
                        [styles.item, {color: 'white', backgroundColor: '#1565c0'}]
                        : [styles.item]
                    }>
                        Thu
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => checkDay('6')}>
                    <Text style={days['6'] ? 
                        [styles.item, {color: 'white', backgroundColor: '#1565c0'}]
                        : [styles.item]
                    }>
                        Fri
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

        <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10}}>
            <Text style={add ? styles.switchTextAdd : styles.switchTextRemove}>
                {add ? 'Add slots' : 'Remove slots'}
            </Text>
            <Switch
                value={add}
                onValueChange={toggleSwitch}
                style={styles.switch}
            />
        </View>
        
        <CustomScroll>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '01', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['01']) return;
                        checkTime('01', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['01'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['01'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        09:00 am - 10:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '02', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['02']) return;
                        checkTime('02', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['02'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['02'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        10:00 am - 11:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '03', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['03']) return;
                        checkTime('03', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['03'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['03'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        11:00 am - 12:00 pm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '04', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['04']) return;
                        checkTime('04', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['04'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['04'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        12:00 pm - 01:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '05', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['05']) return;
                        checkTime('05', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['05'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['05'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        01:00 pm - 02:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '06', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['06']) return;
                        checkTime('06', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['06'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['06'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        02:00 pm - 03:00 pm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '07', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['07']) return;
                        checkTime('07', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['07'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['07'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        03:00 pm - 04:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '08', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['08']) return;
                        checkTime('08', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['08'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['08'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        04:00 pm - 05:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '09', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['09']) return;
                        checkTime('09', time[1], time[0], time[2])
                    })}                    
                    <Text style={add ? 
                    (timeSlots['09'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['09'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        05:00 pm - 06:00 pm
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.row}>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '10', isOnline)}>
                    {slots.forEach(([it, time]) => {
                        if (timeSlots['10']) return;
                        checkTime('10', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['10'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['10'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        06:00 pm - 07:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '11', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['11']) return; // Skip further iterations
                        checkTime('11', time[1], time[0], time[2])
                    })}                    
                    <Text style={add ? 
                    (timeSlots['11'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['11'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        07:00 pm - 08:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => slotSrting(selectedDay, '12', isOnline)}>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['12']) return;
                        checkTime('12', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['12'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['12'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        08:00 pm - 09:00 pm
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                    {add ? <Text style={[styles.button, {color: 'green', borderColor: 'green'}]}>Add</Text>
                    : <Text style={[styles.button, {color: 'red', borderColor: 'red'}]}>Remove</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={online}>
                    <Text style={styles.button}>
                        {isOnline == 'L' ? 'Online' : 'On-site'}
                    </Text>
                </TouchableOpacity>                
            </View>
        </CustomScroll>

      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginTop: '10%' 
  },
  item: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565c0',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between'
  },
  slot: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
    color: 'white',
    width: 110,
    fontSize: 18
  },
  switch: {
    marginRight: 10,
  },
  switchTextRemove: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red'
  },
  switchTextAdd: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green'
  },
  button: {
    margin: 10,
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    fontSize: 18,
    width: 100,
    textAlign: 'center',
    color: '#1565c0',
    borderColor: '#1565c0'
  }
})

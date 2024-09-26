import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import SafeArea from '../components/safeArea';
import { doctorAv } from '../test/data';
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';
import { getToken } from '../components/getToken';
import { NEXT_PUBLIC_SERVER_NAME} from '@env';

export default function Availability ({ navigation }) {

    const slots = Object.entries(doctorAv);
    const [isOnline, setIsOnline] = useState('L');
    const [selectedDay, setSelectedDay] = useState('7');
    const [added, setAdded] = useState([]);
    const [add, setAdd] = useState(true);
    const [existAdd, setExistAdd] = useState(false);

    const toggleOnline = () => {
        setIsOnline(isOnline === 'L' ? 'S' : 'L');
    };

    const toggleAdd = () => {
        setAdd(!add);
    };

    const toggleTimeSlot = (day, slot) => {
        const slotIdentifier = `${day}_${slot}_${isOnline}`;
        const index = added.indexOf(slotIdentifier);

        if (index !== -1) {
            // Remove the slot if it's already added
            for (let item in added){
                if (slotIdentifier in added){
                    setExistAdd(true)
                    setAdded((prevAdded) => prevAdded.filter((item) => item !== slotIdentifier));
                }
            }
            // Update the timeSlots object
            timeSlots[slot] = false;
        } else {
            setExistAdd(false)
            // Add the slot if it's not added
            setAdded((prevAdded) => [...prevAdded, slotIdentifier]);
        
            // Update the timeSlots object
            timeSlots[slot] = true;
        }
    };

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
        const keys = Object.keys(days);
        for (let key in keys ){
            if (key === day){
                setDays[key] = true
                setSelectedDay(key)
            } else {
                setDays[day] = false
            }
        }
    }

    // Time slots array
    const timeSlots = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
    ];

    const timeSlotsDict = {
        '01': false,
        '02': false,
        '03': false,
        '04': false,
        '05': false,
        '06': false,
        '07': false,
        '08': false,
        '09': false,
        '10': false,
        '11': false,
        '12': false
    };
    // console.log(slots[0])
    // const filteredTimeSlots = []
    const filteredTimeSlots = timeSlots.filter((timeSlot) => {
        // Extract the slot number (assuming it's the second element in the `slots` array)
        const slotNumber = slots[0][1].find((slot) => slot.split('_')[1] === timeSlot);
        // Check if a matching slot exists in the `slots` array
        return slotNumber !== undefined;
    });
    console.log('====================================');
    console.log(slots[0][1]);
    console.log('====================================');
    console.log('====================================');
    console.log(filteredTimeSlots);
    console.log('====================================');

    const checkTime = (slot, time, day, state) => {
        if (time == slot && days[day] && state == isOnline) {
            timeSlotsDict[slot] = true
        } else {
            timeSlotsDict[slot] = false
        }
    }

    const action = () => {
        console.log(added)
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
                onValueChange={toggleAdd}
                style={styles.switch}
            />
        </View>
        
        <CustomScroll>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '01', isOnline)}>
                    {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['01']) return;
                        checkTime('01', item)
                    })}    
                    <Text style={add ? 
                    (timeSlotsDict['01'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['01'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        09:00 am - 10:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '02', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['02']) return;
                        checkTime('02', item)
                    })}    
                    <Text style={add ? 
                    (timeSlotsDict['02'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['02'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        10:00 am - 11:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '03', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlots['03']) return;
                        checkTime('03', item)
                    })}    
                    <Text style={add ? 
                    (timeSlotsDict['03'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['03'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        11:00 am - 12:00 pm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '04', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['04']) return;
                        checkTime('04', item)
                    })}    
                    <Text style={add ? 
                    (timeSlotsDict['04'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['04'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        12:00 pm - 01:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '05', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['05']) return;
                        checkTime('05', item)
                    })}
                    <Text style={add ? 
                    (timeSlotsDict['05'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['05'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        01:00 pm - 02:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '06', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['06']) return;
                        checkTime('06', item)
                    })}    
                    <Text style={add ? 
                    (timeSlotsDict['06'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['06'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        02:00 pm - 03:00 pm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '07', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['07']) return;
                        checkTime('07', item)
                    })}
                    <Text style={add ? 
                    (timeSlotsDict['07'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['07'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        03:00 pm - 04:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '08', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['08']) return;
                        checkTime('08', item)
                    })}
                    <Text style={add ? 
                    (timeSlotsDict['08'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['08'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        04:00 pm - 05:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '09', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['09']) return;
                        checkTime('09', item)
                    })}      
                    <Text style={add ? 
                    (timeSlotsDict['09'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['09'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        05:00 pm - 06:00 pm
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.row}>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '10', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['10']) return;
                        checkTime('10', item)
                    })}
                    <Text style={add ? 
                    (timeSlotsDict['10'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['10'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        06:00 pm - 07:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '11', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['11']) return;
                        checkTime('11', item)
                    })}      
                    <Text style={add ? 
                    (timeSlotsDict['11'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['11'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        07:00 pm - 08:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTimeSlot(selectedDay, '12', isOnline)}>
                {filteredTimeSlots.forEach((item) => {
                        if (timeSlotsDict['12']) return;
                        checkTime('12', item)
                    })}
                    <Text style={add ? 
                    (timeSlotsDict['12'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlotsDict['12'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        08:00 pm - 09:00 pm
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={action}>
                    {add ? <Text style={[styles.button, {color: 'green', borderColor: 'green'}]}>Add</Text>
                    : <Text style={[styles.button, {color: 'red', borderColor: 'red'}]}>Remove</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleOnline}>
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

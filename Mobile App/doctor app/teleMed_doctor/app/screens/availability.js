import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import { doctorAv } from '../test/data';
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';

export default function Availability ({ navigation }) {

    const slots = Object.entries(doctorAv)
    const [isOnline, setIsonline] = useState('online')
    const online = () => {
        isOnline == 'online' ? setIsonline('on-site')
        : setIsonline('online')
    }

    // add or remove slots switch
    const [add, setAdd] = useState(true); 
    const toggleSwitch = () => setAdd((previousState) => !previousState);

    const [days, setDays] = useState({
        'sat': false,
        'sun': false,
        'mon': false,
        'tue': false,
        'wed': false,
        'thu': false,
        'fri': false,
    });
    const checkDay = (day) => {
        // Create a new object based on the current days state
        const newDays = Object.keys(days).reduce((acc, key) => {
            acc[key] = key === day; // Set the selected day to true, others to false
            return acc;
        }, {});
        setDays(newDays); // Update the state    
    };

    // Time slots array
    const timeSlots = {
        '09:00 am' : false,
        '10:00 am' : false,
        '11:00 am' : false,
        '12:00 pm' : false,
        '01:00 pm' : false,
        '02:00 pm' : false,
        '03:00 pm' : false,
        '04:00 pm' : false,
        '05:00 pm' : false,
        '06:00 pm' : false,
        '07:00 pm' : false,
        '08:00 pm' : false,
    };
    const checkTime = (slot, time, day, state) => {
        if (time == slot && days[day] && state == isOnline) {
            timeSlots[slot] = true
        } else {
            timeSlots[slot] = false
        }
    }

return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{textAlign: 'center'}}>Availability</CustomTitle>

        <View style={{margin: 10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Object.keys(days).map((day) => (
                    <TouchableOpacity key={day} onPress={() => checkDay(day)}>
                        <Text style={days[day] ? 
                            [styles.item, { color: 'white', backgroundColor: '#1565c0' }] 
                            : [styles.item]}>
                            {day.charAt(0).toUpperCase() + day.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
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
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['09:00 am']) return;
                        checkTime('09:00 am', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['09:00 am'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['09:00 am'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        09:00 am - 10:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['10:00 am']) return;
                        checkTime('10:00 am', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['10:00 am'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['10:00 am'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        10:00 am - 11:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['11:00 am']) return;
                        checkTime('11:00 am', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['11:00 am'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['11:00 am'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        11:00 am - 12:00 pm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['12:00 pm']) return;
                        checkTime('12:00 pm', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['12:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['12:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        12:00 pm - 01:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['01:00 pm']) return;
                        checkTime('01:00 pm', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['01:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['01:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        01:00 pm - 02:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['02:00 pm']) return;
                        checkTime('02:00 pm', time[1], time[0], time[2])
                    })}    
                    <Text style={add ? 
                    (timeSlots['02:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['02:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        02:00 pm - 03:00 pm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['03:00 pm']) return;
                        checkTime('03:00 pm', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['03:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['03:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        03:00 pm - 04:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['04:00 pm']) return;
                        checkTime('04:00 pm', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['04:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['04:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        04:00 pm - 05:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['05:00 pm']) return;
                        checkTime('05:00 pm', time[1], time[0], time[2])
                    })}                    
                    <Text style={add ? 
                    (timeSlots['05:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['05:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        05:00 pm - 06:00 pm
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.row}>
                <TouchableOpacity>
                    {slots.forEach(([it, time]) => {
                        if (timeSlots['06:00 pm']) return;
                        checkTime('06:00 pm', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['06:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['06:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        06:00 pm - 07:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['07:00 pm']) return; // Skip further iterations
                        checkTime('07:00 pm', time[1], time[0], time[2])
                    })}                    
                    <Text style={add ? 
                    (timeSlots['07:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['07:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
                        : [styles.slot])}
                    >
                        07:00 pm - 08:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    {slots.forEach(([id, time]) => {
                        if (timeSlots['08:00 pm']) return;
                        checkTime('08:00 pm', time[1], time[0], time[2])
                    })}
                    <Text style={add ? 
                    (timeSlots['08:00 pm'] ? styles.slot
                        : [styles.slot, {backgroundColor: 'green'}]) 
                    : (timeSlots['08:00 pm'] ? [styles.slot, {backgroundColor: 'red'}] 
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
                        {isOnline == 'online' ? 'Online' : 'On-site'}
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

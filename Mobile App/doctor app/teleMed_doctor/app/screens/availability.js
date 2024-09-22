import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import { doctorAv } from '../test/data';
import CustomScroll from '../components/scroll';
import CustomTitle from '../components/title';

export default function Availability ({ navigation }) {

    const slots = Object.entries(doctorAv)
    const [add, setAdd] = useState(true); // State to control the switch

    const toggleSwitch = () => setAdd((previousState) => !previousState);

    const [selectedTime, setSelectedTime] = useState(''); // Store selected time to compare

    // Time slots array
    const timeSlots = [
        '09:00 am - 10:00 am',
        '10:00 am - 11:00 am',
        '11:00 am - 12:00 pm',
        '12:00 pm - 01:00 pm',
        '01:00 pm - 02:00 pm',
        '02:00 pm - 03:00 pm',
        '03:00 pm - 04:00 pm',
        '04:00 pm - 05:00 pm',
        '05:00 pm - 06:00 pm',
        '06:00 pm - 07:00 pm',
        '07:00 pm - 08:00 pm',
        '08:00 pm - 09:00 pm',
    ];

return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{textAlign: 'center'}}>Availability</CustomTitle>

        <View style={{margin: 10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Text style={styles.item}>Sat</Text>
                <Text style={styles.item}>Sun</Text>
                <Text style={styles.item}>Mon</Text>
                <Text style={styles.item}>Tue</Text>
                <Text style={styles.item}>Wed</Text>
                <Text style={styles.item}>Thu</Text>
                <Text style={styles.item}>Fri</Text>
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
            {/* {slots.map(([id, data]) =>
                <View key={id}> 
                    <Text>{data[0]}</Text>
                    <Text>{data[1]}</Text>
                    <Text>{data[2]}</Text>
                </View>
            )} */}

            {/* <View style={styles.row}>
                {slots.map(([id, time]) => ( 
                    <Text key={id} 
                    style={add ? 
                        (time === timeSlots[1] ?
                              [styles.slot] 
                            : [styles.slot, {backgroundColor: 'green'}])
                        : (time === timeSlots[1] ?
                              [styles.slot, {backgroundColor: 'red'}] 
                            : [styles.slot]
                        )}
                    >
                        09:00 am - 10:00 am
                    </Text>
                ))} */}
                
            <View style={styles.row}>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    09:00 am - 10:00 am
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    10:00 am - 11:00 am
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text
                style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    11:00 am - 12:00 pm
                </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    12:00 pm - 01:00 pm
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    01:00 pm - 02:00 pm
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    02:00 pm - 03:00 pm
                </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    03:00 pm - 04:00 pm
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    04:00 pm - 05:00 pm
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    05:00 pm - 06:00 pm
                </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.row}>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    06:00 pm - 07:00 pm
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    07:00 pm - 08:00 pm
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                <Text style={add ? [styles.slot, {backgroundColor: 'green'}] 
                : [styles.slot]}
                >
                    08:00 pm - 09:00 pm
                </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                {add ? <Text style={[styles.button, {color: 'green', borderColor: 'green'}]}>Add</Text>
                : <Text style={[styles.button, {color: 'red', borderColor: 'red'}]}>Remove</Text>}
            </TouchableOpacity>

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
    textAlign: 'center'
  }
})

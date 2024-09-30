import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import SafeArea from '../../components/safeArea';
import { doctorAv } from '../../test/data';
import CustomScroll from '../../components/scroll';
import CustomTitle from '../../components/title';
import { getToken } from '../../components/getToken';
import { NEXT_PUBLIC_SERVER_NAME} from '@env';

let newSlots = []
let removedSlots = []
export default function Availability ({ navigation }) {

    // const slots = Object.entries(doctorAv.timeslots)
    const [slots, setSlots] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isOnline, setIsonline] = useState('L')
    const [selectedDay, setSelectedDay] = useState('sat')
    const [message, setMessage] = useState('')
    const decodedSlots = {}

    const days = {
        '1': 'sat',
        '2': 'sun',
        '3': 'mon',
        '4': 'tue',
        '5': 'wed',
        '6': 'thu',
        '7': 'fri'
    };

    const [hours,setHours] = useState({
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
        '12': false,
    })
 
    // Online / On-site switch
    const online = () => {
        isOnline == 'L' ? setIsonline('S')
        : setIsonline('L')
    }

    // add or remove slots switch
    const [add, setAdd] = useState(true); 
    const toggleSwitch = () => setAdd((previousState) => !previousState);

    // Slicing data
    if(slots){
        slots.forEach((timeslot) => {
            const [day, slot, status] = timeslot.split('_'); // Split the timeslot string
            const key = days[day]; // Use the day mapping if available
            if (!decodedSlots[key]) {
              decodedSlots[key] = []; // Create a new array for the key if it doesn't exist
            }
            decodedSlots[key].push([slot, status]); // Append the slot and status to the array
            });        
            // console.log(decodedSlots['sat'].filter(element => element[1] === 'L').map(element => element[0]));
    }

    // Slots filtering
    const filtered = (slot) => {
        if(decodedSlots[selectedDay]){
            return decodedSlots[selectedDay].filter(element => element[1] === isOnline).find(element => element[0] === slot);
        }
        return false
    }

    // creating the array if new slots
    const chosenSlot = (day, hour, state) => {  
        const key = Object.keys(days).find(key => days[key] === day);
        const codedSlot = key + '_' + hour + '_' + state
        if (add){
            if (newSlots.includes(codedSlot) || slots.includes(codedSlot)) {
                newSlots = newSlots.filter(slot => slot !== codedSlot);
                setHours((prevDictionary) => ({
                    ...prevDictionary,
                    [hour]: false
                  })); 
            } else {
                newSlots.push(codedSlot);
                setHours((prevDictionary) => ({
                    ...prevDictionary,
                    [hour]: true
                  })); 
            }
            console.log(newSlots)
            console.log(hours['05'])
        } else {
            if (slots.includes(codedSlot)) {
                if(removedSlots.includes(codedSlot)){
                    removedSlots = removedSlots.filter(slot => slot !== codedSlot);
                    setHours((prevDictionary) => ({
                        ...prevDictionary,
                        [hour]: false
                      })); 
                } else {
                    removedSlots.push(codedSlot);
                    setHours((prevDictionary) => ({
                        ...prevDictionary,
                        [hour]: true
                      })); 
                }
            } else {
                setHours((prevDictionary) => ({
                    ...prevDictionary,
                    [hour]: false
                  }));            }
            console.log(removedSlots)
        }
    }

    const getStyle = (slotStyle) => {
        console.log(hours[slotStyle])
        if (add) {
            if (filtered(slotStyle)) {
                return styles.slot;
            } else {
                return [styles.slot, hours[slotStyle] ? { backgroundColor:'#002e07' } : { backgroundColor: 'green' }];
            }
        } else {
            if (filtered(slotStyle)){
                return hours[slotStyle] ? [styles.slot, { backgroundColor: '#2e0000' }] : [styles.slot, { backgroundColor: 'red' }];
            } else {
                return styles.slot;
            }
        }
      };

    // Fetching doctor availability    
    const getAvailability = async () => {
        try {
          const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/availability/view`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${await getToken()}`,
    
            },
          });
    
          if (!response.ok) {
            console.log(response);
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
        //   console.log(result.timeslots)
          setSlots(result.timeslots);
          

        } catch (error) {
          console.error('Error fetching doctor availability:', error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getAvailability();
      }, []);
    

    // adding doctor availability
    const addingSlots = async () => {
            try {
                const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/availability/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getToken()}`,
                },
                body: JSON.stringify(newSlots)
                });
        
                if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Somthing went wrong: ${errorMessage}`);
                }
        
                const responseData = await response.json();
                console.log(responseData)
                const message = responseData.message
                setMessage(message)

                const newDictionary = Object.keys(hours).reduce((acc, key) => ({
                ...acc,
                [key]: false
                }), {});
                setHours(newDictionary);

            } catch (error) {
                console.error('Could set new slots:', error);
            }
        }

        // removing doctor availability
        const removingSlots = async () => {
            try {
                const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/availability/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getToken()}`,
                },
                body: JSON.stringify(removedSlots),
                });
        
                if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Somthing went wrong: ${errorMessage}`);
                }
        
                const responseData = await response.json();
                console.log(responseData)
                const message = responseData.message
                setMessage(message)

                const newDictionary = Object.keys(hours).reduce((acc, key) => ({
                    ...acc,
                    [key]: false
                    }), {});
                setHours(newDictionary);

            } catch (error) {
                console.error('Could remove slots:', error);
            }
        }

if (loading) {
    return (
        <View style={{alignItems: 'center', justifyContent:'center', flex: 1, backgroundColor: '#f0f0f0'}}>
            <Text>Loading</Text>
        </View>
    )
}
return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{textAlign: 'center'}}>Availability</CustomTitle>

        <View style={{margin: 10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => setSelectedDay('sat')}>
                    <Text style={selectedDay == 'sat'? [styles.item, {backgroundColor: '#1565c0', color: 'white'}] : styles.item}>
                        Sat
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedDay('sun')}>
                    <Text style={selectedDay == 'sun'? [styles.item, {backgroundColor: '#1565c0', color: 'white'}] : styles.item}>
                        Sun
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedDay('mon')}>
                    <Text style={selectedDay == 'mon'? [styles.item, {backgroundColor: '#1565c0', color: 'white'}] : styles.item}>
                        Mon
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedDay('tue')}>
                    <Text style={selectedDay == 'tue'? [styles.item, {backgroundColor: '#1565c0', color: 'white'}] : styles.item}>
                        Tue
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedDay('wed')}>
                    <Text style={selectedDay == 'wed'? [styles.item, {backgroundColor: '#1565c0', color: 'white'}] : styles.item}>
                        Wed
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedDay('thu')}>
                    <Text style={selectedDay == 'thu'? [styles.item, {backgroundColor: '#1565c0', color: 'white'}] : styles.item}>
                        Thu
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedDay('fri')}>
                    <Text style={selectedDay == 'fri'? [styles.item, {backgroundColor: '#1565c0', color: 'white'}] : styles.item}>
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
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '01', isOnline)}>
                <Text style={getStyle('01')}>
                        09:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '02', isOnline)}>
                <Text style={getStyle('02')}>
                        10:00 am
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '03', isOnline)}>
                <Text style={getStyle('03')}>
                        11:00 am
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
            <TouchableOpacity onPress={() => chosenSlot(selectedDay, '04', isOnline)}>
            <Text style={getStyle('04')}>
                        12:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '05', isOnline)}>
                <Text style={getStyle('05')}>
                        01:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '06', isOnline)}>
                    <Text style={getStyle('06')}>
                        02:00 pm
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
            <TouchableOpacity onPress={() => chosenSlot(selectedDay, '07', isOnline)}>
            <Text style={getStyle('07')}>
                        03:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '08', isOnline)}>
                    <Text style={getStyle('08')}>
                        04:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '09', isOnline)}>
                    <Text style={getStyle('09')}>
                        05:00 pm
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.row}>
            <TouchableOpacity onPress={() => chosenSlot(selectedDay, '10', isOnline)}>
            <Text style={getStyle('10')}>                 
                        06:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '11', isOnline)}>
                    <Text style={getStyle('11')}>
                        07:00 pm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => chosenSlot(selectedDay, '12', isOnline)}>
                <Text style={getStyle('12')}>
                        08:00 pm
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={add ? addingSlots : removingSlots}>
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
        <Text style={styles.message}>"{message}"</Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={styles.done}>Done</Text>
        </TouchableOpacity>    

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
    width: 105,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
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
  },
  done: {
    position: 'absolute',
    bottom: 10, // Distance from the bottom of the page
    left: '37%',  // Optional: Adjust the distance from the left/right
    padding: 5,
    borderRadius: 15,
    fontSize: 20,
    width: 100,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#1565c0',
    borderWidth: 1,
    borderColor: 'darkgray'
  },
  message: {
    position: 'absolute',
    bottom: 160, // Distance from the bottom of the page
    left: '15%',  // Optional: Adjust the distance from the left/right
    padding: 5,
    fontSize: 18,
    textAlign: 'center',
  }
})
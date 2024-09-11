import { Dimensions, StyleSheet, Text, TextInput, View, Platform, Button } from 'react-native'
import React, { useState } from 'react'
import SafeArea from '../../../components/safeArea'
import CustomScroll from '../../../components/scroll'
import Footer from '../../../components/footer'
import CustomTitle from '../../../components/title'
import Custombutton from '../../../components/button'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native'


const SubmitMedications = ({ navigation }) => {
    const route = useRoute()
    const { report, diagnosis, appointment_id } = route.params
    const [inputs, setInputs] = useState([]);
    const [medications , setmedications] = useState([])
    const [showPicker, setShowPicker] = useState(false);
    const [currentPicker, setCurrentPicker] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const addInputSet = () => {
        setInputs([...inputs, { id: Date.now(), drugName: '', dose: '', note: '', startDate: null, endDate: null }]);
    };

    const deleteInputSet = (id) => {
        setInputs(inputs.filter(inputSet => inputSet.id !== id));
    };

    const furtherDetails = () => {
        const medications = inputs.map(inputset => {
            return {
                ...inputset, // Spread the current object
                // Check if endDate and startDate are Date objects, if not convert them
                endDate: inputset.endDate instanceof Date
                    ? inputset.endDate.toISOString().split('T')[0]
                    : new Date(inputset.endDate).toISOString().split('T')[0],
                startDate: inputset.startDate instanceof Date
                    ? inputset.startDate.toISOString().split('T')[0]
                    : new Date(inputset.startDate).toISOString().split('T')[0],
            };
        });
        setmedications(medications);
        console.log(medications);
        navigation.navigate('furtherDetails', { report, diagnosis, medications , appointment_id });
    };

    const onDateChange = (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
            const medications = inputs.map((inputSet, index) => {
                if (index === currentIndex) {
                    if (currentPicker === 'start') {
                        return { ...inputSet, startDate: selectedDate };
                    } else if (currentPicker === 'end') {
                        return { ...inputSet, endDate: selectedDate };
                    }
                }
                return inputSet;
            });
            setInputs(medications);
        }

        if (Platform.OS === 'android') {
            setShowPicker(false);
            setIsPickerVisible(false);
        } else {
            setShowPicker(false);
        }
        setCurrentPicker(null);
        setCurrentIndex(null);
    };

    const showDatePicker = (pickerType, index) => {
        setCurrentPicker(pickerType);
        setCurrentIndex(index);

        setShowPicker(true);
        setIsPickerVisible(Platform.OS === 'android');
    };

    return (
        <SafeArea safeStyle={{ backgroundColor: 'lightgrey' }}>
            <CustomScroll>
                <View style={styles.container}>
                    <CustomTitle style={styles.titleProp}>Complaint</CustomTitle>
                    <Text style={styles.textProp}>lorem lorem</Text>
                    <View style={styles.titleRow}>
                        <CustomTitle style={styles.titleProp}>Prescription</CustomTitle>
                    </View>

                    {inputs.map((inputSet, index) => (
                        <View key={inputSet.id} style={styles.inputSet}>
                            <TextInput
                                style={styles.input}
                                placeholder="Drug name"
                                value={inputSet.drugName}
                                onChangeText={(text) => {
                                    const medications = inputs.map(item => item.id === inputSet.id ? { ...item, drugName: text } : item);
                                    setInputs(medications);
                                }}
                            />

                            <View style={styles.row}>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="Dose"
                                    value={inputSet.dose}
                                    onChangeText={(text) => {
                                        const medications = inputs.map(item => item.id === inputSet.id ? { ...item, dose: text } : item);
                                        setInputs(medications);
                                    }}
                                />
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="Note"
                                    value={inputSet.note}
                                    onChangeText={(text) => {
                                        const medications = inputs.map(item => item.id === inputSet.id ? { ...item, note: text } : item);
                                        setInputs(medications);
                                    }}
                                />
                            </View>

                            <View style={styles.dateRow}>
                                <View style={styles.cell}>
                                    <Text style={styles.textProp}>Start Date:</Text>
                                    {inputSet.startDate ? (
                                        <Text style={styles.inTextProp}>{new Date(inputSet.startDate).toDateString()}</Text>
                                    ) : (
                                        <Text style={styles.inTextProp}>No date selected</Text>
                                    )}
                                </View>
                                <View style={styles.cell}>
                                    <Text style={styles.textProp}>End Date:</Text>
                                    {inputSet.endDate ? (
                                        <Text style={styles.inTextProp}>{new Date(inputSet.endDate).toDateString()}</Text>

                                    ) : (
                                        <Text style={styles.inTextProp}>No date selected</Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.dateRow}>
                                <View style={styles.cell}>
                                    <Button
                                        title="Select Start Date"
                                        onPress={() => showDatePicker('start', index)}
                                    />
                                </View>
                                <View style={styles.cell}>
                                    <Button
                                        title="Select End Date"
                                        onPress={() => showDatePicker('end', index)}
                                    />
                                </View>
                            </View>

                            <Custombutton onPress={() => deleteInputSet(inputSet.id)}>
                                Delete current medicine
                            </Custombutton>
                        </View>
                    ))}

                    <Custombutton onPress={addInputSet}>
                        Add medicine
                    </Custombutton>
                </View>

                <Custombutton onPress={furtherDetails}>
                    Next
                </Custombutton>
            </CustomScroll>

            <Footer navigation={navigation} />

            {(showPicker || isPickerVisible) && (
                <DateTimePicker
                    value={inputs[currentIndex]?.[currentPicker === 'start' ? 'startDate' : 'endDate'] || new Date()}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
        </SafeArea>
    );
};


export default SubmitMedications

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        flexGrow: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: "5%",
        width: 'fit',
    },
    titleProp: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
        fontSize: 30
    }, input: {
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        borderRadius: 10,
        paddingLeft: "3%"
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputSet: {
        marginBottom: '5%',
        padding: '3%'
    },
    smallInput: {
        height: '30%',
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
        margin: "10%",
        borderRadius: 15,
        padding: '2%',
        paddingLeft: '3%'
    },
    textProp: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inTextProp: {
        fontSize: 15,
        textAlign: 'center'
    },
    cell: {
        alignItems: 'center',
        marginLeft: "1%"
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '2%'
    }
})
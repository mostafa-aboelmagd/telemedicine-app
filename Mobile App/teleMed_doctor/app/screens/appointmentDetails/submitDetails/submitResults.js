import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SafeArea from '../../../components/safeArea'
import CustomScroll from '../../../components/scroll'
import Footer from '../../../components/footer'
import CustomTitle from '../../../components/title'
import { useRoute } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import Custombutton from '../../../components/button'

const { height } = Dimensions.get('window')

const SubmitResults = ({ navigation }) => {
    const route = useRoute()
    const { patientFirstName , patientLastName ,appointment_id} = route.params
    const [diagnosis, setDiagnosis] = useState('')
    const [report, setReport] = useState('')
    const clearDiagnosisInput = () => {
        setDiagnosis('')
    }
    const clearReportInput = () => {
        setReport('')
    }
    const submitMedications = ()=>{
        navigation.navigate('submitMedications' , {report , diagnosis, appointment_id})
    }
    return (
        <SafeArea >
            <CustomScroll>
                <View style={styles.container}>
                    <CustomTitle titleStyle={{ marginTop: "1%", textAlign: 'center' }}>
                        Patient Name: {patientFirstName} {patientLastName}
                    </CustomTitle>
                    <View style={styles.titleRow} >
                        <CustomTitle style={styles.textColumn}>
                            Diagnosis
                        </CustomTitle>
                    </View>
                    <View style={styles.textFieldRow}>
                        <TextInput style={styles.textFieldColumn} multiline={true} value={diagnosis} onChangeText={(text) => { setDiagnosis(text) }} placeholder='Write your diagnosis here' />
                        {diagnosis.length > 0 && (<TouchableOpacity onPress={clearDiagnosisInput} style={styles.clearButton}>
                            <Feather name="x-circle" size={24} color="gray" />
                        </TouchableOpacity>)}
                    </View>
                    <View style={styles.titleRow}>
                        <CustomTitle style={styles.textColumn}>
                            Report
                        </CustomTitle>
                    </View>
                    <View style={styles.textFieldRow}>
                        <TextInput style={styles.textFieldColumn} multiline={true} value={report} onChangeText={(text) => { setReport(text) }} placeholder='Write your report here' />
                        {report.length > 0 && (<TouchableOpacity style={styles.clearButton} onPress={clearReportInput}>
                            <Feather name="x-circle" size={30} color="gray" />
                        </TouchableOpacity>)}
                    </View>
                    <View style={styles.titleRow}>
                        <Custombutton textStyle={{ fontSize: 20 }} onPress={()=>{submitMedications()}}>
                            Next
                        </Custombutton>
                    </View>
                </View>
            </CustomScroll>
            <Footer navigation={navigation}></Footer>
        </SafeArea>
    )
}

export default SubmitResults

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: 'lightgrey'
    },
    name: {
        marginBottom: '3%'
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '10%',
        width: 'fit',
    },
    textFieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '30%'
    },
    textColumn: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900',
        fontSize: 30
    },
    textFieldColumn: {
        flex: 2,
        textAlignVertical: 'top',
        backgroundColor: 'white',
        height: '100%',
        margin: '7%',
        borderRadius: 20,
        textAlign: 'left',
        padding: '5%'
    },
    clearButton: {
        margin: '3%'
    },
})
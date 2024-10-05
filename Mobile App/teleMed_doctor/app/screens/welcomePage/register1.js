import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,Button,Dimensions
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import SafeArea from "../../components/safeArea";
import Scroll from "../../components/scroll";
import Custombutton from "../../components/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTitle from "../../components/title";
import DateTimePicker from "@react-native-community/datetimepicker";
import LocalStorage from "../../components/LocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomScroll from '../../components/scroll'
import { useRoute } from '@react-navigation/native'

// export default function Register1({ navigation }) {
//   const [certificates, setCertificates] = useState([]);
//   const [experiences, setExperiences] = useState([]);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected date

//   const screen3 = () => {
//     if (
//       certificates.every((cert) => cert.startDate && cert.endDate) &&
//       experiences.every((exp) => exp.startDate && exp.endDate)
//     ) {
//       // Save data to AsyncStorage (replace with your preferred storage method)
//       AsyncStorage.setItem("certificates", JSON.stringify(certificates));
//       AsyncStorage.setItem("experiences", JSON.stringify(experiences));
//       navigation.navigate("register2");
//     } else {
//       Alert.alert("All fields including start and end dates are required!");
//     }
//   };

//   const addCertificate = () => {
//     setCertificates([
//       ...certificates,
//       { name: "", authority: "", startDate: "", endDate: "" },
//     ]);
//   };

//   const addExperience = () => {
//     setExperiences([
//       ...experiences,
//       { title: "", firm: "", department: "", startDate: "", endDate: "" },
//     ]);
//   };
//   const removeCertificate = (index) => {
//     const updatedCertificates = [...certificates];
//     updatedCertificates.splice(index, 1); // Remove the certificate at the given index
//     setCertificates(updatedCertificates);
//   };

//   const removeExperience = (index) => {
//     const updatedExperiences = [...experiences];
//     updatedExperiences.splice(index, 1); // Remove the experience at the given index
//     setExperiences(updatedExperiences);
//   };
//   const handleCertificateChange = (index, field, value) => {
//     const updatedCertificates = [...certificates];
//     updatedCertificates[index][field] = value;
//     setCertificates(updatedCertificates);
//   };

//   const handleExperienceChange = (index, field, value) => {
//     const updatedExperiences = [...experiences];
//     updatedExperiences[index][field] = value;
//     setExperiences(updatedExperiences);
//   };
//   const handleDateChange = (event, newDate) => {
//     setSelectedDate(newDate); // Update selected date state
//     setShowDatePicker(false); // Hide date picker
//   };
//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
//     const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
//     return `<span class="math-inline">\{year\}\-</span>{month}-${day}`;
//     // Formatted date string (YYYY-MM-DD)
//   };
//   const handleSaveDate = (index, field) => {
//     const newDate = formatDate(selectedDate); // Get formatted date string
//     if (field === "startDate") {
//       handleCertificateChange(index, field, newDate);
//     } else {
//       handleExperienceChange(index, field, newDate);
//     }
//   };

//   return (
//     <SafeArea>
//       <Scroll>
//         <CustomTitle>Doctor Registration - Certificates</CustomTitle>

//         {certificates.map((certificate, index) => (
//           <View key={index} style={[styles.container2]}>
//             <TextInput
//               style={styles.container3}
//               placeholder="Certificate Name"
//               value={certificate.name}
//               onChangeText={(text) =>
//                 handleCertificateChange(index, "name", text)
//               }
//             />

//             <TextInput
//               style={styles.container3}
//               placeholder="Certificate Authority"
//               value={certificate.authority}
//               onChangeText={(text) =>
//                 handleCertificateChange(index, "authority", text)
//               }
//             />
//             <TouchableOpacity
//               onPress={() => {
//                 setShowDatePicker(true); // Show date picker for start date
//                 setSelectedDate(
//                   certificate.startDate
//                     ? new Date(certificate.startDate)
//                     : new Date()
//                 ); // Set initial date if available
//               }}
//               style={styles.container3}
//             >
//               <Text>
//                 {certificate.startDate
//                   ? formatDate(new Date(certificate.startDate))
//                   : "Select Start Date"}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => {
//                 setShowDatePicker(true); // Show date picker for end date
//                 setSelectedDate(
//                   certificate.endDate
//                     ? new Date(certificate.endDate)
//                     : new Date()
//                 ); // Set initial date if available
//               }}
//               style={styles.container3}
//             >
//               <Text>
//                 {certificate.endDate
//                   ? formatDate(new Date(certificate.endDate))
//                   : "Select End Date"}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => removeCertificate(index)}
//               style={{ alignItems: "flex-end", marginRight: "10%" }}
//             >
//               <MaterialIcons name="delete" size={40} color="red" />
//             </TouchableOpacity>
//           </View>
//         ))}

//         <View style={{ width: "90%" }}>
//           <Custombutton onPress={addCertificate}>
//             <Text>Add Certificate </Text>
//           </Custombutton>
//         </View>
//         <CustomTitle>Doctor Registration - Experience</CustomTitle>
//         {experiences.map((experience, index) => (
//           <View key={index} style={[styles.container2]}>
//             <TextInput
//               placeholder="Job Title"
//               style={styles.container3}
//               value={experience.title}
//               onChangeText={(text) =>
//                 handleExperienceChange(index, "title", text)
//               }
//             />
//             <TextInput
//               placeholder="Firm Name"
//               style={styles.container3}
//               value={experience.firm}
//               onChangeText={(text) =>
//                 handleExperienceChange(index, "firm", text)
//               }
//             />
//             <TextInput
//               placeholder="Department"
//               style={styles.container3}
//               value={experience.department}
//               onChangeText={(text) =>
//                 handleExperienceChange(index, "department", text)
//               }
//             />
//             <TextInput
//               placeholder="Start Date"
//               style={styles.container3}
//               value={experience.startDate}
//               onChangeText={(text) =>
//                 handleExperienceChange(index, "startDate", text)
//               }
//             />
//             <TextInput
//               placeholder="End Date"
//               style={styles.container3}
//               value={experience.endDate}
//               onChangeText={(text) =>
//                 handleExperienceChange(index, "endDate", text)
//               }
//             />
//             <TouchableOpacity
//               onPress={() => removeExperience(index)}
//               style={{ alignItems: "flex-end", marginRight: "10%" }}
//             >
//               <MaterialIcons name="delete" size={40} color="red" />
//             </TouchableOpacity>
//           </View>
//         ))}

//         <View style={{ width: "90%" }}>
//           <Custombutton onPress={addExperience}>
//             <Text>Add Experience</Text>
//           </Custombutton>
//         </View>
//         <View style={{ width: "90%" }}>
//           <Custombutton onPress={screen3}>
//             <Text>Next</Text>
//           </Custombutton>
//         </View>
//       </Scroll>
//     </SafeArea>
//   );
// }

export default function Register1({ navigation }) {
  const route = useRoute()
  // const { report, diagnosis, appointment_id } = route.params
  const [inputs, setInputs] = useState([]);
  const [certificates, setCertificates] = useState([])
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const addCertificates = () => {
    setInputs([...inputs, { id: Date.now(), certificateName: '', certificateAuthority: '', startDate: null, endDate: null }]);
  };

  const deleteCertificates = (id) => {
    setInputs(inputs.filter(inputSet => inputSet.id !== id));
  };

  const furtherDetails = () => {
    const certificates = inputs.map(inputset => {
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
    setCertificates(certificates);
    console.log(certificates);
    // navigation.navigate('furtherDetails', { report, diagnosis, certificates, appointment_id });
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      const certificates = inputs.map((inputSet, index) => {
        if (index === currentIndex) {
          if (currentPicker === 'start') {
            return { ...inputSet, startDate: selectedDate };
          } else if (currentPicker === 'end') {
            return { ...inputSet, endDate: selectedDate };
          }
        }
        return inputSet;
      });
      setInputs(certificates);
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
            <CustomTitle style={styles.titleProp}>Certificates</CustomTitle>
          </View>

          {inputs.map((inputSet, index) => (
            <View key={inputSet.id} style={styles.inputSet}>
              <TextInput
                style={styles.input}
                placeholder="Certificate name"
                value={inputSet.certificateName}
                onChangeText={(text) => {
                  const certificates = inputs.map(item => item.id === inputSet.id ? { ...item, certificateName: text } : item);
                  setInputs(certificates);
                }}
              />

              <TextInput
                style={styles.input}
                placeholder="Certificate authority"
                value={inputSet.certificateAuthority}
                onChangeText={(text) => {
                  const certificates = inputs.map(item => item.id === inputSet.id ? { ...item, certificateAuthority: text } : item);
                  setInputs(certificates);
                }}
              />

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

              <Custombutton onPress={() => deleteCertificates(inputSet.id)}>
                Delete current certificate
              </Custombutton>
            </View>
          ))}

          <Custombutton onPress={addCertificates}>
            Add certificate
          </Custombutton>
        </View>

        <Custombutton onPress={furtherDetails}>
          Next
        </Custombutton>
      </CustomScroll>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Horizontal center
    backgroundColor: "#f0f0f0",
  },

  container1: {
    marginTop: "5%",
    alignItems: "center", // Horizontal center
  },

  container3: {
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    textAlign: "center", // Centers the placeholder text
    margin: 10,
    backgroundColor: "white",
  },

  row: {
    flexDirection: "row",
  },

  text1: {
    color: "darkblue",
    fontSize: 30, // Added font size for better visibility
    marginTop: 10, // Space between image and text
  },

  text2: {
    color: "#1565c0",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: "20%",
  },

  input: {
    width: 270,
    height: 40,
    padding: 10,
  },

  icon: {
    flexDirection: "row",
    padding: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },

  link: {
    borderBottomColor: "blue",
    borderBottomWidth: 1,
    marginBottom: 7,
  },

  text3: {
    marginBottom: 7,
  },

  sign: {
    color: "blue",
  },
});

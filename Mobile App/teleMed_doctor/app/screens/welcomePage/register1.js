import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  Alert,
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
import { useRoute } from "@react-navigation/native";
export default function Register1({ navigation }) {
  // State variables to manage dynamic input fields for certificates and experiences
  const [certificatesInputs, setCertificatesInputs] = useState([]);
  const [experiencesInputs, setExperiencesInputs] = useState([]);
  // State variables to control the experience date picker
  const [showPickerexp, setShowPickerexp] = useState(false);
  const [currentPickerexp, setCurrentPickerexp] = useState(null);
  const [currentIndexexp, setCurrentIndexexp] = useState(null);
  const [isPickerVisibleexp, setIsPickerVisibleexp] = useState(false);
  // State variables to control the certificate date picker
  const [showPickercert, setShowPickercert] = useState(false);
  const [currentPickercert, setCurrentPickercert] = useState(null);
  const [currentIndexcert, setCurrentIndexcert] = useState(null);
  const [isPickerVisiblecert, setIsPickerVisiblecert] = useState(false);
  // Function to handle navigation to the next screen (register2)

  const screen3 = async () => {
    // Check if all certificates and experiences have start and end dates

    if (
      certificatesInputs.every((cert) => cert.startDate && cert.endDate) &&
      experiencesInputs.every((exp) => exp.startDate && exp.endDate)
    ) {
      // Store certificates and experiences data in local storage

      LocalStorage.setItem("certificates", JSON.stringify(experiencesInputs));
      LocalStorage.setItem("experiences", JSON.stringify(certificatesInputs));
      // Navigate to the next registration screen (register2)

      navigation.navigate("register2");
      // Retrieve data from local storage (for debugging/demonstration)

      const certificates = await LocalStorage.getItem("certificates");
      const experiences = await LocalStorage.getItem("experiences");
      console.log("Retrieved certificates:", certificates);
      console.log("Retrieved experiences:", experiences);
    } else {
      // Display an alert if any required date fields are missing

      Alert.alert("All fields including start and end dates are required!");
    }
  };
  // Function to add a new set of certificate input fields

  const addCertificates = () => {
    setCertificatesInputs([
      ...certificatesInputs,
      {
        id: Date.now(),
        certificateName: "",
        certificateAuthority: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };
  // Function to add a new set of experience input fields

  const addExperiences = () => {
    setExperiencesInputs([
      ...experiencesInputs,
      {
        id: Date.now(),
        department: "",
        firm: "",
        title: "",
        startDate: null,
        endDate: null,
      },
    ]);
  };
  // Function to delete a set of certificate input fields by ID

  const deleteCertificates = (id) => {
    setCertificatesInputs(
      certificatesInputs.filter((certificateSet) => certificateSet.id !== id)
    );
  };
  // Function to delete a set of experience input fields by ID

  const deleteExperiences = (id) => {
    setExperiencesInputs(
      experiencesInputs.filter((experienceSet) => experienceSet.id !== id)
    );
  };
  // Function to handle changes in the certificate date picker

  const onCertificatesDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      // Update the startDate or endDate of the selected certificate

      const certificates = certificatesInputs.map((certificateSet, index) => {
        if (index === currentIndexcert) {
          if (currentPickercert === "start") {
            return { ...certificateSet, startDate: selectedDate };
          } else if (currentPickercert === "end") {
            return { ...certificateSet, endDate: selectedDate };
          }
        }
        return certificateSet;
      });
      setCertificatesInputs(certificates);
    }
    // Handle date picker visibility based on platform (Android or iOS)

    if (Platform.OS === "android") {
      setShowPickercert(false);
      setIsPickerVisiblecert(false);
    } else {
      setShowPickercert(false);
    }
    setCurrentPickercert(null);
    setCurrentIndexcert(null);
  };
  // Function to handle changes in the experience date picker
  // ... similar logic to onCertificatesDateChange but for experiences

  const onExperiencesDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      const experiences = experiencesInputs.map((experienceSet, index) => {
        if (index === currentIndexexp) {
          if (currentPickerexp === "start") {
            return { ...experienceSet, startDate: selectedDate };
          } else if (currentPickerexp === "end") {
            return { ...experienceSet, endDate: selectedDate };
          }
        }
        return experienceSet;
      });
      setExperiencesInputs(experiences);
    }

    if (Platform.OS === "android") {
      setShowPickerexp(false);
      setIsPickerVisibleexp(false);
    } else {
      setShowPickerexp(false);
    }
    setCurrentPickerexp(null);
    setCurrentIndexexp(null);
  };
  // Function to show the experience date picker

  const showDatePickerExp = (pickerType, index) => {
    setCurrentPickerexp(pickerType);
    setCurrentIndexexp(index);

    setShowPickerexp(true);
    setIsPickerVisibleexp(Platform.OS === "android");
  };
  // Function to show the certificate date picker

  const showDatePickerCert = (pickerType, index) => {
    setCurrentPickercert(pickerType);
    setCurrentIndexcert(index);

    setShowPickercert(true);
    setIsPickerVisiblecert(Platform.OS === "android");
  };
  return (
    <SafeArea>
      <Scroll>
        <CustomTitle>Doctor Registration - Certificates</CustomTitle>
        {/* Dynamically generated input fields for certificates */}

        {certificatesInputs.map((certificateSet, index) => (
          <View key={certificateSet.id}>
            <TextInput
              style={styles.container3}
              placeholder="Certificate name"
              value={certificateSet.certificateName}
              onChangeText={(text) => {
                const certificates = certificatesInputs.map((item) =>
                  item.id === certificateSet.id
                    ? { ...item, certificateName: text }
                    : item
                );
                setCertificatesInputs(certificates);
              }}
            />

            <TextInput
              style={styles.container3}
              placeholder="Certificate authority"
              value={certificateSet.certificateAuthority}
              onChangeText={(text) => {
                const certificates = certificatesInputs.map((item) =>
                  item.id === certificateSet.id
                    ? { ...item, certificateAuthority: text }
                    : item
                );
                setCertificatesInputs(certificates);
              }}
            />

            <View style={styles.dateRow1}>
              <View style={styles.dateRow1}>
                <Text style={styles.textProp}>Start Date:</Text>
                {certificateSet.startDate ? (
                  <Text style={styles.inTextProp}>
                    {new Date(certificateSet.startDate).toDateString()}
                  </Text>
                ) : (
                  <Text style={styles.inTextProp}>No date selected</Text>
                )}
                <Button
                  title="Select Start Date"
                  onPress={() => showDatePickerCert("start", index)}
                />
              </View>
            </View>
            <View style={styles.dateRow1}>
              <Text style={styles.textProp}>End Date:</Text>
              {certificateSet.endDate ? (
                <Text style={styles.inTextProp}>
                  {new Date(certificateSet.endDate).toDateString()}
                </Text>
              ) : (
                <Text style={styles.inTextProp}>No date selected</Text>
              )}
              <Button
                title="  Select End Date  "
                onPress={() => showDatePickerCert("end", index)}
              />
            </View>
            <Button
              title="Delete certificate"
              onPress={() => deleteCertificates(certificateSet.id)}
            />
          </View>
        ))}
        <Custombutton onPress={addCertificates}>Add certificate</Custombutton>

        {/* Date picker component for certificates (conditionally rendered) */}
        {(showPickercert || isPickerVisiblecert) && (
          <DateTimePicker
            value={
              certificatesInputs[currentIndexcert]?.[
                currentPickercert === "start" ? "startDate" : "endDate"
              ] || new Date()
            }
            mode="date"
            display="default"
            onChange={onCertificatesDateChange}
          />
        )}
        <CustomTitle>Doctor Registration - Experience</CustomTitle>
        {/*input fields and logic for experiences */}

        {experiencesInputs.map((experienceSet, index) => (
          <View key={experienceSet.id}>
            <TextInput
              style={styles.container3}
              placeholder="Department"
              value={experienceSet.department}
              onChangeText={(text) => {
                const experiences = experiencesInputs.map((item) =>
                  item.id === experienceSet.id
                    ? { ...item, department: text }
                    : item
                );
                setExperiencesInputs(experiences);
              }}
            />
            <TextInput
              style={styles.container3}
              placeholder="firm"
              value={experienceSet.firm}
              onChangeText={(text) => {
                const experiences = experiencesInputs.map((item) =>
                  item.id === experienceSet.id ? { ...item, firm: text } : item
                );
                setExperiencesInputs(experiences);
              }}
            />
            <TextInput
              style={styles.container3}
              placeholder="title"
              value={experienceSet.title}
              onChangeText={(text) => {
                const experiences = experiencesInputs.map((item) =>
                  item.id === experienceSet.id ? { ...item, title: text } : item
                );
                setExperiencesInputs(experiences);
              }}
            />
            <View style={styles.dateRow}>
              <View style={[styles.cell, styles.dateRow1]}>
                <Text style={styles.textProp}>Start Date:</Text>
                {experienceSet.startDate ? (
                  <Text style={styles.inTextProp}>
                    {new Date(experienceSet.startDate).toDateString()}
                  </Text>
                ) : (
                  <Text style={styles.inTextProp}>No date selected</Text>
                )}
                <Button
                  title="Select Start Date"
                  onPress={() => showDatePickerExp("start", index)}
                />
              </View>
              <View style={[styles.cell, styles.dateRow1]}>
                <Text style={styles.textProp}>End Date:</Text>
                {experienceSet.endDate ? (
                  <Text style={styles.inTextProp}>
                    {new Date(experienceSet.endDate).toDateString()}
                  </Text>
                ) : (
                  <Text style={styles.inTextProp}>No date selected</Text>
                )}
                <Button
                  title="Select End Date"
                  onPress={() => showDatePickerExp("end", index)}
                />
              </View>
            </View>

            <Button
              title="Delete Experience"
              onPress={() => deleteExperiences(experienceSet.id)}
            />
          </View>
        ))}
        <Custombutton onPress={addExperiences}>Add experience</Custombutton>
        {(showPickerexp || isPickerVisibleexp) && (
          <DateTimePicker
            value={
              experiencesInputs[currentIndexexp]?.[
                currentPickerexp === "start" ? "startDate" : "endDate"
              ] || new Date()
            }
            mode="date"
            display="default"
            onChange={onExperiencesDateChange}
          />
        )}
        <Custombutton onPress={screen3}>Next</Custombutton>
      </Scroll>
    </SafeArea>
  );
}

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
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    textAlign: "center", // Centers the placeholder text
    margin: 5,
    backgroundColor: "white",
    justifyContent: "center",
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
  dateRow1: {
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "center",
    gap: 20,
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

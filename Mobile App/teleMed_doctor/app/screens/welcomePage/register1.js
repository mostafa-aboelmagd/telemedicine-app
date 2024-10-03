import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import SafeArea from "../../components/safeArea";
import Scroll from "../../components/scroll";
import Custombutton from "../../components/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTitle from "../../components/title";
import DatePicker from "react-native-date-picker";

export default function Register1({ navigation }) {
  const [certificates, setCertificates] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected date

  const addCertificate = () => {
    setCertificates([
      ...certificates,
      { name: "", authority: "", startDate: "", endDate: "" },
    ]);
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { title: "", firm: "", department: "", startDate: "", endDate: "" },
    ]);
  };
  const removeCertificate = (index) => {
    const updatedCertificates = [...certificates];
    updatedCertificates.splice(index, 1); // Remove the certificate at the given index
    setCertificates(updatedCertificates);
  };

  const removeExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1); // Remove the experience at the given index
    setExperiences(updatedExperiences);
  };
  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };
  const handleDateChange = (event, newDate) => {
    setSelectedDate(newDate); // Update selected date state
    setShowDatePicker(false); // Hide date picker
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for single-digit days
    return `<span class="math-inline">\{year\}\-</span>{month}-${day}`;
    // Formatted date string (YYYY-MM-DD)
  };
  const handleSaveDate = (index, field) => {
    const newDate = formatDate(selectedDate); // Get formatted date string
    if (field === "startDate") {
      handleCertificateChange(index, field, newDate);
    } else {
      handleExperienceChange(index, field, newDate);
    }
  };


  return (
    <SafeArea>
      <Scroll>
        <CustomTitle>Doctor Registration - Certificates</CustomTitle>
        {certificates.map((certificate, index) => (
          <View key={index} style={[styles.container2]}>
            <TextInput
              style={styles.container3}
              placeholder="Certificate Name"
              value={certificate.name}
              onChangeText={(text) =>
                handleCertificateChange(index, "name", text)
              }
            />

            <TextInput
              style={styles.container3}
              placeholder="Certificate Authority"
              value={certificate.authority}
              onChangeText={(text) =>
                handleCertificateChange(index, "authority", text)
              }
            />
            <TextInput
              style={styles.container3}
              placeholder="Start Date"
              editable={false}
              value={certificate.startDate}
              onChangeText={(text) =>
                handleCertificateChange(index, "startDate", text)
              }
            />
            <TextInput
              style={styles.container3}
              placeholder="End Date"
              value={certificate.endDate}
              onChangeText={(text) =>
                handleCertificateChange(index, "endDate", text)
              }
            />
            <TouchableOpacity
              onPress={() => removeCertificate(index)}
              style={{ alignItems: "flex-end", marginRight: "10%" }}
            >
              <MaterialIcons name="delete" size={40} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ width: "90%" }}>
          <Custombutton onPress={addCertificate}>
            <Text>Add Certificate </Text>
          </Custombutton>
        </View>
        <CustomTitle>Doctor Registration - Experience</CustomTitle>
        {experiences.map((experience, index) => (
          <View key={index} style={[styles.container2]}>
            <TextInput
              placeholder="Job Title"
              style={styles.container3}
              value={experience.title}
              onChangeText={(text) =>
                handleExperienceChange(index, "title", text)
              }
            />
            <TextInput
              placeholder="Firm Name"
              style={styles.container3}
              value={experience.firm}
              onChangeText={(text) =>
                handleExperienceChange(index, "firm", text)
              }
            />
            <TextInput
              placeholder="Department"
              style={styles.container3}
              value={experience.department}
              onChangeText={(text) =>
                handleExperienceChange(index, "department", text)
              }
            />
            <TextInput
              placeholder="Start Date"
              style={styles.container3}
              value={experience.startDate}
              onChangeText={(text) =>
                handleExperienceChange(index, "startDate", text)
              }
            />
            <TextInput
              placeholder="End Date"
              style={styles.container3}
              value={experience.endDate}
              onChangeText={(text) =>
                handleExperienceChange(index, "endDate", text)
              }
            />
            <TouchableOpacity
              onPress={() => removeExperience(index)}
              style={{ alignItems: "flex-end", marginRight: "10%" }}
            >
              <MaterialIcons name="delete" size={40} color="red" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ width: "90%" }}>
          <Custombutton onPress={addExperience}>
            <Text>Add Experience</Text>
          </Custombutton>
        </View>
        <View style={{ width: "90%" }}>
          <Custombutton onPress={() => navigation.navigate("register2")}>
            <Text>Next</Text>
          </Custombutton>
        </View>
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
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    textAlign: 'center', // Centers the placeholder text
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

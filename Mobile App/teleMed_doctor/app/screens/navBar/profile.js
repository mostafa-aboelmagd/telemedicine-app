import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SafeArea from "../../components/safeArea";
import Custombutton from "../../components/button";
import Footer from "../../components/footer";
import CustomScroll from "../../components/scroll";
import { NEXT_PUBLIC_SERVER_NAME } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Rating } from 'react-native-ratings';

let sixtyMinPrice_;
let thirtyMinPrice_;
export default function Profile({ navigation }) {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedCertId, setSelectedCertId] = useState(null);
  const [selectedExpId, setSelectedExpId] = useState(null);
  const [selectedInterestId, setSelectedInterestId] = useState(null);
  const [rating, setRating] = useState(3)

  // State for add functions
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [showAddExpModal, setShowAddExpModal] = useState(false);
  const [showAddInterestModal, setShowAddInterestModal] = useState(false);
  const [showAddLangModal, setShowAddLangModal] = useState(false);

  // State for new certificate
  const [newCertName, setNewCertName] = useState("");
  const [newCertAuthority, setNewCertAuthority] = useState("");
  const [newCertStartDate, setNewCertStartDate] = useState("");
  const [newCertEndDate, setNewCertEndDate] = useState("");

  // State for new experience
  const [newExpTitle, setNewExpTitle] = useState("");
  const [newExpFirm, setNewExpFirm] = useState("");
  const [newExpStartDate, setNewExpStartDate] = useState("");
  const [newExpEndDate, setNewExpEndDate] = useState("");

  // State for new interest
  const [newInterestName, setNewInterestName] = useState("");
  const [newInterestCategory, setNewInterestCategory] = useState("");

  // State for new language
  const [newLanguage, setNewLanguage] = useState("");
  const handleAddCertificate = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/certificates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            name: newCertName,
            authority: newCertAuthority,
            startDate: newCertStartDate,
            endDate: newCertEndDate,
          }),
        }
      );

      if (response.ok) {
        // Certificate added successfully
        const newCert = await response.json(); // Get the newly created certificate from the response
        setData((prevData) => ({
          ...prevData,
          certificates: [...prevData.certificates, newCert],
        }));
        // Clear input fields
        setNewCertName("");
        setNewCertAuthority("");
        setNewCertStartDate("");
        setNewCertEndDate("");
      } else {
        // Handle error
        console.error("Error adding certificate:", response.status);
      }
    } catch (error) {
      console.error("Error adding certificate:", error);
    } finally {
      console.log(
        "AddCertificate",
        JSON.stringify({
          name: newCertName,
          authority: newCertAuthority,
          startDate: newCertStartDate,
          endDate: newCertEndDate,
        })
      );
      setShowAddCertModal(false);
    }
  };
  const handleAddExperience = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/experiences`, // Replace with your API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            title: newExpTitle,
            firm: newExpFirm,
            startDate: newExpStartDate,
            endDate: newExpEndDate,
          }),
        }
      );

      if (response.ok) {
        // Experience added successfully
        const newExp = await response.json(); // Get the newly created experience from the response
        setData((prevData) => ({
          ...prevData,
          experiences: [...prevData.experiences, newExp],
        }));
        // Clear input fields
        setNewExpTitle("");
        setNewExpFirm("");
        setNewExpStartDate("");
        setNewExpEndDate("");
      } else {
        // Handle error
        console.error("Error adding experience:", response.status);
      }
    } catch (error) {
      console.error("Error adding experience:", error);
    } finally {
      setShowAddExpModal(false);
    }
  };

  const handleAddInterest = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/interests`, // Replace with your API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            name: newInterestName,
            category: newInterestCategory,
          }),
        }
      );

      if (response.ok) {
        // Interest added successfully
        const newInterest = await response.json(); // Get the newly created interest from the response
        setData((prevData) => ({
          ...prevData,
          interests: [...prevData.interests, newInterest],
        }));
        // Clear input fields
        setNewInterestName("");
        setNewInterestCategory("");
      } else {
        // Handle error
        console.error("Error adding interest:", response.status);
      }
    } catch (error) {
      console.error("Error adding interest:", error);
    } finally {
      console.log(
        "Addedinterest",
        JSON.stringify({
          name: newInterestName,
          category: newInterestCategory,
        })
      );
      setShowAddInterestModal(false);
    }
  };

  const handleAddLanguage = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/languages`, // Replace with your API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: JSON.stringify({
            name: newLanguage, // Assuming your API expects a "name" field for the language
          }),
        }
      );

      if (response.ok) {
        // Language added successfully
        const newLang = await response.json(); // Get the newly added language from the response
        setData((prevData) => ({
          ...prevData,
          Languages: [...prevData.Languages, newLang.name], // Update the Languages array with the new language name
        }));
        // Clear input field
        setNewLanguage("");
      } else {
        // Handle error
        console.error("Error adding language:", response.status);
      }
    } catch (error) {
      console.error("Error adding language:", error);
    } finally {
      console.log(
        "Added language",
        JSON.stringify({
          name: newLanguage, // Assuming your API expects a "name" field for the language
        })
      );
      setShowAddLangModal(false);
    }
  };
  const handleDeleteCertificate = async (certId) => {
    try {
      const response = await fetch(
        `<span class="math-inline">\{NEXT\_PUBLIC\_SERVER\_NAME\}/doctor/profile/certificates/</span>{certId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (response.ok) {
        // Certificate deleted successfully
        // Update the UI by removing the certificate from the data state
        setData((prevData) => ({
          ...prevData,
          certificates: prevData.certificates.filter(
            (cert) => cert.id !== certId
          ),
        }));
      } else {
        // Handle error
        console.error("Error deleting certificate:", response.status);
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    } finally {
      console.log("DeleteCertificate", certId);
      setShowCertModal(false); // Close the modal after the request
    }
  };
  const handleDeleteExperience = async (expId) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/experiences/${expId}`, // Replace with your API endpoint
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (response.ok) {
        // Experience deleted successfully
        setData((prevData) => ({
          ...prevData,
          experiences: prevData.experiences.filter((exp) => exp.id !== expId),
        }));
      } else {
        // Handle error
        console.error("Error deleting experience:", response.status);
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    } finally {
      console.log("DeleteExperience", expId);
      setShowExpModal(false);
    }
  };

  const handleDeleteInterest = async (interestId) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/interests/${interestId}`, // Replace with your API endpoint
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (response.ok) {
        // Interest deleted successfully
        setData((prevData) => ({
          ...prevData,
          interests: prevData.interests.filter(
            (interest) => interest.id !== interestId
          ),
        }));
      } else {
        // Handle error
        console.error("Error deleting interest:", response.status);
      }
    } catch (error) {
      console.error("Error deleting interest:", error);
    } finally {
      console.log("DeleteInterest", interestId);
      setShowInterestModal(false);
    }
  };
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token !== null) {
        // Token retrieved
        return token;
      }
    } catch (e) {
      // error reading value
      console.log("Error retrieving token", e);
    }
    return null;
  };
  
  const fetchDoctorInfo = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (!response.ok) {
        await AsyncStorage.removeItem("userToken");
        navigation.navigate("sign in");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDoctorInfo(data.formattedDoctor);
    } finally {
      setIsLoading(false);
    }
  };

  const [moreData, setMoreData] = useState({
    "certificates": [
        {
            "id": 22,
            "authority": "Test firm",
            "startDate": "2015-10-05T22:00:00.000Z",
            "endDate": "2024-10-05T21:00:00.000Z",
            "name": "Test title"
        }
    ],
    "experiences": [
        {
            "id": 14,
            "department": "Test certificate ",
            "firm": "Test auth ",
            "startDate": "2010-10-05T22:00:00.000Z",
            "endDate": "2014-10-05T22:00:00.000Z",
            "title": null
        }
    ],
    "interests": [
        {
            "id": 15,
            "category": "Cat1",
            "name": "Interest test 1"
        },
        {
            "id": 16,
            "category": "Cat2",
            "name": "Interest 2"
        }
    ],
    "languages": [
        {
            "id": 70,
            "name": "English"
        },
        {
            "id": 71,
            "name": "Spanish"
        },
        {
            "id": 72,
            "name": "French"
        },
        {
            "id": 73,
            "name": "Arabic"
        }
    ]
   }
  );
  
  const moreInfo = async () => {
    setIsLoading(true);  // Start the loading state
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/DoctorFurtherInformation`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
  
      if (!response.ok) {
        console.log('Response not ok');
        await AsyncStorage.removeItem("userToken");
        navigation.navigate("sign in");
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();  
      // Update state with new data
      setMoreData({
        certificates: data.certificates,  // Provide default empty array
        experiences: data.experiences,
        interests: data.interests,
        languages: data.languages,
      });
  
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);  // End the loading state
    }
  };
  

  useFocusEffect(
    React.useCallback(() => {
      fetchDoctorInfo();
      moreInfo();
      console.log(moreData);
    }, []) // Empty dependency array
  );

  const logOut = async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem("userToken");

      // Double-check by trying to get the token to confirm deletion
      const token = await AsyncStorage.getItem("userToken");

      // If the token no longer exists, navigate to Sign In screen
      if (!token) {
        navigation.navigate("sign in"); // Ensure the route name is correctly typed
      } else {
        console.log("Error: Token still exists after deletion"); // Debugging message
      }
    } catch (e) {
      console.log("Error during logout:", e); // Handle errors gracefully
    }
  };

  const availability = () => {
    navigation.navigate("availability");
  };
  const changePassword = () => {
    navigation.navigate("changePassword");
  };

  const edit_info = (info) => {
    navigation.navigate("edit info", { info: info });
  };

  const renderProfileInfo = () => {
    const {
      firstName,
      lastName,
      email,
      gender,
      phone,
      image,
      residenceCountry,
      sixtyMinPrice,
      thirtyMinPrice,
      specialization,
      languages,
    } = doctorInfo;
    sixtyMinPrice_ = sixtyMinPrice;
    thirtyMinPrice_ = thirtyMinPrice;
    // console.log(doctorInfo)
    return (
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/images/pp.png")
              }
              style={styles.profileImage}
            />
            <Rating
              readonly={true}
              startingValue={rating}
              style={{marginBottom: '2%'}}
              imageSize={15}
              />
            <TouchableOpacity onPress={() => edit_info(doctorInfo)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.name}>
                Dr. {firstName} {lastName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="medical-services" size={20} />
              <Text style={styles.infoText}>Specialty: {specialization}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} />
              <Text style={styles.infoText}>{email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} />
              <Text style={styles.infoText}>{phone}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeArea>
      <CustomScroll>
        <View style={[styles.headerRow]}>
          <Text style={styles.title}>Doctor Profile</Text>
          <View style={{ width: 48 }} />
        </View>

        {renderProfileInfo()}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <Text style={styles.sectionContent}></Text>
          <Custombutton onPress={availability}>
            <Text style={styles.actionButtonText}>Edit Availability</Text>
          </Custombutton>
        </View>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {moreData.experiences.map((exp, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.sectionContent}>Title: {exp.title}</Text>
                <Text style={styles.sectionContent}>Firm: {exp.firm}</Text>
                <Text style={styles.sectionContent}>
                  From: {exp.startDate.split('T')[0]} To: {exp.endDate.split('T')[0]}
                </Text>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowAddExpModal(true)}
              >
                <Text style={styles.actionButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowExpModal(true)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {moreData.certificates.map((cert, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionContent}>Name: {cert.name}</Text>
                <Text style={styles.sectionContent}>
                  Authority: {cert.authority}
                </Text>
                <Text style={styles.sectionContent}>
                  From: {cert.startDate.split('T')[0]} To: {cert.endDate.split('T')[0]}
                </Text>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowAddCertModal(true)}
              >
                <Text style={styles.actionButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCertModal(true)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {moreData.languages.map((lang, index) => (
              <Text key={index} style={styles.sectionContent}>
                {lang.name}
              </Text>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowAddLangModal(true)}
              >
                <Text style={styles.actionButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Interests</Text>
            {moreData.interests.map((interest, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.sectionContent}>
                  {interest.name} - {interest.category}
                </Text>
              </View>
            ))}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowAddInterestModal(true)}
              >
                <Text style={styles.actionButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowInterestModal(true)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <Text style={styles.sectionContent}>
            30 min price: {thirtyMinPrice_}
          </Text>
          <Text style={styles.sectionContent}>
            60 min price: {sixtyMinPrice_}
          </Text>
          <Custombutton>
            <Text style={styles.actionButtonText}>Edit Pricing</Text>
          </Custombutton>
          <Custombutton>
            <Text style={styles.actionButtonText}>Manage Appointments</Text>
          </Custombutton>
          <Custombutton
            onPress={() => {
              changePassword();
            }}
          >
            <Text style={styles.passwordChangeText}>Change Password</Text>
          </Custombutton>
        </View>
        <TouchableOpacity onPress={logOut} style={styles.signOutButton}>
          <Ionicons name="log-out" size={25} color="red" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </CustomScroll>
      <Modal visible={showCertModal} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Certificate</Text>
            {moreData.certificates.map((cert) => (
              <TouchableOpacity
                key={cert.id}
                onPress={() => setSelectedCertId(cert.id)}
                style={styles.modalItem}
              >
                <Text style={styles.modalText}>{cert.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleDeleteCertificate(selectedCertId)}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowCertModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={showExpModal} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Experience</Text>
            {moreData.experiences.map((exp) => (
              <TouchableOpacity
                key={exp.id}
                onPress={() => setSelectedExpId(exp.id)}
                style={styles.modalItem}
              >
                <Text>
                  {exp.title} at {exp.firm}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleDeleteExperience(selectedExpId)}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowExpModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal for adding experience */}
      <Modal visible={showAddExpModal} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Experience</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Job Title"
              value={newExpTitle}
              onChangeText={setNewExpTitle}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Company/Institution"
              value={newExpFirm}
              onChangeText={setNewExpFirm}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Start Date (YYYY-MM-DD)"
              value={newExpStartDate}
              onChangeText={setNewExpStartDate}
            />
            <TextInput
              style={styles.inputField}
              placeholder="End Date (YYYY-MM-DD)"
              value={newExpEndDate}
              onChangeText={setNewExpEndDate}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddExperience} // Call the appropriate function
            >
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowAddExpModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for adding interest */}
      <Modal
        visible={showAddInterestModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Interest</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Interest Name"
              value={newInterestName}
              onChangeText={setNewInterestName}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Category"
              value={newInterestCategory}
              onChangeText={setNewInterestCategory}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddInterest} // Call the appropriate function
            >
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowAddInterestModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for adding language */}
      <Modal
        visible={showAddLangModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Language</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Language"
              value={newLanguage}
              onChangeText={setNewLanguage}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddLanguage} // Call the appropriate function
            >
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowAddLangModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showAddCertModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Certificate</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Certificate Name"
              value={newCertName}
              onChangeText={setNewCertName}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Issuing Authority"
              value={newCertAuthority}
              onChangeText={setNewCertAuthority}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Start Date (YYYY-MM-DD)"
              value={newCertStartDate}
              onChangeText={setNewCertStartDate}
            />
            <TextInput
              style={styles.inputField}
              placeholder="End Date (YYYY-MM-DD)"
              value={newCertEndDate}
              onChangeText={setNewCertEndDate}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleAddCertificate}
            >
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowAddCertModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showInterestModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Interest</Text>
            {moreData.interests.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                onPress={() => setSelectedInterestId(interest.id)}
                style={styles.modalItem}
              >
                <Text>
                  {interest.name} - {interest.category}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleDeleteInterest(selectedInterestId)}
            >
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowInterestModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Footer navigation={navigation} />
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  headerRow: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backIcon: {
    color: "#1565c0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565c0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 16,
    marginBottom: 10, // Adjust the value as needed
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // Add a subtle shadow for Android
  },
  modalItem: {
    backgroundColor: "#f0f0f0", // Add a background color
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%", // Make items take full width
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Add spacing above the buttons
    width: "50%", // Adjust button width
    alignItems: "center", // Center the text
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: '5%',
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  editButtonText: {
    color: "#1565c0",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#1565c0",
    width: 80,
    textAlign: "center",
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 16,
    color: "#333",
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: "#1565c0",
    padding: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  passwordChangeText: {
    color: "#1de9b6",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
  },
  signOutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    // marginBottom: '25%'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 10, // Add marginBottom here for spacing between button groups
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    // marginBottom: 10,  <-- Remove marginBottom from here
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
  },
  signOutText: {
    color: "red",
    marginLeft: 8,
    fontSize: 16,
  },
});

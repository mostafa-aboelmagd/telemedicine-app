import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SafeArea from '../../components/safeArea';
import Custombutton from '../../components/button';
import Footer from '../../components/footer';
import CustomScroll from '../../components/scroll';
import { NEXT_PUBLIC_SERVER_NAME } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

let sixtyMinPrice_
let thirtyMinPrice_
export default function Profile({ navigation }) {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        // Token retrieved
        return token;
      }
    } catch (e) {
      // error reading value
      console.log('Error retrieving token', e);
    }
    return null;
  };

  const fetchDoctorInfo = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/doctor/profile/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getToken()}`,

        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setDoctorInfo(data.formattedDoctor);
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  // const logOut = async () => {
  //   await AsyncStorage.removeItem('userToken');
  //   const token = await getToken()
  //   if (!token) {
  //     navigation.navigate('sign in');
  //   }
  // };
  const logOut = async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem('userToken');

      // Double-check by trying to get the token to confirm deletion
      const token = await AsyncStorage.getItem('userToken');

      // If the token no longer exists, navigate to Sign In screen
      if (!token) {
        navigation.navigate('sign in');  // Ensure the route name is correctly typed
      } else {
        console.log('Error: Token still exists after deletion'); // Debugging message
      }
    } catch (e) {
      console.log('Error during logout:', e); // Handle errors gracefully
    }
  };

  const availability = () => {
    navigation.navigate('availability');
  };
  const changePassword = () => {
    navigation.navigate('changePassword');
  };

  const renderProfileInfo = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

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
    sixtyMinPrice_ = sixtyMinPrice
    thirtyMinPrice_ = thirtyMinPrice
    return (
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <Image source={image ? { uri: image } : require('../../../assets/images/pp.png')} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.name}>
                Dr. {firstName} {lastName}
              </Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
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
            {/* Other info rows */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeArea>
      <CustomScroll>
        <View style={[styles.headerRow]}>
          {/* <TouchableOpacity>
            <Ionicons name="arrow-back" size={35} style={styles.backIcon} />
          </TouchableOpacity> */}
          <Text style={styles.title}>Doctor Profile</Text>
          <View style={{ width: 48 }} />
        </View>

        {renderProfileInfo()}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Years of Experience</Text>
          <Text style={styles.sectionContent}>10 Years</Text>
          <Custombutton>
            <Text style={styles.actionButtonText}>Edit Experience</Text>
          </Custombutton>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <Text style={styles.sectionContent}>Mon / 2 pm - 4 pm</Text>
          <Custombutton onPress={availability}>
            <Text style={styles.actionButtonText}>Edit Availability</Text>
          </Custombutton>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <Text style={styles.sectionContent}>30 minutes price: {thirtyMinPrice_}</Text>
          <Text style={styles.sectionContent}>60 minutes price: {sixtyMinPrice_}</Text>
          <Custombutton>
            <Text style={styles.actionButtonText}>Edit Pricing</Text>
          </Custombutton>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Reserved Appointments</Text>
          <Text style={styles.sectionContent}>03:30 pm - Mon</Text>
          <Custombutton>
            <Text style={styles.actionButtonText}>Manage Appointments</Text>
          </Custombutton>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Password</Text>
          <Custombutton onPress={()=>{changePassword()}}>
            <Text style={styles.passwordChangeText}>Change Password</Text>
          </Custombutton>
        </View>

        <TouchableOpacity
          onPress={logOut}
          style={styles.signOutButton}
        >
          <Ionicons name="log-out" size={25} color="red" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </CustomScroll>
      <Footer navigation={navigation} />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerRow: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backIcon: {
    color: '#1565c0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565c0',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 8,
    padding: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: '#1565c0',
    fontSize: 14,
    marginLeft: '30%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: '#1565c0',
    padding: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  passwordChangeText: {
    color: '#1de9b6',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    // marginBottom: '25%'
  },
  signOutText: {
    color: 'red',
    marginLeft: 8,
    fontSize: 16,
  },
});

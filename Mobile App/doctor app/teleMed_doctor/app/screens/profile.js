import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SafeArea from '../components/safeArea';
import Custombutton from '../components/button';
import Footer from '../components/footer';
import CustomScroll from '../components/scroll';

export default function Profile ({ navigation }){

  const logOut = () => {
    navigation.navigate("sign in")
  }

  return (
    <SafeArea>
      <CustomScroll>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={35} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Doctor Profile</Text>
          <View style={{ width: 48 }} />
        </View>

        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Image source={require('../../assets/images/pp.png')}
            style={styles.profileImage} />
            <View style={styles.profileInfo}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.name}>Dr. John Doe</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="medical-services" size={20} />
                <Text style={styles.infoText}>Specialty: Cardiologist</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="mail" size={20} />
                <Text style={styles.infoText}>dr.johndoe@hospital.com</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="call" size={20} />
                <Text style={styles.infoText}>01234567892</Text>
              </View>
              {/* <View style={styles.infoRow}>
                <Ionicons name="calendar" size={20} />
                <Text style={styles.infoText}>1990</Text>
              </View> */}
            </View>
          </View>
        </View>

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
          <Custombutton>
            <Text style={styles.actionButtonText}>Edit Availability</Text>
          </Custombutton>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <Text style={styles.sectionContent}>30 minutes price</Text>
          <Text style={styles.sectionContent}>60 minutes price</Text>
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
          <Text style={styles.passwordChangeText}>Change Password</Text>
        </View>

        <TouchableOpacity
        onPress={logOut}
          style={styles.signOutButton}
        >
          <Ionicons name="log-out" size={25} color="red" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </CustomScroll>
      <Footer navigation={navigation}/>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

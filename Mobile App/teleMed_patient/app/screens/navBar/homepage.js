import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SafeArea from "../../components/safeArea";
import Footer from "../../components/footer";
import CustomTitle from "../../components/title";
import { NEXT_PUBLIC_SERVER_NAME } from "@env";
import { getToken } from "../../components/getToken";
import CustomScroll from "../../components/scroll";
import Entypo from "@expo/vector-icons/Entypo";
import Custombutton from "../../components/button";

export default function HomePage({ navigation }) {
  const [doctors, setDoctors] = useState();
  const [loading, setLoading] = useState(true);

  const getDoctors = async () => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/patient/home`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("could not find doctors information");
      }
      const result = await response.json();
      console.log(result);
      setDoctors(result);
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    } finally {
      setLoading(false);
    }
  };
  const book = (doctorData) => {
    navigation.navigate("book", { doctorData });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <SafeArea>
      <CustomScroll>
        <View style={styles.container}>
          <CustomTitle>Appointments</CustomTitle>
          <Text>Explore Doctors</Text>
        </View>
        {!loading ? (
          doctors ? (
            doctors.map((item, id) => (
              <View key={id}>
                <View style={[styles.card]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.state}>
                      {item.rating} Stars/ {item.numReviews} Sessions
                    </Text>
                    <View style={{ justifyContent: "flex-end" }}>
                      <TouchableOpacity>
                        <Entypo
                          name="dots-three-horizontal"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text key={id} style={styles.name}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text key={id} style={styles.name}>
                      Speciality : {item.title}
                    </Text>
                    <Text> / {item.interests}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.state1}>
                      {item.fees60min}/60 min | {item.fees30min}/30 min
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        const doctorData = {
                          id: item.id,
                          rating: item.rating,
                          numReviews: item.numReviews,
                          name: item.name,
                          title: item.title,
                          interests: item.interests,
                          fees60min: item.fees60min,
                          fees30min: item.fees30min,
                        };
                        book(doctorData);
                      }}
                    >
                      <Text style={styles.state1}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text>No upcoming appointments</Text>
          )
        ) : (
          <Text>Loading</Text>
        )}
      </CustomScroll>
      <Footer navigation={navigation} />
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    marginTop: "3%",
    width: "100%",
    height: 150,
    padding: 10,
    backgroundColor: "white",
  },
  state: {
    backgroundColor: "black",
    padding: 5,
    borderRadius: 10,
    color: "white",
    width: 125,
    textAlign: "center",
    marginBottom: "3%",
  },
  state1: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 10,
    color: "white",
    width: 150,
    textAlign: "center",
    marginBottom: "3%",
  },
  name: {
    marginBottom: "3%",
  },
});

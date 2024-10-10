import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import LocalStorage from "../../components/LocalStorage";
import SafeArea from "../../components/safeArea";
import CustomScroll from "../../components/scroll";
import CustomTitle from "../../components/title";
import { getToken } from "../../components/getToken";
import { NEXT_PUBLIC_SERVER_NAME } from "@env";
import { Calendar } from "react-native-calendars";

export default function book({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availabilityData, setAvailabilityData] = useState(null);
  const [slotdaycode, setslotdaycode] = useState(null);
  const [slothourcode, setslothourcode] = useState(null);
  const [slottypecode, setslottypecode] = useState(null);

  const [isOnline, setIsOnline] = useState("L");
  const [slotduration, setslotduration] = useState(30);
  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState("");

  const days = {
    1: "sat",
    2: "sun",
    3: "mon",
    4: "tue",
    5: "wed",
    6: "thu",
    7: "fri",
  };

  const decodeSlots = (slotsString) => {
    const decodedSlots = {};
    if (slotsString) {
      slotsString.split(",").forEach((timeslot) => {
        const [day, slot, status] = timeslot.split("_");
        const key = days[day];
        if (!decodedSlots[key]) {
          decodedSlots[key] = [];
        }
        decodedSlots[key].push({ slot, status }); // Store as object
      });
    }
    return decodedSlots;
  };

  // Online / On-site switch
  const online = () => {
    setIsOnline(isOnline === "L" ? "S" : "L");
  };
  const duration = () => {
    setslotduration(slotduration === 30 ? 60 : 30);
  };

  // Improved slot filtering
  const isSlotAvailable = (slot) => {
    const decoded = decodeSlots(availabilityData?.available_slots);
    const dayOfWeek = days[new Date(selectedDate).getDay() + 1];
    if (decoded[dayOfWeek]) {
      return decoded[dayOfWeek].some(
        (s) => s.slot === slot && s.status === isOnline
      );
    }
    return false;
  };

  const chosenSlot = async (hour) => {
    const dayOfWeek = new Date(selectedDate).getDay() + 1;
    setslotdaycode(dayOfWeek);
    setslothourcode(hour);
    setslottypecode(isOnline);

    if (isSlotAvailable(hour)) {
      setModalVisible(true);
    } else {
      alert("This slot is not available.");
    }
  };

  const bookfollowup = async (comp) => {
    const dayOfWeek = new Date(selectedDate).getDay() + 1;
    const slotHour = parseInt(slothourcode, 10) + 8;
    const formattedHour = slotHour < 10 ? `0${slotHour}` : `${slotHour}`;
    const dateTime = `${selectedDate}T${formattedHour}:00:00.000Z`;
    const appointment_id = await LocalStorage.getItem(
      "appointment_id",
      appointment_id
    );
    const appointmentbody = JSON.stringify({
      time_slot_code: `${slotdaycode}_${slothourcode}_${slottypecode}`,
      appointment_date: dateTime,
      complaint: comp,
      duration: slotduration,
      appointmentId: appointment_id,
    });

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/BookFollowUp/FollowupAppointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: appointmentbody,
        }
      );
      if (response.ok) {
        alert("Follow up appointment booked successfully");
        navigation.navigate("appointment");
        return;
      }
      if (!response.ok) {
        alert("Booking error: " + response);

        return;
      }
    } catch (error) {
      alert("Error booking follow-up:", error);
    }
  };

  const getSlotTime = (slot) => {
    const slotHour = parseInt(slot, 10) + 8;
    const formattedHour = slotHour < 10 ? `0${slotHour}` : `${slotHour}`;
    return `${formattedHour}:00:00.000Z`;
  };

  const getStyle = (slot) => {
    if (isSlotBooked(selectedDate, slot)) {
      return styles.slot; // Booked slot style
    }

    if (isSlotAvailable(slot)) {
      return styles.availableSlot; // Available slot style
    } else {
      return styles.slot; // Default slot style
    }
  };
  const isSlotBooked = (date, slot) => {
    if (availabilityData && availabilityData.booked) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const slotTime = getSlotTime(slot);
      const bookedDateTime = `${formattedDate}T${slotTime}`;
      return availabilityData.booked.includes(bookedDateTime);
    }
    return false;
  };

  const getSlotsForDay = () => {
    const decoded = decodeSlots(availabilityData?.available_slots);
    const dayOfWeek = days[new Date(selectedDate).getDay() + 1];
    if (decoded[dayOfWeek]) {
      return decoded[dayOfWeek].filter(
        (s) => isSlotAvailable(s.slot) && !isSlotBooked(selectedDate, s.slot)
      );
    }
    return [];
  };
  const slots = getSlotsForDay();

  const getAvailabilSlots = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/patient/appointment/Availabilities/00`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok", response);
      }

      const result = await response.json();
      console.log(JSON.stringify(result));
      setAvailabilityData(result);
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
    }
  };

  useEffect(() => {
    getAvailabilSlots();
  }, []);
  const formatSlotTime = (slotTime) => {
    const [hour, minute] = slotTime.slice(0, 5).split(":");
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? "pm" : "am";
    const formattedHour = hourNum % 12 || 12; // Convert to 12-hour format
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{ textAlign: "center" }}>
          Follow up appointment
        </CustomTitle>
        <Calendar
          onDayPress={(day) => {
            const today = new Date();
            const selectedDay = new Date(day.dateString);
            if (selectedDay >= today) {
              setSelectedDate(day.dateString);
            }
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
          minDate={new Date().toISOString().split("T")[0]}
        />
        <CustomScroll>
          {slots.length > 0 ? ( // Check if there are any slots
            <View style={styles.row}>
              {slots.map((slot) => (
                <TouchableOpacity
                  key={slot.slot}
                  onPress={() => chosenSlot(slot.slot)}
                >
                  <Text style={getStyle(slot.slot)}>
                    {formatSlotTime(getSlotTime(slot.slot))}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <CustomTitle titleStyle={{ textAlign: "center" }}>
              No slots available for this day
            </CustomTitle>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={online}>
              <Text style={styles.button}>
                {isOnline === "L" ? "Online" : "On-site"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={duration}>
              <Text style={styles.button}>
                {slotduration === 30 ? "30 min" : "60 min"}
              </Text>
            </TouchableOpacity>
          </View>
        </CustomScroll>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.done}>Back</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setUserInput}
              value={userInput}
              placeholder="Enter your complaint"
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                bookfollowup(userInput);
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "#f0f0f0",
    marginTop: "10%",
  },
  item: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderColor: "lightgray",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  slot: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    color: "white",
    width: 105,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  availableSlot: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    color: "white",
    width: 105,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  switch: {
    marginRight: 10,
  },
  switchTextRemove: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  switchTextAdd: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    margin: 10,
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    fontSize: 18,
    width: 100,
    textAlign: "center",
    color: "#1565c0",
    borderColor: "#1565c0",
  },
  done: {
    position: "absolute",
    bottom: 10, // Distance from the bottom of the page
    left: "37%", // Optional: Adjust the distance from the left/right
    padding: 5,
    borderRadius: 15,
    fontSize: 20,
    width: 100,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#1565c0",
    borderWidth: 1,
    borderColor: "darkgray",
  },
  message: {
    position: "absolute",
    bottom: 160, // Distance from the bottom of the page
    left: "15%", // Optional: Adjust the distance from the left/right
    padding: 5,
    fontSize: 18,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,

    borderColor: "gray",
    padding: 10,
    marginBottom: 15,
    width: "100%",
    textAlignVertical: "top", // Allow multiline input
  },
  durationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
  },
});

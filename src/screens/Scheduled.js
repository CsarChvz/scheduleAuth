import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from "react-redux";
import { addNewSlot, removeActiveSlote } from "../features/schedules/schedules";

import Ionicons from "@expo/vector-icons/Ionicons";
function Scheduled() {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");
  const [dateSelected, setDateSelected] = React.useState();
  const [datos, setdatos] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const { newSlots, removeSlots } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  // variables
  const snapPoints = useMemo(() => ["25%", "75%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  useEffect(() => {
    setdatos(newSlots);
  }, [newSlots]);

  const data = useMemo(
    () =>
      Array(48)
        .fill(0)
        .map((_, index) => {
          const hour = Math.floor(index / 2)
            .toString()
            .padStart(2, "0"); // obtener las horas
          const minute = index % 2 ? "30" : "00"; // obtener los minutos

          const newDate = new Date(dateSelected);
          newDate.setUTCHours(hour);
          newDate.setUTCMinutes(minute);

          const map = {
            id: index + 1,
            label: `${hour}:${minute}`,
            timestamp: newDate.getTime(),
          };
          return map;
        }),
    [dateSelected] // agregar dateSelected como dependencia
  );

  const renderItem = useCallback(
    (item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.itemContainer}
        onPress={() => {
          if (!newSlots.some((slot) => slot.timestamp === item.timestamp)) {
            dispatch(addNewSlot(item));
          } else if (
            !removeSlots.some((slot) => slot.timestamp === item.timestamp)
          ) {
            console.log("remove");
            dispatch(removeActiveSlote(item));
          }
        }}
      >
        <Text>{item.label}</Text>
        <Text>{item.timestamp}</Text>
        <Text>
          {newSlots.some((slot) => slot.timestamp === item.timestamp) ? (
            <Ionicons name="md-checkmark-circle" size={32} color="green" />
          ) : null}
        </Text>
      </TouchableOpacity>
    ),
    [newSlots, removeSlots] // agregar newSlots como dependencia
  );

  return (
    <View style={globalStyles.container}>
      <BottomSheetModalProvider>
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
            handlePresentModalPress();
            setDateSelected(new Date(day.dateString));
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
        />
        <View style={styles.container}>
          <BottomSheetModal
            enableDismissOnClose={true}
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <Button onPress={handleClosePress} title="Close" />
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}
            >
              {data?.map((item) => renderItem(item))}
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});
export default Scheduled;

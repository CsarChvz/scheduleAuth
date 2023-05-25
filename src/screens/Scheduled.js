import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

function Scheduled() {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState("");
  const [dateSelected, setDateSelected] = React.useState();
  const bottomSheetModalRef = useRef(null);

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

  const data = useMemo(
    () =>
      Array(48)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
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
            <Text>{JSON.stringify(dateSelected)}</Text>
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}
            >
              {data.map(renderItem)}
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

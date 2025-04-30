import React, { useState } from "react";
import {
  Pressable,
  TextInput,
  Text,
  Image,
  View,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateInputProps {
  valor: string;
  atualizar: (valor: string) => void;
}

export default function DateInput({ valor, atualizar }: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleDatePicker = () => setShowPicker(!showPicker);

  const onChange = (_event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      atualizar(formatDate(selectedDate));
      if (Platform.OS === "android") toggleDatePicker();
    } else {
      toggleDatePicker();
    }
  };

  const formatDate = (rawDate: Date) => {
    const day = String(rawDate.getDate()).padStart(2, "0");
    const month = String(rawDate.getMonth() + 1).padStart(2, "0");
    const year = rawDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View>
      <Pressable onPress={toggleDatePicker} style={styles.datePicker}>
        <TextInput style={styles.inputDate} value={valor} editable={false} />
        <Image
          style={styles.iconDate}
          source={require("../../assets/images/icon-data.png")}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  inputDate: {
    width: "90%",
    borderRadius: 15,
    fontSize: width * 0.035,
    fontFamily: "Montserrat_500Medium",
  },
  iconDate: {
    width: width * 0.064,
    height: height * 0.04,
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: width * 0.02,
    marginBlockStart: 5,
  },
});

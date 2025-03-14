import {
  ImageBackground,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import { Link } from "expo-router";


export default function CadastroScreen() {

  const [image, setImage] = useState<string | null>(null);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setDataNasc(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    
    return `${day}/${month}/${year}`;
  };

  return (
    <ImageBackground
      source={require("../assets/images/fundo-gradiente.png")}
      resizeMode="cover"
      style={styles.container}
    >
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.btnImg} />
        ) : (
          <Image
            style={styles.btnImg}
            source={require("../assets/images/icone-camera.png")}
          />
        )}
      </TouchableOpacity>

      <View style={styles.viewText}>
        <Text style={styles.txt}>Usuário:</Text>
        <TextInput 
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      <View style={styles.viewText}>
        <Text style={styles.txt}>Senha:</Text>
        <TextInput 
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <View style={styles.viewText}>
        <Text style={styles.txt}>E-mail:</Text>
        <TextInput 
          style={styles.input}
          value={usuario}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.viewBtn}>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
        <Pressable onPress={toggleDatePicker} style={styles.datePicker}>
          <TextInput
            style={styles.inputDate}
            value={dataNasc}
            editable={false}
          />
          <Image source={require("../assets/images/icon-data.png")} />
        </Pressable>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Botão Clicado",
              "Você pressionou o botão de confirmar!"
            )
          }
        >
          <Image style={styles.btn} source={require("../assets/images/icon-confirmar.png")} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewLink}>
        <Text style={styles.txt}>Já possui uma Conta?</Text>
        <Link href="/" style={styles.link}>Entre aqui</Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  btnImg: {
    width: 165,
    height: 165,
  },
  viewText: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    alignItems: "center",
    width: "75%",
    height: "5%",
    marginBottom: 33,
  },
  txt: {
    alignSelf: "flex-start",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    borderRadius: 8,
    padding: 10,
    borderColor: "#f0f0f0",
    fontSize: 20,
    marginBlockStart: 5,
  },
  viewBtn: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    height: "7%",
    gap: 40,
    marginBottom: 33,
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    gap: 10,
  },
  inputDate: {
    width: 250,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#999",
    fontSize: 20,
  },
  btn: {
    width: 60,
    height: 60,
  },
  viewLink: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  link: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#fff'
  }
});

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
  Dimensions,
} from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import { Link } from "expo-router";
import FormInput from "@/components/ui/FormInput";
import DateInput from "@/components/ui/DateInput";
import * as FileSystem from "expo-file-system";


export default function CadastroScreen() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [image, setImage] = useState<string | null>(null);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const originalUri = result.assets[0].uri;
      const filename = originalUri.split("/").pop(); // Obtém o nome do arquivo
      const newPath = `${FileSystem.documentDirectory}${filename}`; // Novo caminho

      try {
        await FileSystem.copyAsync({
          from: originalUri,
          to: newPath,
        });
        setImage(newPath); // Atualiza o estado com a nova URI
      } catch (error) {
        console.error("Erro ao copiar a imagem:", error);
      }
    }
  };

  const handleSubmit = async () => {
    console.log(image, usuario, senha, email, dataNasc)
    setLoading(true);
    setError(null);
  
    try {
      const res = await fetch("http://10.0.2.2:4000/pais", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image: image,
          user: usuario,
          password: senha,
          email: email,
          dataNasc: dataNasc,
        })
      });
  
      const result = await res.json();
      
      if (res.ok) {
        // @ts-ignore
        console.log(result);
      } else {
        setError(result.error);
      }
  
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      <View style={styles.viewInputs}>
        <FormInput campo="Usuário" valor={usuario} atualizar={setUsuario} />
        <FormInput campo="Senha" valor={senha} atualizar={setSenha} />
        <FormInput campo="Email" valor={email} atualizar={setEmail} />
        <View style={styles.viewBtn}>
          <DateInput valor={dataNasc} atualizar={setDataNasc} />
          <TouchableOpacity onPress={() => handleSubmit()}>
            <Image
              style={styles.btn}
              source={require("../assets/images/icon-confirmar.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewLink}>
        <Text style={styles.txtLink}>Já possui uma Conta?</Text>
        <Link href="/" style={styles.link}>Entre aqui</Link>
      </View>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: height * 0.035,
  },
  btnImg: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 20,
  },
  txt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.04,
  },
  viewInputs: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    display: "flex",
    alignItems: "center",
    width: "75%",
    gap: height * 0.01,
  },
  viewBtn: {
    backgroundColor: "rgba(52, 52, 52, 0)",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: width * 0.05,
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    gap: width * 0.02,
  },
  inputDate: {
    width: width * 0.5,
    borderRadius: 8,
    fontSize: width * 0.04,
  },
  btn: {
    width: width * 0.1,
    height: width * 0.1,
    marginBottom: width * 0.01,
  },
  viewLink: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.06,
  },
  txtLink: {
    color: "#fff",
    fontSize: width * 0.04,
  },
  link: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#fff'
  }
});

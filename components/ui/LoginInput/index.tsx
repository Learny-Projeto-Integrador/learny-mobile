import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

interface LoginInputProps {
    campo: string;
    valor: string;
    atualizar: (valor: string) => void;
}
export default function LoginInput(props: LoginInputProps) {

    return (
        <View style={styles.viewInput}>
        <Text style={styles.title}>{props.campo}:</Text>
        <View style={styles.divider}></View>
        <TextInput
            style={styles.input}
            onChangeText={props.atualizar}
            value={props.valor}
            placeholderTextColor="#757575"
            secureTextEntry={props.campo === "Senha"}
        />
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  viewInput: {
    backgroundColor: "#fff",
    width: "100%",
    height: height * 0.06,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    display: "flex",
    width: "30%",
    textAlign: "center",
    fontSize: width * 0.038,
    fontFamily: 'Montserrat_700Bold',
    color: "#547d98",
  },
  divider: {
    width: 2,
    height: "100%",
    backgroundColor: "#a3a3a3",
  },
  input: {
    width: "66%",
    backgroundColor: "#fff",
    fontSize: width * 0.04,
    fontFamily: 'Montserrat_500Medium',
    paddingLeft: width * 0.04,
  },
});

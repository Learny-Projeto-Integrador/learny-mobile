import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

interface FormInputProps {
    campo: string;
    valor: string;
    atualizar: (valor: string) => void;
}

export default function FormInput(props: FormInputProps) {
    return (
        <View style={styles.viewText}>
            <Text style={styles.title}>{props.campo}:</Text>
            <TextInput 
                style={styles.input}
                value={props.valor}
                onChangeText={props.atualizar}
                secureTextEntry={props.campo === "Senha"}
            />
        </View>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    viewText: {
        backgroundColor: "rgba(52, 52, 52, 0)",
        display: "flex",
        alignItems: "center",
        width: "100%",
      },
      title: {
        alignSelf: "flex-start",
        color: "#fff",
        fontFamily: 'Montserrat_700Bold',
        fontSize: width * 0.04,
      },
      input: {
        backgroundColor: "#fff",
        width: "100%",
        height: height * 0.055,
        borderRadius: 8,
        padding: 10,
        borderColor: "#f0f0f0",
        fontSize: width * 0.035,
        fontFamily: 'Montserrat_500Medium',
        marginBlockStart: 8,
      },
});
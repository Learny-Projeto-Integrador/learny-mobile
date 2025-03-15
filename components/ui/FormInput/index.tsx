import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";

interface FormInputProps {
    campo: string;
    valor: string;
    atualizar: (valor: string) => void;
}

export default function FormInput(props: FormInputProps) {
    return (
        <View style={styles.viewText}>
            <Text style={styles.title}>{props.campo}</Text>
            <TextInput 
                style={styles.input}
                value={props.valor}
                onChangeText={props.atualizar}
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
        fontWeight: "bold",
        fontSize: width * 0.04,
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
});
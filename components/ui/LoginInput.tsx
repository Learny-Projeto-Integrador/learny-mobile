import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Dimensions 
} from "react-native";

type Props = {
  campo: string;
  valor: string;
  edit?: boolean;
  atualizar: (valor: string) => void;
};
export default function LoginInput({ campo, valor, edit, atualizar }: Props) {
  return (
    <View style={styles.viewInput}>
      <Text style={styles.title}>{campo}:</Text>
      <TextInput
        style={
          campo === "Nova Senha"
            ? [styles.input, { width: "60%" }]
            : styles.input
        }
        onChangeText={atualizar}
        value={valor}
        placeholderTextColor="#757575"
        secureTextEntry={campo === "Senha" || campo === "Nova Senha"}
        editable={!edit}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  viewInput: {
    backgroundColor: "rgba(214, 214, 214, 0.4)",
    width: "100%",
    height: height * 0.07,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  title: {
    display: "flex",
    textAlign: "center",
    fontSize: width * 0.036,
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
  },
  input: {
    width: "72%",
    backgroundColor: "rgba(0,0,0,0)",
    fontSize: width * 0.04,
    fontFamily: "Montserrat_500Medium",
    color: "#fff",
    paddingLeft: width * 0.03,
  },
});

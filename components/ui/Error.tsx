import { 
  View, 
  StyleSheet, 
  Modal, 
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "index">;

type Props = {
    error?: string;
    onReload: () => void;
}

export default function Error({ error, onReload }: Props) {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Oops!</Text>
          <Text style={styles.message}>
            {error ? `Erro ao carregar os dados: ${error}` : "Ocorreu um erro."}
          </Text>
          <View style={styles.viewButtons}>
            <TouchableOpacity style={[styles.button, {backgroundColor: "#405e99"}]} onPress={onReload}>
                <Text style={styles.buttonText}>Recarregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.replace("index")}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#e53935",
    marginBottom: 10,
  },
  message: {
    fontSize: width * 0.04,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  viewButtons: {
    gap: width * 0.025,
  },
  button: {
    backgroundColor: "#e53935",
    minWidth: "60%",
    padding: width * 0.02,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontSize: width * 0.045,
    fontWeight: "bold",
    textAlign: "center",
  },
});

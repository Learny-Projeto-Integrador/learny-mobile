import { 
  View, 
  StyleSheet, 
  Modal,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

export default function Loading({ visible }: { visible: boolean }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Image
          source={require("@/assets/gifs/loading.gif")}
          style={{ width: width * 0.5, height: height * 0.5 }}
          contentFit="contain"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

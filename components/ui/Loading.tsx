import { 
  View, 
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { RW } from "@/theme";

export default function Loading({ visible }: { visible: boolean }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View 
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Image
          source={require("@/assets/gifs/loading.gif")}
          style={{ width: RW(100), height: RW(100) }}
        />
      </View>
    </Modal>
  );
}

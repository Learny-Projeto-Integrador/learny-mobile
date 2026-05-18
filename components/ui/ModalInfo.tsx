import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { RF, RS, RW } from "@/theme";

interface Props {
  title: string;
  message: string;
  visible: boolean;
  onClose: () => void;
};

export default function ModalInfo({ title, message, visible, onClose }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        className="flex-1 items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onClose}
      >
        <View
          className="w-5/6 items-center bg-[#4c4c4c]"
          style={{
            marginTop: RS(40),
            paddingVertical: RS(24),
            paddingHorizontal: RW(20),
            gap: RW(20),
            borderRadius: RW(20),
          }}
        >
          <View className="flex-row w-full items-end justify-between">
            <Image
              source={require("@/assets/icons/phases/info.png")}
              style={{
                width: RW(24),
                aspectRatio: 1 / 1,
              }}
            />
            <Text
              className="text-white font-montserratBold"
              style={{ fontSize: RF(22) }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} className="flex-row">
              <Image
                source={require("@/assets/icons/close.png")}
                style={{
                  width: RW(24),
                  aspectRatio: 1 / 1,
                  tintColor: "#fff",
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              className="text-white font-montserratBold text-center"
              style={{ fontSize: RF(16) }}
            >
              {message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

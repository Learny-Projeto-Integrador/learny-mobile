import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import { useState } from "react";

interface ModalFallbackProps {
  visible: boolean;
  onClose: () => void;
}

const ModalFallback = ({ visible, onClose }: ModalFallbackProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        className="flex-1 items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onClose}
      >
        <View
          className="w-5/6 items-center bg-white"
          style={{
            marginTop: RS(40),
            paddingVertical: RS(40),
            paddingHorizontal: RW(20),
            gap: RW(18),
            borderRadius: 40,
          }}
        >
          <View
            className="w-full flex-row items-center justify-center"
            style={{ marginHorizontal: RW(20) }}
          >
            <Text
              className="font-montserratBold"
              style={{ color: "#4C4C4C", fontSize: RF(24) }}
            >
              Como jogar
            </Text>

            <TouchableOpacity
              onPress={onClose}
              style={{ position: "absolute", right: 0 }}
            >
              <Image
                source={require("@/assets/icons/close.png")}
                style={{ width: RW(28), height: RW(28) }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              className="text-[#4c4c4c] font-montserratMedium text-center"
              style={{ fontSize: RF(16) }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default function FallbackCard() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePressInfo = () => {
    setModalVisible(true);
  };
  return (
    <View
      className="flex-row bg-white items-center"
      style={{
        padding: RS(20),
        gap: RS(12),
        borderWidth: 2,
        borderColor: "#E5E7EB",
        borderRadius: RW(20),
      }}
    >
      <ModalFallback
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      {/* IMAGE */}
      <Image
        source={require("@/assets/images/characters/fallback.png")}
        resizeMode="contain"
        style={{
          width: RW(80),
          height: RW(80),
        }}
      />

      <View style={{ gap: RS(12), flex: 1 }}>
        <Text
          className="font-montserratMedium text-gray-400"
          style={{ fontSize: RF(14) }}
        >
          Desbloqueie personagens ao completar missões específicas
        </Text>
      </View>

      <TouchableOpacity onPress={handlePressInfo} style={{ padding: RS(8) }}>
        <Image
          source={require("@/assets/icons/phases/info.png")}
          resizeMode="contain"
          style={{
            width: RW(20),
            height: RW(20),
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

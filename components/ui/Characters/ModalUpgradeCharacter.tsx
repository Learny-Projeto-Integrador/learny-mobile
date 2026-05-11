import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import ProgressBarCharacter from "./ProgressBarCharacter";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  name: string;
  image: string;
  level: number;
  characterPoints: number; // %
  costUpgrade: number;
  effect: string;
  visible?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
}

export default function ModalUpgradeCharacter({
  name,
  image,
  level,
  characterPoints,
  costUpgrade,
  effect,
  visible,
  onSelect,
  onClose,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        className="flex-1 items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: RS(30) }}
        onPress={onClose}
      >
        <View
          className="flex-row bg-white"
          style={{
            alignItems: "center",
            paddingVertical: RS(16),
            paddingRight: RS(30),
            gap: RS(12),
            borderWidth: 2,
            borderColor: "#E5E7EB",
            borderRadius: RW(20),
          }}
        >
          {/* IMAGE */}
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            style={{
              width: RW(120),
              height: RW(100),
            }}
          />

          <View style={{ gap: RS(12), flex: 1 }}>
            {/* HEADER */}
            <View className="flex-row justify-between items-end">
              <View>
                <Text
                  className="font-montserratMedium text-gray-400"
                  style={{ fontSize: RF(14) }}
                >
                  Selected
                </Text>
                <Text
                  className="font-montserratBold text-gray-700"
                  style={{ fontSize: RF(18) }}
                >
                  {name}
                </Text>
              </View>

              <Text
                className="font-montserratMedium text-yellow-500"
                style={{ fontSize: RF(20) }}
              >
                Lv.
                <Text
                  className="font-montserratExtraBold"
                  style={{ fontSize: RF(26) }}
                >
                  {level.toString().padStart(2, "0")}
                </Text>
              </Text>
            </View>

            {/* CONTENT */}
            <View className="flex-row items-center" style={{ gap: RS(12) }}>
              {/* INFO */}
              <View style={{ flex: 1, gap: RS(6) }}>
                {/* PROGRESS BAR */}
                <ProgressBarCharacter
                  label={`${characterPoints}%`}
                  progress={characterPoints}
                />
              </View>
            </View>

            <View
              className="items-center justify-center"
              style={{ gap: RS(12) }}
            >
              {/* EFFECT */}
              <Text
                className="font-montserratSemiBold text-gray-500"
                style={{ fontSize: RF(16) }}
              >
                {effect}
              </Text>
              {/* Upgreade */}
              <View className="flex-row" style={{ gap: RS(8) }}>
                <LinearGradient
                  colors={["#973e4a", "#4b85a1"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: RS(10),
                    paddingVertical: RS(14),
                    borderRadius: 10,
                  }}
                >
                  <View
                    className="bg-white flex-row items-center justify-center"
                    style={{
                      borderRadius: RW(10),
                      paddingHorizontal: RS(12),
                      gap: RS(10),
                    }}
                  >
                    <Image
                      source={require("@/assets/icons/header/points.png")}
                      resizeMode="contain"
                      style={{
                        width: RW(18),
                        height: RW(18),
                      }}
                    />
                    <Text
                      className="font-montserratMedium text-[#4C4C4C]"
                      style={{
                        fontSize: RF(18),
                      }}
                    >
                      {costUpgrade}
                    </Text>
                  </View>
                  <Text
                    className="font-montserratMedium text-white"
                    style={{ fontSize: RF(16) }}
                  >
                    Upgrade to Lv. {level + 1}
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { RW, RH, RF, RS } from "@/theme";
import ProgressBarCharacter from "./ProgressBarCharacter";

interface Props {
  name: string;
  image: string;
  level: number;
  characterPoints: number; // %
  effect: string;
  visible?: boolean;
  onSelect?: () => void;
  onClose?: () => void;
}

export default function ModalSelectCharacter({
  name,
  image,
  level,
  characterPoints,
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
            paddingVertical: RS(12),
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
              <Text
                className="font-montserratBold text-gray-700"
                style={{ fontSize: RF(18) }}
              >
                {name}
              </Text>

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
                style={{ fontSize: RF(12) }}
              >
                {effect}
              </Text>
              {/* TAGS */}
              <View className="flex-row" style={{ gap: RS(8) }}>
                <TouchableOpacity
                  onPress={onClose}
                  className="bg-[#EF5B6A] items-center justify-center"
                  style={{
                    width: RW(60),
                    paddingVertical: RS(6),
                    borderRadius: RW(8),
                  }}
                >
                  <Text
                    className="font-montserratMedium text-white"
                    style={{ fontSize: RF(11) }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onSelect}
                  className="flex-1 bg-[#4C4C4C] items-center justify-center"
                  style={{
                    paddingVertical: RS(6),
                    borderRadius: RW(8),
                  }}
                >
                  <Text
                    className="font-montserratMedium text-white"
                    style={{ fontSize: RF(11) }}
                  >
                    Select
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

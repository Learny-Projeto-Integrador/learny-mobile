import { Image, View, Text } from "react-native";
import SoundCard from "../Feeling/FeelingCard";
import { RF, RH, RS, RW } from "@/theme";

interface Props {
  correctEmotion: string;
  image: any;
  color: string;
}

export default function FeelingFeedback({
  correctEmotion,
  image,
  color,
}: Props) {
  return (
    <View>
      <View
        className="items-center"
        style={{
          gap: RS(16),
          marginTop: RS(30),
        }}
      >
        <Image
          source={image}
          style={{
            width: RW(300),
            height: RH(200),
            borderRadius: 30,
          }}
        />
        <Text
          className="font-montserratSemiBold"
          style={{ fontSize: RF(26), color: "#4c4c4c", marginTop: RS(10) }}
        >
          The Dinosaur is:{" "}
        </Text>

        <View
          style={{
            backgroundColor: color || "#ccc",
            width: RW(100),
            alignItems: "center",
            justifyContent: "center",
            height: RH(100),
            borderRadius: 30,
            elevation: 5,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: RF(26),
              fontFamily: "Montserrat_700Bold",
              textAlign: "center",
            }}
          >
            {correctEmotion}
          </Text>
        </View>
      </View>
    </View>
  );
}

import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useAudioPlayer } from 'expo-audio';
import { dinoOptions } from "@/constants/phaseData";

type Props = {
  dino: any;
  emotion: string;
  color: string;
};

export default function ContainerEmotion({
  dino,
  emotion,
  color,
}: Props) {
  const sound = useAudioPlayer(dinoOptions[dino].audio);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [dinoOptions[dino].imageApagado, dinoOptions[dino].image];

  const playSound = async () => {
    sound.seekTo(0);
    sound.play();
  };

  const handlePress = () => {
    playSound();
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.txt, { color: color }]}>{emotion}</Text>
      <View style={[styles.retangulo, { backgroundColor: color }]} />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={handlePress}
          activeOpacity={1}
        >
          <Image source={images[imageIndex]} style={styles.img} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  txt: {
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
  },
  retangulo: {
    width: width * 0.25,
    height: height * 0.02,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  img: {
    width: width * 0.35,
    aspectRatio: 1 / 1,
  },
});

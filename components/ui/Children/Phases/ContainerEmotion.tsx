import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useCheckAudio } from "@/hooks/useCheckAudio";

const dinoOptions = {
  dino1: {
    image: require("@/assets/images/dinos/dino1.png"),
    imageApagado: require("@/assets/images/dinos/dino1-apagado.png"),
    source: require("@/assets/audios/sad.wav"),
  },
  dino2: {
    image: require("@/assets/images/dinos/dino2.png"),
    imageApagado: require("@/assets/images/dinos/dino2-apagado.png"),
    source: require("@/assets/audios/angry.wav"),
  },
  dino3: {
    image: require("@/assets/images/dinos/dino3.png"),
    imageApagado: require("@/assets/images/dinos/dino3-apagado.png"),
    source: require("@/assets/audios/happy.wav"),
  },
  dino4: {
    image: require("@/assets/images/dinos/dino4.png"),
    imageApagado: require("@/assets/images/dinos/dino4-apagado.png"),
    source: require("@/assets/audios/afraid.wav"),
  },
};

type DinoKey = keyof typeof dinoOptions;

type ContainerEmotionProps = {
  dino: DinoKey;
  emotion: string;
  color: string;
};

export default function ContainerEmotion({
  dino,
  emotion,
  color,
}: ContainerEmotionProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [dinoOptions[dino].imageApagado, dinoOptions[dino].image];

  const { checkAudio } = useCheckAudio();

  const [canPlayAudio, setCanPlayAudio] = useState(false);

  useEffect(() => {
    const verifyAudio = async () => {
      const result = await checkAudio();
      if (result !== undefined) {
        setCanPlayAudio(result);
      }
    };
    verifyAudio();
  }, []);

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async () => {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(
      dinoOptions[dino].source
    );
    setSound(newSound);
    await newSound.playAsync();
  };

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  const handlePress = () => {
    canPlayAudio ? playSound() : null;
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

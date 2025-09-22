import {  useRef } from "react";
import { useAudioPlayer } from 'expo-audio';
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ImageSourcePropType,
} from "react-native";

type Props = {
  image: ImageSourcePropType;
  audio: any;
  title: string;
  id: string;
  column: "left" | "right";
  onSelect: (card: {
    id: string;
    type: string;
    x: number;
    y: number;
    column: "left" | "right";
  }) => void;
};

export default function AnimalCard({
  image,
  audio,
  title,
  id,
  column,
  onSelect,
}: Props) {
  const sound = useAudioPlayer(audio);
  const cardRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);
  const { width } = useWindowDimensions();

  const playSound = async () => {
    sound.seekTo(0);
    await sound.play();
  };

  const handlePress = () => {
    playSound();

    // Mede a posição do componente na tela
    cardRef.current?.measure?.(
      (x: number, y: number, w: number, h: number, pageX: number, pageY: number) => {
        onSelect({
          id,
          type: title,
          x: pageX + w / 2,
          y: pageY + h / 2,
          column,
        });
      }
    );
  };

  return (
    <TouchableOpacity
      ref={cardRef}
      style={{ flexDirection: "row" }}
      onPress={handlePress}
      activeOpacity={1}
    >
      <Image
        source={image}
        style={{
          width: width * 0.2,
          aspectRatio: 1,
        }}
      />
    </TouchableOpacity>
  );
}

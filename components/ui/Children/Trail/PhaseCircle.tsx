import { View, Text, ImageBackground } from "react-native";
import { fontSizes, RS, RW } from "@/theme";

interface Props {
    number: string;
    completed: boolean;
    locked?: boolean;
}

export default function PhaseCircle({ number, completed, locked }: Props) {
    const backgroundImage = completed ? require("@/assets/images/trilha/fundo-fase.png") : require("@/assets/images/trilha/fundo-fase-apagado.png");

    return (
        <ImageBackground
            source={backgroundImage}
            style={{
                width: RW(80),
                aspectRatio: 1 / 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            imageStyle={{ borderRadius: 16 }}
        >
            <Text
                className="text-white font-montserratBold"
                style={{
                    fontSize: RS(24),
                }}
            >
                {number}
            </Text>
        </ImageBackground>
    );
}
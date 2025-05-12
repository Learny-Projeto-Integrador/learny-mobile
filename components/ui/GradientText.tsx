import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientText({ style, children, color1, color2 }: any) {
      return (
        <MaskedView
          maskElement={
            <Text style={[style, { backgroundColor: "transparent" }]}>
              {children}
            </Text>
          }
        >
          <LinearGradient
            colors={[color1, color2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[style, { opacity: 0 }]}>{children}</Text>
          </LinearGradient>
        </MaskedView>
      );
}
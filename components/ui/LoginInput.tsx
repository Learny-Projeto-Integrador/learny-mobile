import { fontSizes, RH, RS, spacing } from "@/theme";
import { 
  View, 
  Text, 
  TextInput, 
} from "react-native";

type Props = {
  field: string;
  value: string;
  editable?: boolean;
  isPassword?: boolean;
  onChange: (valor: string) => void;
};

export default function LoginInput({ field, value, editable, isPassword, onChange }: Props) {
  return (
    <View
      className="w-full flex-row items-center justify-center rounded-2xl bg-white/20"
      style={{
        height: RH(56),
        paddingHorizontal: RS(12),
        gap: spacing.md,
      }}
    >
      {/* Label */}
      <Text
        className="text-white font-montserratBold"
        style={{ fontSize: fontSizes.md }}
      >
        {field}:
      </Text>

      {/* Input */}
      <TextInput
        className="text-white font-montserratMedium"
        style={{
          width: field === "Nova Senha" ? "60%" : "72%",
          fontSize: fontSizes.lg,
        }}
        onChangeText={onChange}
        value={value}
        placeholderTextColor="#757575"
        secureTextEntry={isPassword}
        editable={!editable}
      />
    </View>
  );
}

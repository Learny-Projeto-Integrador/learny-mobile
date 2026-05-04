import { RW, RH, RF, RS } from "@/theme";
import { 
  View, 
  Text, 
  TextInput, 
} from "react-native";

interface Props {
  field: string;
  value: string;
  editable?: boolean;
  isPassword?: boolean;
  onChange: (valor: string) => void;
};

export default function LoginInput({ field, value, editable, isPassword, onChange }: Props) {
  return (
    <View
      className="w-full flex-row items-center justify-start rounded-2xl bg-white/20"
      style={{
        height: RH(56),
        paddingHorizontal: RS(20),
        gap: RS(16),
      }}
    >
      {/* Label */}
      <Text
        className="text-white font-montserratBold"
        style={{ fontSize: RF(16) }}
      >
        {field}:
      </Text>

      {/* Input */}
      <TextInput
        className="text-white font-montserratMedium"
        style={{
          width: field === "Nova Senha" ? "60%" : "72%",
          fontSize: RF(16),
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

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { RF, RH, RS, RW } from "@/theme";

interface Props {
  icon: any;
  visible?: boolean;
  title: string;
  message: string;
  dualAction?: boolean;
  closeLabel?: string;
  redirectLabel?: string;
  onClose?: () => void;
  onRedirect?: () => void;
}

export default function CustomAlert({
  icon,
  visible,
  onClose,
  title,
  message,
  dualAction = false,
  onRedirect,
  redirectLabel,
  closeLabel,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* Overlay */}
      <View className="flex-1 bg-black/50 items-center justify-center">
        
        {/* Caixa do alerta */}
        <View
          className="items-center"
          style={{
            backgroundColor: "#4c4c4c",
            paddingVertical: RH(60),
            paddingHorizontal: RW(30),
            borderRadius: RS(16),
            width: "80%",
            gap: RS(10),
          }}
        >
          {/* Ícone */}
          <Image
            source={icon}
            style={{
              width: RW(60),
              height: RW(60),
            }}
          />

          {/* Título */}
          <Text
            className="font-montserratBold text-center text-white"
            style={{ fontSize: RF(24) }}
          >
            {title}
          </Text>

          {/* Mensagem */}
          <Text
            className="font-montserratMedium text-center text-white"
            style={{
              fontSize: RF(18),
              marginBottom: RS(10),
            }}
          >
            {message}
          </Text>

          {/* Ações */}
          {dualAction ? (
            <View className="flex-row justify-center w-full" style={{ gap: RS(10) }}>
              
              {/* Botão fechar */}
              <TouchableOpacity
                onPress={onClose}
                className="items-center justify-center"
                style={{
                  backgroundColor: "#9E9E9E",
                  minWidth: RW(90),
                  height: RH(45),
                  borderRadius: RS(15),
                  paddingHorizontal: RW(10),
                }}
              >
                <Text
                  className="font-montserratBold text-white"
                  style={{ fontSize: RF(14) }}
                >
                  {closeLabel || "OK"}
                </Text>
              </TouchableOpacity>

              {/* Botão redirect */}
              <TouchableOpacity
                onPress={() => {
                  onClose?.();
                  onRedirect?.();
                }}
                className="items-center justify-center"
                style={{
                  backgroundColor: "#519dbf",
                  minWidth: RW(90),
                  height: RH(45),
                  borderRadius: RS(15),
                  paddingHorizontal: RW(10),
                }}
              >
                <Text
                  className="font-montserratBold text-white"
                  style={{ fontSize: RF(14) }}
                >
                  {redirectLabel}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={onClose}
              className="items-center justify-center"
              style={{
                backgroundColor: "#9E9E9E",
                minWidth: RW(120),
                height: RH(45),
                borderRadius: RS(15),
                paddingHorizontal: RW(10),
              }}
            >
              <Text
                className="font-montserratBold text-white"
                style={{ fontSize: RF(14) }}
              >
                {closeLabel || "OK"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
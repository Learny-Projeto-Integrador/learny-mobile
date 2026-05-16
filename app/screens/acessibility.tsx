import { View, Text, Image, TouchableOpacity } from "react-native";
import { CustomSwitch } from "@/components/ui/CustomSwitch";
import GradientText from "@/components/ui/GradientText";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import { useApi } from "@/hooks/useApi";
import { RF, RS, RW } from "@/theme";
import { useRouter } from "expo-router";
import { Shadow } from "react-native-shadow-2";

export default function AcessibilityScreen() {
  const router = useRouter();

  /** Hook de comunicação com a API */
  const { request } = useApi();
  /** Contextos */
  const { user, setUser } = useUser();
  const { showAlert } = useCustomAlert();

  /**
   * Função para alternar o estado do áudio, fazendo a requisição para a API e atualizando o contexto do usuário.
   */
  const toggleAudio = async (newValue: boolean) => {
    const result = await request({
      endpoint: "/child",
      method: "PUT",
      body: {
        audioActive: newValue,
      },
    });

    if (result && !result.error) {
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, audioActive: newValue };
      });
    } else {
      if (result.status != 401) {
        showAlert({
          icon: require("@/assets/icons/custom-alert/alert.png"),
          title: "Erro ao atualizar o áudio!",
          message: result.message,
        });
      }
    }
  };

  return (
    <View
      className="bg-white flex-1"
      style={{
        paddingHorizontal: RS(50),
        paddingVertical: RS(60),
        gap: RS(40),
      }}
    >
      {/* Título e botão de voltar */}
      <View className="flex-row items-center justify-between">
        <Image
          style={{
            width: RW(40),
            aspectRatio: 1 / 1,
          }}
          source={require("@/assets/icons/profile/acessibility.png")}
        />
        <GradientText
          color1="#946274"
          color2="#5c94b3"
          style={{ fontSize: RF(30), fontFamily: "Montserrat_600SemiBold" }}
        >
          Acessibilidade
        </GradientText>
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center"
        >
          <Image
            style={{ width: RW(30), height: RW(30) }}
            source={require("@/assets/icons/back.png")}
          />
        </TouchableOpacity>
      </View>

      {/* Opções de acessibilidade */}
      <Shadow
        distance={6}
        startColor="rgba(0,0,0,0.1)"
        offset={[0, 0]}
        style={{
          alignSelf: "stretch",
        }}
      >
        <View
          className="bg-white"
          style={{
            gap: RS(30),
            padding: RS(30),
            borderRadius: 20,
          }}
        >
          <View className="w-full flex-row items-center justify-between">
            <Text
              className="font-montserratMedium"
              style={{
                color: "#aeaeae",
                fontSize: RF(20),
              }}
            >
              Desligar Audio
            </Text>
            <CustomSwitch
              value={user?.audioActive || false}
              onToggle={toggleAudio}
            />
          </View>
          <View className="w-full flex-row items-center justify-between">
            <Text
              className="font-montserratMedium"
              style={{
                color: "#aeaeae",
                fontSize: RF(20),
              }}
            >
              Mudar Cores
            </Text>
            <CustomSwitch value={true} />
          </View>
        </View>
      </Shadow>
    </View>
  );
}

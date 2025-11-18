import {
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { imgMedalhas } from "@/constants/dadosMedalhas";
import { useApi } from "@/hooks/useApi";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "@/contexts/UserContext";
import { useCustomAlert } from "@/contexts/AlertContext";

type Props = {
  navigation: any;
  medalhas: any;
  visible: boolean;
  onClose: () => void;
};

export default function ContainerSelectMedalha({
  navigation,
  medalhas,
  visible,
  onClose,
}: Props) {
  const { setUser } = useUser();
  const { showAlert } = useCustomAlert();
  const { request } = useApi();

  const changeMedalha = async (medalha: any) => {
    const result = await request({
      endpoint: "/criancas",
      method: "PUT",
      body: { 
        medalhaSelecionada: medalha
      },
      navigation,
    })

    if (result && !result.error) {
      setUser((prev) => {
        if (!prev) return prev;
        return { ...prev, medalhaSelecionada: medalha };
      });
      onClose();
    } else {
      if (result.status != 401) {
        showAlert({
          icon: require("@/assets/icons/icon-alerta.png"),
          title: "Erro ao trocar a medalha!",
          message: result.message,
        });
      }
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <LinearGradient
            colors={['#973e4a', '#4b85a1']}
            style={styles.medalBox}
          >
          {medalhas.length === 0 ? (
            <Text style={[styles.message, { color: "#fff" }]}>
              Ainda não possui medalhas
            </Text>
          ) : (
            medalhas.map((medalha: any, index: any) => {
              const imgSource = imgMedalhas[medalha.nome];

              if (!imgSource) return null;

              return (
                <TouchableOpacity
                  key={index}
                  style={{ flexDirection: "row", marginHorizontal: 10 }}
                  onPress={() => {
                    changeMedalha(medalha);
                  }}
                >
                  <Image
                    source={imgSource}
                    style={{
                      width: width * 0.16,
                      aspectRatio: 1 / 1,
                    }}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  medalBox: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.85,
    height: height * 0.16,
    marginTop: height * 0.19,
    paddingVertical: height * 0.02,
    gap: width * 0.05,
    borderRadius: 40,
    overflow: "hidden",
  },
  message: {
    color: "#fff",
    fontFamily: "Montserrat_500Medium",
    fontSize: width * 0.04,
    textAlign: "center",
  },
});

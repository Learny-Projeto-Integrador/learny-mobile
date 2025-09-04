import {
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { imgMedalhas } from "@/constants/dadosMedalhas";
import { useApi } from "@/hooks/useApi";

type Props = {
  title: string;
  medalhas: any;
  visible: boolean;
  onClose: () => void;
  onSelectMedalha: (medalha?: any) => void;
};

export default function ContainerSelectMedalha({
  medalhas,
  visible,
  onClose,
  onSelectMedalha,
}: Props) {
  const { request } = useApi();

  const changeMedalha = async (medalha: any) => {
    const result = await request({
      endpoint: "/criancas",
      method: "PUT",
      body: { 
        medalhaSelecionada: medalha
      },
    })

    if (result) {
      onClose();
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <ImageBackground
          source={require("@/assets/images/fundo-gradiente.png")}
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
                    onSelectMedalha(medalha);
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
        </ImageBackground>
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

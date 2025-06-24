//@ts-nocheck
import { useGetToken } from "@/hooks/useGetToken";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";

type ContainerSelectMedalhaProps = {
  medalhas: any;
  visible: boolean;
  onClose: () => void;
  onSelectMedalha: () => void;
  title: string;
};

const imgMedalhas = {
  "Iniciando!": require("@/assets/icons/medalha-verde-select.png"),
  "A todo o vapor!": require("@/assets/icons/medalha-vermelha-select.png"),
  Desvendando: require("@/assets/icons/medalha-azul-select.png"),
};

export default function ContainerSelectMedalha({
  medalhas,
  visible,
  onClose,
  onSelectMedalha,
}: ContainerSelectMedalhaProps) {
  const { getToken } = useGetToken();

  const changeMedalha = async (medalha: any) => {
    const body: any = {
      medalhaSelecionada: medalha,
    };

    try {
      const token = await getToken();

      const res = await fetch(`http://10.0.2.2:5000/criancas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        onClose();
      } else {
        alert(result.error);
      }
    } catch (err: any) {
      alert(err.message);
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
            medalhas.map((medalha, index) => {
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

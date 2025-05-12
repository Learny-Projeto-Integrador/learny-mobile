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
} from "react-native";

type ContainerSelectMedalhaProps = {
  medalhas: any;
  visible: boolean;
  onClose: () => void;
  onSelectMedalha: () => void;
  title: string;
};

const imgMedalhas = {
  "Iniciando!": require("../../assets/icons/medalha-verde.png"),
  "A todo o vapor!": require("../../assets/icons/medalha-vermelha.png"),
  "Desvendando": require("../../assets/icons/medalha-azul.png"),
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
        <View style={styles.medalBox}>
          {medalhas.map((medalha, index) => {
            const imgSource = imgMedalhas[medalha.nome];

            // Verifica se existe uma imagem para o nome da medalha
            if (!imgSource) {
              return null; // ignora se não tiver imagem
            }

            return (
              <TouchableOpacity
                key={index}
                style={{ flexDirection: "row", marginHorizontal: 10 }}
                onPress={() => {changeMedalha(medalha); onSelectMedalha(medalha);}}
              >
                <Image
                  source={imgSource}
                  style={{
                    width: width * 0.12,
                    aspectRatio: 38 / 48,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
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
    marginTop: height * 0.19,
    paddingVertical: height * 0.02,
    borderRadius: 40,
    width: "80%",
    height: height * 0.16,
    gap: width * 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.055,
    marginVertical: height * 0.01,
  },
  message: {
    color: "#fff",
    fontFamily: "Montserrat_500Medium",
    fontSize: width * 0.04,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9E9E9E",
    width: width * 0.3,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

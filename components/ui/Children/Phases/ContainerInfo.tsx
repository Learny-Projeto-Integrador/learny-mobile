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

type ContainerInfoProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
};

export default function ContainerInfo({
  message,
  visible,
  onClose,
}: ContainerInfoProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.infoBox}>
          <View style={styles.containerTitle}>
            <Image
              source={require("@/assets/icons/icon-info.png")}
              style={{
                width: width * 0.06,
                aspectRatio: 1/1
              }}
            />
            <Text style={styles.title}>Informações</Text>
            <TouchableOpacity
              onPress={onClose}
              style={{ flexDirection: "row" }}
            >
              <Image
                source={require("@/assets/icons/icon-fechar.png")}
                style={styles.iconFechar}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.message}>
              {message}
            </Text>
          </View>
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
  infoBox: {
    backgroundColor: "#4c4c4c",
    marginTop: height * 0.09,
    paddingVertical: height * 0.02,
    borderRadius: 40,
    width: "87%",
    height: height * 0.4,
    gap: width * 0.035,
    alignItems: "center",
  },
   containerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.1,
  },
  iconFechar: {
    width: width * 0.07,
    aspectRatio: 1 / 1,
    tintColor: "#fff",
  },
  title: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.052,
    marginTop: height * 0.01,
  },
  message: {
    width: width * 0.75,
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: width * 0.04,
    textAlign: "center",
    lineHeight: height * 0.035,
  },
});

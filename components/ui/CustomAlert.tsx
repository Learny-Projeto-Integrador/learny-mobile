import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { AlertProps } from "@/types";
import React from "react";

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
}: AlertProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={icon}
              style={{
                width: width * 0.15,
                aspectRatio: 1 / 1,
              }}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {dualAction ? (
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>{closeLabel || "OK"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.redirectButton]}
                onPress={() => {
                  onClose?.()
                  onRedirect?.()
                }}
              >
                <Text style={styles.buttonText}>{redirectLabel}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#4c4c4c",
    paddingVertical: height * 0.08,
    paddingHorizontal: width * 0.08,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.055,
    marginVertical: height * 0.01,
    textAlign: "center",
  },
  message: {
    color: "#fff",
    fontFamily: "Montserrat_500Medium",
    fontSize: width * 0.04,
    marginBottom: height * 0.03,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9E9E9E",
    minWidth: width * 0.26,
    paddingHorizontal: width * 0.04,
    height: height * 0.06,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal: 5,
  },
  redirectButton: {
    backgroundColor: "#519dbf",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

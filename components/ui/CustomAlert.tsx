import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

type AlertProps = {
  icon: any;
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  dualAction?: boolean; // se verdadeiro, mostra dois botões
  onRedirect?: () => void; // ação do segundo botão
  closeLabel?: string;
  redirectLabel?: string; // texto do segundo botão
};

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
                onPress={onRedirect}
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
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9E9E9E",
    width: width * 0.26,
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
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "Montserrat_700Bold",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

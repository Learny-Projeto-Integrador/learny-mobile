// components/Loading.tsx
import { ActivityIndicator, View, StyleSheet, Modal } from "react-native";

export default function Loading({ visible }: { visible: boolean }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

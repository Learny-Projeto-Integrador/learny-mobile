import { cores, efeitos } from "@/constants/dadosMedalhas";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

type MedalhaProps = {
  fundo: any;
  nome: string;
  descricao: string;
  date: string;
};

export default function Medalha({
  fundo,
  nome,
  descricao,
  date,
}: MedalhaProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  function formatDate(isoString: string): string {
    const dateObj = new Date(isoString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // mês começa em 0
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: cores[nome].corEscura }]}
    >
      <View>
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.containerFilho}
          activeOpacity={1}
        >
          <View style={styles.container}>
            <Image
              source={require("@/assets/images/medals/resource.png")}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.label}>Mundo-1</Text>
              <Text style={styles.nome}>{nome}</Text>
            </View>
          </View>
        </TouchableOpacity>
        {dropdownVisible && (
          <View
            style={[styles.dropdown, { backgroundColor: cores[nome].corClara }]}
          >
            <View style={styles.item}>
              <Text style={styles.desc}>{descricao}</Text>
              <Text style={styles.desc}>Data: {formatDate(date)}</Text>
              <Text style={styles.desc}>Efeito: {efeitos[nome]}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  containerFilho: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.02,
    borderRadius: 15,
  },
  avatar: {
    width: width * 0.08,
    aspectRatio: 30 / 37,
    borderRadius: 50,
  },
  info: {
    marginTop: width * 0.02,
    justifyContent: "center",
    paddingLeft: width * 0.04,
  },
  label: {
    fontSize: width * 0.03,
    fontFamily: "Montserrat_500Medium",
    color: "#fff",
  },
  nome: {
    fontSize: width * 0.04,
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
  },
  dropdownIcon: {
    width: width * 0.08,
    height: width * 0.08,
    marginLeft: "auto",
  },
  dropdown: {
    width: "100%",
    paddingVertical: width * 0.02,
  },
  item: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.01,
  },
  btnAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    fontSize: width * 0.035,
    marginTop: width * 0.01,
    fontFamily: "Montserrat_500Medium",
    color: "#fff",
  },
});

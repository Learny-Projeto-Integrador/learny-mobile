import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

type ContainerFilhosProps = {
  handleRedirect: () => void
}

export default function ContainerFilhos({handleRedirect} : ContainerFilhosProps) {
  const [selectedChild, setSelectedChild] = useState({
    nome: "Laura",
    imagem: require("../../assets/images/joana.png"),
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const filhos = [
    { id: 1, nome: "Laura", imagem: require("../../assets/images/joana.png") },
    { id: 2, nome: "Lucas", imagem: require("../../assets/images/joana.png") },
    { id: 3, nome: "Ana", imagem: require("../../assets/images/joana.png") },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectFilho = (filho: any) => {
    setSelectedChild(filho);
    setDropdownVisible(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/fundo-gradiente-claro.png")}
      style={styles.container}
    >
      <TouchableOpacity onPress={toggleDropdown} style={styles.containerFilho} activeOpacity={1}>
        <Image source={selectedChild.imagem} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.label}>Filho:</Text>
          <Text style={styles.nome}>{selectedChild.nome}</Text>
        </View>
        <Image
          source={require("../../assets/images/icon-dropdown.png")}
          style={styles.dropdownIcon}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          {filhos
            .filter((f) => f.nome !== selectedChild.nome)
            .map((filho) => (
              <TouchableOpacity
                key={filho.id}
                style={styles.item}
                onPress={() => selectFilho(filho)}
              >
                <Image source={filho.imagem} style={styles.avatarMini} />
                <Text style={styles.nomeDropdown}>{filho.nome}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
                style={styles.btnAdd}
                onPress={handleRedirect}
              >
                <MaterialIcons name="add-circle" size={45} color="#fff" />
              </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  containerFilho: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.03,
    borderRadius: 15,
  },
  avatar: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  avatarMini: {
    width: width * 0.08,
    height: width * 0.08,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: width * 0.03,
  },
  info: {
    marginTop: width * 0.02,
    justifyContent: "center",
    paddingLeft: width * 0.04,
  },
  label: {
    fontSize: width * 0.032,
    fontFamily: "Montserrat_500Medium",
    color: "#fff",
  },
  nome: {
    fontSize: width * 0.05,
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
  },
  dropdownIcon: {
    width: width * 0.08,
    height: width * 0.08,
    marginLeft: "auto",
  },
  dropdown: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: width * 0.01,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.034,
    paddingVertical: width * 0.02,
  },
  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: width * 0.02,
  },
  nomeDropdown: {
    fontSize: width * 0.04,
    marginTop: width * 0.01,
    fontFamily: "Montserrat_600SemiBold",
    color: "#fff",
  },
});

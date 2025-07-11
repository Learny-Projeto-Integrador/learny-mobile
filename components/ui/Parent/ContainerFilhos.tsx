import React, { useCallback, useEffect, useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import { useGetToken } from "@/hooks/useGetToken";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Filho = {
  usuario: string;
  nome: string;
  foto: any;
};

type ContainerFilhosProps = {
  filhos: Filho[];
  filhoSelecionado: Filho | null;
  handleRedirect: () => void;
  onSelectFilho: () => void;
};

export default function ContainerFilhos({
  filhos,
  filhoSelecionado,
  handleRedirect,
  onSelectFilho,
}: ContainerFilhosProps) {
  const [selectedChild, setSelectedChild] = useState<Filho | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (filhoSelecionado && Object.keys(filhoSelecionado).length > 0) {
      setSelectedChild(filhoSelecionado);
    }
  }, [filhoSelecionado]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectFilho = async (filho: Filho) => {
    setSelectedChild(filho);
    setDropdownVisible(false);
    return await fetchDadosFilho(filho);
  };

  const { getToken } = useGetToken();

  const fetchDadosFilho = async (filho: any) => {
    setLoading(true);
    setError(null);

    const token = await getToken();

    try {
      const res = await fetch("http://10.0.2.2:5000/pais/filhoselecionado", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filho),
      });
      return res;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (filho: any) => {
    const res = await selectFilho(filho);

    if (res?.ok) {
      onSelectFilho(); // Só chama depois do sucesso
    } else {
      console.error("Erro ao atualizar filho selecionado.");
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/fundo-gradiente-claro.png")}
      style={styles.container}
    >
      {selectedChild == null ? (
        <TouchableOpacity
          onPress={handleRedirect}
          style={styles.containerFilho}
          activeOpacity={1}
        >
          <View
            style={[
              styles.container,
              {
                paddingVertical: 10,
              },
            ]}
          >
            <View style={styles.info}>
              <Text
                style={[
                  styles.nome,
                  {
                    marginTop: -5,
                    fontSize: 25,
                    fontFamily: "Montserrat_400Regular",
                  },
                ]}
              >
                Cadastre um filho
              </Text>
            </View>
            <Image
              source={require("@/assets/icons/icon-plus.png")}
              style={styles.dropdownIcon}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.containerFilho}
            activeOpacity={1}
          >
            <View style={styles.container}>
              <Image
                source={
                  selectedChild.foto
                    ? { uri: selectedChild.foto }
                    : require("@/assets/images/avatar.png")
                }
                style={styles.avatar}
              />
              <View style={styles.info}>
                <Text style={styles.label}>Filho:</Text>
                <Text style={styles.nome}>{selectedChild.nome}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("edit", {
                      userFilho: selectedChild.usuario,
                    })
                  }
                >
                  <Image
                    source={require("@/assets/icons/icon-edit-pequeno.png")}
                    style={styles.dropdownIcon}
                  />
                </TouchableOpacity>
                <Image
                  source={require("@/assets/icons/icon-dropdown.png")}
                  style={styles.dropdownIcon}
                />
              </View>
            </View>
          </TouchableOpacity>
          {dropdownVisible && selectedChild && (
            <View style={styles.dropdown}>
              {filhos
                .filter((f) => f.usuario !== selectedChild.usuario)
                .map((filho) => (
                  <TouchableOpacity
                    key={filho.usuario}
                    style={styles.item}
                    onPress={() => handleSelect(filho)}
                  >
                    <Image
                      source={
                        filho.foto
                          ? { uri: filho.foto }
                          : require("@/assets/images/avatar.png")
                      }
                      style={styles.avatarMini}
                    />
                    <Text style={styles.nomeDropdown}>{filho.nome}</Text>
                  </TouchableOpacity>
                ))}
              <TouchableOpacity style={styles.btnAdd} onPress={handleRedirect}>
                <MaterialIcons name="add-circle" size={45} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
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
    flexDirection: "row",
    alignItems: "center",
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
    aspectRatio: 62 / 62,
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
    width: width * 0.47,
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
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: width * 0.02,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.034,
    paddingVertical: width * 0.02,
  },
  btnAdd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nomeDropdown: {
    fontSize: width * 0.04,
    marginTop: width * 0.01,
    fontFamily: "Montserrat_600SemiBold",
    color: "#fff",
  },
});

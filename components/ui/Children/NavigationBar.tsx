import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/types";
import { RH, RW } from "@/theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NavigationBar() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View
      className="w-full flex-row items-center justify-between bg-[#4C4C4C]"
      style={{
        height: RH(60),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: RW(46),
      }}
    >
      {/* Perfil */}
      <TouchableOpacity onPress={() => navigation.navigate("profileChildren")}>
        <Image
          source={require("@/assets/icons/icon-perfil.png")}
          style={{
            width: RW(46),
            height: RW(46),
            marginTop: -RH(36),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Home (maior destaque) */}
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <Image
          source={require("@/assets/icons/icon-home.png")}
          style={{
            width: RW(56),
            height: RW(56),
            marginTop: -RH(36),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Menu */}
      <TouchableOpacity onPress={() => navigation.navigate("menu")}>
        <Image
          source={require("@/assets/icons/icon-menu.png")}
          style={{
            width: RW(46),
            height: RW(46),
            marginTop: -RH(36),
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

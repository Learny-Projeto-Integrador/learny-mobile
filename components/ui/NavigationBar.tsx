import { Image, TouchableOpacity, View } from "react-native";
import { RH, RW } from "@/theme";
import { useRouter } from "expo-router";

export default function NavigationBar() {
  const router = useRouter();
  return (
    <View
      className="absolute left-0 right-0"
      style={{
        bottom: 0,
        height: RH(60),
      }}
    >
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
        <TouchableOpacity onPress={() => router.push("/screens/profile")}>
          <Image
            source={require("@/assets/icons/navbar/store.png")}
            style={{
              width: RW(46),
              height: RW(46),
              marginTop: -RH(36),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Home (maior destaque) */}
        <TouchableOpacity onPress={() => router.push("/screens/home")}>
          <Image
            source={require("@/assets/icons/navbar/world.png")}
            style={{
              width: RW(56),
              height: RW(56),
              marginTop: -RH(36),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Menu */}
        <TouchableOpacity onPress={() => router.push("/screens/menu")}>
          <Image
            source={require("@/assets/icons/navbar/menu.png")}
            style={{
              width: RW(46),
              height: RW(46),
              marginTop: -RH(36),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

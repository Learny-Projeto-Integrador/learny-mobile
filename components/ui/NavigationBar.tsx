import { Image, TouchableOpacity, View } from "react-native";
import { RH, RS, RW } from "@/theme";
import { useRouter } from "expo-router";
import { Shadow } from "react-native-shadow-2";

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
        className="w-full flex-row items-center justify-center bg-[#4c4c4c]"
        style={{
          height: RH(60),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          gap: RS(90),
          paddingBottom: RS(50),
        }}
      >
        {/* Perfil */}
        <TouchableOpacity onPress={() => router.push("/screens/store")}>
          <Shadow
            distance={8}
            startColor="rgba(0,0,0,0.1)"
            offset={[0, -2]}
            style={{
              alignSelf: "stretch",
            }}
          >
            <View
              className="bg-white items-center justify-center"
              style={{
                width: RW(50),
                height: RW(50),
                borderRadius: 20,
              }}
            >
              <Image
                source={require("@/assets/icons/navbar/store.png")}
                style={{
                  width: RW(34),
                  height: RW(34),
                }}
              />
            </View>
          </Shadow>
        </TouchableOpacity>

        {/* Home (maior destaque) */}
        {/* Perfil */}
        <TouchableOpacity onPress={() => router.push("/screens/home")}>
          <Shadow
            distance={8}
            startColor="rgba(0,0,0,0.1)"
            offset={[0, -2]}
            style={{
              alignSelf: "stretch",
            }}
          >
            <View
              className="bg-white items-center justify-center"
              style={{
                width: RW(58),
                height: RW(58),
                borderRadius: 100,
              }}
            >
              <Image
                source={require("@/assets/icons/navbar/world.png")}
                style={{
                  width: RW(38),
                  height: RW(38),
                }}
              />
            </View>
          </Shadow>
        </TouchableOpacity>

        {/* Menu */}
        {/* Perfil */}
        <TouchableOpacity onPress={() => router.push("/screens/menu")}>
          <Shadow
            distance={8}
            startColor="rgba(0,0,0,0.1)"
            offset={[0, -2]}
            style={{
              alignSelf: "stretch",
            }}
          >
            <View
              className="bg-white items-center justify-center"
              style={{
                width: RW(50),
                height: RW(50),
                borderRadius: 20,
              }}
            >
              <Image
                source={require("@/assets/icons/navbar/menu.png")}
                style={{
                  width: RW(28),
                  height: RW(28),
                }}
              />
            </View>
          </Shadow>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { RF, RH, RS, RW } from "@/theme";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface Props {
  image: any;
  stellarPoints: number;
  cost: number;
  confirming?: boolean;
  onBuy: () => void;
  onOpen: () => void;
  onClose: () => void;
}

function ClosedCard({
  image,
  stellarPoints,
  cost,
  onOpen,
}: {
  image: any;
  stellarPoints: number;
  cost: number;
  onOpen: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onOpen}
      className="bg-[#4C4C4C] items-center"
      style={{
        width: RW(120),
        height: RH(160),
        borderRadius: RW(20),
        paddingVertical: RS(14),
        paddingHorizontal: RS(10),
        gap: RS(8),
      }}
    >
      <Text
        className="font-montserratBold text-white"
        style={{
          fontSize: RF(26),
        }}
      >
        {stellarPoints}
      </Text>

      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: RW(50),
          height: RW(50),
        }}
      />

      <View
        className="bg-white flex-row items-center justify-center"
        style={{
          minWidth: RW(70),
          borderRadius: RW(10),
          paddingHorizontal: RS(12),
          gap: RS(10)
        }}
      >
        <Image
              source={require("@/assets/icons/header/coins.png")}
              resizeMode="contain"
              style={{
                width: RW(18),
                height: RW(18),
              }}
            />
        <Text
          className="font-montserratBold text-[#4C4C4C]"
          style={{
            fontSize: RF(18),
          }}
        >
          {cost}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function OpenCard({
  image,
  stellarPoints,
  cost,
  onBuy,
  onClose,
}: {
  image: any;
  stellarPoints: number;
  cost: number;
  onBuy: () => void;
  onClose: () => void;
}) {
  return (
    <View
      className="bg-[#4C4C4C] flex-row"
      style={{
        width: RW(280),
        height: RH(160),
        borderRadius: RW(20),
        padding: RS(30),
        gap: RS(10),
      }}
    >
      {/* IMAGEM */}
      <View className="justify-center items-center">
        <Text
          className="font-montserratBold text-white"
          style={{
            fontSize: RF(24),
          }}
        >
          {stellarPoints}
        </Text>
        <Image
          source={image}
          resizeMode="contain"
          style={{
            width: RW(60),
            height: RW(60),
          }}
        />
      </View>

      {/* CONTEÚDO */}
      <View
        className="flex-1 justify-center"
        style={{
          gap: RS(12),
          paddingHorizontal: RS(24),
        }}
      >
        <View style={{ gap: RS(4) }}>
          <Text
            className="font-montserratMedium text-white"
            style={{
              fontSize: RF(17),
            }}
          >
            {`Confirmar a compra de ${stellarPoints} SP por ${cost} coins?`}
          </Text>
        </View>

        {/* BOTÕES */}
        <View
          className="flex-row items-center"
          style={{
            gap: RS(8),
          }}
        >
          <TouchableOpacity
            onPress={onClose}
            className="bg-[#EF5B6A] items-center justify-center"
            style={{
              width: RW(38),
              height: RW(38),
              borderRadius: RW(10),
            }}
          >
            <Text
              className="font-montserratBold text-white"
              style={{
                fontSize: RF(14),
              }}
            >
              ✕
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onBuy}
            className="bg-white flex-row items-center justify-center"
            style={{
              height: RW(38),
              borderRadius: RW(10),
              paddingHorizontal: RS(18),
              gap: RS(10),
            }}
          >
            <Image
              source={require("@/assets/icons/header/coins.png")}
              resizeMode="contain"
              style={{
                width: RW(24),
                height: RW(24),
              }}
            />
            <Text
              className="font-montserratBold text-[#4C4C4C]"
              style={{
                fontSize: RF(18),
              }}
            >
              {cost}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function BuyCard(props: Props) {
  if (props.confirming) {
    return <OpenCard {...props} />;
  }

  return <ClosedCard {...props} />;
}

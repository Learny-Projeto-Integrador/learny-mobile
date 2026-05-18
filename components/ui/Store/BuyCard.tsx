import { useState } from "react";

import { useProgress } from "@/contexts/ProgressContext";
import { useCustomAlert } from "@/contexts/AlertContext";

import { useApi } from "@/hooks/useApi";

import { RF, RH, RS, RW } from "@/theme";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface Props {
  image: any;
  stellarPoints: number;
  userCoins: number;
  cost: number;

  confirming?: boolean;

  onOpen: () => void;
  onClose: () => void;
}

function ClosedCard({ image, stellarPoints, cost, onOpen }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onOpen}
      className="bg-[#4C4C4C] items-center"
      style={{
        width: RW(120),
        height: RH(160),
        borderRadius: RW(16),
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
          width: RW(80),
          height: RW(50),
        }}
      />

      <View
        className="bg-white flex-row items-center justify-center"
        style={{
          minWidth: RW(70),
          borderRadius: RW(10),
          paddingHorizontal: RS(12),
          gap: RS(10),
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

function OpenCard({ image, stellarPoints, userCoins, cost, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const { request } = useApi();

  const { setProgress } = useProgress();

  const { showAlert } = useCustomAlert();

  const handleBuy = async () => {
    if (loading) return;

    if (userCoins < cost) {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Coins insuficientes!",
        message: "Você não possui coins suficientes.",
      });

      return;
    }

    setLoading(true);

    const result = await request({
      endpoint: "/child/progress",
      method: "PUT",
      body: {
        stellarPoints,
        coins: -cost,
      },
    });

    setLoading(false);

    if (result && !result.error) {
      showAlert({
        icon: require("@/assets/icons/custom-alert/check-gradient.png"),
        title: "Compra realizada com sucesso!",
        message: `Sua compra de ${stellarPoints} SP foi realizada com sucesso.`,
      });

      setProgress((prev) => {
        if (!prev) return prev;

        return {
          ...prev,

          stellarPoints: (prev.stellarPoints || 0) + stellarPoints,

          coins: (prev.coins || 0) - cost,
        };
      });

      onClose();

      return;
    }

    if (result?.status !== 401) {
      showAlert({
        icon: require("@/assets/icons/custom-alert/alert.png"),
        title: "Erro ao realizar compra!",
        message: result?.message || "Tente novamente.",
      });
    }
  };

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
        <Text
          className="font-montserratMedium text-white"
          style={{
            fontSize: RF(17),
          }}
        >
          {`Confirmar a compra de ${stellarPoints} SP por ${cost} coins?`}
        </Text>

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
            disabled={loading}
            onPress={handleBuy}
            className="bg-white flex-row items-center justify-center"
            style={{
              height: RW(38),
              borderRadius: RW(10),
              paddingHorizontal: RS(18),
              gap: RS(10),
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
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
              </>
            )}
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

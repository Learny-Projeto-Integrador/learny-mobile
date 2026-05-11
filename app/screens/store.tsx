import Container from "@/components/ui/Container";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { RW, RH, RF, RS } from "@/theme";
import { useRouter } from "expo-router";
import DiscountBanner from "@/components/ui/Store/DiscountBanner";
import BuyCard from "@/components/ui/Store/BuyCard";
import { useState } from "react";
import BuyCardContainer from "@/components/ui/Store/BuyCardContainer";

export default function Store() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  
  return (
    <Container mode="customTop" colors={["#FFCC4D", "#FFCC4D"]}>
      <View style={{ gap: RS(30) }}>
        <Image
          source={require("@/assets/images/store/title.png")}
          style={{ width: RW(250), height: RW(88), aspectRatio: 260 / 98 }}
        />
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ position: "absolute", right: RW(30), top: RH(10) }}
        >
          <Image
            source={require("@/assets/icons/back.png")}
            style={{ width: RW(30), height: RW(30) }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: RS(30) }}>

        <View className="items-center" style={{ paddingTop: RS(40), gap: RS(20) }}>
            <View style={{ gap: RS(10) }}>
                <Text className="font-montserratMedium" style={{ fontSize: RF(20) }}>
                    News
                </Text>
                <Image
                source={require("@/assets/images/store/banner.png")}
                style={{ width: RW(320), height: RW(140), aspectRatio: 355 / 146 }}
                />
            </View>
        </View>

        <View style={{ paddingTop: RS(40), gap: RS(20) }}>
            <View style={{ gap: RS(10) }}>
                <Text className="font-montserratMedium" style={{ fontSize: RF(20) }}>
                    For Sale
                </Text>
                <DiscountBanner discount={50} characterImage={{ uri: "https://pi-learny.s3.us-east-1.amazonaws.com/characters/raycoon.png"}} />
            </View>
        </View>

        <View className="items-center" style={{ paddingTop: RS(40), gap: RS(20) }}>
            <View style={{ gap: RS(10) }}>
                <Text className="font-montserratMedium" style={{ fontSize: RF(20) }}>
                    Stellar Points
                </Text>
                <BuyCardContainer>
                  <BuyCard
                    image={{uri: "https://pi-learny.s3.us-east-1.amazonaws.com/store/sp-small.png"}}
                    stellarPoints={100}
                    cost={100}
                    confirming={selectedCard === 0}
                    onOpen={() => setSelectedCard(0)}
                    onClose={() => setSelectedCard(null)}
                    onBuy={() => console.log("comprou")}
                  />
                  <BuyCard
                    image={{uri: "https://pi-learny.s3.us-east-1.amazonaws.com/store/sp-small.png"}}
                    stellarPoints={100}
                    cost={100}
                    confirming={selectedCard === 1}
                    onOpen={() => setSelectedCard(1)}
                    onClose={() => setSelectedCard(null)}
                    onBuy={() => console.log("comprou")}
                  />
                  <BuyCard
                    image={{uri: "https://pi-learny.s3.us-east-1.amazonaws.com/store/sp-small.png"}}
                    stellarPoints={100}
                    cost={100}
                    confirming={selectedCard === 2}
                    onOpen={() => setSelectedCard(2)}
                    onClose={() => setSelectedCard(null)}
                    onBuy={() => console.log("comprou")}
                  />
                  <BuyCard
                    image={{uri: "https://pi-learny.s3.us-east-1.amazonaws.com/store/sp-small.png"}}
                    stellarPoints={100}
                    cost={100}
                    confirming={selectedCard === 3}
                    onOpen={() => setSelectedCard(3)}
                    onClose={() => setSelectedCard(null)}
                    onBuy={() => console.log("comprou")}
                  />
                </BuyCardContainer>
            </View>
        </View>

      </View>


    </Container>
  );
}

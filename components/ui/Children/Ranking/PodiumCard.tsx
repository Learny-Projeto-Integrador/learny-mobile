import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

type Props = {
  rank: number;
  name: string;
  points: number;
  image: any;
}

export default function PodiumCard({ rank, name, points, image }: Props){
  const colors = ["#E3AC0A", "#B8B9BB", "#C55A1D"]
  const borderColor = colors[rank - 1] || "#000";
  const color = colors[rank - 1] || "#000";
  return (
    <View style={styles.container}>
      <Image source={image ? {uri: image} : require("@/assets/images/avatar.png")} style={[styles.avatar, {borderColor}]} />
      <View style={[styles.card, {borderColor}]}>
        <View style={{flexDirection: "row", alignItems: "center", gap: scale(6)}}>
          <Text style={[styles.rank, {color}]}>{rank}º</Text>
          <Text style={styles.txt}>{name}</Text>
        </View>
        <Text style={styles.points}>
          <Text style={styles.txt}>{points}</Text> pts.
        </Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(18),
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(46),
    borderWidth: scale(3),
  },
  card: {
    width: scale(180),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    borderWidth: scale(3),
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
  },
  rank: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: scale(16),
    color: '#C55A1D',
  },
  txt: {
    color: '#333',
    fontFamily: 'Montserrat_700Bold',
    fontSize: scale(12),
  },
  points: {
    marginLeft: 'auto',
    fontSize: scale(10),
    color: '#555',
  },
});

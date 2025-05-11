import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

type PodiumCardProps = {
  rank: number;
  name: string;
  points: number;
  image: any;
}

export default function PodiumCard({ rank, name, points, image }: PodiumCardProps){
  const colors = ["#E3AC0A", "#B8B9BB", "#C55A1D"]
  const borderColor = colors[rank - 1] || "#000";
  const color = colors[rank - 1] || "#000";
  return (
    <View style={styles.container}>
      <Image source={image ? {uri: image} : require("../../assets/images/avatar.png")} style={[styles.avatar, {borderColor}]} />
      <View style={[styles.card, {borderColor}]}>
        <View style={{flexDirection: "row", alignItems: "center", gap: width * 0.02}}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.04,
  },
  avatar: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: width * 0.13,
    borderWidth: 5,
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 5,
    borderRadius: 15,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
    width: width * 0.5,
    gap: width * 0.1,
  },
  rank: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: width * 0.05,
    color: '#C55A1D',
  },
  txt: {
    color: '#333',
    fontFamily: 'Montserrat_700Bold',
    fontSize: width * 0.035,
  },
  points: {
    marginLeft: 'auto',
    color: '#555',
  },
});

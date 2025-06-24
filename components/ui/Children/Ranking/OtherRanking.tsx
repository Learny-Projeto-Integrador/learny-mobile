import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const OtherRanking = ({ rank, name, points, image, borderColor }: any) => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/circulo-gradiente.png")} style={styles.avatar} />
      <View style={styles.card}>
        <View style={{flexDirection: "row", alignItems: "center", gap: width * 0.02}}>
          <Text style={styles.rank}>{rank}º</Text>
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
    width: width * 0.05,
    marginRight: 10,
    aspectRatio: 1/1
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: height * 0.01,
    width: width * 0.5,
  },
  rank: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: width * 0.045,
    color: '#fff',
  },
  txt: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: width * 0.04,
  },
  points: {
    marginLeft: 'auto',
    color: '#fff',
  },
});

export default OtherRanking;

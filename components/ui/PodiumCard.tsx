import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const PodiumCard = ({ rank, name, points, image, borderColor }: any) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/avatar.png")} style={styles.avatar} />
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

const BORDER_COLOR = '#C55A1D';

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
    borderColor: BORDER_COLOR,
    marginRight: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: BORDER_COLOR,
    borderRadius: 15,
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.05,
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

export default PodiumCard;

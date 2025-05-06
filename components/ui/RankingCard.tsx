import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const RankingCard = ({ rank, name, points, image, borderColor }: any) => {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/avatar.png")} style={styles.avatar} />
      <View style={styles.card}>
        <View style={{flexDirection: "row", alignItems: "center", gap: width * 0.02}}>
          <Text style={styles.rank}>{rank}º</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
        <Text style={styles.points}>
          <Text style={styles.boldPoints}>{points}</Text> pts.
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
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.14,
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
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    gap: width * 0.14,
  },
  rank: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: width * 0.05,
    color: '#C55A1D',
  },
  name: {
    color: '#333',
    fontFamily: 'Montserrat_700Bold',
    fontSize: width * 0.045,
    flexShrink: 1,
  },
  points: {
    marginLeft: 'auto',
    color: '#555',
  },
  boldPoints: {
    color: '#333',
    fontFamily: 'Montserrat_700Bold',
    fontSize: width * 0.045,
  },
});

export default RankingCard;

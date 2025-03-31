import { ImageBackground, Image, Text, StyleSheet, Dimensions, View } from 'react-native';

import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TransitionScreen() {

  const route = useRoute();
  const navigation = useNavigation();

  //@ts-ignore
  const { name } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      //@ts-ignore
      navigation.navigate('profileParent');
    }, 2000);

    return () => clearTimeout(timer); // Limpa o timer ao desmontar a tela
  }, [navigation]);

  return (
    <ImageBackground 
      source={require('../assets/images/fundo-transicao.png')} 
      resizeMode="cover" 
      style={styles.container}
      >
        <View style={styles.viewText}>
          <Text style={styles.text}>Bem Vindo,</Text>
          <Text style={styles.nameText}>{name}</Text>
        </View>
      </ImageBackground>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: width * 0.08,
  },
  viewText: {
    marginTop: height * 0.05,
  },
  text: {
    fontSize: width * 0.08,
    color: '#fff',
    fontFamily: 'Montserrat_400Regular'
  },
  nameText: {
    color: '#fff',
    fontSize: width * 0.12,
    fontFamily: 'Montserrat_700Bold'
  },
});

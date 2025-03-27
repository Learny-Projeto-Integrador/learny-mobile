import { View, ImageBackground, Image, StyleSheet, Dimensions, ScrollView, Text, TextInput} from 'react-native';
import React from 'react';

export default function HomeScreen() {

  return (
    <ImageBackground 
      source={require('../assets/images/fundo-gradiente.png')} 
      resizeMode="cover" 
      style={styles.container}
      >
      <ScrollView>
        <View style={styles.viewNav}>
          <View style={styles.viewF}>
            <Image style={styles.iconFire} source={require('../assets/images/iconFogo.png')}/>
            <Text style={styles.txtFire}> </Text>
          </View>
          <View style={styles.viewC}>
            <Image style={styles.iconCoin} source={require('../assets/images/iconMoeda.png')}/>
            <Text style={styles.txtCoin}> </Text>
          </View>
          <View style={styles.viewS}>
            <Image style={styles.iconStar} source={require('../assets/images/iconEstrela.png')}/>
            <Text style={styles.txtStar}> </Text>
          </View>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.txt1}> Mundos </Text>
          <Text style={styles.txt2}> Escolha um mundo </Text>
          <Text style={styles.txt3}> para aprender </Text>
        </View>
        <View style={styles.viewMundos}>
          <View style={styles.viewMundo1}>
            <Image style={styles.ftMundo1}></Image>
            <Text style={styles.mundo1}></Text>
          </View>
          <View style={styles.viewMundo2}>
            <Image style={styles.ftMundo2}></Image>
            <Text style={styles.mundo2}></Text>
          </View>
          <View style={styles.viewMundo3}>
            <Image style={styles.ftMundo3}></Image>
            <Text style={styles.mundo3}></Text>
          </View>
          <View style={styles.viewMundo4}>
            <Image style={styles.ftMundo4}></Image>
            <Text style={styles.mundo4}></Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewNav: {
    display: 'flex',
    flexDirection: 'row', // Isso coloca os itens lado a lado
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: 500,
    height: 70,
    marginTop: 60
  },
  viewF:{
    //backgroundColor: 'pink',
    width: '33.3%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row', // Isso coloca os itens lado a lado
    alignItems: 'center',
    marginLeft: 20
  },
  iconFire: {
    position: 'absolute', // Faz com que o ícone seja posicionado sobre o campo de input
    zIndex: 1,  // Coloca o ícone acima do campo de texto
    bottom: 10,
    width: 40,
    height: 50
  },
  txtFire: {
    width: '50%',
    height: 35,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: 20
  },
  viewC:{
    //backgroundColor: 'pink',
    width: '33.3%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row', // Isso coloca os itens lado a lado
    alignItems: 'center',
  },
  iconCoin: {
    position: 'absolute', // Faz com que o ícone seja posicionado sobre o campo de input
    zIndex: 1,  // Coloca o ícone acima do campo de texto
    bottom: 7,
    width: 50,
    height: 55
  },
  txtCoin: {
    width: '50%',
    height: 35,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: 20
  },
  viewS:{
    //backgroundColor: 'pink',
    width: '33.3%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row', // Isso coloca os itens lado a lado
    alignItems: 'center',
  },
  iconStar: {
    position: 'absolute', // Faz com que o ícone seja posicionado sobre o campo de input
    zIndex: 1,  // Coloca o ícone acima do campo de texto
    bottom: 8,
    width: 40,
    height: 50
  },
  txtStar: {
    width: '50%',
    height: 35,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    marginLeft: 20,
  },
  viewText: {
    marginTop: 30,
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  txt1: {
    fontSize: 40,
  },
  txt2: {
    fontSize: 15,
    marginTop: 15
  },
  txt3: {
    fontSize: 15,
  },
  viewMundos: {
    backgroundColor: 'pink',
    width: '100%',
    height: '500%',
  },
  viewMundo1: {

  },
  ftMundo1: {

  },
  mundo1: {

  },
  viewMundo2: {

  },
  ftMundo2: {

  },
  mundo2: {

  },
  viewMundo3: {

  },
  ftMundo3: {

  },
  mundo3: {

  },
  viewMundo4: {

  },
  ftMundo4: {

  },
  mundo4: {

  },





});

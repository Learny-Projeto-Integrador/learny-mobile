import { ImageBackground, StyleSheet, TextInput, Image, Alert, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';

export default function CadastroScreen() {

  return (
    <ImageBackground 
      source={require('../assets/images/fundo-gradiente.png')} 
      resizeMode="cover" 
      style={styles.container}
      >
        <TouchableOpacity onPress={() => Alert.alert('Botão Clicado', 'Você pressionou o botão de confirmar!')}>
          <Image style={styles.btnImg} source={require('../assets/images/icone-camera.png')}/>
        </TouchableOpacity>
        

        <View style={styles.viewUsu}>
          <Text style={styles.usuTxt}>Usuário:</Text>
          <TextInput style={styles.usuInput}></TextInput>
        </View>

        <View style={styles.viewPword}>
          <Text style={styles.pwordTxt}>Senha:</Text>
          <TextInput style={styles.pwordInput}></TextInput>
        </View>

        <View style={styles.viewEmail}>
          <Text style={styles.emailTxt}>E-mail:</Text>
          <TextInput style={styles.emailInput}></TextInput>
        </View>

        <View style={styles.viewBtn}>
          <TouchableOpacity onPress={() => Alert.alert('Botão Clicado', 'Você pressionou o botão de confirmar!')}>
            <Image style={styles.btnCal} source={require('../assets/images/data.png')}/>
          </TouchableOpacity>
        
          <TouchableOpacity onPress={() => Alert.alert('Botão Clicado', 'Você pressionou o botão de confirmar!')}>
            <Image style={styles.btn} source={require('../assets/images/icon-confirmar.png')}/>
          </TouchableOpacity>
        </View>
        

    </ImageBackground>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  btnImg: {
    width: 165,
    height: 165,
  },
  viewUsu: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    height: '5%',
    marginBottom: 33
  },
  usuTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: '70%'
  },
  usuInput: {
    backgroundColor: '#fff',
    width: '90%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    borderColor: '#f0f0f0',
    fontSize: 20,
    marginBlockStart: 5
  },
  viewPword: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    height: '5%',
    marginBottom: 33
  },
  pwordTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: '73%',
  },
  pwordInput: {
    backgroundColor: '#fff',
    width: '90%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    borderColor: '#f0f0f0',
    fontSize: 20,
    marginBlockStart: 5
  },
  viewEmail: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    height: '5%',
    marginBottom: 33
  },
  emailTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: '72%'
  },
  emailInput: {
    backgroundColor: '#fff',
    width: '90%',
    height: '100%',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    borderColor: '#f0f0f0',
    fontSize: 20,
    marginBlockStart: 5
  },
  viewBtn: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    width: '100%',
    height: '12%',
    marginBlockStart: 10,
    marginRight: '22%'

  },
  btnCal: {
    marginLeft: '50%',
    width: '90%',
    height: '90%'
  },
  btn: {
    marginRight: '9%',
    width: 70,
    height: 70
  }

});

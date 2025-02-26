import { ImageBackground, StyleSheet, TextInput, } from 'react-native';
import { Text, View } from '@/components/Themed';
import React from 'react';

export default function CadastroScreen() {

  return (
    <ImageBackground 
      source={require('../assets/images/fundo-gradiente.png')} 
      resizeMode="cover" 
      style={styles.container}
      >
        <View style={styles.viewText}>
          <Text style={styles.text}>Tela de Cadastro</Text>
        </View>

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
  viewText: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    marginBlockStart: -250,
    fontWeight: 'bold',
  },
  viewUsu: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    height: '5%'
  },
  usuTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: '66%'
  },
  usuInput: {
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
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
    height: '5%'
  },
  pwordTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: '68%',
  },
  pwordInput: {
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
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
    height: '5%'
  },
  emailTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: '67%'
  },
  emailInput: {
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    borderColor: '#f0f0f0',
    fontSize: 20,
    marginBlockStart: 5
  }

});

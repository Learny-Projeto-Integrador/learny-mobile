import { Alert, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';

import { Text, View } from '@/components/Themed';
import React from 'react';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {

  const navigation = useNavigation();

  const [usuario, onChangeUsuario] = React.useState('');
  const [senha, onChangeSenha] = React.useState('');

  return (
    <ImageBackground 
      source={require('../assets/images/fundo-gradiente.png')} 
      resizeMode="cover" 
      style={styles.container}
      >
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Entre em sua conta Learny</Text>
        <Text style={styles.subTitle}>Faça login com suas informações de cadastro</Text>
      </View>
      <View style={styles.viewInputs}>
        <View style={styles.viewInput}>
          <Text style={styles.text}>Usuário:</Text>
          <View style={styles.divider}>|</View>
          <TextInput
              style={styles.input}
              onChangeText={onChangeUsuario}
              value={usuario}
              placeholderTextColor="#757575"
            />
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.text}>Senha:</Text>
          <View style={styles.divider}>|</View>
          <TextInput
              style={styles.input}
              onChangeText={onChangeSenha}
              value={senha}
              placeholderTextColor="#757575"
            />
        </View>
        <TouchableOpacity 
          style={styles.button} 
          onPress={
            // @ts-ignore
            () => navigation.navigate('(tabs)')
          }
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewLink}>
        <Text style={styles.txt}>Sem uma Conta?</Text>
        <Link href="/cadastro" style={styles.link}>Começe aqui</Link>
      </View>
      </ImageBackground>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: height * 0.025,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
  },
  viewTitle: {
    width: '80%',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    alignItems: 'center',
    gap: height * 0.01,
  },
  title: {
    color: '#fff',
    fontSize: width * 0.055,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  viewInputs: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    gap: height * 0.015,
  },
  viewInput: {
    width: '100%',
    height: height * 0.06,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    width: width * 0.22,
    display: 'flex',
    textAlign: 'center',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#547d98',
  },
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: '#a3a3a3'
  },
  input: {
    backgroundColor: '#fff',
    fontSize: width * 0.05,
    paddingLeft: width * 0.05, 
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: height * 0.07,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#547d98',
    textAlign: 'center',
  },
  viewLink: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.06,
  },
  txt: {
    fontSize: width * 0.04,
    color: '#fff'
  },
  link: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#fff'
  }
});

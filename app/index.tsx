import { Alert, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import React from 'react';
import { Link } from 'expo-router';

export default function LoginScreen() {

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
      <TextInput
          style={styles.input}
          onChangeText={onChangeUsuario}
          value={usuario}
          placeholder='Usuário'
          placeholderTextColor="#757575"
        />
      <TextInput
          style={styles.input}
          onChangeText={onChangeSenha}
          value={senha}
          placeholder='Senha'
          placeholderTextColor="#757575"
        />
      <TouchableOpacity onPress={() => Alert.alert('Botão Clicado', 'Você pressionou o botão de confirmar!')}>
        <Image
          style={styles.btn}
          source={require('../assets/images/icon-confirmar.png')}
        />
      </TouchableOpacity>
      <View style={styles.viewLink}>
        <Text style={styles.txt}>Sem uma Conta?</Text>
        <Link href="/cadastro" style={styles.link}>Começe aqui</Link>
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
  logo: {
    width: 150,
    height: 150,
  },
  viewTitle: {
    width: '80%',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    borderColor: '#f0f0f0',
    fontSize: 20,
  },
  btn: {
    width: 60,
    height: 60,
  },
  viewLink: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  txt: {
    fontSize: 20,
    color: '#fff'
  },
  link: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#fff'
  }
});

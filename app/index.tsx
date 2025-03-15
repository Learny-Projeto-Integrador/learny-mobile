import { Alert, Image, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import { Text, View } from '@/components/Themed';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import LoginInput from '@/components/ui/LoginInput';


export default function LoginScreen() {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await fetch("http://10.0.2.2:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: usuario,
          password: senha
        })
      });
  
      const result = await res.json();
      
      if (res.ok) {
        // @ts-ignore
        navigation.navigate("(tabs)");
      } else {
        setError(result.error);
      }
  
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <LoginInput campo="Usuário" valor={usuario} atualizar={setUsuario} />
        <LoginInput campo="Senha" valor={senha} atualizar={setSenha} />
        <TouchableOpacity 
          style={styles.button} 
          onPress={
            // @ts-ignore
            () => handleLogin()
          }
        >
          {loading ? <ActivityIndicator size="large" color="#547d98" /> : <Text style={styles.buttonText}>Entrar</Text>}
        </TouchableOpacity>
      </View>
      <View style={styles.viewLink}>
        <Text style={styles.txt}>Sem uma Conta?</Text>
        <Link href="/cadastro"><Text style={styles.link}>Começe aqui</Text></Link>
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

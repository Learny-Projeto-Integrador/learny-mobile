import { 
  ImageBackground, 
  Text, 
  StyleSheet, 
  Dimensions, 
  View 
} from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';

export default function TransitionScreen() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home')
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground 
      source={require('@/assets/images/transition-background.png')} 
      resizeMode="cover" 
      style={styles.container}
      >
        <View style={{ marginTop: height * 0.05 }}>
          <Text style={styles.text}>Bem Vindo (a),</Text>
          <Text style={styles.nameText}>{user?.name}</Text>
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

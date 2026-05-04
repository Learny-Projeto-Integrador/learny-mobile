import { 
  ImageBackground, 
  Text, 
  View 
} from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { RF, RS } from "@/theme";

/**
 * Página de transição do login
 *
 * Responsável por:
 * - Exibir uma tela de boas-vindas personalizada após o login, antes de redirecionar para a home
 */
export default function TransitionScreen() {
  const router = useRouter();

  /** Contexto do usuário */
  const { user } = useUser();

  /**
   * Efeito para redirecionar automaticamente para a home após 2 segundos
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/screens/home')
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground 
      source={require('@/assets/images/transition-background.png')} 
      resizeMode="cover" 
      className='flex-1 justify-center'
      style={{ paddingLeft: RS(24) }}
      >
        <View style={{ marginTop: RS(16) }}>
          <Text 
            className="text-white font-montserratRegular"
            style={{ fontSize: RF(30) }}
          >
            Bem Vindo (a),
          </Text>
          <Text 
            className="text-white font-montserratBold"
            style={{ fontSize: RF(36) }}
          >
            {user?.name}
          </Text>
        </View>
      </ImageBackground>
  );
}

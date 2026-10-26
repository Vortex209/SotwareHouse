import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import {
  entrarComEmail,
  entrarComGoogle,
  mensagemErroAuth,
} from '@/services/auth';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleLogin() {
    // Verifica se os campos estão preenchidos
    if (!email.trim() || !senha) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o e-mail e a senha para continuar.'
      );
      return;
    }

    try {
      await entrarComEmail(email.trim(), senha);

      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('ERRO NO LOGIN:', error);

      Alert.alert(
        'Erro ao entrar',
        mensagemErroAuth(error?.code || '')
      );
    }
  }

  async function handleGoogleLogin() {
    try {
      await entrarComGoogle();

      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('ERRO NO GOOGLE:', error);

      Alert.alert(
        'Erro ao entrar com Google',
        mensagemErroAuth(error?.code || '')
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AeroLink</Text>

      <Text style={styles.subtitle}>
        Faça login para continuar
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          importantForAutofill="no"
        />

        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setMostrarSenha(!mostrarSenha)}
          accessibilityLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
        >
          <Svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mostrarSenha ? (
              <>
                <Path d="M3 3l18 18" />
                <Path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <Path d="M9.9 5.2A11.5 11.5 0 0 1 12 5c5 0 8.3 4.5 9 7-.3 1.1-1.1 2.5-2.3 3.7" />
                <Path d="M6.2 6.2C3.9 7.6 2.5 10 2 12c.7 2.5 4 7 10 7 1.2 0 2.3-.2 3.3-.6" />
              </>
            ) : (
              <>
                <Path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                <Path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </>
            )}
          </Svg>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
      >
        <Svg width="20" height="20" viewBox="0 0 24 24">
          <Path
            fill="#4285F4"
            d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
          />

          <Path
            fill="#34A853"
            d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"
          />

          <Path
            fill="#FBBC05"
            d="M6.54 13.83A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.83V7.64H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.36l3.25-2.53Z"
          />

          <Path
            fill="#EA4335"
            d="M12 6.14c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.25 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.25 2.53C7.31 7.86 9.46 6.14 12 6.14Z"
          />
        </Svg>

        <Text style={styles.googleText}>
          Continuar com Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#002D72',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffffff',
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
    color: '#ff893bff',
    fontSize: 13,
  },

  input: {
    height: 35,
    borderWidth: 1,
    borderColor: '#00265fff',
    backgroundColor: '#00265fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
  },

  button: {
    height: 35,
    borderRadius: 10,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  googleButton: {
    height: 35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DADCE0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: '#FFFFFF',
  },

  googleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3C4043',
    marginLeft: 10,
  },

  passwordContainer: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00265fff',
    backgroundColor: '#00265fff',
    borderRadius: 10,
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    color: '#fff',
  },

  eyeButton: {
    height: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
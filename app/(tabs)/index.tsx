import { useRouter } from 'expo-router';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { observarUsuario, sair } from '@/services/auth';

export default function HomeScreen() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = observarUsuario((user) => {
      setUsuario(user);
    });

    return unsubscribe;
  }, []);

  async function handleLogout() {
    await sair();
    router.replace('/login');
  }

  const nome = usuario?.displayName;
  const email = usuario?.email || 'E-mail não informado';
  const foto = usuario?.photoURL;
  const loginGoogle = usuario?.providerData.some(
    (provedor) => provedor.providerId === 'google.com'
  );

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {foto ? (
          <Image
            source={{ uri: foto }}
            style={styles.avatarImage}
          />
        ) : (
          <Text style={styles.avatarText}>
            {(nome || 'U').charAt(0).toUpperCase()}
          </Text>
        )}
      </View>

      <Text style={styles.title}>Olá {nome}!</Text>



      <View style={styles.card}>
        {loginGoogle ? (
          <>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>
              {nome}
            </Text>
          </>
        ) : (
          <Text style={styles.value}>
            Olá, viajante!
          </Text>
        )}

        <Text style={styles.label}>E-mail</Text>

        <Text style={styles.value}>
          {email}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: 80,
    backgroundColor: '#002D72',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  avatarText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffffff',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: '#666',
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 30,
  },

  label: {
    fontSize: 13,
    color: '#777',
    marginTop: 8,
  },

  value: {
    fontSize: 15,
    color: '#222',
    marginTop: 3,
  },

  button: {
    width: '100%',
    height: 35,
    borderRadius: 10,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
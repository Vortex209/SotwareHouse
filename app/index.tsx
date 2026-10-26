import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { auth } from '@/services/firebase';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      const timer = setTimeout(() => {
        if (usuario) {
          router.replace('/(tabs)');
        } else {
          router.replace('/login');
        }
      }, 2000);

      return () => clearTimeout(timer);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AeroLink</Text>
      <Text style={styles.subtitle}>Viagens na palma da mão.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002D72',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffffff',
  },

  subtitle: {
    marginTop: 8,
    fontSize: 12,
    color: '#ff893bff',
  },
});
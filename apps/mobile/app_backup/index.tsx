import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    console.log('Index screen loaded successfully!');
  }, []);

  const handleGetStarted = () => {
    console.log('Navigating to login...');
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Piece</Text>
      <Text style={styles.subtitle}>퍼즐 조각처럼 만나는 소셜 앱</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
      
      <Text style={styles.debug}>✅ App loaded successfully!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  debug: {
    position: 'absolute',
    bottom: 50,
    fontSize: 12,
    color: '#0f0',
  },
});

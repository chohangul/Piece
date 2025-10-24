import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Piece App Works!</Text>
      <Text style={styles.subtitle}>최소 버전 테스트 성공</Text>
      <Text style={styles.info}>이 화면이 보이면 앱이 정상 작동하는 것입니다.</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0f0',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

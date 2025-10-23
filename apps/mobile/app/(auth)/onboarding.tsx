import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const INTERESTS = [
  '사진', '카페', '음악', '공연', '요가', '운동',
  '서핑', '여행', '독서', '영화', '요리', '게임',
  '그림', '댄스', '등산', '자전거', '캠핑', '낚시',
];

export default function OnboardingScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest]);
      } else {
        Alert.alert('알림', '최대 5개까지 선택할 수 있습니다.');
      }
    }
  };

  const handleComplete = async () => {
    if (selectedInterests.length < 2) {
      Alert.alert('알림', '최소 2개 이상의 관심사를 선택해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      // Update user interests via API
      // await apiClient.updateUserInterests(selectedInterests);
      router.replace('/(main)/home');
    } catch (error: any) {
      Alert.alert('오류', error.message || '관심사 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>관심사 선택</Text>
        <Text style={styles.subtitle}>
          최소 2개 이상 선택해주세요 ({selectedInterests.length}/5)
        </Text>

        <View style={styles.interestsGrid}>
          {INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest);
            return (
              <TouchableOpacity
                key={interest}
                style={[styles.interestChip, isSelected && styles.interestChipSelected]}
                onPress={() => toggleInterest(interest)}
              >
                <Text style={[styles.interestText, isSelected && styles.interestTextSelected]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedInterests.length < 2 && styles.buttonDisabled,
          ]}
          onPress={handleComplete}
          disabled={selectedInterests.length < 2 || isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? '처리 중...' : '시작하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  interestChipSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  interestText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  interestTextSelected: {
    color: '#fff',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiClient } from '@/api/client';

interface MatchRequestCardProps {
  intentId: string;
  fromUser: {
    id: string;
    nickname: string;
    avatar_url?: string;
  };
  via: 'send_piece' | 'open_last_piece';
  createdAt: string;
  onRespond?: () => void;
}

export function MatchRequestCard({ intentId, fromUser, via, createdAt, onRespond }: MatchRequestCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRespond = async (accept: boolean) => {
    try {
      setIsProcessing(true);
      await apiClient.match.respond(intentId, accept);
      
      if (accept) {
        Alert.alert(
          '매칭 성공! 🎉',
          `${fromUser.nickname}님과 매칭되었습니다. 이제 채팅을 시작할 수 있어요!`,
          [{ text: '확인', onPress: onRespond }]
        );
      } else {
        Alert.alert(
          '거절 완료',
          '요청을 거절했습니다.',
          [{ text: '확인', onPress: onRespond }]
        );
      }
    } catch (error: any) {
      Alert.alert('처리 실패', error.message || '요청 처리에 실패했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  const viaText = via === 'send_piece' ? '피스를 보냈어요' : '마지막 조각을 열었어요';

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={32} color="#999" />
      </View>

      <View style={styles.content}>
        <Text style={styles.nickname}>{fromUser.nickname}</Text>
        <Text style={styles.via}>{viaText}</Text>
        <Text style={styles.time}>{new Date(createdAt).toLocaleDateString()}</Text>
      </View>

      {isProcessing ? (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      ) : (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={() => handleRespond(true)}
            disabled={isProcessing}
          >
            <Ionicons name="checkmark" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => handleRespond(false)}
            disabled={isProcessing}
          >
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  nickname: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  via: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#34C759',
  },
  rejectButton: {
    backgroundColor: '#FF3B30',
  },
  loading: {
    width: 88,
    alignItems: 'center',
  },
});

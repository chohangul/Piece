import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiClient } from '@/api/client';

interface SendPieceButtonProps {
  toUserId: string;
  via: 'send_piece' | 'open_last_piece';
  disabled?: boolean;
  onSuccess?: () => void;
}

export function SendPieceButton({ toUserId, via, disabled, onSuccess }: SendPieceButtonProps) {
  const [isSending, setIsSending] = useState(false);

  const handleSendPiece = async () => {
    try {
      setIsSending(true);
      await apiClient.match.sendPiece(toUserId, via);
      
      Alert.alert(
        '피스 전송 완료',
        '상대방이 수락하면 채팅을 시작할 수 있어요!',
        [{ text: '확인', onPress: onSuccess }]
      );
    } catch (error: any) {
      Alert.alert('전송 실패', error.message || '피스 전송에 실패했습니다.');
    } finally {
      setIsSending(false);
    }
  };

  if (isSending) {
    return (
      <TouchableOpacity style={[styles.button, styles.buttonLoading]} disabled>
        <ActivityIndicator size="small" color="#fff" />
        <Text style={styles.buttonText}>전송 중...</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={handleSendPiece}
      disabled={disabled || isSending}
    >
      <Ionicons name="paper-plane" size={20} color="#fff" />
      <Text style={styles.buttonText}>피스 보내기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    paddingHorizontal: 24,
    backgroundColor: '#007AFF',
    borderRadius: 24,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonLoading: {
    backgroundColor: '#999',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

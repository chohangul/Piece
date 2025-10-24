import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WALLET_CONFIG, UNLOCK_METHODS } from '@piece/config';
import { useWalletStore } from '@/stores/wallet-store';

interface PieceUnlockModalProps {
  visible: boolean;
  pieceState: 'free' | 'paid';
  onUnlock: (method: 'free_pass' | 'coin' | 'promo') => Promise<void>;
  onClose: () => void;
}

export function PieceUnlockModal({ visible, pieceState, onUnlock, onClose }: PieceUnlockModalProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { coins, passTier } = useWalletStore();

  const unlockCost = pieceState === 'paid' ? WALLET_CONFIG.LAST_PIECE_COST : WALLET_CONFIG.UNLOCK_COST_COIN;
  const hasEnoughCoins = coins >= unlockCost;
  const hasFreePass = passTier !== 'free' && pieceState === 'free';

  const handleUnlock = async (method: 'free_pass' | 'coin' | 'promo') => {
    if (method === 'coin' && !hasEnoughCoins) {
      Alert.alert('코인 부족', '코인이 부족합니다. 충전 페이지로 이동하시겠습니까?', [
        { text: '취소', style: 'cancel' },
        { text: '충전하기', onPress: () => {
          // Navigate to wallet/purchase
          onClose();
        }},
      ]);
      return;
    }

    try {
      setIsUnlocking(true);
      await onUnlock(method);
      onClose();
    } catch (error: any) {
      Alert.alert('해제 실패', error.message || '조각 해제에 실패했습니다.');
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {pieceState === 'paid' ? '🔒 마지막 조각 해제' : '🧩 조각 해제'}
            </Text>
            <TouchableOpacity onPress={onClose} disabled={isUnlocking}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {pieceState === 'paid' ? (
              <View>
                <Text style={styles.description}>
                  마지막 조각을 해제하면 전체 카드를 볼 수 있어요.
                </Text>
                <Text style={styles.highlight}>
                  ✨ 마지막 조각을 해제하면 상대방에게 피스를 보낼 수 있습니다!
                </Text>
              </View>
            ) : (
              <Text style={styles.description}>
                조각을 해제하여 카드의 일부를 확인하세요.
              </Text>
            )}

            {/* Unlock Options */}
            <View style={styles.options}>
              {/* Free Pass Option (only for free pieces with premium pass) */}
              {pieceState === 'free' && hasFreePass && (
                <TouchableOpacity
                  style={[styles.option, styles.optionPrimary]}
                  onPress={() => handleUnlock(UNLOCK_METHODS.FREE_PASS)}
                  disabled={isUnlocking}
                >
                  <View style={styles.optionIcon}>
                    <Ionicons name="ticket" size={32} color="#007AFF" />
                  </View>
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>무료 패스 사용</Text>
                    <Text style={styles.optionSubtitle}>프리미엄 혜택</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                </TouchableOpacity>
              )}

              {/* Coin Option */}
              <TouchableOpacity
                style={[
                  styles.option,
                  !hasEnoughCoins && styles.optionDisabled,
                ]}
                onPress={() => handleUnlock(UNLOCK_METHODS.COIN)}
                disabled={isUnlocking || !hasEnoughCoins}
              >
                <View style={styles.optionIcon}>
                  <Ionicons
                    name="diamond"
                    size={32}
                    color={hasEnoughCoins ? '#FFD700' : '#ccc'}
                  />
                </View>
                <View style={styles.optionContent}>
                  <Text style={[
                    styles.optionTitle,
                    !hasEnoughCoins && styles.optionTitleDisabled,
                  ]}>
                    코인 사용
                  </Text>
                  <Text style={[
                    styles.optionSubtitle,
                    !hasEnoughCoins && styles.optionSubtitleDisabled,
                  ]}>
                    {unlockCost} 코인 (보유: {coins})
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={hasEnoughCoins ? '#666' : '#ccc'}
                />
              </TouchableOpacity>

              {!hasEnoughCoins && (
                <TouchableOpacity
                  style={[styles.option, styles.optionCharge]}
                  onPress={() => {
                    // Navigate to wallet/purchase
                    onClose();
                  }}
                  disabled={isUnlocking}
                >
                  <Ionicons name="add-circle" size={24} color="#007AFF" />
                  <Text style={styles.chargeText}>코인 충전하기</Text>
                </TouchableOpacity>
              )}
            </View>

            {isUnlocking && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>해제 중...</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  content: {
    padding: 20,
    gap: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  highlight: {
    fontSize: 14,
    color: '#007AFF',
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    gap: 12,
  },
  optionPrimary: {
    backgroundColor: '#f0f8ff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionCharge: {
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  optionTitleDisabled: {
    color: '#999',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  optionSubtitleDisabled: {
    color: '#ccc',
  },
  chargeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  loading: {
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
});

import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useWalletStore } from '@/stores/wallet-store';

export default function WalletScreen() {
  const { coins, passTier, isLoading, fetchWallet } = useWalletStore();

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>내 지갑</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Coins Balance */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Ionicons name="diamond" size={32} color="#FFD700" />
            <Text style={styles.balanceLabel}>보유 코인</Text>
          </View>
          <Text style={styles.balanceAmount}>{coins.toLocaleString()}</Text>
          <TouchableOpacity style={styles.chargeButton}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.chargeButtonText}>충전하기</Text>
          </TouchableOpacity>
        </View>

        {/* Pass Tier */}
        <View style={styles.passCard}>
          <View style={styles.passHeader}>
            <Ionicons name="ticket" size={24} color="#007AFF" />
            <Text style={styles.passLabel}>패스 등급</Text>
          </View>
          <Text style={styles.passLevel}>{passTier === 'free' ? '무료' : passTier}</Text>
          <Text style={styles.passDescription}>
            {passTier === 'free' ? '프리미엄 패스로 더 많은 혜택을 누려보세요' : '프리미엄 혜택을 이용 중입니다'}
          </Text>
          {passTier === 'free' && (
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>업그레이드</Text>
              <Ionicons name="arrow-forward" size={16} color="#007AFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>최근 거래</Text>
          
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>거래 내역이 없습니다</Text>
          </View>
        </View>

        {/* Coin Packages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>코인 패키지</Text>
          
          <View style={styles.packagesGrid}>
            {[
              { amount: 100, price: 1100, bonus: 0 },
              { amount: 500, price: 5500, bonus: 50 },
              { amount: 1000, price: 11000, bonus: 200 },
            ].map((pkg) => (
              <TouchableOpacity key={pkg.amount} style={styles.packageCard}>
                <Ionicons name="diamond" size={32} color="#FFD700" />
                <Text style={styles.packageAmount}>{pkg.amount}</Text>
                {pkg.bonus > 0 && (
                  <View style={styles.bonusBadge}>
                    <Text style={styles.bonusText}>+{pkg.bonus}</Text>
                  </View>
                )}
                <Text style={styles.packagePrice}>₩{pkg.price.toLocaleString()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    gap: 24,
  },
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  chargeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 8,
  },
  chargeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  passCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    gap: 12,
  },
  passHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passLabel: {
    fontSize: 16,
    color: '#666',
  },
  passLevel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  passDescription: {
    fontSize: 14,
    color: '#999',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 12,
    marginTop: 8,
  },
  upgradeButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  packagesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  packageCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  packageAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  bonusBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  bonusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  packagePrice: {
    fontSize: 14,
    color: '#666',
  },
});

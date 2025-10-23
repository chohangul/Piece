import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FeedScreen() {
  const [filter, setFilter] = useState<'recent' | 'popular' | 'nearby'>('recent');

  // Mock data - will be replaced with real data from API
  const mockCards = [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>카드 탐색</Text>
        
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'recent' && styles.filterChipActive]}
            onPress={() => setFilter('recent')}
          >
            <Text style={[styles.filterText, filter === 'recent' && styles.filterTextActive]}>
              최신순
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterChip, filter === 'popular' && styles.filterChipActive]}
            onPress={() => setFilter('popular')}
          >
            <Text style={[styles.filterText, filter === 'popular' && styles.filterTextActive]}>
              인기순
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterChip, filter === 'nearby' && styles.filterChipActive]}
            onPress={() => setFilter('nearby')}
          >
            <Text style={[styles.filterText, filter === 'nearby' && styles.filterTextActive]}>
              가까운순
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {mockCards.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="albums-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>아직 카드가 없습니다</Text>
          <Text style={styles.emptySubtext}>첫 번째로 카드를 만들어보세요!</Text>
          
          <TouchableOpacity style={styles.createButton}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.createButtonText}>카드 만들기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={mockCards}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.cardItem}>
              {/* Card content will be implemented */}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    padding: 24,
    gap: 16,
  },
  cardItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    overflow: 'hidden',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 16,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

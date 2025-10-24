import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CARD_TYPES } from '@piece/config';

interface CardEditorProps {
  onSave: (cardData: { type: string; meta: any }) => void;
  onCancel: () => void;
  initialData?: { type: string; meta: any };
}

export function CardEditor({ onSave, onCancel, initialData }: CardEditorProps) {
  const [selectedType, setSelectedType] = useState(initialData?.type || CARD_TYPES.PHOTO);
  const [title, setTitle] = useState(initialData?.meta?.title || '');
  const [description, setDescription] = useState(initialData?.meta?.description || '');
  const [tags, setTags] = useState<string[]>(initialData?.meta?.tags || []);
  const [tagInput, setTagInput] = useState('');

  const cardTypes = [
    { value: CARD_TYPES.PHOTO, label: '사진', icon: 'camera' },
    { value: CARD_TYPES.HOBBY, label: '취미', icon: 'musical-notes' },
    { value: CARD_TYPES.LOCATION, label: '장소', icon: 'location' },
    { value: CARD_TYPES.INTEREST, label: '관심사', icon: 'bulb' },
  ];

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      if (tags.length < 5) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      } else {
        Alert.alert('알림', '태그는 최대 5개까지 추가할 수 있습니다.');
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }

    onSave({
      type: selectedType,
      meta: {
        title: title.trim(),
        description: description.trim(),
        tags,
      },
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>카드 만들기</Text>
        <TouchableOpacity onPress={onCancel}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Card Type Selection */}
      <View style={styles.section}>
        <Text style={styles.label}>카드 타입</Text>
        <View style={styles.typeGrid}>
          {cardTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.typeCard,
                selectedType === type.value && styles.typeCardSelected,
              ]}
              onPress={() => setSelectedType(type.value)}
            >
              <Ionicons
                name={type.icon as any}
                size={32}
                color={selectedType === type.value ? '#007AFF' : '#999'}
              />
              <Text
                style={[
                  styles.typeLabel,
                  selectedType === type.value && styles.typeLabelSelected,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Title */}
      <View style={styles.section}>
        <Text style={styles.label}>제목 *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="카드 제목을 입력하세요"
          maxLength={100}
        />
        <Text style={styles.hint}>{title.length}/100</Text>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.label}>설명</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="카드에 대한 설명을 입력하세요"
          multiline
          numberOfLines={4}
          maxLength={500}
        />
        <Text style={styles.hint}>{description.length}/500</Text>
      </View>

      {/* Tags */}
      <View style={styles.section}>
        <Text style={styles.label}>태그</Text>
        <View style={styles.tagInputRow}>
          <TextInput
            style={[styles.input, styles.tagInput]}
            value={tagInput}
            onChangeText={setTagInput}
            placeholder="태그 입력"
            onSubmitEditing={addTag}
          />
          <TouchableOpacity style={styles.addTagButton} onPress={addTag}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={() => removeTag(tag)}>
                  <Ionicons name="close-circle" size={18} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <Text style={styles.hint}>최대 5개까지 추가 가능</Text>
      </View>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    gap: 8,
  },
  typeCardSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  typeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  typeLabelSelected: {
    color: '#007AFF',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  textArea: {
    height: 120,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
  tagInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tagInput: {
    flex: 1,
  },
  addTagButton: {
    width: 48,
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    marginTop: 16,
  },
  saveButton: {
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

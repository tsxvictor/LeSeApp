import React, { useState } from 'react';
import {
  Image, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = ['Ficção', 'Romance', 'Mistério', 'Fantasia'];

const recommended = [
  { id: 1, title: 'Aventuras Fantásticas', author: 'Carlos Mendes', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
  { id: 2, title: 'Clássicos Modernos', author: 'Maria Santos', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80' },
  { id: 3, title: 'Ficção Científica 2050', author: 'Pedro Lima', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80' },
  { id: 4, title: 'Romance de Verão', author: 'Juliana Costa', image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&q=80' },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const livrosFiltrados = recommended.filter((book) => {
    const termoBusca = book.title.toLowerCase().includes(search.toLowerCase());
    const termoCategoria = activeCategory ? book.title.includes(activeCategory) : true;
    return termoBusca && termoCategoria;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFAF0" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Lê-Se</Text>
          <TouchableOpacity style={styles.avatarBtn}>
            <Text style={styles.avatarText}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar livros, autores..."
            placeholderTextColor="#9BA8B5"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Lendo Agora */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lendo agora</Text>
          <Text>🕐</Text>
        </View>

        <View style={styles.readingCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80' }}
            style={styles.readingImage}
          />
          <View style={styles.readingInfo}>
            <Text style={styles.readingTitle}>O Mistério da Casa Antiga</Text>
            <Text style={styles.readingAuthor}>Ana Silva</Text>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>Progresso</Text>
              <Text style={styles.progressPercent}>65%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
          </View>
        </View>

        {/* Categorias */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
              onPress={() => setActiveCategory(activeCategory === cat ? null : cat)}
            >
              <Text style={styles.categoryIcon}>📖</Text>
              <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recomendados */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recomendados para você</Text>
          <Text>📈</Text>
        </View>

        <View style={styles.booksGrid}>
          {livrosFiltrados.map((book) => (
            <TouchableOpacity key={book.id} style={styles.bookCard}>
              <Image source={{ uri: book.image }} style={styles.bookImage} />
              <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Comece sua jornada literária</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFAF0' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingTop: 50, marginBottom: 30,
  },
  headerTitle: { fontSize: 32, color: '#2F4F4F', fontFamily: 'serif' },
  avatarBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#66CDAA', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 18 },
  searchBox: {
    backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 16, paddingVertical: 10,
    marginBottom: 35, borderWidth: 1, borderColor: '#66CDAA',
  },
  searchInput: { fontSize: 15, color: '#2F4F4F' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 10,
  },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#2F4F4F', marginBottom: 10 },
  readingCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 14, padding: 12, marginBottom: 20,
    borderLeftWidth: 4, borderLeftColor: '#66CDAA',
  },
  readingImage: { width: 70, height: 90, borderRadius: 8, marginRight: 12 },
  readingInfo: { flex: 1, justifyContent: 'center' },
  readingTitle: { fontSize: 15, fontWeight: 'bold', color: '#2F4F4F', marginBottom: 4 },
  readingAuthor: { fontSize: 13, color: '#5A7A94', marginBottom: 8 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 12, color: '#5A7A94' },
  progressPercent: { fontSize: 12, color: '#2F4F4F', fontWeight: '600' },
  progressBarBg: { height: 6, backgroundColor: '#E0EAF4', borderRadius: 4 },
  progressBarFill: { height: 6, backgroundColor: '#66CDAA', borderRadius: 4 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  categoryBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10,
    width: '47%', borderWidth: 1, borderColor: '#66CDAA',
  },
  categoryBtnActive: { backgroundColor: '#66CDAA' },
  categoryIcon: { fontSize: 14, marginRight: 6 },
  categoryText: { fontSize: 14, color: '#2F4F4F' },
  categoryTextActive: { color: '#fff' },
  booksGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  bookCard: {
    width: '47%', backgroundColor: '#fff',
    borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: '#E0EAF4',
  },
  bookImage: { width: '100%', height: 150 },
  bookTitle: { fontSize: 13, fontWeight: 'bold', color: '#2F4F4F', paddingHorizontal: 10, paddingTop: 8 },
  bookAuthor: { fontSize: 12, color: '#5A7A94', paddingHorizontal: 10, paddingBottom: 10, marginTop: 2 },
  banner: {
    backgroundColor: '#66CDAA', borderRadius: 14,
    padding: 18, alignItems: 'center', marginBottom: 10,
  },
  bannerText: { color: '#FFFAF0', fontSize: 16, fontWeight: 'bold' },
});

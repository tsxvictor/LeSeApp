import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../ThemeContext';

const trendingBooks = [
  { id: 1, title: 'Orgulho e Preconceito', author: 'Antoine de Saint-Exupéry', image: require('@/assets/images/orgulho-e-preconceito.jpg'), rating: 4.8 },
  { id: 2, title: 'O Corvo', author: 'Gabriel García Márquez', image: require('@/assets/images/o-corvo.jpg'), rating: 4.9 },
  { id: 3, title: 'A Metamorfose', author: 'Franz Kafka', image: require('@/assets/images/a-metamorfose.jpg'), rating: 4.6 },
  { id: 4, title: 'Dom Casmurro', author: 'Machado de Assis', image: require('@/assets/images/dom-casmurro.jpg'), rating: 4.7 },
];

const collections = [
  { id: 1, title: 'Livros para Relaxar', image: require('@/assets/images/livros-para-relaxar.jpg') },
  { id: 2, title: 'Clássicos Brasileiros', image: require('@/assets/images/classicos-brasileiros.png') },
  { id: 3, title: 'Ficção Científica', image: require('@/assets/images/ficcao-cientifica.png') },
  { id: 4, title: 'Romance Contemporâneo', image: require('@/assets/images/romance-contemporaneo.png') },
];

const featuredAuthors = [
  { id: 1, name: 'Machado de Assis', genre: 'Brasil', image: require('@/assets/images/machado-de-assis.jpg') },
  { id: 2, name: 'H.G. Wells', genre: 'Reino Unido', image: require('@/assets/images/h.g-wells.jpg') },
  { id: 3, name: 'Júlio Verne', genre: 'França', image: require('@/assets/images/julio-verne.jpg') },
  { id: 4, name: 'Emily Brontë', genre: 'Reino Unido', image: require('@/assets/images/emily-bronte.jpg') },
];

export default function ExploreScreen() {
  const { dark, colors } = useTheme();
  const [search, setSearch] = useState('');

  const livrosFiltrados = trendingBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const autoresFiltrados = featuredAuthors.filter(
    (author) =>
      author.name.toLowerCase().includes(search.toLowerCase()) ||
      author.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      {/* Imagem decorativa de fundo */}
      <Image
        source={require('@/assets/images/detetive.png')}
        style={[styles.bgImage, { opacity: dark ? 0.10 : 0.80 }]}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.title }]}>Lê-Se</Text>
          <Text style={[styles.headerSubtitle, { color: colors.accent }]}>Descubra sua próxima história!</Text>
          <View style={[styles.searchBox, { backgroundColor: colors.inputBg, borderColor: colors.accent }]}>
            <Text style={styles.searchIcon}></Text>
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar livros, autores..."
              placeholderTextColor={colors.secondary}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Tendências */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Mais Buscados</Text>
          <FlatList
            data={livrosFiltrados}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Image source={item.image} style={styles.bookCover} />
                <Text style={[styles.bookTitle, { color: colors.title }]} numberOfLines={2}>{item.title}</Text>
                <Text style={[styles.bookAuthor, { color: colors.secondary }]} numberOfLines={1}>{item.author}</Text>
                <View style={styles.ratingRow}>
                  <Text style={[styles.star, { color: colors.accent }]}>★</Text>
                  <Text style={[styles.rating, { color: colors.accent }]}>{item.rating}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Coleções */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Coleções</Text>
          <View style={styles.collectionsGrid}>
            {collections.map((item) => (
              <TouchableOpacity key={item.id} style={styles.collectionCard}>
                <Image source={item.image} style={styles.collectionImage} />
                <View style={styles.collectionOverlay}>
                  <Text style={styles.collectionTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Autores */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Autores em Destaque</Text>
          <FlatList
            data={autoresFiltrados}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.authorCard}>
                <View style={[styles.authorAvatarContainer, { borderColor: colors.accent }]}>
                  <Image source={item.image} style={styles.authorAvatar} />
                </View>
                <Text style={[styles.authorName, { color: colors.title }]} numberOfLines={2}>{item.name}</Text>
                <Text style={[styles.authorGenre, { color: colors.accent }]} numberOfLines={1}>{item.genre}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  bgImage: {
    position: 'absolute',
    right: -110,
    top: 15,
    width: 400,
    height: 400,
    zIndex: 0,
  },
  header: { paddingHorizontal: 16, paddingTop: 50, marginTop: 120 },
  headerTitle: { fontSize: 30, fontWeight: 'bold', fontFamily: 'serif', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, fontStyle: 'italic', fontFamily: 'Georgia', marginBottom: 16 },
  searchBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1 },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15 },
  section: { paddingHorizontal: 16, paddingTop: 20 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 14 },
  bookCard: { width: 150, borderRadius: 14, padding: 12, marginRight: 12, borderWidth: 1 },
  bookCover: { width: '100%', height: 180, borderRadius: 10, marginBottom: 10 },
  bookTitle: { fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  bookAuthor: { fontSize: 12, marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  star: { fontSize: 14, marginRight: 4 },
  rating: { fontSize: 13, fontWeight: '600' },
  collectionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  collectionCard: { width: '47%', height: 120, borderRadius: 14, overflow: 'hidden' },
  collectionImage: { width: '100%', height: '100%' },
  collectionOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(47,79,79,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  collectionTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 10, height: 1 },
    textShadowRadius: 4,
  },
  authorCard: { alignItems: 'center', marginRight: 20, width: 80 },
  authorAvatarContainer: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, overflow: 'hidden', marginBottom: 8 },
  authorAvatar: { width: '100%', height: '100%' },
  authorName: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 },
  authorGenre: { fontSize: 11, fontStyle: 'italic', textAlign: 'center' },
});

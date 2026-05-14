import React, { useState } from 'react';
import {
  FlatList,
  Image, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../ThemeContext';

const trendingBooks = [
  { id: 1, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop', rating: 4.8 },
  { id: 2, title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop', rating: 4.9 },
  { id: 3, title: 'A Metamorfose', author: 'Franz Kafka', cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=450&fit=crop', rating: 4.6 },
  { id: 4, title: '1984', author: 'George Orwell', cover: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=450&fit=crop', rating: 4.7 },
];

const collections = [
  { id: 1, title: 'Livros para Relaxar', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop' },
  { id: 2, title: 'Clássicos Brasileiros', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop' },
  { id: 3, title: 'Ficção Científica', image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&h=300&fit=crop' },
  { id: 4, title: 'Romance Contemporâneo', image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&h=300&fit=crop' },
];

const featuredAuthors = [
  { id: 1, name: 'Machado de Assis', genre: 'Literatura Brasileira', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { id: 2, name: 'Clarice Lispector', genre: 'Ficção Contemporânea', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { id: 3, name: 'Jorge Amado', genre: 'Romance Regional', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { id: 4, name: 'Cecília Meireles', genre: 'Poesia', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
];

export default function ExploreScreen() {
  const { dark, colors } = useTheme();
  const [search, setSearch] = useState('');

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
            data={trendingBooks}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Image source={{ uri: item.cover }} style={styles.bookCover} />
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
                <Image source={{ uri: item.image }} style={styles.collectionImage} />
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
            data={featuredAuthors}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.authorCard}>
                <View style={[styles.authorAvatarContainer, { borderColor: colors.accent }]}>
                  <Image source={{ uri: item.photo }} style={styles.authorAvatar} />
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
    opacity: 0.70,
    zIndex: 0,
    
  },
  header: { paddingHorizontal: 16, paddingTop: 50, marginTop: 120},
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
  collectionOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(47,79,79,0.6)', alignItems: 'center', justifyContent: 'center', padding: 8 },
  collectionTitle: { color: '#fff', fontSize: 13, fontWeight: 'bold', textAlign: 'center' },
  authorCard: { alignItems: 'center', marginRight: 20, width: 80 },
  authorAvatarContainer: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, overflow: 'hidden', marginBottom: 8 },
  authorAvatar: { width: '100%', height: '100%' },
  authorName: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginBottom: 2 },
  authorGenre: { fontSize: 11, fontStyle: 'italic', textAlign: 'center' },
});

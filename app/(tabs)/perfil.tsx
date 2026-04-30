import React from 'react';
import {
  FlatList,
  Image, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const favoritos = [
  { id: 1, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
  { id: 2, title: 'Dom Casmurro', author: 'Machado de Assis', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
  { id: 3, title: 'A Menina que Roubava Livros', author: 'Markus Zusak', image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&q=80' },
];

const jaLidos = [
  { id: 1, title: '1984', author: 'George Orwell', image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&q=80' },
  { id: 2, title: 'O Hobbit', author: 'J.R.R. Tolkien', image: 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&q=80' },
  { id: 3, title: 'Harry Potter', author: 'J.K. Rowling', image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=300&q=80' },
];

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#2F4F4F" />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Header verde vertical compacto */}
        <View style={styles.headerBg}>

          {/* Seta + Título */}
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.backBtn}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Perfil</Text>
            <View style={{ width: 44 }} />
          </View>

          {/* Foto centralizada */}
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' }}
              style={styles.avatar}
            />
          </View>

          {/* Nome e subtítulo centralizados */}
          <Text style={styles.userName}>Victor Gabriel</Text>
          <Text style={styles.userSubtitle}>Leitor ávido 📚</Text>

          {/* Card lendo agora compacto */}
          <View style={styles.readingCard}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&q=80' }}
              style={styles.readingImage}
            />
            <View style={styles.readingInfo}>
              <Text style={styles.readingLabel}>Lendo agora</Text>
              <Text style={styles.readingTitle}>A Rainha Vermelha</Text>
              <Text style={styles.readingAuthor}>Victoria Aveyard</Text>
              <View style={styles.progressRow}>
                <Text style={styles.progressLabel}>Progresso</Text>
                <Text style={styles.progressPercent}>65%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '65%' }]} />
              </View>
            </View>
          </View>
          <Text style={styles.brandText}>Lê-Se</Text>
        </View>

        {/* Favoritos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favoritos</Text>
          <FlatList
            data={favoritos}
            horizontal
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.bookCard}>
                <Image source={{ uri: item.image }} style={styles.bookImage} />
                <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Já Lidos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Já Lidos</Text>
          <FlatList
            data={jaLidos}
            horizontal
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.bookCard}>
                <View style={styles.badgeContainer}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✓</Text>
                  </View>
                </View>
                <Image source={{ uri: item.image }} style={styles.bookImage} />
                <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFAF0' },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },

 headerBg: {
  backgroundColor: '#2F4F4F',
  paddingTop: 30,
  paddingBottom:50,
  paddingHorizontal: 30,
  alignItems: 'center',
  borderBottomLeftRadius: 28,
  borderBottomRightRadius: 28,
  marginHorizontal: 35,  // ← faz ele ficar menor lateralmente
  marginTop: 25,
  borderRadius: 5,
},
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  backBtn: {
    width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  backText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'georgia' },

  avatarContainer: {
    width:100, height: 100, borderRadius: 100,
    borderWidth: 3, borderColor: '#66CDAA',
    overflow: 'hidden', marginBottom: 8,
  },
  avatar: { width: '100%', height: '100%' },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 2, fontFamily: 'Georgia' },
userSubtitle: { color: '#66CDAA', fontSize: 13, marginBottom: 14, fontFamily: 'Georgia', fontStyle: 'italic' },

  readingCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14, padding: 10, width: '100%',
  },
  brandText: { 
  color: '#FFFAF0', 
  fontSize: 25, 
  fontFamily: 'serif',
  marginTop: 30,
  opacity: 0.9,
},
  readingImage: { width: 60, height: 80, borderRadius: 8, marginRight: 10 },
  readingInfo: { flex: 1, justifyContent: 'center' },
  readingLabel: { color: '#66CDAA', fontSize: 11, marginBottom: 3 },
  readingTitle: { color: '#fff', fontSize: 13, fontWeight: 'bold', marginBottom: 2 },
  readingAuthor: { color: '#ccc', fontSize: 11, marginBottom: 6 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  progressLabel: { fontSize: 11, color: '#ccc' },
  progressPercent: { fontSize: 11, color: '#fff', fontWeight: '600' },
  progressBarBg: { height: 5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
  progressBarFill: { height: 5, backgroundColor: '#66CDAA', borderRadius: 4 },

  section: { paddingHorizontal: 16, paddingTop: 20 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#2F4F4F', marginBottom: 14 },

  bookCard: {
    width: 150, backgroundColor: '#fff',
    borderRadius: 14, overflow: 'hidden',
    marginRight: 12, borderWidth: 1, borderColor: '#E0EAF4',
  },
  bookImage: { width: '100%', height: 160 },
  bookTitle: { fontSize: 13, fontWeight: 'bold', color: '#2F4F4F', padding: 8, paddingBottom: 2 },
  bookAuthor: { fontSize: 12, color: '#5A7A94', paddingHorizontal: 8, paddingBottom: 8 },

  badgeContainer: { position: 'absolute', top: 8, right: 8, zIndex: 1 },
  badge: {
    backgroundColor: '#66CDAA', width: 24, height: 24,
    borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

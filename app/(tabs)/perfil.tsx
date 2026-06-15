<<<<<<< HEAD
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList, Image,
  SafeAreaView, ScrollView,
  StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { useAuth } from '../../AuthContext';
import { useTheme } from '../../ThemeContext';

const favoritos = [
  {
    id: 1,
    title: 'O Homem Invisível',
    author: 'H.G. Wells',
    image: require('@/assets/images/o-homem-invisivel.jpg'),
  },
  {
    id: 2,
    title: 'Frankenstein',
    author: 'Mary Shelley',
    image: require('@/assets/images/frankenstein.jpg'),
  },
];

const jaLidos = [
  { id: 1, title: 'Iracema', author: 'José de Alenca', image: require('@/assets/images/iracema.jpg')},
=======
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
import { useTheme } from '../../ThemeContext';

const favoritos = [
  { id: 1, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
  { id: 2, title: 'Dom Casmurro', author: 'Machado de Assis', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80' },
  { id: 3, title: 'A Menina que Roubava Livros', author: 'Markus Zusak', image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&q=80' },
];

const jaLidos = [
  { id: 1, title: '1984', author: 'George Orwell', image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&q=80' },
  { id: 2, title: 'O Hobbit', author: 'J.R.R. Tolkien', image: 'https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&q=80' },
  { id: 3, title: 'Harry Potter', author: 'J.K. Rowling', image: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=300&q=80' },
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
];

export default function PerfilScreen() {
  const { dark, colors } = useTheme();
<<<<<<< HEAD
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };
=======
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

<<<<<<< HEAD
        <View style={[styles.headerBg, { backgroundColor: colors.headerBg }]}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.topBtn} onPress={handleLogout}>
              <Text style={styles.topBtnText}>→ Sair</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Perfil</Text>
            <View style={{ width: 60 }} />
=======
        {/* Header verde compacto */}
        <View style={[styles.headerBg, { backgroundColor: colors.headerBg }]}>
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.backBtn}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Perfil</Text>
            <View style={{ width: 44 }} />
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
          </View>

          <View style={styles.avatarContainer}>
            <Image
<<<<<<< HEAD
             source={require('@/assets/images/icon-perfil.png')}
  style={styles.avatar}
/>
          </View>

          <Text style={styles.userName}>{user?.name ?? 'Leitor'}</Text>
          <Text style={[styles.userSubtitle, { color: colors.accent }]}>Leitor ávido </Text>
          <Text style={[styles.userEmail, { color: 'rgba(255,250,240,0.6)' }]}>{user?.email ?? ''}</Text>

          <View style={[styles.readingCard, { backgroundColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.95)' }]}>
            <Image source={require('@/assets/images/dom-casmurro.jpg')} style={styles.readingImage} />
=======
              source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' }}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.userName}>Victor Gabriel</Text>
          <Text style={[styles.userSubtitle, { color: colors.accent }]}>Leitor ávido 📚</Text>

          <View style={[styles.readingCard, { backgroundColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.95)' }]}>
            <Image
             source={require('@/assets/images/dom-casmurro.jpg')}
              style={styles.readingImage}
            />
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
            <View style={styles.readingInfo}>
              <Text style={[styles.readingLabel, { color: colors.accent }]}>LENDO AGORA</Text>
              <Text style={[styles.readingTitle, { color: dark ? '#fff' : '#2F4F4F' }]}>Dom Casmurro</Text>
              <Text style={[styles.readingAuthor, { color: dark ? '#ccc' : '#888' }]}>Machado de Assis</Text>
              <View style={styles.progressRow}>
                <Text style={[styles.progressLabel, { color: dark ? '#ccc' : '#888' }]}>Progresso</Text>
                <Text style={[styles.progressPercent, { color: dark ? '#fff' : '#2F4F4F' }]}>65%</Text>
              </View>
              <View style={[styles.progressBarBg, { backgroundColor: dark ? 'rgba(255,255,255,0.2)' : '#E0EAF4' }]}>
                <View style={[styles.progressBarFill, { width: '65%', backgroundColor: colors.accent }]} />
              </View>
            </View>
          </View>

          <Text style={styles.brandText}>Lê-Se</Text>
        </View>

<<<<<<< HEAD
=======
        {/* Favoritos */}
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Favoritos</Text>
          <FlatList
            data={favoritos}
            horizontal
<<<<<<< HEAD
            showsHorizontalScrollIndicator
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Image source={item.image} style={styles.bookImage} />
=======
            showsHorizontalScrollIndicator={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Image source={{ uri: item.image }} style={styles.bookImage} />
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
                <Text style={[styles.bookTitle, { color: colors.title }]} numberOfLines={2}>{item.title}</Text>
                <Text style={[styles.bookAuthor, { color: colors.secondary }]} numberOfLines={1}>{item.author}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

<<<<<<< HEAD
=======
        {/* Já Lidos */}
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Já Lidos</Text>
          <FlatList
            data={jaLidos}
            horizontal
<<<<<<< HEAD
            showsHorizontalScrollIndicator
=======
            showsHorizontalScrollIndicator={true}
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.badgeContainer}>
                  <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                    <Text style={styles.badgeText}>✓</Text>
                  </View>
                </View>
<<<<<<< HEAD
                <Image source={item.image} style={styles.bookImage} />
=======
                <Image source={{ uri: item.image }} style={styles.bookImage} />
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
                <Text style={[styles.bookTitle, { color: colors.title }]} numberOfLines={2}>{item.title}</Text>
                <Text style={[styles.bookAuthor, { color: colors.secondary }]} numberOfLines={1}>{item.author}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
<<<<<<< HEAD
  headerBg: { paddingTop: 40, paddingBottom: 25, paddingHorizontal: 30, alignItems: 'center', marginHorizontal: 16, marginTop: 10, borderRadius: 25 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  topBtn: { paddingHorizontal: 8, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 10 },
  topBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Georgia' },
  avatarContainer: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#66CDAA', overflow: 'hidden', marginBottom: 8 ,  alignItems: 'center' , justifyContent: 'center' }, 
  avatar: { width: '70%', height: '70%' , resizeMode: 'contain',},
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 2, fontFamily: 'Georgia' },
  userSubtitle: { fontSize: 13, marginBottom: 4, fontFamily: 'Georgia', fontStyle: 'italic' },
  userEmail: { fontSize: 12, marginBottom: 14 },
  readingCard: { flexDirection: 'row', borderRadius: 20, padding: 12, width: '100%', elevation: 3 },
=======
  headerBg: {
    paddingTop: 40, paddingBottom: 25, paddingHorizontal: 30,
    alignItems: 'center', marginHorizontal: 35, marginTop: 10, borderRadius: 25,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  backText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', fontFamily: 'Georgia' },
  avatarContainer: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: '#66CDAA', overflow: 'hidden', marginBottom: 8 },
  avatar: { width: '100%', height: '100%' },
  userName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 2, fontFamily: 'Georgia' },
  userSubtitle: { fontSize: 13, marginBottom: 14, fontFamily: 'Georgia', fontStyle: 'italic' },
  readingCard: { flexDirection: 'row', borderRadius: 20, padding: 12, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
  readingImage: { width: 60, height: 80, borderRadius: 8, marginRight: 10 },
  readingInfo: { flex: 1, justifyContent: 'center' },
  readingLabel: { fontSize: 10, marginBottom: 4, letterSpacing: 0.5, fontWeight: '600' },
  readingTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  readingAuthor: { fontSize: 11, marginBottom: 8 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressLabel: { fontSize: 11 },
  progressPercent: { fontSize: 11, fontWeight: '600' },
  progressBarBg: { height: 5, borderRadius: 4 },
  progressBarFill: { height: 5, borderRadius: 4 },
  brandText: { color: '#FFFAF0', fontSize: 26, fontFamily: 'serif', marginTop: 16, opacity: 0.9 },
  section: { paddingHorizontal: 16, paddingTop: 24 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 14 },
  bookCard: { width: 150, borderRadius: 14, overflow: 'hidden', marginRight: 12, borderWidth: 1 },
<<<<<<< HEAD
  bookImage: { width: '100%', height: 160 , resizeMode:'cover' },
=======
  bookImage: { width: '100%', height: 160 },
>>>>>>> ec4df88f64e2ac6870fc1ebb877b519050aa978d
  bookTitle: { fontSize: 13, fontWeight: 'bold', padding: 8, paddingBottom: 2 },
  bookAuthor: { fontSize: 12, paddingHorizontal: 8, paddingBottom: 8 },
  badgeContainer: { position: 'absolute', top: 8, right: 8, zIndex: 1 },
  badge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image, SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../ThemeContext';

const categories = ['Ficção Científica', 'Romance', 'Mistério', 'Fantasia'];

const allBooks = {
  'Ficção Científica': [
    { id: 1, title: 'A Máquina do Tempo', author: 'H.G. Wells', cover: require('@/assets/images/a-maquina-do-tempo.jpg') },
    { id: 2, title: 'Guerra dos Mundos', author: 'H.G. Wells', cover: require('@/assets/images/guerra-dos-mundos.jpg') },
    { id: 3, title: 'Vinte Mil Léguas Submarinas', author: 'Júlio Verne', cover: require('@/assets/images/vinte-mil-leguas-submarinas.jpg') },
    { id: 4, title: 'Viagem ao Centro da Terra', author: 'Júlio Verne', cover: require('@/assets/images/viagem-ao-centro-da-terra.jpg') },
    { id: 5, title: 'Da Terra à Lua', author: 'Júlio Verne', cover: require('@/assets/images/da-terra-a-lua.jpg') },
    { id: 6, title: 'Frankenstein', author: 'Mary Shelley', cover: require('@/assets/images/frankenstein.jpg') },
  ],
  'Romance': [
    { id: 1, title: 'Orgulho e Preconceito', author: 'Jane Austen', cover: require('@/assets/images/orgulho-e-preconceito.jpg') },
    { id: 2, title: 'Jane Eyre', author: 'Charlotte Brontë', cover: require('@/assets/images/jane-eyre.jpg') },
    { id: 3, title: 'O Morro dos Ventos Uivantes', author: 'Emily Brontë', cover: require('@/assets/images/o-morro-dos-ventos-uivantes.jpg') },
    { id: 4, title: 'Senhora', author: 'José de Alencar', cover: require('@/assets/images/senhora.jpg') },
    { id: 5, title: 'Iracema', author: 'José de Alencar', cover: require('@/assets/images/iracema.jpg') },
    { id: 6, title: 'Dom Casmurro', author: 'Machado de Assis', cover: require('@/assets/images/dom-casmurro.jpg') },
  ],
  'Mistério': [
    { id: 1, title: 'As Aventuras de Sherlock Holmes', author: 'Arthur Conan Doyle', cover: require('@/assets/images/as-aventuras-de-sherlock-holmes.jpg') },
    { id: 2, title: 'O Cão dos Baskervilles', author: 'Arthur Conan Doyle', cover: require('@/assets/images/o-cao-dos-baskerville.jpg') },
    { id: 3, title: 'A Carta Roubada', author: 'Edgar Allan Poe', cover: require('@/assets/images/a-carta-roubada.jpg') },
    { id: 4, title: 'Os Crimes da Rua Morgue', author: 'Edgar Allan Poe', cover: require('@/assets/images/os-crimes-da-rua-morgue.jpg') },
    { id: 5, title: 'O Homem Invisível', author: 'H.G. Wells', cover: require('@/assets/images/o-homem-invisivel.jpg') },
  ],
  'Fantasia': [
    { id: 1, title: 'Alice no País das Maravilhas', author: 'Lewis Carroll', cover: require('@/assets/images/alice-no-pais-das-maravilhas.jpg') },
    { id: 2, title: 'Peter Pan', author: 'J.M. Barrie', cover: require('@/assets/images/peter-pan.jpg') },
    { id: 3, title: 'O Mágico de Oz', author: 'L. Frank Baum', cover: require('@/assets/images/o-magico-de-oz.jpg') },
    { id: 4, title: 'A Divina Comédia', author: 'Dante Alighieri', cover: require('@/assets/images/a-divina-comedia.jpg') },
    { id: 5, title: 'Contos dos Irmãos Grimm', author: 'Irmãos Grimm', cover: require('@/assets/images/contos-dos-irmaos-grimm.jpg') },
    { id: 6, title: 'As Mil e Uma Noites', author: 'Anônimo', cover: require('@/assets/images/as-mil-e-uma-noites.jpg') },
  ],
};

export default function HomeScreen() {
  const { dark, toggle, colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('Ficção Científica');
  const router = useRouter();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia! ☀️';
    if (hour < 18) return 'Boa tarde! 🌤️';
    return 'Boa noite! 🌙';
  };

  const livrosFiltrados = allBooks[selectedCategory as keyof typeof allBooks];

  const openBook = (title: string, author: string) => {
    router.push({ pathname: '/book', params: { title, author } });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.title }]}>Lê-Se</Text>
            <Text style={[styles.headerGreeting, { color: colors.accent }]}>{getGreeting()}</Text>
          </View>
          <TouchableOpacity onPress={toggle} style={styles.themeBtn}>
            <Image
              source={require('@/assets/images/modo-noturno.png')}
              style={{ width: 28, height: 28, tintColor: dark ? '#FFFAF0' : '#2F4F4F' }}
            />
          </TouchableOpacity>
        </View>

        {/* Continue Reading Card */}
        <TouchableOpacity
          style={[styles.readingCard, { backgroundColor: colors.headerBg }]}
          onPress={() => openBook('Dom Casmurro', 'Machado de Assis')}
        >
          <View style={styles.readingContent}>
            <Image source={require('@/assets/images/dom-casmurro.jpg')} style={styles.readingImage} />
            <View style={styles.readingInfo}>
              <Text style={[styles.readingLabel, { color: colors.accent }]}>CONTINUAR LENDO</Text>
              <Text style={styles.readingTitle}>Dom Casmurro</Text>
              <Text style={styles.readingAuthor}>Machado de Assis</Text>
            </View>
            <TouchableOpacity style={[styles.continueBtn, { backgroundColor: colors.accent }]}>
              <Text style={styles.continueBtnText}>▶</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '65%', backgroundColor: colors.accent }]} />
          </View>
        </TouchableOpacity>

        {/* Quote of the Day */}
        <View style={[styles.quoteCard, { backgroundColor: colors.card, borderLeftColor: colors.accent }]}>
          <Text style={[styles.quoteIcon, { color: colors.accent }]}>"</Text>
          <Text style={[styles.quoteText, { color: colors.text }]}>
            O destino não é só dramaturgo, é também o seu próprio contrarregra[…]
          </Text>
          <Text style={[styles.quoteAuthor, { color: colors.secondary }]}>— Dom Casmurro, p119</Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.title }]}>Categorias</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryBtn,
                  { backgroundColor: selectedCategory === cat ? colors.accent : colors.card, borderColor: colors.accent }
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={styles.categoryIcon}>
                  {cat === 'Ficção Científica' ? '' : cat === 'Romance' ? '' : cat === 'Mistério' ? '' : ''}
                </Text>
                <Text style={[styles.categoryText, { color: selectedCategory === cat ? '#fff' : colors.text }]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Books Grid */}
        <View style={styles.section}>
          <View style={styles.booksGrid}>
            {livrosFiltrados.map((book) => (
              <TouchableOpacity
                key={book.id}
                style={[styles.bookCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => openBook(book.title, book.author)}
              >
                <Image source={book.cover} style={styles.bookImage} />
                <Text style={[styles.bookTitle, { color: colors.title }]} numberOfLines={2}>{book.title}</Text>
                <Text style={[styles.bookAuthor, { color: colors.secondary }]} numberOfLines={1}>{book.author}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, marginBottom: 20 },
  headerTitle: { fontSize: 30, fontFamily: 'serif', fontWeight: 'bold' },
  headerGreeting: { fontSize: 13, fontFamily: 'Georgia', fontStyle: 'italic', marginTop: 2 },
  themeBtn: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  readingCard: { borderRadius: 20, padding: 16, marginBottom: 16 },
  readingContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  readingImage: { width: 60, height: 85, borderRadius: 10, marginRight: 12 },
  readingInfo: { flex: 1 },
  readingLabel: { fontSize: 10, fontWeight: '600', marginBottom: 4, letterSpacing: 0.5 },
  readingTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  readingAuthor: { color: '#D3D3D3', fontSize: 12 },
  continueBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  continueBtnText: { color: '#fff', fontSize: 16 },
  progressBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4 },
  progressBarFill: { height: 6, borderRadius: 4 },
  quoteCard: { borderRadius: 14, padding: 16, marginBottom: 16, borderLeftWidth: 4 },
  quoteIcon: { fontSize: 36, fontFamily: 'Georgia', lineHeight: 40 },
  quoteText: { fontSize: 13, fontStyle: 'italic', fontFamily: 'Georgia', marginBottom: 8, lineHeight: 20 },
  quoteAuthor: { fontSize: 11, textAlign: 'right' },
  section: { marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  categoryBtn: { flexDirection: 'row', alignItems: 'center', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10, width: '47%', borderWidth: 1 },
  categoryIcon: { fontSize: 14, marginRight: 6 },
  categoryText: { fontSize: 14, fontWeight: '500', fontFamily: 'serif' },
  booksGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  bookCard: { width: '47%', borderRadius: 20, overflow: 'hidden', borderWidth: 1 },
  bookImage: { width: '100%', height: 250, resizeMode: 'cover' },
  bookTitle: { fontSize: 12, fontWeight: 'bold', padding: 8, paddingBottom: 2 },
  bookAuthor: { fontSize: 11, paddingHorizontal: 8, paddingBottom: 8 },
});

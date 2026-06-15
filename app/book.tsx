import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { GoogleBook, searchBooks } from '../services/googleBooks';

export default function BookDetailScreen() {
  const { title, author, cover } = useLocalSearchParams<{ title: string; author: string; cover: string }>();
  const { dark, colors } = useTheme();
  const router = useRouter();

  const [book, setBook] = useState<GoogleBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const results = await searchBooks(`${title} ${author}`, 1);
      if (results.length > 0) setBook(results[0]);
    } catch {
      // silently fail, will show local data
    } finally {
      setLoading(false);
    }
  };

  const displayTitle = book?.title ?? title ?? 'Sem título';
  const displayAuthor = book?.authors?.[0] ?? author ?? 'Autor desconhecido';
  const displayCover = book?.thumbnail ?? (cover as string) ?? '';
 const descriptions: Record<string, string> = {
  'Dom Casmurro':
    'Considerado uma das maiores obras da literatura brasileira, Dom Casmurro acompanha Bentinho em suas memórias de juventude, seu amor por Capitu e as dúvidas que o perseguem ao longo da vida. Entre lembranças, ciúmes e questionamentos, Machado de Assis constrói uma narrativa envolvente que até hoje gera debates sobre a verdadeira natureza dos acontecimentos.',

  'Frankenstein':
    'Obcecado pela ideia de vencer a morte, Victor Frankenstein cria uma criatura a partir de restos humanos. Porém, ao perceber as consequências de sua experiência, abandona sua criação à própria sorte. Sozinha e rejeitada pela sociedade, a criatura inicia uma jornada marcada por sofrimento, vingança e reflexões profundas sobre humanidade e responsabilidade.',

  'Orgulho e Preconceito':
    'Elizabeth Bennet é inteligente, determinada e pouco disposta a aceitar as convenções impostas pela sociedade inglesa do século XIX. Quando conhece o reservado Sr. Darcy, nasce uma relação marcada por julgamentos precipitados, orgulho e preconceitos mútuos. Um dos romances mais amados da literatura mundial.',

  'O Morro dos Ventos Uivantes':
    'Nas paisagens sombrias dos campos ingleses, a paixão intensa entre Heathcliff e Catherine atravessa gerações. Amor, obsessão, vingança e tragédia se misturam em uma história emocionante que se tornou um clássico absoluto da literatura romântica.',

  'Jane Eyre':
    'Órfã desde a infância, Jane Eyre luta para conquistar independência e dignidade em uma sociedade desigual. Ao se tornar governanta na misteriosa mansão Thornfield Hall, ela conhece o enigmático Sr. Rochester e descobre segredos capazes de transformar seu destino.',

  'Iracema':
    'Obra-prima do romantismo brasileiro, narra o amor impossível entre Iracema, uma jovem indígena, e Martim, um colonizador português. Em meio aos conflitos entre culturas, José de Alencar constrói uma narrativa poética sobre as origens do povo brasileiro.',

  'Senhora':
    'Aurélia Camargo herda uma grande fortuna e decide desafiar as convenções sociais ao usar sua riqueza para controlar o próprio destino. Entre amor, orgulho e ambição, a protagonista enfrenta os limites impostos pela sociedade do século XIX.',

  'O Cortiço':
    'Em um movimentado cortiço do Rio de Janeiro, diferentes personagens vivem suas paixões, conflitos e ambições. A obra retrata com realismo as desigualdades sociais, os costumes da época e a influência do ambiente sobre a vida das pessoas.',

  'Memórias Póstumas de Brás Cubas':
    'Após a morte, Brás Cubas decide narrar sua própria história sem filtros ou preocupações com a opinião alheia. Com humor ácido e crítica social, Machado de Assis apresenta um dos romances mais inovadores da literatura brasileira.',

  'Triste Fim de Policarpo Quaresma':
    'Patriota apaixonado pelo Brasil, Policarpo Quaresma dedica sua vida a defender ideias que considera capazes de transformar o país. No entanto, seus sonhos entram em choque com a realidade política e social da Primeira República.',

  'A Máquina do Tempo':
    'Um cientista desenvolve uma máquina capaz de viajar através dos séculos. Ao chegar em um futuro distante, encontra uma humanidade profundamente transformada e descobre verdades inquietantes sobre o destino da civilização.',

  'Guerra dos Mundos':
    'Quando misteriosos cilindros caem do céu, a humanidade percebe tarde demais que está diante de uma invasão extraterrestre. Com tecnologia muito superior, os marcianos colocam o planeta à beira da destruição.',

  'Viagem ao Centro da Terra':
    'Após encontrar um antigo manuscrito, o professor Lidenbrock lidera uma expedição rumo às profundezas do planeta. A aventura revela mundos subterrâneos, criaturas pré-históricas e perigos inimagináveis.',

  'Vinte Mil Léguas Submarinas':
    'Capturado pelo misterioso Capitão Nemo, o professor Aronnax embarca em uma jornada extraordinária pelos oceanos a bordo do submarino Nautilus. Um clássico repleto de aventura, ciência e mistério.',

  'Da Terra à Lua':
    'Muito antes da corrida espacial, Júlio Verne imaginou uma missão ousada para levar seres humanos até a Lua. Uma obra visionária que antecipou tecnologias e desafios da exploração espacial.',

  'Alice no País das Maravilhas':
    'Ao seguir um coelho apressado, Alice cai em um universo fantástico onde nada faz sentido e tudo parece possível. Uma aventura cheia de personagens inesquecíveis, enigmas e imaginação.',

  'Peter Pan':
    'Peter Pan leva Wendy e seus irmãos para a Terra do Nunca, um lugar onde ninguém envelhece. Lá eles enfrentam piratas, vivem aventuras emocionantes e descobrem o valor da amizade e da imaginação.',

  'O Mágico de Oz':
    'Após ser levada por um tornado para uma terra mágica, Dorothy inicia uma jornada em busca do poderoso Mágico de Oz. Ao lado de companheiros inesquecíveis, ela aprende importantes lições sobre coragem, inteligência e amizade.',

  'As Aventuras de Sherlock Holmes':
    'Uma coletânea dos casos mais famosos do maior detetive da literatura. Com observação extraordinária e raciocínio impecável, Sherlock Holmes desvenda crimes que parecem impossíveis.',

  'O Cão dos Baskervilles':
    'Uma antiga maldição assombra a família Baskerville há gerações. Para desvendar o mistério, Sherlock Holmes enfrenta pistas enganosas, lendas sombrias e perigos ocultos.',

  'A Carta Roubada':
    'Quando uma carta comprometedora desaparece sem deixar rastros, a polícia fracassa em encontrá-la. Cabe ao brilhante Auguste Dupin usar sua inteligência para resolver um dos mistérios mais engenhosos da literatura.',

  'Os Crimes da Rua Morgue':
    'Um assassinato brutal desafia toda a polícia de Paris. Apenas Auguste Dupin consegue enxergar além das evidências óbvias para solucionar um caso considerado impossível.',

  'As Mil e Uma Noites':
    'Para escapar da morte, Sherazade conta histórias fascinantes ao sultão noite após noite. Aventuras, magia, romance e mistério se unem em uma das coletâneas mais famosas da literatura mundial.',

  'Contos dos Irmãos Grimm':
    'Reunindo lendas e histórias populares alemãs, esta coletânea apresenta clássicos como Branca de Neve, Rapunzel e João e Maria, em versões cheias de fantasia e ensinamentos.',

  'Os Sertões':
    'Misturando reportagem, análise social e narrativa histórica, Euclides da Cunha retrata a Guerra de Canudos e apresenta um poderoso retrato do sertão brasileiro e de seu povo.',

  'A Divina Comédia':
    'Guiado pelo poeta Virgílio, Dante atravessa os círculos do Inferno, escala o Purgatório e alcança o Paraíso. Uma das maiores obras da literatura universal, repleta de simbolismo, filosofia e reflexão espiritual.'
};
const localCovers: Record<string, any> = {
  'Dom Casmurro': require('@/assets/images/dom-casmurro.jpg'),
  'Frankenstein': require('@/assets/images/frankenstein.jpg'),
  'Iracema': require('@/assets/images/iracema.jpg'),
  'Jane Eyre': require('@/assets/images/jane-eyre.jpg'),
  'A Máquina do Tempo': require('@/assets/images/a-maquina-do-tempo.jpg'),
  'Guerra dos Mundos': require('@/assets/images/guerra-dos-mundos.jpg'),
  'Viagem ao Centro da Terra': require('@/assets/images/viagem-ao-centro-da-terra.jpg'),
  'Vinte Mil Léguas Submarinas': require('@/assets/images/vinte-mil-leguas-submarinas.jpg'),
  'Da Terra à Lua': require('@/assets/images/da-terra-a-lua.jpg'),
  'Alice no País das Maravilhas': require('@/assets/images/alice-no-pais-das-maravilhas.jpg'),
  'Peter Pan': require('@/assets/images/peter-pan.jpg'),
  'O Mágico de Oz': require('@/assets/images/o-magico-de-oz.jpg'),
  'Orgulho e Preconceito': require('@/assets/images/orgulho-e-preconceito.jpg'),
  'O Morro dos Ventos Uivantes': require('@/assets/images/o-morro-dos-ventos-uivantes.jpg'),
  'Senhora': require('@/assets/images/senhora.jpg'),
  'O Cortiço': require('@/assets/images/o-cortico.jpg'),
  'Memórias Póstumas de Brás Cubas': require('@/assets/images/memorias-postumas-de-bras-cubas.jpg'),
  'Triste Fim de Policarpo Quaresma': require('@/assets/images/triste-fim-de-policarpo-quaresma.jpg'),
  'As Aventuras de Sherlock Holmes': require('@/assets/images/as-aventuras-de-sherlock-holmes.jpg'),
  'O Cão dos Baskervilles': require('@/assets/images/o-cao-dos-baskerville.jpg'),
  'A Carta Roubada': require('@/assets/images/a-carta-roubada.jpg'),
  'Os Crimes da Rua Morgue': require('@/assets/images/os-crimes-da-rua-morgue.jpg'),
  'O Homem Invisível': require('@/assets/images/o-homem-invisivel.jpg'),
  'As Mil e Uma Noites': require('@/assets/images/as-mil-e-uma-noites.jpg'),
  'Contos dos Irmãos Grimm': require('@/assets/images/contos-dos-irmaos-grimm.jpg'),
  'Os Sertões': require('@/assets/images/os-sertoes.jpg'),
  'A Divina Comédia': require('@/assets/images/a-divina-comedia.jpg'),
};
const description =
  descriptions[displayTitle] ||
  book?.description ||
  'Descrição não disponível.';
  const categories = book?.categories ?? [];
  const pageCount = book?.pageCount;
  const rating = book?.averageRating;
  const previewLink = book?.previewLink ?? '';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="#2F4F4F" />

      {/* Hero */}
      <View style={styles.hero}>
        <Image
  source={localCovers[title as string]}
  style={styles.heroBg}
  blurRadius={8}
/>
        <View style={styles.heroOverlay} />

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.heroContent}>
          <Image
  source={localCovers[title as string]}
  style={styles.coverImg}
/>
          <View style={styles.heroInfo}>
            <Text style={styles.heroTitle} numberOfLines={3}>{displayTitle}</Text>
            <Text style={styles.heroAuthor}>{displayAuthor}</Text>
            {rating ? (
              <View style={styles.ratingRow}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator color={colors.accent} style={{ marginTop: 24 }} />
        ) : (
          <>
            {/* Chips */}
            {(categories.length > 0 || pageCount) ? (
              <View style={styles.chips}>
                {categories.slice(0, 2).map((c, i) => (
                  <View key={i} style={[styles.chip, { backgroundColor: colors.accent }]}>
                    <Text style={styles.chipText}>{c}</Text>
                  </View>
                ))}
                {pageCount ? (
                  <View style={[styles.chip, { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.accent }]}>
                    <Text style={[styles.chipText, { color: colors.accent }]}>{pageCount} páginas</Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {/* Sinopse */}
            <Text style={[styles.sectionTitle, { color: colors.title }]}>Sinopse</Text>
            <Text style={[styles.description, { color: colors.text }]}>{description}</Text>

            {/* Botões */}
            <TouchableOpacity
              style={[styles.btnPrimary, { backgroundColor: colors.headerBg }]}
              onPress={() => previewLink && Linking.openURL(previewLink)}
              disabled={!previewLink}
            >
              <Text style={styles.btnPrimaryText}>
                {previewLink ? '📖  Ler prévia no Google Books' : '📖  Prévia não disponível'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnSecondary, { borderColor: colors.accent }]}
              onPress={() =>
                Linking.openURL(`https://books.google.com/books?q=${encodeURIComponent(displayTitle + ' ' + displayAuthor)}`)
              }
            >
              <Text style={[styles.btnSecondaryText, { color: colors.accent }]}>🔍  Buscar no Google Books</Text>
            </TouchableOpacity>
          </>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  hero: { height: 260, backgroundColor: '#2F4F4F', position: 'relative' },
  heroBg: { position: 'absolute', width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(47,79,79,0.75)' },
  backBtn: {
    position: 'absolute', top: 16, left: 16, zIndex: 10,
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center', justifyContent: 'center',
  },
  backText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  heroContent: { position: 'absolute', bottom: 20, left: 16, right: 16, flexDirection: 'row', gap: 14, alignItems: 'flex-end' },
  coverImg: { width: 90, height: 130, borderRadius: 12, resizeMode: 'cover' },
  coverPlaceholder: { backgroundColor: '#3a6060', alignItems: 'center', justifyContent: 'center' },
  heroInfo: { flex: 1, paddingBottom: 4 },
  heroTitle: { color: '#fff', fontSize: 17, fontWeight: 'bold', fontFamily: 'Georgia', marginBottom: 6, lineHeight: 22 },
  heroAuthor: { color: '#66CDAA', fontSize: 13, fontStyle: 'italic', marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  star: { color: '#FFD700', fontSize: 16 },
  ratingText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18 },
  chip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5 },
  chipText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 14, lineHeight: 22, fontStyle: 'italic', fontFamily: 'Georgia', marginBottom: 24 },
  btnPrimary: {
    borderRadius: 14, padding: 15, alignItems: 'center', marginBottom: 12,
  },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: 'bold', fontFamily: 'Georgia' },
  btnSecondary: {
    borderRadius: 14, padding: 14, alignItems: 'center',
    borderWidth: 1.5, marginBottom: 8,
  },
  btnSecondaryText: { fontSize: 15, fontWeight: '600' },
});

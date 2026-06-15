import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos.');
      return;
    }
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      router.replace('/(tabs)');
    } else {
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.bg} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>Lê-Se</Text>
          <Text style={styles.tagline}>Sua biblioteca pessoal</Text>

          <View style={styles.card}>
            <Text style={styles.title}>Entrar</Text>
            <Text style={styles.sub}>Bem-vindo de volta! 📚</Text>

            <Text style={styles.label}>E-MAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#9BA8B5"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>SENHA</Text>
            <TextInput
              style={[styles.input, { marginBottom: 6 }]}
              placeholder="••••••••"
              placeholderTextColor="#9BA8B5"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => router.push('/auth/forgot')}>
              <Text style={styles.forgotLink}>Esqueci minha senha</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnPrimaryText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.btnGoogle} onPress={handleLogin}>
              <Text style={styles.btnGoogleText}>G  Entrar com Google</Text>
            </TouchableOpacity>

            <View style={styles.linkRow}>
              <Text style={styles.linkText}>Não tem conta? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={styles.linkAccent}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2F4F4F' },
  bg: { flexGrow: 1, alignItems: 'center', padding: 24, paddingTop: 60, backgroundColor: '#2F4F4F' },
  logo: { fontSize: 44, fontFamily: 'serif', fontWeight: 'bold', color: '#FFFAF0', marginBottom: 4 },
  tagline: { fontSize: 14, color: '#66CDAA', fontStyle: 'italic', fontFamily: 'Georgia', marginBottom: 36 },
  card: { backgroundColor: '#FFFAF0', borderRadius: 24, padding: 28, width: '100%' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2F4F4F', fontFamily: 'Georgia', marginBottom: 4 },
  sub: { fontSize: 13, color: '#5A7A94', marginBottom: 22 },
  label: { fontSize: 11, fontWeight: '600', color: '#5A7A94', letterSpacing: 0.5, marginBottom: 6 },
  input: {
    backgroundColor: '#f5f0e8', borderRadius: 12, padding: 13,
    fontSize: 15, color: '#2F4F4F', marginBottom: 14,
    borderWidth: 1.5, borderColor: '#E0EAF4',
  },
  forgotLink: { textAlign: 'right', color: '#66CDAA', fontSize: 12, marginBottom: 14 },
  errorText: { color: '#E24B4A', fontSize: 13, marginBottom: 10, textAlign: 'center' },
  btnPrimary: {
    backgroundColor: '#2F4F4F', borderRadius: 14, padding: 14,
    alignItems: 'center', marginTop: 4,
  },
  btnPrimaryText: { color: '#FFFAF0', fontSize: 16, fontWeight: 'bold', fontFamily: 'Georgia' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 14, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0EAF4' },
  dividerText: { color: '#5A7A94', fontSize: 12 },
  btnGoogle: {
    borderRadius: 14, padding: 13, alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E0EAF4',
  },
  btnGoogleText: { color: '#2F4F4F', fontSize: 14 },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  linkText: { color: '#5A7A94', fontSize: 13 },
  linkAccent: { color: '#66CDAA', fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' },
});

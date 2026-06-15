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

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirm) {
      setError('Preencha todos os campos.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    setError('');
    setLoading(true);
    const ok = await signup(name, email, password);
    setLoading(false);
    if (ok) {
      router.replace('/(tabs)');
    } else {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.bg} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>Lê-Se</Text>
          <Text style={styles.tagline}>Comece sua jornada literária</Text>

          <View style={styles.card}>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.sub}>Junte-se a milhares de leitores! 📖</Text>

            <Text style={styles.label}>NOME COMPLETO</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#9BA8B5"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />

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
              style={styles.input}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor="#9BA8B5"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.label}>CONFIRMAR SENHA</Text>
            <TextInput
              style={[styles.input, { marginBottom: 4 }]}
              placeholder="Repita a senha"
              placeholderTextColor="#9BA8B5"
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.btnPrimary} onPress={handleSignup} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnPrimaryText}>Criar conta</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.secureNote}>🔒 Seus dados estão protegidos</Text>

            <View style={styles.linkRow}>
              <Text style={styles.linkText}>Já tem conta? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.linkAccent}>Entrar</Text>
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
  errorText: { color: '#E24B4A', fontSize: 13, marginBottom: 10, textAlign: 'center' },
  btnPrimary: {
    backgroundColor: '#2F4F4F', borderRadius: 14, padding: 14,
    alignItems: 'center', marginTop: 8,
  },
  btnPrimaryText: { color: '#FFFAF0', fontSize: 16, fontWeight: 'bold', fontFamily: 'Georgia' },
  secureNote: { textAlign: 'center', color: '#5A7A94', fontSize: 12, marginTop: 10 },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  linkText: { color: '#5A7A94', fontSize: 13 },
  linkAccent: { color: '#66CDAA', fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' },
});

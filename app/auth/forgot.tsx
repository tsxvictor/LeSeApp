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

export default function ForgotScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const { sendPasswordReset } = useAuth();
  const router = useRouter();

  const handleSend = async () => {
    if (!email) {
      setError('Digite seu e-mail.');
      return;
    }
    setError('');
    setLoading(true);
    const ok = await sendPasswordReset(email);
    setLoading(false);
    if (ok) setSent(true);
    else setError('Erro ao enviar. Verifique o e-mail informado.');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.bg} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>Lê-Se</Text>
          <Text style={styles.tagline}>Não se preocupe!</Text>

          <View style={styles.card}>
            {!sent ? (
              <>
                <Text style={styles.title}>Recuperar senha</Text>
                <Text style={styles.sub}>Enviaremos um link de redefinição no seu e-mail.</Text>

                <Text style={styles.label}>SEU E-MAIL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="seu@email.com"
                  placeholderTextColor="#9BA8B5"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.btnPrimary} onPress={handleSend} disabled={loading}>
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnPrimaryText}>Enviar link de recuperação</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.linkRow}>
                  <Text style={styles.linkText}>Lembrou a senha? </Text>
                  <TouchableOpacity onPress={() => router.push('/auth/login')}>
                    <Text style={styles.linkAccent}>Voltar ao login</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.successIcon}>📧</Text>
                <Text style={[styles.title, { textAlign: 'center' }]}>E-mail enviado!</Text>
                <Text style={styles.successMsg}>
                  Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                </Text>
                <TouchableOpacity style={styles.btnPrimary} onPress={() => router.push('/auth/login')}>
                  <Text style={styles.btnPrimaryText}>Voltar ao login</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#2F4F4F' },
  bg: { flexGrow: 1, alignItems: 'center', padding: 24, paddingTop: 80, backgroundColor: '#2F4F4F' },
  logo: { fontSize: 44, fontFamily: 'serif', fontWeight: 'bold', color: '#FFFAF0', marginBottom: 4 },
  tagline: { fontSize: 14, color: '#66CDAA', fontStyle: 'italic', fontFamily: 'Georgia', marginBottom: 36 },
  card: { backgroundColor: '#FFFAF0', borderRadius: 24, padding: 28, width: '100%' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2F4F4F', fontFamily: 'Georgia', marginBottom: 6 },
  sub: { fontSize: 13, color: '#5A7A94', marginBottom: 22, lineHeight: 20 },
  label: { fontSize: 11, fontWeight: '600', color: '#5A7A94', letterSpacing: 0.5, marginBottom: 6 },
  input: {
    backgroundColor: '#f5f0e8', borderRadius: 12, padding: 13,
    fontSize: 15, color: '#2F4F4F', marginBottom: 14,
    borderWidth: 1.5, borderColor: '#E0EAF4',
  },
  errorText: { color: '#E24B4A', fontSize: 13, marginBottom: 10, textAlign: 'center' },
  btnPrimary: {
    backgroundColor: '#2F4F4F', borderRadius: 14, padding: 14,
    alignItems: 'center', marginTop: 4,
  },
  btnPrimaryText: { color: '#FFFAF0', fontSize: 16, fontWeight: 'bold', fontFamily: 'Georgia' },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  linkText: { color: '#5A7A94', fontSize: 13 },
  linkAccent: { color: '#66CDAA', fontSize: 13, fontWeight: '600', textDecorationLine: 'underline' },
  successIcon: { fontSize: 52, textAlign: 'center', marginBottom: 12 },
  successMsg: { fontSize: 14, color: '#5A7A94', textAlign: 'center', lineHeight: 22, marginBottom: 24, marginTop: 8 },
});

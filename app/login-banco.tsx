import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function BankLoginScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  const bankName = params.name as string || 'Banco';
  const bankColor = params.color as string || '#0a7ea4';
  const textColor = params.textColor as string || '#fff';
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingStep, setLoadingStep] = useState<number>(0); // 0: none, 1: authenticating, 2: syncing

  const inputBg = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background');
  const appTextColor = useThemeColor({}, 'text');

  const loadingMessages = [
    '',
    `Conectando de forma segura con ${bankName}...`,
    'Obteniendo productos y transacciones...',
    '¡Conexión exitosa!'
  ];

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Datos incompletos', 'Por favor ingresa tu usuario y contraseña.');
      return;
    }

    // Simulate login and sync flow
    setLoadingStep(1);
    
    setTimeout(() => {
      setLoadingStep(2);
      setTimeout(() => {
        setLoadingStep(3);
        setTimeout(() => {
          router.replace('/');
          Alert.alert('¡Listos!', `Tu cuenta de ${bankName} ha sido vinculada exitosamente.`);
        }, 800);
      }, 2000);
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: appTextColor,
        }}
      />
      
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: bankColor }]}>
            <ThemedText style={[styles.logoText, { color: textColor }]}>
              {bankName.substring(0, 1)}
            </ThemedText>
          </View>
          <ThemedText type="title" style={styles.title}>Inicia sesión en {bankName}</ThemedText>
          <ThemedText style={styles.subtitle}>
            Para centralizar tus datos, conecta tu cuenta de manera segura. Tus credenciales viajan encriptadas.
          </ThemedText>
        </View>

        {loadingStep > 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={bankColor} style={styles.loader} />
            <ThemedText type="defaultSemiBold" style={styles.loadingText}>
              {loadingMessages[loadingStep]}
            </ThemedText>
            {loadingStep === 1 && <ThemedText style={styles.loadingSub}>Verificando credenciales...</ThemedText>}
            {loadingStep === 2 && <ThemedText style={styles.loadingSub}>Encriptando información (AES-256)...</ThemedText>}
          </View>
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <ThemedText style={styles.inputLabel}>Usuario / Documento</ThemedText>
              <View style={[styles.inputBox, { backgroundColor: inputBg }]}>
                <Ionicons name="person-outline" size={20} color="#999" />
                <TextInput
                  style={[styles.input, { color: appTextColor }]}
                  placeholder="Ingresa tu usuario"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <ThemedText style={styles.inputLabel}>Contraseña</ThemedText>
              <View style={[styles.inputBox, { backgroundColor: inputBg }]}>
                <Ionicons name="lock-closed-outline" size={20} color="#999" />
                <TextInput
                  style={[styles.input, { color: appTextColor }]}
                  placeholder="Ingresa tu contraseña"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.securityBanner}>
              <Ionicons name="shield-checkmark" size={16} color="#32C759" />
              <ThemedText style={styles.securityText}>Conexión segura protegida por Open Banking</ThemedText>
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: bankColor }]}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <ThemedText style={[styles.loginButtonText, { color: textColor }]}>
                Autorizar y Conectar
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    lineHeight: 20,
  },
  formContainer: {
    gap: 20,
  },
  inputWrapper: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  securityText: {
    fontSize: 12,
    color: '#32C759',
    fontWeight: '500',
  },
  loginButton: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loader: {
    marginBottom: 20,
    transform: [{ scale: 1.5 }],
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingSub: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
});

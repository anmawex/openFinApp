import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const { height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  const handleAuthenticate = async () => {
    try {
      // Check if device has biometric hardware
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Desbloquea para ver tus finanzas',
          fallbackLabel: 'Usar PIN del dispositivo',
          cancelLabel: 'Cancelar',
        });

        if (result.success) {
          router.replace('/(tabs)');
        } else if (result.error !== 'user_cancel') {
          Alert.alert('Autenticación fallida', 'Por favor, intenta nuevamente para proteger tus datos.');
        }
      } else {
        // Fallback for simulators or devices without biometrics configured
        Alert.alert(
          'Protección Recomendada',
          'Tu dispositivo no tiene FaceID o Huella dactilar configurada. Te recomendamos activarlo para mantener tus datos seguros.',
          [{ text: 'Entendido y Continuar', onPress: () => router.replace('/(tabs)') }]
        );
      }
    } catch (error) {
      console.warn(error);
      router.replace('/(tabs)'); // Fallback in case of unexpected error
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Background Decoral */}
      <View style={styles.decoratorContainer}>
         <LinearGradient
           colors={['#0a7ea4', '#32C759']}
           style={styles.gradient}
           start={{ x: 0, y: 0 }}
           end={{ x: 1, y: 1 }}
         />
      </View>

      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
             <Ionicons name="wallet" size={42} color="#0a7ea4" />
          </View>
          <ThemedText type="title" style={styles.appName}>Antigravity Finance</ThemedText>
          <ThemedText style={styles.tagline}>Centraliza. Controla. Crece.</ThemedText>
        </View>

        <View style={styles.features}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name="apps-outline" size={24} color="#0a7ea4" />
            </View>
            <View>
              <ThemedText type="defaultSemiBold">Todas tus cuentas</ThemedText>
              <ThemedText style={styles.featureDesc}>Bancos y neobancos en un solo lugar.</ThemedText>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name="notifications-outline" size={24} color="#32C759" />
            </View>
            <View>
              <ThemedText type="defaultSemiBold">Detector automático</ThemedText>
              <ThemedText style={styles.featureDesc}>Identifica suscripciones y gastos hormiga.</ThemedText>
            </View>
          </View>

          <View style={styles.featureRow}>
             <View style={styles.featureIcon}>
              <Ionicons name="lock-closed-outline" size={24} color="#820AD1" />
            </View>
            <View>
              <ThemedText type="defaultSemiBold">Seguridad Grado Bancario</ThemedText>
              <ThemedText style={styles.featureDesc}>Tus datos protegidos y siempre bajo tu control.</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={handleAuthenticate}
          >
            <ThemedText style={styles.buttonText}>Comenzar ahora</ThemedText>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
          <ThemedText style={styles.terms}>Al continuar, aceptas nuestros Términos de Privacidad</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  decoratorContainer: {
    height: height * 0.45,
    width: '100%',
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    borderBottomRightRadius: 100,
  },
  gradient: {
    flex: 1,
    opacity: 0.8,
  },
  card: {
    flex: 1,
    marginTop: height * 0.15,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
     width: 90,
     height: 90,
     borderRadius: 45,
     backgroundColor: '#fff',
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 20,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 4 },
     shadowOpacity: 0.1,
     shadowRadius: 10,
     elevation: 5,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  features: {
    gap: 25,
    marginBottom: 40,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureDesc: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    backgroundColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    width: '100%',
    borderRadius: 18,
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  terms: {
    fontSize: 12,
    color: '#aaa',
  },
});

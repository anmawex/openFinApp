import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const INITIAL_CONNECTIONS = [
  { id: '1', name: 'Bancolombia', color: '#FDDA24', textColor: '#000', status: 'Activo', lastSync: 'Hoy, 10:30 AM' },
  { id: '2', name: 'Nequi', color: '#D40073', textColor: '#fff', status: 'Activo', lastSync: 'Hoy, 09:15 AM' },
  { id: '3', name: 'Nu Colombia', color: '#820AD1', textColor: '#fff', status: 'Activo', lastSync: 'Ayer, 08:00 AM' },
  { id: '4', name: 'Davivienda', color: '#ED1C24', textColor: '#fff', status: 'Activo', lastSync: 'Ayer, 07:45 PM' },
];

export default function PrivacySettingsScreen() {
  const [connections, setConnections] = useState(INITIAL_CONNECTIONS);
  const [revoking, setRevoking] = useState<string | null>(null);
  
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleRevoke = (bank: typeof INITIAL_CONNECTIONS[0]) => {
    Alert.alert(
      'Revocar Acceso',
      `¿Estás seguro de que quieres eliminar la conexión con ${bank.name}? Los datos ya no se sincronizarán y dejarás de ver tus movimientos en la app.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Revocar Acceso', 
          style: 'destructive',
          onPress: () => simulateRevoke(bank.id)
        },
      ]
    );
  };

  const simulateRevoke = (id: string) => {
    setRevoking(id);
    // Simulate API call to Belvo/Bank to revoke token
    setTimeout(() => {
      setConnections(prev => prev.filter(c => c.id !== id));
      setRevoking(null);
      Alert.alert('Acceso Revocado', 'Se ha eliminado la conexión de forma segura.');
    }, 1500);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Privacidad y Datos',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoSection}>
          <Ionicons name="lock-closed-outline" size={32} color="#0a7ea4" style={styles.infoIcon} />
          <ThemedText style={styles.headerDesc}>
            Controla qué entidades financieras tienen permiso para compartir datos con esta aplicación. Puedes revocar el acceso en cualquier momento.
          </ThemedText>
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>Entidades Conectadas</ThemedText>
        
        {connections.length > 0 ? (
          connections.map((bank) => (
            <View key={bank.id} style={[styles.connectionCard, { backgroundColor: cardBg }]}>
              <View style={[styles.bankLogo, { backgroundColor: bank.color }]}>
                <ThemedText style={[styles.logoText, { color: bank.textColor }]}>{bank.name.substring(0, 1)}</ThemedText>
              </View>
              <View style={styles.bankDetails}>
                <ThemedText type="defaultSemiBold" style={styles.bankName}>{bank.name}</ThemedText>
                <ThemedText style={styles.syncInfo}>Última sincronización: {bank.lastSync}</ThemedText>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <ThemedText style={styles.statusText}>{bank.status}</ThemedText>
                </View>
              </View>
              {revoking === bank.id ? (
                <ActivityIndicator color="#FF453A" />
              ) : (
                <TouchableOpacity 
                  style={styles.revokeButton} 
                  onPress={() => handleRevoke(bank)}
                >
                  <ThemedText style={styles.revokeText}>Revocar</ThemedText>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="shield-checkmark-outline" size={48} color="#999" />
            <ThemedText style={styles.emptyText}>No tienes entidades conectadas actualmente.</ThemedText>
          </View>
        )}

        <View style={styles.footerSection}>
          <ThemedText style={styles.footerTitle}>Tu seguridad es prioridad</ThemedText>
          <ThemedText style={styles.footerText}>
            Utilizamos encriptación de grado bancario (AES-256) para proteger tus credenciales. Nunca almacenamos tus contraseñas directamente.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 150,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
    padding: 15,
    backgroundColor: 'rgba(10, 126, 164, 0.05)',
    borderRadius: 16,
  },
  infoIcon: {
    opacity: 0.8,
  },
  headerDesc: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  sectionTitle: {
    marginBottom: 20,
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  bankLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
  },
  bankDetails: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
  },
  syncInfo: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#32C759',
  },
  statusText: {
    fontSize: 12,
    color: '#32C759',
    fontWeight: '600',
  },
  revokeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
  },
  revokeText: {
    color: '#FF453A',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    marginTop: 15,
    color: '#999',
    textAlign: 'center',
  },
  footerSection: {
    marginTop: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.02)',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});

import React from 'react';
import { StyleSheet, FlatList, View, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const DETECTED_SUBSCRIPTIONS = [
  { id: '1', name: 'Netflix', price: '$24.900', bank: 'Davivienda', lastCharge: '20 Mar 2026', icon: 'play-circle', color: '#E50914' },
  { id: '2', name: 'Spotify Premium', price: '$14.900', bank: 'Nequi', lastCharge: '15 Mar 2026', icon: 'musical-notes', color: '#1DB954' },
  { id: '3', name: 'RappiPrime', price: '$16.900', bank: 'Bancolombia', lastCharge: '10 Mar 2026', icon: 'bicycle', color: '#FF441F' },
  { id: '4', name: 'Disney+', price: '$35.000', bank: 'Nu Colombia', lastCharge: '05 Mar 2026', icon: 'sparkles', color: '#006E99' },
  { id: '5', name: 'iCloud 50GB', price: '$3.900', bank: 'Davivienda', lastCharge: '25 Feb 2026', icon: 'cloud', color: '#007AFF' },
  { id: '6', name: 'Adobe Creative Cloud', price: '$120.000', bank: 'Banco de Bogotá', lastCharge: '01 Mar 2026', icon: 'color-palette', color: '#FF0000' },
  { id: '7', name: 'YouTube Premium', price: '$17.900', bank: 'Bancolombia', lastCharge: '12 Mar 2026', icon: 'logo-youtube', color: '#FF0000' },
  { id: '8', name: 'Amazon Prime', price: '$14.900', bank: 'Nequi', lastCharge: '08 Mar 2026', icon: 'basket', color: '#FF9900' },
];

export default function SubscriptionDetectorScreen() {
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const warningBg = useThemeColor({ light: '#FFFBEB', dark: '#453503' }, 'background');

  const handleAlert = (sub: typeof DETECTED_SUBSCRIPTIONS[0]) => {
    Alert.alert(
      'Gestionar Suscripción',
      `¿Deseas ver cómo cancelar ${sub.name} o marcarla como no reconocida?`,
      [
        { text: 'Saber más', onPress: () => {} },
        { text: 'Es un error', style: 'destructive' },
        { text: 'Cerrar', style: 'cancel' },
      ]
    );
  };

  const renderItem = ({ item }: { item: typeof DETECTED_SUBSCRIPTIONS[0] }) => (
    <TouchableOpacity 
      style={[styles.subItem, { backgroundColor: cardBg }]}
      onPress={() => handleAlert(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '11' }]}>
        <Ionicons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View style={styles.subDetails}>
        <ThemedText type="defaultSemiBold" style={styles.subName}>{item.name}</ThemedText>
        <ThemedText style={styles.subBank}>{item.bank} • Último cobro: {item.lastCharge}</ThemedText>
      </View>
      <View style={styles.priceContainer}>
        <ThemedText type="defaultSemiBold" style={styles.subPrice}>{item.price}</ThemedText>
        <ThemedText style={styles.monthlyLabel}>/mes</ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#999" />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Detector de Suscripciones',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
      
      <FlatList
        data={DETECTED_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={[styles.infoBanner, { backgroundColor: warningBg }]}>
            <Ionicons name="bulb-outline" size={20} color="#D97706" />
            <ThemedText style={styles.infoText}>
              Hemos detectado estas suscripciones recurrentes en tus extractos bancarios. Revísalas para evitar cobros de servicios que ya no uses.
            </ThemedText>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 150, // For large title
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  infoBanner: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#D97706',
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subDetails: {
    flex: 1,
  },
  subName: {
    fontSize: 16,
  },
  subBank: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  subPrice: {
    fontSize: 16,
  },
  monthlyLabel: {
    fontSize: 10,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

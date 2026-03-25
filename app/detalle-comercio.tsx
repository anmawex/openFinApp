import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const MERCHANT_DATA: Record<string, any> = {
  'Mercado Libre': {
    id: 'mercadolibre',
    logo: 'https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.5/mercadolibre/logo__large_plus.png', // Fallback placeholder
    brandColor: '#FEE600',
    category: 'E-commerce',
    totalSpent: '$1.450.000',
    transactionsCount: 12,
    avgSpent: '$120.833',
    transactions: [
      { id: 'm1', date: '21 Mar 2026', desc: 'Audífonos Bluetooth', amount: '-$150.000', bank: 'Nu Colombia' },
      { id: 'm2', date: '15 Mar 2026', desc: 'Soporte para Laptop', amount: '-$45.000', bank: 'Bancolombia' },
      { id: 'm3', date: '05 Mar 2026', desc: 'Smartphone Xiaomi', amount: '$1.255.000', bank: 'Daviplata' },
    ]
  },
  'Rappi': {
    id: 'rappi',
    brandColor: '#FF441F',
    category: 'Domicilios',
    totalSpent: '$450.000',
    transactionsCount: 8,
    avgSpent: '$56.250',
    transactions: [
      { id: 'r1', date: 'Hoy', desc: 'Restaurante El Corral', amount: '-$55.000', bank: 'Nequi' },
      { id: 'r2', date: 'Ayer', desc: 'Farmatodo - Medicamentos', amount: '-$32.000', bank: 'Nu Colombia' },
    ]
  },
};

export default function MerchantDetailScreen() {
  const { name = 'Mercado Libre' } = useLocalSearchParams();
  const merchant = MERCHANT_DATA[name as string] || MERCHANT_DATA['Mercado Libre'];
  
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: name as string,
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Merchant Header */}
        <View style={[styles.headerCard, { backgroundColor: merchant.brandColor }]}>
           <View style={styles.logoCircle}>
             <ThemedText style={styles.logoText}>{name.toString().substring(0, 2)}</ThemedText>
           </View>
           <ThemedText style={styles.headerCategory}>{merchant.category}</ThemedText>
        </View>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.statLabel}>Total gastado</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>{merchant.totalSpent}</ThemedText>
          </View>
          <View style={[styles.statBox, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.statLabel}>Transacciones</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>{merchant.transactionsCount}</ThemedText>
          </View>
        </View>

        {/* Insight Card */}
        <View style={[styles.insightCard, { backgroundColor: cardBg }]}>
          <Ionicons name="analytics-outline" size={24} color="#0a7ea4" />
          <View style={{ flex: 1 }}>
            <ThemedText type="defaultSemiBold">Promedio por compra</ThemedText>
            <ThemedText style={styles.insightDesc}>Tus compras en {name} suelen ser de {merchant.avgSpent}.</ThemedText>
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.listSection}>
          <ThemedText type="subtitle" style={styles.listTitle}>Historial de compras</ThemedText>
          {merchant.transactions.map((tx: any) => (
            <View key={tx.id} style={[styles.transactionItem, { backgroundColor: cardBg }]}>
              <View style={styles.txMain}>
                <ThemedText type="defaultSemiBold">{tx.desc}</ThemedText>
                <ThemedText style={styles.txMeta}>{tx.date} • {tx.bank}</ThemedText>
              </View>
              <ThemedText type="defaultSemiBold" style={styles.txAmount}>{tx.amount}</ThemedText>
            </View>
          ))}
        </View>

        {/* More details (Mock) */}
        <View style={[styles.detailsCard, { backgroundColor: cardBg }]}>
          <ThemedText type="defaultSemiBold">Información del convenio</ThemedText>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>NIT</ThemedText>
            <ThemedText>900.123.456-7</ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Razón Social</ThemedText>
            <ThemedText>MercadoLibre Colombia S.A.S</ThemedText>
          </View>
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Canal habitual</ThemedText>
            <ThemedText>Pago Electrónico (PSE)</ThemedText>
          </View>
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
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerCard: {
    height: 180,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  headerCategory: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.6)',
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    gap: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statValue: {
    fontSize: 18,
  },
  insightCard: {
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
  },
  insightDesc: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  listSection: {
    marginBottom: 25,
  },
  listTitle: {
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  txMain: {
    flex: 1,
  },
  txMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  txAmount: {
    fontSize: 15,
  },
  detailsCard: {
    padding: 20,
    borderRadius: 24,
    gap: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#999',
    fontSize: 13,
  },
});

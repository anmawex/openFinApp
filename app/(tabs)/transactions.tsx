import React, { useState } from 'react';
import { StyleSheet, SectionList, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const TRANSACTIONS = [
  {
    title: 'Hoy',
    data: [
      { id: '1', description: 'Starbucks coffee', amount: -12500, category: 'Café', bank: 'Bancolombia', bankColor: '#FDDA24', icon: 'cafe-outline', time: '10:30 AM' },
      { id: '2', description: 'Transferencia recibida', amount: 50000, category: 'Transferencia', bank: 'Nequi', bankColor: '#D40073', icon: 'arrow-down-circle-outline', time: '09:15 AM' },
      { id: '3', description: 'Almacenes Éxito', amount: -85000, category: 'Mercado', bank: 'Nu Colombia', bankColor: '#820AD1', icon: 'cart-outline', time: '08:00 AM' },
    ],
  },
  {
    title: 'Ayer',
    data: [
      { id: '4', description: 'Netflix S.A.S', amount: -24900, category: 'Suscripción', bank: 'Davivienda', bankColor: '#ED1C24', icon: 'play-circle-outline', time: '07:45 PM' },
      { id: '5', description: 'Retiro Cajero', amount: -100000, category: 'Retiro', bank: 'Bancolombia', bankColor: '#FDDA24', icon: 'cash-outline', time: '04:20 PM' },
      { id: '6', description: 'Spotify Premium', amount: -14900, category: 'Suscripción', bank: 'Nequi', bankColor: '#D40073', icon: 'musical-notes-outline', time: '11:00 AM' },
    ],
  },
  {
    title: '23 de Marzo',
    data: [
      { id: '7', description: 'Restaurante El Cielo', amount: -150000, category: 'Comida', bank: 'Bancolombia', bankColor: '#FDDA24', icon: 'restaurant-outline', time: '08:30 PM' },
      { id: '8', description: 'Pago de servicios en Daviplata', amount: -85000, category: 'Servicios', bank: 'Daviplata', bankColor: '#ED1C24', icon: 'flash-outline', time: '10:00 AM' },
    ],
  },
];

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const textColor = useThemeColor({}, 'text');
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const inputBg = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background');

  const filteredData = TRANSACTIONS.map(section => ({
    ...section,
    data: section.data.filter(item => 
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bank.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.data.length > 0);

  const formatCurrency = (value: number) => {
    const formatted = Math.abs(value).toLocaleString('es-CO');
    return value < 0 ? `-$${formatted}` : `+$${formatted}`;
  };

  const handleSelectBank = (item: typeof TRANSACTIONS[0]['data'][0]) => {
    router.push({
      pathname: '/detalle-comercio',
      params: { name: item.description }
    });
  };

  const renderItem = ({ item }: { item: typeof TRANSACTIONS[0]['data'][0] }) => (
    <TouchableOpacity 
      style={[styles.transactionItem, { backgroundColor: cardBg }]}
      onPress={() => handleSelectBank(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.amount < 0 ? 'rgba(255, 69, 58, 0.1)' : 'rgba(52, 199, 89, 0.1)' }]}>
        <Ionicons name={item.icon as any} size={24} color={item.amount < 0 ? '#FF453A' : '#32C759'} />
      </View>
      <View style={styles.detailsContainer}>
        <ThemedText type="defaultSemiBold" style={styles.description}>{item.description}</ThemedText>
        <View style={styles.metaInfo}>
          <View style={[styles.bankPill, { backgroundColor: item.bankColor + '22' }]}>
            <ThemedText style={[styles.bankName, { color: item.bankColor === '#FDDA24' ? '#8B7E00' : item.bankColor }]}>{item.bank}</ThemedText>
          </View>
          <ThemedText style={styles.timeText}>{item.time}</ThemedText>
        </View>
      </View>
      <ThemedText type="defaultSemiBold" style={[styles.amount, { color: item.amount < 0 ? textColor : '#32C759' }]}>
        {formatCurrency(item.amount)}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Movimientos</ThemedText>
        <ThemedText style={styles.subtitle}>Historial unificado de todas tus cuentas</ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Buscar por gasto, banco o categoría..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <SectionList
        sections={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <ThemedText style={styles.sectionHeader}>{title}</ThemedText>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No hay transacciones que coincidan.</ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  description: {
    fontSize: 15,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  bankPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bankName: {
    fontSize: 11,
    fontWeight: '700',
  },
  timeText: {
    fontSize: 11,
    color: '#999',
  },
  amount: {
    fontSize: 15,
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});

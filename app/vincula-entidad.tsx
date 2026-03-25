import React, { useState } from 'react';
import { StyleSheet, FlatList, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const BANKS = [
  { id: 'bancolombia', name: 'Bancolombia', color: '#FDDA24', textColor: '#000', category: 'Bancos' },
  { id: 'nequi', name: 'Nequi', color: '#D40073', textColor: '#fff', category: 'Neobancos' },
  { id: 'nu', name: 'Nu Colombia', color: '#820AD1', textColor: '#fff', category: 'Neobancos' },
  { id: 'davivienda', name: 'Davivienda', color: '#ED1C24', textColor: '#fff', category: 'Bancos' },
  { id: 'daviplata', name: 'Daviplata', color: '#ED1C24', textColor: '#fff', category: 'Neobancos' },
  { id: 'bbva', name: 'BBVA', color: '#004481', textColor: '#fff', category: 'Bancos' },
  { id: 'bogota', name: 'Banco de Bogotá', color: '#003366', textColor: '#fff', category: 'Bancos' },
  { id: 'occidente', name: 'Banco de Occidente', color: '#0055A5', textColor: '#fff', category: 'Bancos' },
  { id: 'popular', name: 'Banco Popular', color: '#007A33', textColor: '#fff', category: 'Bancos' },
  { id: 'falabella', name: 'Banco Falabella', color: '#6DB33F', textColor: '#fff', category: 'Bancos' },
  { id: 'itau', name: 'Banco Itaú', color: '#FF7900', textColor: '#fff', category: 'Bancos' },
  { id: 'rappipay', name: 'RappiPay', color: '#FF441F', textColor: '#fff', category: 'Neobancos' },
  { id: 'dale', name: 'Dale!', color: '#7AFF00', textColor: '#000', category: 'Neobancos' },
  { id: 'scotiabank', name: 'Scotiabank Colpatria', color: '#EE0000', textColor: '#fff', category: 'Bancos' },
];

export default function RegisterEntityScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const textColor = useThemeColor({}, 'text');
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');
  const inputBg = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background');

  const filteredBanks = BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectBank = (bank: typeof BANKS[0]) => {
    setLoading(bank.id);
    
    // Simulate connection flow
    setTimeout(() => {
      setLoading(null);
      Alert.alert(
        'Vincular Cuenta',
        `Esto te redirigirá a ${bank.name} para autenticarte de forma segura.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Continuar', 
            onPress: () => {
              // Simulate success
              Alert.alert('¡Listos!', `Tu cuenta de ${bank.name} ha sido vinculada y la información se está sincronizando.`);
              router.back();
            } 
          },
        ]
      );
    }, 1200);
  };

  const renderBankItem = ({ item }: { item: typeof BANKS[0] }) => (
    <TouchableOpacity
      style={[styles.bankItem, { backgroundColor: cardBg }]}
      onPress={() => handleSelectBank(item)}
      activeOpacity={0.7}
      disabled={!!loading}
    >
      <View style={[styles.logoContainer, { backgroundColor: item.color }]}>
        <ThemedText style={[styles.logoText, { color: item.textColor }]}>
          {item.name.substring(0, 1)}
        </ThemedText>
      </View>
      <View style={styles.bankInfo}>
        <ThemedText type="defaultSemiBold" style={styles.bankName}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.categoryText}>{item.category}</ThemedText>
      </View>
      {loading === item.id ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Ionicons name="chevron-forward" size={18} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Vincular Entidad',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerShadowVisible: false,
        }}
      />
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: inputBg }]}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Buscar por nombre o tipo..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <FlatList
        data={filteredBanks}
        keyExtractor={(item) => item.id}
        renderItem={renderBankItem}
        contentContainerStyle={styles.listContent}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={
          searchQuery === '' ? (
            <ThemedText style={styles.sectionHeader}>Entidades disponibles</ThemedText>
          ) : null
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="warning-outline" size={48} color="#999" />
            <ThemedText style={styles.emptyText}>No encontramos entidades que coincidan con tu búsqueda.</ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12, // For non-large title fallback
    marginBottom: 8,
  },
  searchBar: {
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 24,
    width: '100%',
  },
  logoContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoText: {
    fontWeight: '700',
    fontSize: 18,
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 17,
  },
  categoryText: {
    fontSize: 13,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#3333331a',
    marginHorizontal: 24,
    marginLeft: 84, // Align with text
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
    fontSize: 16,
  },
});

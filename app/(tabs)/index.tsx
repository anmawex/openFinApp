import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const INDIVIDUAL_BALANCES = [
  { id: '1', name: 'Bancolombia', balance: '$3.450.200', color: '#FDDA24', textColor: '#000' },
  { id: '2', name: 'Nequi', balance: '$120.450', color: '#D40073', textColor: '#fff' },
  { id: '3', name: 'Nu Colombia', balance: '$2.800.000', color: '#820AD1', textColor: '#fff' },
  { id: '4', name: 'Davivienda', balance: '$450.000', color: '#ED1C24', textColor: '#fff' },
];

const RECENT_MOVEMENTS = [
  { id: '1', title: 'Starbucks', subtitle: 'Bancolombia • Hoy', amount: '-$12.500', icon: 'cafe-outline', color: '#FF453A' },
  { id: '2', title: 'Nequi Recibido', subtitle: 'Nequi • Hoy', amount: '+$50.000', icon: 'arrow-down-circle-outline', color: '#32C759' },
  { id: '3', title: 'Almacenes Éxito', subtitle: 'Nu • Hoy', amount: '-$85.000', icon: 'cart-outline', color: '#FF453A' },
  { id: '4', title: 'Netflix', subtitle: 'Davivienda • Ayer', amount: '-$24.900', icon: 'play-circle-outline', color: '#FF453A' },
  { id: '5', title: 'Cajero Autogestion', subtitle: 'Bancolombia • Ayer', amount: '-$100.000', icon: 'cash-outline', color: '#FF453A' },
];

const SUBSCRIPTIONS = [
  { name: 'Netflix', amount: 24900 },
  { name: 'Spotify', amount: 14900 },
  { name: 'Disney+', amount: 35000 },
  { name: 'HBO Max', amount: 29900 },
];

export default function HomeScreen() {
  const cardBg = useThemeColor({ light: '#11181C', dark: '#FFFFFF' }, 'background');
  const cardText = useThemeColor({ light: '#FFFFFF', dark: '#11181C' }, 'text');
  const sectionBg = useThemeColor({ light: '#f9f9f9', dark: '#1e1e1e' }, 'background');
  
  const totalSubscriptions = SUBSCRIPTIONS.reduce((acc, curr) => acc + curr.amount, 0);
  const subscriptionBudget = 150000;
  const progress = Math.min(totalSubscriptions / subscriptionBudget, 1);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      
      {/* 1. Arriba: Card Saldo Total */}
      <ThemedView style={styles.topContainer}>
        <View style={[styles.totalCard, { backgroundColor: cardBg }]}>
          <View>
            <ThemedText style={[styles.totalLabel, { color: cardText }]}>Saldo Total Centralizado</ThemedText>
            <ThemedText style={[styles.totalValue, { color: cardText }]}>$6.820.650</ThemedText>
          </View>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={18} color="#0a7ea4" />
            <ThemedText style={styles.refreshText}>Actualizar datos</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* 2. Medio: Carrusel de Saldos Individuales */}
      <View style={styles.carouselContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Tus Bancos</ThemedText>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16}
          decelerationRate="fast"
          contentContainerStyle={styles.carouselContent}
        >
          {INDIVIDUAL_BALANCES.map((item) => (
            <View key={item.id} style={[styles.bankCard, { backgroundColor: item.color }]}>
              <ThemedText style={[styles.bankName, { color: item.textColor }]}>{item.name}</ThemedText>
              <ThemedText style={[styles.bankBalance, { color: item.textColor }]}>{item.balance}</ThemedText>
              <Ionicons name="card-outline" size={32} color={item.textColor} style={styles.bankIcon} opacity={0.3} />
            </View>
          ))}
          <Link href="/vincula-entidad" asChild>
            <TouchableOpacity style={styles.addBankCard}>
              <Ionicons name="add-outline" size={32} color="#999" />
              <ThemedText style={{ color: '#999' }}>Añadir</ThemedText>
            </TouchableOpacity>
          </Link>
        </ScrollView>
      </View>

      {/* 3. Sección Destacada: Suscripciones */}
      <ThemedView style={[styles.subscriptionContainer, { backgroundColor: sectionBg }]}>
        <ThemedText type="subtitle">Tus suscripciones de este mes</ThemedText>
        <View style={styles.subscriptionMetrics}>
          <ThemedText style={styles.subscriptionTotal}>Total: <ThemedText type="defaultSemiBold">${totalSubscriptions.toLocaleString('es-CO')}</ThemedText></ThemedText>
          <ThemedText style={styles.subscriptionLimit}>Límite: $150.000</ThemedText>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: progress > 0.8 ? '#FF453A' : '#32C759' }]} />
        </View>
        <ThemedText style={styles.subsCount}>{SUBSCRIPTIONS.length} suscripciones activas detectedas</ThemedText>
      </ThemedView>

      {/* 4. Abajo: Últimos 5 Movimientos */}
      <ThemedView style={styles.movementsSection}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle">Últimos movimientos</ThemedText>
          <Link href="/transactions">
            <ThemedText style={styles.viewAll}>Ver todos</ThemedText>
          </Link>
        </View>
        <ThemedView style={styles.movementsList}>
          {RECENT_MOVEMENTS.map((item, index) => (
            <View key={item.id}>
              <View style={styles.movementItem}>
                <View style={[styles.iconBox, { backgroundColor: item.color + '11' }]}>
                  <Ionicons name={item.icon as any} size={20} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                  <ThemedText style={styles.movementSubtitle}>{item.subtitle}</ThemedText>
                </View>
                <ThemedText type="defaultSemiBold" style={{ color: item.amount.startsWith('+') ? '#32C759' : undefined }}>{item.amount}</ThemedText>
              </View>
              {index < RECENT_MOVEMENTS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </ThemedView>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  totalCard: {
    padding: 24,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  totalLabel: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  refreshButton: {
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  refreshText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  carouselContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  carouselContent: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 8,
  },
  bankCard: {
    width: CARD_WIDTH,
    height: 120,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bankName: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
    marginBottom: 8,
  },
  bankBalance: {
    fontSize: 24,
    fontWeight: '800',
  },
  bankIcon: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  addBankCard: {
    width: 100,
    height: 120,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  subscriptionContainer: {
    margin: 16,
    padding: 20,
    borderRadius: 24,
    gap: 12,
  },
  subscriptionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  subscriptionTotal: {
    fontSize: 16,
  },
  subscriptionLimit: {
    fontSize: 12,
    color: '#999',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  subsCount: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  movementsSection: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    color: '#0a7ea4',
    fontWeight: '700',
    fontSize: 14,
  },
  movementsList: {
    borderRadius: 24,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  movementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movementSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.03)',
    marginHorizontal: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

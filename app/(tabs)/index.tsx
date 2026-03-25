import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const dashboardBg = useThemeColor({ light: 'rgba(0,0,0,0.03)', dark: 'rgba(255,255,255,0.05)' }, 'background');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tus Balances Centralizados</ThemedText>
        <ThemedView style={[styles.dashboardCard, { backgroundColor: dashboardBg }]}>
          <ThemedView style={styles.dashboardItem}>
            <View style={[styles.iconDot, { backgroundColor: '#FDDA24' }]} />
            <ThemedText style={{ flex: 1 }}>Bancolombia</ThemedText>
            <ThemedText type="defaultSemiBold">$3,450,200</ThemedText>
          </ThemedView>
          <ThemedView style={styles.dashboardItem}>
            <View style={[styles.iconDot, { backgroundColor: '#D40073' }]} />
            <ThemedText style={{ flex: 1 }}>Nequi</ThemedText>
            <ThemedText type="defaultSemiBold">$120,450</ThemedText>
          </ThemedView>
          <ThemedView style={styles.dashboardItem}>
            <View style={[styles.iconDot, { backgroundColor: '#820AD1' }]} />
            <ThemedText style={{ flex: 1 }}>Nu Colombia</ThemedText>
            <ThemedText type="defaultSemiBold">$2,800,000</ThemedText>
          </ThemedView>
          <View style={styles.totalDivider} />
          <ThemedView style={styles.dashboardItem}>
            <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>Total Centralizado</ThemedText>
            <ThemedText type="title" style={{ fontSize: 22 }}>$6,370,650</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <ThemedText type="subtitle">Movimientos Recientes</ThemedText>
          <Link href="/transactions">
            <ThemedText style={{ color: '#0a7ea4', fontWeight: 'bold', fontSize: 13 }}>Ver todos</ThemedText>
          </Link>
        </View>
        <ThemedView style={styles.recentList}>
          <ThemedView style={styles.recentItem}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 69, 58, 0.1)' }]}>
              <Ionicons name="cafe-outline" size={18} color="#FF453A" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText type="defaultSemiBold">Starbucks</ThemedText>
              <ThemedText style={{ fontSize: 12, color: '#999' }}>Bancolombia • Hoy</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold">-$12,500</ThemedText>
          </ThemedView>
          <View style={styles.miniDivider} />
          <ThemedView style={styles.recentItem}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(50, 199, 89, 0.1)' }]}>
              <Ionicons name="arrow-down-circle-outline" size={18} color="#32C759" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText type="defaultSemiBold">Nequi Recibido</ThemedText>
              <ThemedText style={{ fontSize: 12, color: '#999' }}>Nequi • Hoy</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={{ color: '#32C759' }}>+$50,000</ThemedText>
          </ThemedView>
          <View style={styles.miniDivider} />
          <ThemedView style={styles.recentItem}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 69, 58, 0.1)' }]}>
              <Ionicons name="cart-outline" size={18} color="#FF453A" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemedText type="defaultSemiBold">Almacenes Éxito</ThemedText>
              <ThemedText style={{ fontSize: 12, color: '#999' }}>Nu • Hoy</ThemedText>
            </View>
            <ThemedText type="defaultSemiBold">-$85,000</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Vincular Nueva Entidad</ThemedText>
        <Link href="/vincula-entidad" asChild>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Añadir Banco o Neobanco</ThemedText>
          </TouchableOpacity>
        </Link>
        <ThemedText>
          Continúa expandiendo tu red financiera. Soporte para Bancolombia, Nequi, Davivienda, Nu y más.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'flex-start',
  },
  dashboardCard: {
    borderRadius: 16,
    padding: 16,
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  dashboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    gap: 10,
  },
  iconDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  totalDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 4,
  },
  recentList: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
});

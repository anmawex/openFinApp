import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const SETTINGS_OPTIONS = [
  { id: '1', title: 'Privacidad y Datos', subtitle: 'Gestiona permisos de bancos conectados', icon: 'lock-closed-outline', color: '#0a7ea4', href: '/privacidad-datos' },
  { id: '2', title: 'Detector de Suscripciones', subtitle: 'Revisa tus pagos automáticos', icon: 'notifications-outline', color: '#FF9500', href: '/detector-suscripciones' },
  { id: '3', title: 'Seguridad de la Cuenta', subtitle: 'Biometría y autenticación', icon: 'shield-checkmark-outline', color: '#32C759', href: '#' },
  { id: '4', title: 'Ayuda y Soporte', subtitle: '¿Tienes dudas sobre tus datos?', icon: 'help-circle-outline', color: '#5856D6', href: '#' },
];

export default function ExploreScreen() {
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1E1E1E' }, 'background');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310}
          color="#808080"
          name="settings-outline"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explorar y Configurar</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.headerDesc}>
        Personaliza tu experiencia y mantén el control total sobre tu información financiera.
      </ThemedText>

      <View style={styles.settingsList}>
        {SETTINGS_OPTIONS.map((option) => (
          <Link key={option.id} href={option.href as any} asChild>
            <TouchableOpacity style={[styles.settingItem, { backgroundColor: cardBg }]}>
              <View style={[styles.iconBox, { backgroundColor: option.color + '11' }]}>
                <Ionicons name={option.icon as any} size={22} color={option.color} />
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold">{option.title}</ThemedText>
                <ThemedText style={styles.settingSubtitle}>{option.subtitle}</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <View style={styles.infoCard}>
        <ThemedText type="defaultSemiBold">¿Cómo protegemos tus datos?</ThemedText>
        <ThemedText style={styles.infoText}>
          Tus datos viajan siempre encriptados. No tenemos acceso directo a tus claves bancarias; utilizamos estándares de banca abierta seguros (Open Banking).
        </ThemedText>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  headerDesc: {
    color: '#999',
    marginBottom: 24,
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  infoCard: {
    marginTop: 32,
    padding: 20,
    borderRadius: 24,
    backgroundColor: 'rgba(10, 126, 164, 0.05)',
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});

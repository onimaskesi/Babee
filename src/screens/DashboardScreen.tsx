import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { theme } from '../theme/theme';
import { Card } from '../components/common/Card';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useTranslation } from 'react-i18next';
import { useOnboardingStore } from '../store/onboardingStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { RESOURCE_TOPICS } from '../resources/topics';
import { askMe } from '../services/aiService';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

export const DashboardScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { t } = useTranslation();
  const {
    data: { babyName },
  } = useOnboardingStore();

  const [welcome, setWelcome] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const giveMeWelcome = async () => {
    setLoading(true);
    try {
      const answer = await askMe(t('dashboard.welcomePrompt'));
      const formatted = answer.replace(/! /, '\n');
      setWelcome(formatted);
    } catch (error) {
      console.log('giveMeWelcome error', error);
      setWelcome(t('dashboard.welcome'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    giveMeWelcome();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeWrapper}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.primary} />
          ) : (
            <>
              <Text style={styles.welcomeMessage}>{welcome}</Text>
            </>
          )}
        </View>

        <View style={styles.cardsWrapper}>
          <Card
            title={t('dashboard.personalizedResources')}
            description={t('dashboard.personalizedResourcesDesc', {
              name: babyName,
            })}
            icon={
              <Ionicons
                name="person-circle-outline"
                size={32}
                color={theme.primary}
              />
            }
            onPress={() =>
              navigation.navigate('Resources', {
                topic: RESOURCE_TOPICS.PERSONALIZED,
              })
            }
            style={styles.card}
          />

          <Card
            title={t('dashboard.aiAssistant')}
            description={t('dashboard.aiAssistantDesc')}
            icon={
              <Ionicons
                name="chatbubbles-outline"
                size={32}
                color={theme.primary}
              />
            }
            onPress={() => navigation.navigate('AIAssistant')}
            style={styles.card}
          />

          <Card
            title={t('dashboard.profile')}
            description={t('dashboard.profileDesc')}
            icon={
              <Ionicons name="person-outline" size={32} color={theme.primary} />
            }
            onPress={() => navigation.navigate('Profile')}
            style={styles.card}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingVertical: 24,
  },
  welcomeWrapper: {
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    color: theme.textPrimary,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  cardsWrapper: {
    gap: 18,
  },
  card: {
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
});

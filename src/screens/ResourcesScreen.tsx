import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { RootStackParamList } from '../navigation/types';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { useOnboardingStore } from '../store/onboardingStore';
import { fetchPersonalizedAdvice } from '../services/aiService';
import { Card } from '../components/common/Card';

type Props = NativeStackScreenProps<RootStackParamList, 'Resources'>;

export default function ResourcesScreen({ route }: Props) {
  const { t } = useTranslation();
  const { topic } = route.params;
  const data = useOnboardingStore(s => s.data);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [parsedAdvice, setParsedAdvice] = useState<
    { title: string; contents: string[] }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const [animationFinished, setAnimationFinished] = useState(false);
  const [isFetch, setIsFeth] = useState(false);

  useEffect(() => {
    if (isFetch && animationFinished) {
      setLoading(false);
    }
  }, [isFetch, animationFinished]);

  const parseAdvice = (text: string) => {
    const lines = text.split('\n').map(l => l.trim());

    const sections: { title: string; contents: string[] }[] = [];
    let currentSection: { title: string; contents: string[] } | null = null;

    for (const line of lines) {
      if (line.startsWith('**') && line.endsWith('**')) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: line.replace(/\*\*/g, '').trim(),
          contents: [],
        };
      } else if (line.length > 0) {
        if (currentSection) {
          currentSection.contents.push(line);
        }
      }
    }
    if (currentSection) {
      sections.push(currentSection);
    }
    return sections;
  };

  const [adviceResult, setAdviceResult] = useState();

  const loadPersonalized = useCallback(async () => {
    setError(null);
    setLoading(true);
    setIsFeth(false);
    try {
      const advice = await fetchPersonalizedAdvice(data, t);
      setAdviceResult(adviceResult);
      setParsedAdvice(parseAdvice(advice));
    } catch (e: any) {
      console.warn('ResourcesScreen: fetchPersonalizedAdvice failed', e);
      setError(t('aiService.noAdvice'));
      setParsedAdvice([]);
    } finally {
      setIsFeth(true);
    }
  }, [data, t]);

  useEffect(() => {
    if (topic === 'personalized') {
      loadPersonalized();
    } else {
      setParsedAdvice([]);
      setError(null);
    }
  }, [topic, loadPersonalized]);

  const onRefresh = async () => {
    if (topic === 'personalized') {
      setRefreshing(true);
      try {
        await loadPersonalized();
      } finally {
        setRefreshing(false);
      }
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <LottieView
          source={require('../assets/animations/mom-baby.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => setAnimationFinished(true)}
          style={styles.lottie}
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text variant="body" style={styles.errorText}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={parsedAdvice}
        keyExtractor={item => item.title}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text variant="body">{t('resources.noResources')}</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Card title={item.title} style={styles.card}>
            {item.contents.map((line, idx) => {
              const isBullet = line.startsWith('*  ');
              const contentText = isBullet ? line.slice(3).trim() : line;

              return isBullet ? (
                <View key={idx} style={styles.bulletRow}>
                  <View style={styles.bulletIcon} />
                  <Text style={[styles.contentText, styles.bulletText]}>
                    {contentText}
                  </Text>
                </View>
              ) : (
                <Text key={idx} style={styles.contentText}>
                  {contentText}
                </Text>
              );
            })}
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  listContent: { padding: 16, paddingBottom: 32 },
  resourceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.cardBackground || '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: theme.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceText: { flex: 1 },
  resourceTitle: { fontWeight: '700', color: theme.text },
  resourceDesc: {
    marginTop: 6,
    color: theme.textSecondary || theme.text,
    opacity: 0.8,
  },
  empty: { marginTop: 40, alignItems: 'center' },

  contentText: {
    marginBottom: 8,
    color: theme.text,
    fontSize: 15,
    lineHeight: 22,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 6,
  },
  bulletIcon: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.primary,
    marginTop: 8,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    color: theme.text,
    fontSize: 15,
    lineHeight: 22,
  },

  errorText: { color: theme.error },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },

  lottie: {
    width: '80%',
    height: '80%',
  },

  card: { marginBottom: 16 },
});

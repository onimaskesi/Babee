import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, AccessibilityInfo } from 'react-native';
import Slider from '@react-native-community/slider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { OnboardingScreenLayout } from '../../components/layouts/OnboardingScreenLayout';
import { useOnboardingStore } from '../../store/onboardingStore';
import { OnboardingStackParamList } from '../../navigation/types';
import { Text } from '../../components/common/Text';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'SleepIssues'>;
type RatingScale = 1 | 2 | 3 | 4 | 5;

export default function SleepIssuesScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const setField = useOnboardingStore((s) => s.setField);
  const stored = useOnboardingStore((s) => s.data.sleepIssues) as
    | RatingScale
    | undefined;
  const babyName = useOnboardingStore((s) => s.data.babyName);

  // Local slider numeric value (1..5). Default to stored or 3 (neutral).
  const [sliderVal, setSliderVal] = useState<number>(stored ?? 3);
  // Persisted value (RatingScale) — undefined until user confirms slidingComplete or stored exists.
  const [value, setValue] = useState<RatingScale | undefined>(stored);

  // Title uses interpolation with baby name or default fallback
  const title = t('onboarding.sleepIssues', {
    name: babyName || t('onboarding.defaultName'),
  });

  useEffect(() => {
    // if there is stored value, keep slider synced
    if (stored !== undefined) {
      setSliderVal(stored);
      setValue(stored);
    }
  }, [stored]);

  // descriptor text for current level (full description from i18n)
  const descriptor = (lvl: RatingScale) => t(`onboarding.ratingLabels.${lvl}`);

  const handleSlidingComplete = (val: number) => {
    const rounded = Math.round(val) as RatingScale;
    setSliderVal(rounded);
    setValue(rounded);
    // persist immediately so UX doesn't lose data if user navigates away
    setField('sleepIssues', rounded);
    // Announce selection for accessibility
    AccessibilityInfo.announceForAccessibility(
      t('onboarding.ratingSelectedAnnouncement', {
        level: rounded,
        description: descriptor(rounded),
      })
    );
  };

  const handleNext = () => {
    // If user never changed slider but stored exists, allow next
    const final = value ?? (Math.round(sliderVal) as RatingScale);
    setField('sleepIssues', final);
    navigation.navigate('FeedingType');
  };

  return (
    <OnboardingScreenLayout
      iconName="bed-outline"
      title={title}
      onButtonPress={handleNext}
      buttonDisabled={false} // slider always has a value, so allow continue
      onPressSkip={() => navigation.navigate('FeedingType')}
    >
      <View style={styles.wrapper}>
        {/* Big value circle and descriptor */}
        <View style={styles.topRow}>
          <View
            style={[
              styles.valueCircle,
              value ? styles.valueCircleActive : null,
            ]}
          >
            <Text
              variant="title"
              style={value ? styles.valueTextActive : styles.valueText}
            >
              {Math.round(sliderVal)}
            </Text>
          </View>
          <Text variant="body" style={styles.descriptorText}>
            {descriptor(Math.round(sliderVal) as RatingScale)}
          </Text>
        </View>

        {/* Slider with ticks and short labels */}
        <View style={styles.sliderBox}>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={1}
            value={sliderVal}
            onValueChange={(v) => setSliderVal(v)}
            onSlidingComplete={handleSlidingComplete}
            minimumTrackTintColor={theme.primary}
            maximumTrackTintColor="#e9e5ef"
            thumbTintColor={theme.primary}
            accessibilityLabel={t('onboarding.ratingAccessibility', {
              level: Math.round(sliderVal),
              description: descriptor(Math.round(sliderVal) as RatingScale),
            })}
          />

          {/* ticks */}
          <View style={styles.ticksRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <View
                key={n}
                style={[
                  styles.tick,
                  Math.round(sliderVal) >= n
                    ? styles.tickActive
                    : styles.tickInactive,
                ]}
              />
            ))}
          </View>

          {/* short labels under ticks (visual only) */}
          <View style={styles.labelsRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Text key={n} variant="caption" style={styles.tickLabel}>
                {t(`onboarding.ratingShort.${n}`)}
              </Text>
            ))}
          </View>
        </View>

        {/* helper hint */}
        <View style={styles.hintRow}>
          <MaterialCommunityIcons
            name="information-outline"
            size={16}
            color={theme.text}
          />
          <Text variant="caption" style={styles.hintText}>
            {t('onboarding.ratingHint')}
          </Text>
        </View>
      </View>
    </OnboardingScreenLayout>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  topRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  valueCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#ffffffcc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#e9e5ef',
    marginBottom: 10,
  },
  valueCircleActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
    shadowColor: theme.primary,
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  valueText: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.text,
  },
  valueTextActive: {
    color: '#fff',
  },
  descriptorText: {
    color: theme.text,
    opacity: 0.95,
    fontSize: 14,
  },

  sliderBox: {
    width: '100%',
    paddingHorizontal: 6,
  },
  slider: {
    width: '100%',
    height: 44,
  },
  ticksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginTop: Platform.OS === 'ios' ? -8 : -6,
  },
  tick: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e6e2ea',
  },
  tickActive: {
    backgroundColor: theme.primary,
  },
  tickInactive: {
    backgroundColor: '#e6e2ea',
  },
  labelsRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tickLabel: {
    width: '20%',
    textAlign: 'center',
    color: theme.text,
    opacity: 0.9,
    fontSize: 12,
  },

  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  hintText: {
    marginLeft: 8,
    color: theme.text,
    opacity: 0.85,
  },
});

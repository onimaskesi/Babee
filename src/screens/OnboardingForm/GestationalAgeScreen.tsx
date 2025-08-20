import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { OnboardingScreenLayout } from '../../components/layouts/OnboardingScreenLayout';
import { useOnboardingStore } from '../../store/onboardingStore';
import { OnboardingStackParamList } from '../../navigation/types';
import { Text } from '../../components/common/Text';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'GestationalAge'>;

export default function GestationalAgeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const setField = useOnboardingStore((state) => state.setField);
  const gestationalAgeFromStore = useOnboardingStore(
    (state) => state.data.gestationalAgeAtBirth
  );

  const babyName = useOnboardingStore((state) => state.data.babyName);
  const title = t('onboarding.gestationalAge', {
    name: babyName || t('onboarding.defaultName'),
  });

  const [weeks, setWeeks] = useState<string>(
    gestationalAgeFromStore !== undefined ? String(gestationalAgeFromStore) : ''
  );

  const isValidWeeks = () => {
    const num = Number(weeks);
    return num >= 20 && num <= 45; // realistic range for gestational age in weeks
  };

  const handleNext = () => {
    if (isValidWeeks()) {
      setField('gestationalAgeAtBirth', Number(weeks));
      navigation.navigate('SleepIssues');
    }
  };

  const onPressSkip = () => {
    navigation.navigate('SleepIssues');
  };

  return (
    <OnboardingScreenLayout
      iconName="calendar-clock"
      title={title}
      onButtonPress={handleNext}
      buttonDisabled={!isValidWeeks()}
      onPressSkip={onPressSkip}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={weeks}
          onChangeText={setWeeks}
          keyboardType="numeric"
          maxLength={2}
          style={styles.input}
          placeholder={t('onboarding.gestationalAgePlaceholder')}
          placeholderTextColor="#999"
          returnKeyType="done"
        />
      </View>
    </OnboardingScreenLayout>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  input: {
    fontSize: 16,
    color: theme.text,
  },
});

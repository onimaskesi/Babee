import React, { useState } from 'react';
import { TextInput, View, Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { OnboardingScreenLayout } from '../../components/layouts/OnboardingScreenLayout';
import { useOnboardingStore } from '../../store/onboardingStore';
import { OnboardingStackParamList } from '../../navigation/types';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BabyName'>;

export default function BabyNameScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const setField = useOnboardingStore((state) => state.setField);
  const babyNameFromStore = useOnboardingStore((state) => state.data.babyName);
  const [babyName, setBabyName] = useState(babyNameFromStore || '');

  const handleNext = () => {
    setField('babyName', babyName.trim());
    navigation.navigate('BirthDate');
  };

  return (
    <OnboardingScreenLayout
      iconName="baby-face-outline"
      titleKey="onboarding.babyName"
      onButtonPress={handleNext}
      buttonDisabled={babyName.trim().length === 0}
    >
      <View style={styles.inputContainer}>
        <TextInput
          value={babyName}
          onChangeText={setBabyName}
          style={styles.input}
          maxLength={30}
          autoCapitalize="words"
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

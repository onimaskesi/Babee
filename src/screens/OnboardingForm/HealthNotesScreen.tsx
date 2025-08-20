import React, { useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { OnboardingScreenLayout } from '../../components/layouts/OnboardingScreenLayout';
import { OnboardingStackParamList } from '../../navigation/types';
import { useOnboardingStore } from '../../store/onboardingStore';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'HealthNotes'>;

export default function HealthNotesScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const setField = useOnboardingStore((state) => state.setField);
  const healthNotesFromStore = useOnboardingStore(
    (state) => state.data.healthNotes
  );

  const babyName = useOnboardingStore((state) => state.data.babyName);
  const title = t('onboarding.healthNotes', {
    name: babyName || t('onboarding.defaultName'),
  });

  const [healthNotes, setHealthNotes] = useState(healthNotesFromStore || '');

  const handleFinish = () => {
    useOnboardingStore.getState().setCompleted(true);
    navigation.replace('Dashboard');
  };

  const handleNext = () => {
    setField('healthNotes', healthNotes.trim());
    handleFinish();
  };

  const onPressSkip = () => {
    handleFinish();
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <OnboardingScreenLayout
        iconName="notebook-outline"
        title={title}
        onButtonPress={handleNext}
        buttonDisabled={healthNotes.trim().length === 0}
        onPressSkip={onPressSkip}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={healthNotes}
            onChangeText={setHealthNotes}
            multiline
            numberOfLines={6}
            style={styles.input}
          />
        </View>
      </OnboardingScreenLayout>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    textAlignVertical: 'top',
    color: theme.text,
  },
  inputContainer: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    borderWidth: 1,
    borderColor: theme.primary,
  },
});

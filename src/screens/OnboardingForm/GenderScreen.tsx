import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { OnboardingScreenLayout } from '../../components/layouts/OnboardingScreenLayout';
import { useOnboardingStore } from '../../store/onboardingStore';
import { OnboardingStackParamList } from '../../navigation/types';
import { Text } from '../../components/common/Text';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Gender'>;

type GenderType = 'male' | 'female';

export default function GenderScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const setField = useOnboardingStore((state) => state.setField);
  const genderFromStore = useOnboardingStore((state) => state.data.gender);
  const [selectedGender, setSelectedGender] = useState<GenderType | undefined>(
    genderFromStore
  );

  const babyName = useOnboardingStore((state) => state.data.babyName);
  const title = t('onboarding.gender', {
    name: babyName || t('onboarding.defaultName'),
  });

  const handleNext = () => {
    if (selectedGender) {
      setField('gender', selectedGender);
      navigation.navigate('GestationalAge');
    }
  };

  return (
    <OnboardingScreenLayout
      iconName="gender-male-female"
      title={title}
      onButtonPress={handleNext}
      buttonDisabled={!selectedGender}
    >
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === 'male' && styles.optionSelected,
          ]}
          onPress={() => setSelectedGender('male')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="gender-male"
            size={48}
            color={theme.primary}
          />
          <Text style={styles.optionText}>{t('gender.male')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === 'female' && styles.optionSelected,
          ]}
          onPress={() => setSelectedGender('female')}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="gender-female"
            size={48}
            color={theme.primary}
          />
          <Text style={styles.optionText}>{t('gender.female')}</Text>
        </TouchableOpacity>
      </View>
    </OnboardingScreenLayout>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    width: 140,
  },
  optionSelected: {
    borderColor: theme.primary,
    backgroundColor: theme.secondary,
  },
  optionText: {
    marginTop: 12,
    fontSize: 18,
    color: theme.text,
    fontWeight: '600',
  },
});

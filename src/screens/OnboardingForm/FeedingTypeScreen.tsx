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

type Props = NativeStackScreenProps<OnboardingStackParamList, 'FeedingType'>;

const feedingOptions = [
  {
    key: 'breast',
    labelKey: 'onboarding.feedingTypeBreast',
    icon: 'mother-nurse',
  },
  {
    key: 'formula',
    labelKey: 'onboarding.feedingTypeFormula',
    icon: 'baby-bottle-outline',
  },
  { key: 'mixed', labelKey: 'onboarding.feedingTypeMixed', icon: 'cup-water' },
];

export default function FeedingTypeScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const setField = useOnboardingStore((state) => state.setField);
  const feedingTypeFromStore = useOnboardingStore(
    (state) => state.data.feedingType
  );

  const babyName = useOnboardingStore((state) => state.data.babyName);
  const title = t('onboarding.feedingType', {
    name: babyName || t('onboarding.defaultName'),
  });

  const [selected, setSelected] = useState<string | undefined>(
    feedingTypeFromStore
  );

  const handleNext = () => {
    if (selected) {
      setField('feedingType', selected as 'breast' | 'formula' | 'mixed');
      navigation.navigate('MilkSupply');
    }
  };

  const onPressSkip = () => {
    navigation.navigate('MilkSupply');
  };

  return (
    <OnboardingScreenLayout
      iconName="food-apple-outline"
      title={title}
      onButtonPress={handleNext}
      buttonDisabled={!selected}
      onPressSkip={onPressSkip}
    >
      <View style={styles.optionsContainer}>
        {feedingOptions.map(({ key, labelKey, icon }) => (
          <TouchableOpacity
            key={key}
            style={[styles.option, selected === key && styles.optionSelected]}
            onPress={() => setSelected(key)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={icon}
              size={48}
              color={theme.primary}
            />
            <Text style={styles.optionText}>{t(labelKey)}</Text>
          </TouchableOpacity>
        ))}
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
    width: 110,
  },
  optionSelected: {
    borderColor: theme.primary,
    backgroundColor: theme.secondary,
  },
  optionText: {
    marginTop: 12,
    fontSize: 14,
    color: theme.text,
    fontWeight: '600',
    textAlign: 'center',
  },
});

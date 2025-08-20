import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import DateTimePicker from '@react-native-community/datetimepicker';

import { OnboardingScreenLayout } from '../../components/layouts/OnboardingScreenLayout';
import { useOnboardingStore } from '../../store/onboardingStore';
import { OnboardingStackParamList } from '../../navigation/types';
import { Text } from '../../components/common/Text';
import { theme } from '../../theme/theme';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BirthDate'>;

export default function BirthDateScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const setField = useOnboardingStore((state) => state.setField);
  const birthDateFromStore = useOnboardingStore(
    (state) => state.data.birthDate
  );
  const babyName = useOnboardingStore((state) => state.data.babyName);

  const birthDateTitle = t('onboarding.birthDate', {
    name: babyName || t('onboarding.defaultName'),
  });

  const initialDate = birthDateFromStore
    ? new Date(birthDateFromStore)
    : new Date();
  const [date, setDate] = useState<Date>(initialDate);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleNext = () => {
    setField('birthDate', date);
    navigation.navigate('Gender');
  };

  return (
    <OnboardingScreenLayout
      iconName="calendar-blank-outline"
      titleKey={birthDateTitle}
      onButtonPress={handleNext}
    >
      <View style={styles.dateContainer}>
        <Text onPress={() => setShowPicker(true)} style={styles.dateText}>
          {date.toLocaleDateString()}
        </Text>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    </OnboardingScreenLayout>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: '#ffffffcc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  dateText: {
    fontSize: 16,
    color: theme.text,
  },
});

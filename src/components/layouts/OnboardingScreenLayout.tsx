// src/components/layouts/OnboardingScreenLayout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import { Button } from '../../components/common/Button';
import { Text } from '../../components/common/Text';
import { theme } from '../../theme/theme';

type Props = {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  titleKey?: string; // translation key
  title?: string; // or custom title string
  onButtonPress: () => void;
  buttonDisabled?: boolean;
  children: React.ReactNode;
  onPressSkip?: () => void;
};

export function OnboardingScreenLayout({
  iconName,
  titleKey,
  title,
  onButtonPress,
  buttonDisabled = false,
  children,
  onPressSkip,
}: Props) {
  const { t } = useTranslation();

  // If title prop is passed, use it; else use translation from titleKey
  const screenTitle = title || (titleKey ? t(titleKey) : '');

  return (
    <LinearGradient
      colors={[theme.background, theme.secondary]}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={80}
            color={theme.primary}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{screenTitle}</Text>

        {/* Content */}
        <View style={styles.content}>{children}</View>

        {/* Button */}
        <Button
          title={t('general.next')}
          onPress={onButtonPress}
          disabled={buttonDisabled}
          style={styles.button}
        />
        {onPressSkip && (
          <Button
            title={t('general.skip')}
            onPress={onPressSkip}
            style={styles.button}
            buttonTheme="link"
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  content: {
    marginBottom: 40,
  },
  button: {
    // optional button styling if needed
  },
});

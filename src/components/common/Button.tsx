import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../../theme/theme';
type CommonButtonStyles = {
  button: ViewStyle;
  buttonEnabled: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonPressed: ViewStyle;
  content: ViewStyle;
  iconWrapper: ViewStyle;
  text: TextStyle;
};

const commonStyles = StyleSheet.create<CommonButtonStyles>({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEnabled: {
    backgroundColor: theme.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.primary,
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 8,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

type ButtonTheme = 'primary' | 'link';
type ButtonStylesMap = Record<ButtonTheme, typeof commonStyles>;

// Style variants
const primaryStyles: typeof commonStyles = {
  ...commonStyles,
};

const linkStyles: typeof commonStyles = {
  ...commonStyles,
  buttonEnabled: {},
  text: {
    ...commonStyles.text,
    color: theme.primary,
  },
};

// Final map
const allStyles: ButtonStylesMap = {
  primary: primaryStyles,
  link: linkStyles,
};

type ButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  icon?: React.ReactNode;
  buttonTheme?: ButtonTheme;
};

export const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  buttonTheme = 'primary',
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const styles = allStyles[buttonTheme]

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        isDisabled ? styles.buttonDisabled : styles.buttonEnabled,
        pressed && !isDisabled ? styles.buttonPressed : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.iconWrapper}>{icon}</View>}
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

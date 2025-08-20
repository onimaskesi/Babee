import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Pressable,
  GestureResponderEvent,
  StyleProp,
} from 'react-native';
import { theme } from '../../theme/theme';

type CardStyles = {
  container: ViewStyle;
  header: ViewStyle;
  iconContainer: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  body: ViewStyle;
  row: ViewStyle;
};

const styles = StyleSheet.create<CardStyles>({
  container: {
    backgroundColor: theme.cardBackground || '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconContainer: {
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  description: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 8,
  },
  body: {
    marginTop: 6,
  },
});

type CardProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export const Card = ({
  title,
  description,
  icon,
  children,
  style,
  contentContainerStyle,
  titleStyle,
  descriptionStyle,
  onPress,
  disabled,
}: CardProps) => {
  const Content = () => (
    <View style={contentContainerStyle}>
      {(title || icon) && (
        <View style={styles.row}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
        </View>
      )}
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}
      <View style={styles.body}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.container,
          style,
          pressed && !disabled && { opacity: 0.75 },
          disabled && { opacity: 0.5 },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Content />
      </Pressable>
    );
  }

  return <View style={[styles.container, style]}>{Content()}</View>;
};

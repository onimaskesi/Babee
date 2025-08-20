import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

type Variant = 'title' | 'subtitle' | 'body' | 'caption';

type Props = TextProps & {
  variant?: Variant;
  children: React.ReactNode;
};1

export const Text = ({ variant = 'body', style, children, ...rest }: Props) => {
  return (
    <RNText style={[styles[variant], style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.text,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.text,
  },
  body: {
    fontSize: 16,
    color: theme.text,
  },
  caption: {
    fontSize: 12,
    color: theme.text,
  },
});

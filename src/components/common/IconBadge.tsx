import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme/theme';

type Props = {
  label: string; // e.g. emoji, harf veya kısa metin
  size?: number;
  backgroundColor?: string;
  color?: string;
};

export const IconBadge = ({
  label,
  size = 64,
  backgroundColor = theme.primary,
  color = '#fff',
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
      ]}
    >
      <Text style={[styles.text, { color, fontSize: size / 2 }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  text: {
    fontWeight: '700',
  },
});

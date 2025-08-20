import React from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from './Button'; // Önceden oluşturduğumuz Button component
import { theme } from '../../theme/theme';

type Option = {
  key: string | number;
  label: string;
  iconName: string;
  iconColor?: string;
  value: any;
};

type Props = {
  options: Option[];
  selectedValue: any;
  onSelect: (value: any) => void;
  style?: object;
};

export function SelectableButtonGroup({
  options,
  selectedValue,
  onSelect,
  style,
}: Props) {
  return (
    <View style={[styles.container, style]}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <Button
            key={option.key}
            title={option.label}
            icon={
              <MaterialCommunityIcons
                name={option.iconName}
                size={24}
                color={isSelected ? '#fff' : option.iconColor || theme.primary}
              />
            }
            onPress={() => onSelect(option.value)}
            disabled={isSelected}
            style={[styles.button, isSelected && styles.selectedButton]}
            textStyle={isSelected ? styles.selectedText : undefined}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    borderColor: theme.primary,
    backgroundColor: '#ffffffcc',
  },
  selectedButton: {
    backgroundColor: theme.primary,
  },
  selectedText: {
    color: '#fff',
  },
});

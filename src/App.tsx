import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from './navigation/AppStackNavigator';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </I18nextProvider>
  );
}

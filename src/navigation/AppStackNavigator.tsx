import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingStackNavigator from './OnboardingStackNavigator';
import { DashboardScreen } from '../screens/DashboardScreen';
import { AppStackParamList } from './types';
import { useOnboardingStore } from '../store/onboardingStore';
import ResourcesScreen from '../screens/ResourcesScreen';
import { AIAssistantScreen } from '../screens/AIAssistantScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStackNavigator() {
  const onboardingCompleted = useOnboardingStore(state => state.completed);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      initialRouteName={onboardingCompleted ? 'Dashboard' : 'OnboardingStack'}
    >
      <Stack.Screen
        name="OnboardingStack"
        component={OnboardingStackNavigator}
      />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen
        name="Resources"
        component={ResourcesScreen}
        options={{ title: 'Resources' }}
      />
      <Stack.Screen
        name="AIAssistant"
        component={AIAssistantScreen}
        options={{ title: 'Resources' }}
      />
    </Stack.Navigator>
  );
}

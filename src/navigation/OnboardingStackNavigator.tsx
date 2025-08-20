import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './types';

import BabyNameScreen from '../screens/OnboardingForm/BabyNameScreen';
import BirthDateScreen from '../screens/OnboardingForm/BirthDateScreen';
import GenderScreen from '../screens/OnboardingForm/GenderScreen';
import GestationalAgeScreen from '../screens/OnboardingForm/GestationalAgeScreen';
import SleepIssuesScreen from '../screens/OnboardingForm/SleepIssuesScreen';
import MilkSupplyScreen from '../screens/OnboardingForm/MilkSupplyScreen';
import BreastfeedingPainScreen from '../screens/OnboardingForm/BreastfeedingPainScreen';
import MoodIssuesScreen from '../screens/OnboardingForm/MoodIssuesScreen';
import HealthNotesScreen from '../screens/OnboardingForm/HealthNotesScreen';
import FeedingTypeScreen from '../screens/OnboardingForm/FeedingTypeScreen';
import DashboardScreen from '@/screens/DashboardScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BabyName"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="BabyName" component={BabyNameScreen} />
      <Stack.Screen name="BirthDate" component={BirthDateScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="GestationalAge" component={GestationalAgeScreen} />
      <Stack.Screen name="SleepIssues" component={SleepIssuesScreen} />
      <Stack.Screen name="FeedingType" component={FeedingTypeScreen} />
      <Stack.Screen name="MilkSupply" component={MilkSupplyScreen} />
      <Stack.Screen
        name="BreastfeedingPain"
        component={BreastfeedingPainScreen}
      />
      <Stack.Screen name="MoodIssues" component={MoodIssuesScreen} />
      <Stack.Screen name="HealthNotes" component={HealthNotesScreen} />
    </Stack.Navigator>
  );
}

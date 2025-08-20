export type OnboardingStackParamList = {
  BabyName: undefined;
  BirthDate: undefined;
  Gender: undefined;
  GestationalAge: undefined;
  SleepIssues: undefined;
  MilkSupply: undefined;
  BreastfeedingPain: undefined;
  MoodIssues: undefined;
  HealthNotes: undefined;
  FeedingType: undefined;
};

export type ResourceTopic =
  | 'all'
  | 'personalized'
  | 'milkSupply'
  | 'sleep'
  | 'lactation'
  | 'breastfeeding'
  | 'formula'
  | 'skinToSkin';

export type AppStackParamList = {
  OnboardingStack: undefined;
  Dashboard: undefined;
  Resources: { topic: ResourceTopic };
  AIAssistant: undefined;
  Profile: undefined;
  Premium: undefined;
};

export type RootStackParamList = AppStackParamList;

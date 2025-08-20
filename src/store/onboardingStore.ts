import { create } from 'zustand';

type Gender = 'male' | 'female';
type FeedingType = 'breast' | 'formula' | 'mixed';
type RatingScale = 1 | 2 | 3 | 4 | 5;

export type OnboardingData = {
  babyName?: string;
  birthDate?: Date;
  gender?: Gender;
  gestationalAgeAtBirth?: number;
  sleepIssues?: RatingScale;
  feedingType?: FeedingType;
  milkSupplyConcern?: RatingScale;
  breastfeedingPain?: RatingScale;
  moodIssues?: RatingScale;
  healthNotes?: string;
};

export type OnboardingStore = {
  data: OnboardingData;
  completed: boolean; // onboarding tamamlandı mı?
  setField: <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => void;
  setCompleted: (completed: boolean) => void; // tamamlanma durumu
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  data: {},
  completed: false,
  setField: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [field]: value,
      },
    })),
  setCompleted: (completed) => set({ completed }),
  reset: () => set({ data: {}, completed: false }),
}));

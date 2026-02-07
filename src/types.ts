export type AgeGroup = '4-6' | '7-9' | '10-12';

export type Story = {
  id: string;
  title: string;
  ageGroup: AgeGroup;
  summary: string;
  moral: string;
  vocabulary: { term: string; pronunciation: string; meaning: string }[];
};

export type GameKind = 'match-cards' | 'timeline-puzzle' | 'temple-quest';

export type ChildProfile = {
  id: string;
  name: string;
  age: number;
  ageGroup: AgeGroup;
  points: number;
  stars: number;
  badges: string[];
  streakDays: number;
  storiesCompleted: number;
  gamesPlayed: number;
  minutesLearned: number;
};

export type ParentControls = {
  gamesEnabled: boolean;
  audioEnabled: boolean;
  dailyMinutesLimit: number;
  contentLockByAge: boolean;
  progressionMode: 'auto' | 'parent-controlled';
};

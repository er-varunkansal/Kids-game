import { ChildProfile, ParentControls, Story } from './types';

export const parentPin = '1080';

export const starterProfiles: ChildProfile[] = [
  {
    id: 'child-1',
    name: 'Aarav',
    age: 6,
    ageGroup: '4-6',
    points: 120,
    stars: 8,
    badges: ['Listener'],
    streakDays: 3,
    storiesCompleted: 5,
    gamesPlayed: 7,
    minutesLearned: 58
  },
  {
    id: 'child-2',
    name: 'Diya',
    age: 10,
    ageGroup: '10-12',
    points: 240,
    stars: 15,
    badges: ['Puzzle Pro', 'Temple Explorer'],
    streakDays: 5,
    storiesCompleted: 9,
    gamesPlayed: 12,
    minutesLearned: 101
  }
];

export const defaultControls: ParentControls = {
  gamesEnabled: true,
  audioEnabled: true,
  dailyMinutesLimit: 45,
  contentLockByAge: true,
  progressionMode: 'auto'
};

export const stories: Story[] = [
  {
    id: 'krishna-butter',
    title: 'Krishna and the Butter Pot',
    ageGroup: '4-6',
    summary: 'Little Krishna loves butter and teaches that sharing joy brings smiles to everyone.',
    moral: 'Joy grows when we share.',
    vocabulary: [{ term: 'Krishna', pronunciation: 'Krish-na', meaning: 'A loving and playful form of Vishnu.' }]
  },
  {
    id: 'rama-bridge',
    title: 'Rama Builds the Bridge',
    ageGroup: '7-9',
    summary: 'Rama and friends build a bridge to Lanka through teamwork and trust.',
    moral: 'Big goals need teamwork.',
    vocabulary: [{ term: 'Hanuman', pronunciation: 'Ha-nu-maan', meaning: 'A brave and devoted helper of Rama.' }]
  },
  {
    id: 'gita-choice',
    title: 'Arjuna Learns Courage',
    ageGroup: '10-12',
    summary: 'Krishna guides Arjuna to make wise choices with calm focus and duty.',
    moral: 'Think clearly before action.',
    vocabulary: [{ term: 'Arjuna', pronunciation: 'Ar-jun-a', meaning: 'A skilled archer in the Mahabharata.' }]
  }
];

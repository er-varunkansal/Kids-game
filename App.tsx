import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import { defaultControls, parentPin, starterProfiles, stories } from './src/content';
import { ChildProfile, ParentControls, GameKind } from './src/types';

type Mode = 'child-home' | 'stories' | 'games' | 'quests' | 'parent-lock' | 'parent-dashboard';

const gameLabels: Record<GameKind, string> = {
  'match-cards': 'Match Cards: Gods, symbols, and stories',
  'timeline-puzzle': 'Timeline Puzzle: Put epic events in order',
  'temple-quest': 'Temple Quest Map: Explore sacred places'
};

export default function App() {
  const [profiles, setProfiles] = useState<ChildProfile[]>(starterProfiles);
  const [activeProfileId, setActiveProfileId] = useState(starterProfiles[0]?.id ?? '');
  const [controls, setControls] = useState<ParentControls>(defaultControls);
  const [mode, setMode] = useState<Mode>('child-home');
  const [pinDraft, setPinDraft] = useState('');
  const [pinError, setPinError] = useState('');

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0],
    [profiles, activeProfileId]
  );

  const ageStories = useMemo(
    () => stories.filter((story) => story.ageGroup === activeProfile?.ageGroup),
    [activeProfile]
  );

  const toggleControl = <K extends keyof ParentControls>(key: K, value: ParentControls[K]) => {
    setControls((prev) => ({ ...prev, [key]: value }));
  };

  const completeStory = () => {
    if (!activeProfile) return;
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === activeProfile.id
          ? {
              ...profile,
              storiesCompleted: profile.storiesCompleted + 1,
              points: profile.points + 20,
              stars: profile.stars + 1
            }
          : profile
      )
    );
  };

  const registerGamePlay = () => {
    if (!activeProfile) return;
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === activeProfile.id
          ? {
              ...profile,
              gamesPlayed: profile.gamesPlayed + 1,
              points: profile.points + 15
            }
          : profile
      )
    );
  };

  if (!activeProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>No profiles found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>My Mythology World</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Choose Profile</Text>
          <View style={styles.rowWrap}>
            {profiles.map((profile) => (
              <Pressable
                key={profile.id}
                style={[styles.chip, profile.id === activeProfile.id && styles.chipActive]}
                onPress={() => {
                  setActiveProfileId(profile.id);
                  setMode('child-home');
                }}>
                <Text style={styles.chipText}>
                  {profile.name} ({profile.ageGroup})
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.meta}>
            Points {activeProfile.points} • Stars {activeProfile.stars} • Streak {activeProfile.streakDays} days
          </Text>
        </View>

        {mode === 'child-home' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Learn through play</Text>
            <Pressable style={styles.button} onPress={() => setMode('stories')}>
              <Text style={styles.buttonText}>Stories</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setMode('games')}>
              <Text style={styles.buttonText}>Games</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setMode('quests')}>
              <Text style={styles.buttonText}>Temple Quest</Text>
            </Pressable>
            <Pressable style={styles.parentButton} onPress={() => setMode('parent-lock')}>
              <Text style={styles.buttonText}>Parent Mode</Text>
            </Pressable>
          </View>
        )}

        {mode === 'stories' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Stories for age {activeProfile.ageGroup}</Text>
            {ageStories.map((story) => (
              <View key={story.id} style={styles.storyCard}>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.meta}>{story.summary}</Text>
                <Text style={styles.meta}>Moral: {story.moral}</Text>
                <Text style={styles.meta}>Tap pronunciation: {story.vocabulary[0]?.term} ({story.vocabulary[0]?.pronunciation})</Text>
              </View>
            ))}
            <Pressable style={styles.button} onPress={completeStory}>
              <Text style={styles.buttonText}>Mark story complete (+20 points)</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => setMode('child-home')}>
              <Text>Back</Text>
            </Pressable>
          </View>
        )}

        {mode === 'games' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Mini-Games</Text>
            {(Object.keys(gameLabels) as GameKind[]).map((gameKey) => (
              <View key={gameKey} style={styles.storyCard}>
                <Text style={styles.storyTitle}>{gameLabels[gameKey]}</Text>
              </View>
            ))}
            <Pressable style={styles.button} onPress={registerGamePlay}>
              <Text style={styles.buttonText}>Log game played (+15 points)</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => setMode('child-home')}>
              <Text>Back</Text>
            </Pressable>
          </View>
        )}

        {mode === 'quests' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Temple Quest Map</Text>
            <Text style={styles.meta}>Region 1: Ayodhya - short story unlocked</Text>
            <Text style={styles.meta}>Region 2: Mathura - complete challenge to unlock</Text>
            <Text style={styles.meta}>Region 3: Rameswaram - fun fact awaits</Text>
            <Pressable style={styles.secondaryButton} onPress={() => setMode('child-home')}>
              <Text>Back</Text>
            </Pressable>
          </View>
        )}

        {mode === 'parent-lock' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Parent Access</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 4-digit PIN"
              keyboardType="number-pad"
              secureTextEntry
              value={pinDraft}
              onChangeText={setPinDraft}
            />
            {pinError ? <Text style={styles.error}>{pinError}</Text> : null}
            <Pressable
              style={styles.button}
              onPress={() => {
                if (pinDraft === parentPin) {
                  setPinError('');
                  setPinDraft('');
                  setMode('parent-dashboard');
                } else {
                  setPinError('Incorrect PIN');
                }
              }}>
              <Text style={styles.buttonText}>Unlock Parent Dashboard</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => setMode('child-home')}>
              <Text>Cancel</Text>
            </Pressable>
          </View>
        )}

        {mode === 'parent-dashboard' && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Parent Dashboard</Text>
            {profiles.map((profile) => (
              <View key={profile.id} style={styles.storyCard}>
                <Text style={styles.storyTitle}>{profile.name}</Text>
                <Text style={styles.meta}>
                  Stories {profile.storiesCompleted} • Games {profile.gamesPlayed} • Minutes {profile.minutesLearned}
                </Text>
                <Text style={styles.meta}>Strength: Listening • Focus area: Timeline order</Text>
              </View>
            ))}

            <View style={styles.controlRow}>
              <Text style={styles.meta}>Enable Games</Text>
              <Switch value={controls.gamesEnabled} onValueChange={(value) => toggleControl('gamesEnabled', value)} />
            </View>
            <View style={styles.controlRow}>
              <Text style={styles.meta}>Enable Audio</Text>
              <Switch value={controls.audioEnabled} onValueChange={(value) => toggleControl('audioEnabled', value)} />
            </View>
            <View style={styles.controlRow}>
              <Text style={styles.meta}>Lock by age</Text>
              <Switch
                value={controls.contentLockByAge}
                onValueChange={(value) => toggleControl('contentLockByAge', value)}
              />
            </View>
            <Pressable style={styles.secondaryButton} onPress={() => setMode('child-home')}>
              <Text>Exit Parent Mode</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9EF' },
  scroll: { padding: 16, gap: 14 },
  title: { fontSize: 30, fontWeight: '800', color: '#6F3C11', textAlign: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, gap: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#2D2A26' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#FEEFCF', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 8 },
  chipActive: { backgroundColor: '#FFC95C' },
  chipText: { fontWeight: '600' },
  button: { backgroundColor: '#3D84F5', borderRadius: 12, padding: 12, alignItems: 'center' },
  parentButton: { backgroundColor: '#6A5ACD', borderRadius: 12, padding: 12, alignItems: 'center' },
  secondaryButton: { backgroundColor: '#ECECEC', borderRadius: 12, padding: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
  meta: { color: '#514F4C' },
  storyCard: { borderWidth: 1, borderColor: '#EFEAE0', borderRadius: 12, padding: 10, gap: 4 },
  storyTitle: { fontWeight: '700' },
  input: {
    borderWidth: 1,
    borderColor: '#E0D8CC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF'
  },
  error: { color: '#B42318' },
  controlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});

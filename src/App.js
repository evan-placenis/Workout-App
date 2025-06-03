import React, { useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles/AppStyles';
import LogWorkoutScreen from './screens/LogWorkoutScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [userSettings, setUserSettings] = useState({
    units: 'lbs',
    trainingFocus: 'strength',
    notifications: true,
    autoIncrement: false,
    restTimer: true,
    weeklyGoal: 3,
    experience: 'intermediate'
  });

  const handleViewProgress = () => {
    console.log('View Progress pressed');
    setCurrentScreen('progress');
  };

  const handleLogWorkout = () => {
    console.log('Log Workout pressed');
    setCurrentScreen('logWorkout');
  };

  const handleTalkToAI = () => {
    console.log('Talk to AI pressed');
    // TODO: Navigate to AI Chat screen in next stage
  };

  const handleProfile = () => {
    console.log('Profile pressed');
    setCurrentScreen('profile');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleSaveWorkout = (workoutData) => {
    setWorkouts(prev => [...prev, workoutData]);
    console.log('All workouts:', [...workouts, workoutData]);
    setCurrentScreen('home');
  };

  const handleSaveSettings = (newSettings) => {
    setUserSettings(newSettings);
    console.log('Settings saved:', newSettings);
  };

  if (currentScreen === 'logWorkout') {
    return (
      <LogWorkoutScreen 
        onBack={handleBackToHome}
        onSave={handleSaveWorkout}
      />
    );
  }

  if (currentScreen === 'progress') {
    return (
      <ProgressScreen 
        workouts={workouts}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen 
        userSettings={userSettings}
        onBack={handleBackToHome}
        onSaveSettings={handleSaveSettings}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>💪</Text>
          <Text style={styles.title}>Gym Assistant</Text>
        </View>
        <Text style={styles.subtitle}>Your AI-powered workout companion</Text>
        {workouts.length > 0 && (
          <View style={styles.statsBadge}>
            <Text style={styles.workoutCount}>
              {workouts.length} workout{workouts.length !== 1 ? 's' : ''} logged
            </Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.progressButton]} onPress={handleViewProgress}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>📊</Text>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>View Progress</Text>
              <Text style={styles.buttonSubtext}>Track your strength gains</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logButton]} onPress={handleLogWorkout}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>💪</Text>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Log Workout</Text>
              <Text style={styles.buttonSubtext}>Record sets, reps & weight</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.aiButton]} onPress={handleTalkToAI}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>🤖</Text>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Talk to AI</Text>
              <Text style={styles.buttonSubtext}>Get workout advice</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.profileButton]} onPress={handleProfile}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonIcon}>⚙️</Text>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Profile & Settings</Text>
              <Text style={styles.buttonSubtext}>Goals, units & preferences</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ready to crush your next workout?</Text>
      </View>
    </SafeAreaView>
  );
} 
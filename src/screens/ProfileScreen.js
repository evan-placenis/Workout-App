import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../styles/ProfileStyles';

export default function ProfileScreen({ onBack, userSettings, onSaveSettings }) {
  const [settings, setSettings] = useState({
    units: userSettings?.units || 'lbs',
    trainingFocus: userSettings?.trainingFocus || 'strength',
    notifications: userSettings?.notifications || true,
    autoIncrement: userSettings?.autoIncrement || false,
    restTimer: userSettings?.restTimer || true,
    weeklyGoal: userSettings?.weeklyGoal || 3,
    experience: userSettings?.experience || 'intermediate',
    ...userSettings
  });

  const handleSave = () => {
    onSaveSettings && onSaveSettings(settings);
    Alert.alert('Success', 'Settings saved successfully!', [
      { text: 'OK', onPress: onBack }
    ]);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderOptionButton = (currentValue, targetValue, label, onPress) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        currentValue === targetValue && styles.optionButtonActive
      ]}
      onPress={() => onPress(targetValue)}
    >
      <Text style={[
        styles.optionButtonText,
        currentValue === targetValue && styles.optionButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderSettingRow = (title, subtitle, rightComponent) => (
    <View style={styles.settingRow}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile & Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏋️ Your Profile</Text>
          
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Text style={styles.profileName}>Fitness Enthusiast</Text>
              <Text style={styles.profileLevel}>
                {settings.experience.charAt(0).toUpperCase() + settings.experience.slice(1)} Level
              </Text>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>💪</Text>
                <Text style={styles.statLabel}>Focused</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{settings.weeklyGoal}</Text>
                <Text style={styles.statLabel}>Weekly Goal</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{settings.units.toUpperCase()}</Text>
                <Text style={styles.statLabel}>Units</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Training Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Training Preferences</Text>
          
          <View style={styles.settingCard}>
            <Text style={styles.cardTitle}>Training Focus</Text>
            <Text style={styles.cardSubtitle}>Choose your primary training goal</Text>
            
            <View style={styles.optionsContainer}>
              {renderOptionButton(
                settings.trainingFocus, 
                'strength', 
                '💪 Strength', 
                (value) => updateSetting('trainingFocus', value)
              )}
              {renderOptionButton(
                settings.trainingFocus, 
                'hypertrophy', 
                '🔥 Hypertrophy', 
                (value) => updateSetting('trainingFocus', value)
              )}
              {renderOptionButton(
                settings.trainingFocus, 
                'endurance', 
                '⚡ Endurance', 
                (value) => updateSetting('trainingFocus', value)
              )}
            </View>
          </View>

          <View style={styles.settingCard}>
            <Text style={styles.cardTitle}>Experience Level</Text>
            <Text style={styles.cardSubtitle}>How long have you been training?</Text>
            
            <View style={styles.optionsContainer}>
              {renderOptionButton(
                settings.experience, 
                'beginner', 
                '🌱 Beginner', 
                (value) => updateSetting('experience', value)
              )}
              {renderOptionButton(
                settings.experience, 
                'intermediate', 
                '🏃 Intermediate', 
                (value) => updateSetting('experience', value)
              )}
              {renderOptionButton(
                settings.experience, 
                'advanced', 
                '🏆 Advanced', 
                (value) => updateSetting('experience', value)
              )}
            </View>
          </View>
        </View>

        {/* Units & Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Units & Goals</Text>
          
          <View style={styles.settingCard}>
            <Text style={styles.cardTitle}>Weight Units</Text>
            <Text style={styles.cardSubtitle}>Choose your preferred weight measurement</Text>
            
            <View style={styles.optionsContainer}>
              {renderOptionButton(
                settings.units, 
                'lbs', 
                'LBS (Pounds)', 
                (value) => updateSetting('units', value)
              )}
              {renderOptionButton(
                settings.units, 
                'kg', 
                'KG (Kilograms)', 
                (value) => updateSetting('units', value)
              )}
            </View>
          </View>

          <View style={styles.settingCard}>
            <Text style={styles.cardTitle}>Weekly Workout Goal</Text>
            <Text style={styles.cardSubtitle}>How many times per week do you want to train?</Text>
            
            <View style={styles.optionsContainer}>
              {[2, 3, 4, 5, 6].map(num => 
                renderOptionButton(
                  settings.weeklyGoal, 
                  num, 
                  `${num}x per week`, 
                  (value) => updateSetting('weeklyGoal', value)
                )
              )}
            </View>
          </View>
        </View>

        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 App Preferences</Text>
          
          <View style={styles.settingCard}>
            {renderSettingRow(
              'Push Notifications',
              'Get reminders for workouts and progress updates',
              <Switch
                value={settings.notifications}
                onValueChange={(value) => updateSetting('notifications', value)}
                trackColor={{ false: '#ddd', true: '#34C759' }}
                thumbColor={settings.notifications ? '#fff' : '#f4f3f4'}
              />
            )}

            {renderSettingRow(
              'Auto Weight Increment',
              'Automatically suggest weight increases based on performance',
              <Switch
                value={settings.autoIncrement}
                onValueChange={(value) => updateSetting('autoIncrement', value)}
                trackColor={{ false: '#ddd', true: '#34C759' }}
                thumbColor={settings.autoIncrement ? '#fff' : '#f4f3f4'}
              />
            )}

            {renderSettingRow(
              'Rest Timer',
              'Show rest timer between sets',
              <Switch
                value={settings.restTimer}
                onValueChange={(value) => updateSetting('restTimer', value)}
                trackColor={{ false: '#ddd', true: '#34C759' }}
                thumbColor={settings.restTimer ? '#fff' : '#f4f3f4'}
              />
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>💾 Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 
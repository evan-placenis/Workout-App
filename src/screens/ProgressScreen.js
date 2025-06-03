import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryScatter } from 'victory-native';
import styles from '../styles/ProgressStyles';

const { width } = Dimensions.get('window');

export default function ProgressScreen({ workouts, onBack }) {
  // Generate test data for demonstration
  const generateTestData = () => {
    const testWorkouts = [
      // Bench Press progression
      { exercise: 'Bench Press', weight: 135, date: '2024-01-01', sets: 3, reps: 10 },
      { exercise: 'Bench Press', weight: 140, date: '2024-01-03', sets: 3, reps: 10 },
      { exercise: 'Bench Press', weight: 145, date: '2024-01-05', sets: 3, reps: 9 },
      { exercise: 'Bench Press', weight: 150, date: '2024-01-08', sets: 3, reps: 8 },
      { exercise: 'Bench Press', weight: 155, date: '2024-01-10', sets: 3, reps: 8 },
      { exercise: 'Bench Press', weight: 160, date: '2024-01-12', sets: 3, reps: 7 },
      
      // Squat progression
      { exercise: 'Squat', weight: 185, date: '2024-01-02', sets: 3, reps: 12 },
      { exercise: 'Squat', weight: 195, date: '2024-01-04', sets: 3, reps: 10 },
      { exercise: 'Squat', weight: 205, date: '2024-01-06', sets: 3, reps: 10 },
      { exercise: 'Squat', weight: 215, date: '2024-01-09', sets: 3, reps: 8 },
      { exercise: 'Squat', weight: 225, date: '2024-01-11', sets: 3, reps: 8 },
      
      // Deadlift progression
      { exercise: 'Deadlift', weight: 225, date: '2024-01-01', sets: 3, reps: 8 },
      { exercise: 'Deadlift', weight: 245, date: '2024-01-04', sets: 3, reps: 6 },
      { exercise: 'Deadlift', weight: 265, date: '2024-01-07', sets: 3, reps: 5 },
      { exercise: 'Deadlift', weight: 275, date: '2024-01-10', sets: 3, reps: 5 },
      { exercise: 'Deadlift', weight: 285, date: '2024-01-13', sets: 3, reps: 4 },
    ];
    
    // Combine real workouts with test data
    return [...testWorkouts, ...workouts];
  };

  const allWorkouts = generateTestData();

  // Group workouts by exercise
  const groupedWorkouts = allWorkouts.reduce((acc, workout) => {
    if (!acc[workout.exercise]) {
      acc[workout.exercise] = [];
    }
    acc[workout.exercise].push(workout);
    return acc;
  }, {});

  // Sort each exercise by date and prepare chart data
  const exerciseCharts = Object.keys(groupedWorkouts).map(exercise => {
    const workoutsForExercise = groupedWorkouts[exercise]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((workout, index) => ({
        x: index + 1, // Session number
        y: workout.weight,
        date: workout.date,
        sets: workout.sets,
        reps: workout.reps,
      }));

    return {
      exercise,
      data: workoutsForExercise,
      latest: workoutsForExercise[workoutsForExercise.length - 1],
      improvement: workoutsForExercise.length > 1 ? 
        workoutsForExercise[workoutsForExercise.length - 1].y - workoutsForExercise[0].y : 0
    };
  });

  const renderChart = (chartData) => (
    <View key={chartData.exercise} style={styles.chartContainer}>
      <View style={styles.chartHeader}>
        <Text style={styles.exerciseName}>{chartData.exercise}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.currentWeight}>
            Current: {chartData.latest.y} lbs
          </Text>
          <Text style={[styles.improvement, { color: chartData.improvement >= 0 ? '#34C759' : '#FF3B30' }]}>
            {chartData.improvement >= 0 ? '+' : ''}{chartData.improvement} lbs total
          </Text>
        </View>
      </View>
      
      <VictoryChart
        theme={VictoryTheme.material}
        width={width - 40}
        height={200}
        padding={{ left: 50, top: 20, right: 50, bottom: 40 }}
      >
        <VictoryAxis dependentAxis />
        <VictoryAxis />
        <VictoryLine
          data={chartData.data}
          style={{
            data: { stroke: "#007AFF", strokeWidth: 3 }
          }}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 }
          }}
        />
        <VictoryScatter
          data={chartData.data}
          size={4}
          style={{
            data: { fill: "#007AFF" }
          }}
        />
      </VictoryChart>
      
      <Text style={styles.sessionCount}>
        {chartData.data.length} session{chartData.data.length !== 1 ? 's' : ''} logged
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Progress</Text>
      </View>

      <ScrollView style={styles.content}>
        {exerciseCharts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Progress Data Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start logging workouts to see your progress charts here!
            </Text>
          </View>
        ) : (
          <View style={styles.chartsContainer}>
            <Text style={styles.sectionTitle}>Your Strength Progress</Text>
            {exerciseCharts.map(renderChart)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 
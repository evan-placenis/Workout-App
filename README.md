# Gym Assistant App

An AI-powered React Native workout companion built with Expo Go that helps users plan workouts, track progress, and make intelligent training decisions.

## 🎯 Project Overview

This app is being built in stages to ensure each feature is tested and working before moving to the next. The final app will include:

- **Workout Logging**: Track exercises, sets, reps, and weights
- **Progress Visualization**: Charts showing strength progression over time
- **AI Assistant**: Chat interface for workout planning and advice
- **Intelligent Suggestions**: AI recommendations for weight increases and recovery
- **User Profile**: Goals, preferences, and training settings

## 📋 Development Stages

### ✅ Stage 1: Minimal Expo App (COMPLETED)

- [x] Set up Expo React Native project
- [x] Create home screen with placeholder buttons
- [x] Organized project structure with src/ folder
- [x] Separated stylesheets from components

### ✅ Stage 2: Log Workout Screen (COMPLETED)

- [x] Form to enter exercise, sets, reps, weight, date
- [x] Data validation and error handling
- [x] Navigation between screens
- [x] Workout data storage in app state

### ✅ Stage 3: Progress Graph (COMPLETED)

- [x] Implemented Victory Native charts
- [x] Progress visualization for each exercise
- [x] Test data integration (Bench Press, Squat, Deadlift)
- [x] Statistics display (current weight, total improvement)
- [x] Modern, redesigned homepage UI

### ✅ Stage 6: Profile/Settings (COMPLETED)

- [x] Comprehensive user profile display
- [x] Training preferences (Strength/Hypertrophy/Endurance)
- [x] Experience level selection (Beginner/Intermediate/Advanced)
- [x] Units selection (lbs/kg)
- [x] Weekly workout goals (2-6x per week)
- [x] App preferences (notifications, auto-increment, rest timer)
- [x] Settings persistence in app state

### 🔄 Next Stages (In Order)

**Stage 4: AI Assistant Chat (NEXT)**

- Basic chat interface
- Integration with OpenAI API or similar
- Workout planning conversations

**Stage 5: Intelligent Suggestions**

- Analyze workout data and user settings
- AI recommendations for weight increases
- Recovery and rest day suggestions
- Personalized advice based on training focus

## 🚀 Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Start the Development Server**:

   ```bash
   npm start
   ```

3. **Run on Device**:
   - Install Expo Go app on your phone
   - Scan the QR code that appears in terminal/browser
   - Or use iOS Simulator / Android Emulator

## 🛠 Tech Stack

- **Framework**: React Native with Expo Go
- **Language**: JavaScript
- **UI**: React Native components with custom styling
- **Charts**: Victory Native for progress visualization
- **Dependencies**:
  - victory-native: Chart library
  - react-native-svg: SVG support for charts
  - expo-status-bar: Status bar management

## 📱 Current Features

### Home Screen

- Modern, attractive design with colored buttons
- Logo and branding
- Workout counter badge
- Motivational footer text
- Four main navigation buttons

### Log Workout

- Comprehensive form for exercise data entry
- Form validation and error handling
- Auto-populated date field
- Success feedback and navigation

### Progress Charts

- Line charts showing weight progression over time
- Separate chart for each exercise
- Current weight and total improvement stats
- Test data for demonstration (Bench Press, Squat, Deadlift)
- Animated chart rendering

### Profile & Settings

- User profile display with stats
- Training focus selection (Strength/Hypertrophy/Endurance)
- Experience level configuration
- Weight units preference (lbs/kg)
- Weekly workout goals
- App preferences with toggle switches
- Modern card-based design

## 💾 Data Storage

**Current**: In-memory storage (lost on app restart)

- User settings persist during session
- Workout data combines with test data
  **Future**: Supabase integration planned for persistent storage

## 🔧 Development Notes

- Each stage must be tested and confirmed working before proceeding
- Test data is included for progress charts demonstration
- Real workout data from logging integrates with test data
- User settings affect app behavior and recommendations
- App uses SafeAreaView for proper device compatibility
- Victory Native charts provide smooth animations

## 📞 Support

If development is paused and resumed later, continue from Stage 4 listed above. The next step is to implement the "Talk to AI" chat interface with OpenAI API integration that considers user settings and workout data for personalized recommendations.

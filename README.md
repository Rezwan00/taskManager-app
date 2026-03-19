# TaskManager — React Native App

A clean, production-quality task management app built with **React Native**, **TypeScript**, and **Expo**. Demonstrates core mobile development patterns including navigation, persistent state, Context API, and accessibility.

## 📱 Features

- **Add, edit, and delete tasks** with title, description, and priority
- **Priority levels** — High, Medium, Low — with colour-coded visual indicators
- **Filter tasks** — All / Active / Completed
- **Progress bar** — visual completion overview
- **Persistent storage** — tasks saved locally with AsyncStorage, survive app restarts
- **Accessible** — ARIA roles, labels, and states throughout
- **Unit tested** — TaskContext fully covered with Jest

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo |
| Language | TypeScript (strict) |
| Navigation | React Navigation v6 (Native Stack) |
| State Management | React Context API + useReducer pattern |
| Persistence | AsyncStorage |
| Testing | Jest + React Testing Library |
| Safe Area | react-native-safe-area-context |

## 🏗 Architecture

```
src/
├── context/
│   └── TaskContext.tsx      # Global state — tasks CRUD + AsyncStorage persistence
├── screens/
│   └── HomeScreen.tsx       # Main task list with filters and progress bar
├── components/
│   ├── TaskCard.tsx          # Individual task item with actions
│   └── TaskForm.tsx          # Add / Edit modal form
└── theme.ts                  # Design tokens — colours, spacing, typography
```

### Key patterns demonstrated

- **Context + hooks** — `TaskProvider` wraps the app, `useTasks()` hook consumes state
- **useCallback** — memoised handlers to avoid unnecessary re-renders
- **useMemo** — filtered task lists computed efficiently
- **Controlled inputs** — form state with validation
- **AsyncStorage side effects** — `useEffect` for load on mount and persist on change
- **TypeScript interfaces** — `Task`, `Priority`, `TaskContextType` fully typed
- **Accessibility** — `accessibilityRole`, `accessibilityState`, `accessibilityLabel` on interactive elements

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator, or Expo Go on your phone

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Rezwan00/taskmanager-app.git
cd taskmanager-app

# Install dependencies
npm install

# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Run Tests

```bash
npm test
```

## 📋 Screens

### Home Screen
- Lists all tasks with priority colour bar, checkbox, and actions
- Filter tabs (All / Active / Done) update the list in real time
- Progress bar shows overall completion percentage
- Empty states for each filter

### Task Form (Modal)
- Title input with validation
- Optional description (multiline)
- Priority selector (Low / Medium / High) with colour feedback
- Works for both adding new tasks and editing existing ones

## 🧪 Tests

Unit tests cover the full `TaskContext`:
- Initial state
- Add task
- Toggle completion
- Delete task
- Update task
- Multiple tasks ordered newest-first

## 📄 License

MIT

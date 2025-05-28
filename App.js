import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'; // Import necessary components
import { MaterialCommunityIcons } from '@expo/vector-icons'; // <-- ADD THIS LINE

// Import Firebase services AND the initialization error status
import { auth, firebaseInitializationError } from './firebase';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';

// Import Screens
import LoginScreen from './screens/LoginScreen';
import TourHomeScreen from './screens/TourHomeScreen';
import PhotobookScreen from './screens/PhotobookScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import ChatScreen from './screens/ChatScreen';
import MapScreen from './screens/MapScreen';

// Import Mock Data (as before)
import { MOCK_ITINERARY } from './assets/itinerary/mock_itinerary';

// Brand Colors (define centrally if used across many files, or just here if simple)
const COLORS = {
  primaryBlue: '#007DC3',
  lightBlueAccent: '#AECAEC',
  white: '#FFFFFF',
  darkText: '#1A202C',
  errorRed: '#E53E3E',
  appBackground: '#F0F4F8',
};

export default function App() {
  // Auth State
  const [initializing, setInitializing] = useState(true); // Is Firebase Auth check running?
  const [user, setUser] = useState(null); // Holds the Firebase user object if authenticated
  const [authError, setAuthError] = useState(null); // Stores any auth-related errors

  // Navigation State (only relevant *after* authentication)
  const [currentScreen, setCurrentScreen] = useState('Login'); // Default screen after auth
  const [tourCode, setTourCode] = useState('');

  useEffect(() => {
    // Check if Firebase failed to initialize in firebase.js
    if (firebaseInitializationError) {
      console.error("App.js: Firebase failed to initialize in firebase.js.", firebaseInitializationError);
      setAuthError(`Firebase initialization failed: ${firebaseInitializationError.message}`);
      setInitializing(false);
      return;
    }

    // Check if auth instance itself is somehow null (belt-and-suspenders check)
    if (!auth) {
        console.error("App.js: Firebase auth instance is null/undefined after import.");
        setAuthError("Critical Error: Firebase Auth module not available.");
        setInitializing(false);
        return;
    }

    console.log("App.js: Setting up onAuthStateChanged listener...");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("App.js: onAuthStateChanged triggered. User:", currentUser ? currentUser.uid : 'null');
      setUser(currentUser);

      if (initializing) {
          console.log("App.js: Auth state determined, setting initializing=false.");
        setInitializing(false);
      }

      // If initialization is done and there's still no user, attempt anonymous sign-in
      if (!initializing && !currentUser) {
        console.log("App.js: No user found after init, attempting anonymous sign-in...");
        try {
          await signInAnonymously(auth);
          console.log("App.js: signInAnonymously() called successfully. onAuthStateChanged should fire again with user.");
          // No need to setUser here, the listener will fire again with the new user
        } catch (error) {
          console.error("App.js: Anonymous sign-in failed:", error);
          setAuthError(`Authentication failed: ${error.message}`);
        }
      }
    }, (error) => {
        // Handle errors from the listener itself
        console.error("App.js: onAuthStateChanged listener error:", error);
        setAuthError(`Auth listener error: ${error.message}`);
        setInitializing(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [initializing]); // Rerun effect only if initializing changes (effectively runs once after initial check)

  // --- Navigation Logic ---
  const handleLoginSuccess = (enteredTourCode) => {
    // User is already authenticated anonymously by this point.
    // This function now just handles moving past the tour code entry screen.
    setTourCode(enteredTourCode);
    setCurrentScreen('TourHome');
  };

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    // Note: Logging out an anonymous user deletes the user record permanently.
    // For this app flow, we might not actually want a traditional "logout".
    // Instead, maybe "Exit Tour" which just resets navigation state?
    // For now, we'll just reset the app's screen state.
    console.log("App.js: 'Logout' pressed. Resetting screen state.");
    setTourCode('');
    setCurrentScreen('Login'); // Go back to the Tour Code entry screen
    // Optionally, you could sign out the *anonymous* user, but they'd get a new identity next time.
    // auth.signOut();
  };

  // --- Render Logic based on Auth State ---

  if (initializing) {
    console.log("App.js: Rendering Loading Indicator (initializing)...");
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
        <Text style={styles.loadingText}>Connecting to Tour Services...</Text>
      </View>
    );
  }

  if (authError) {
     console.log("App.js: Rendering Auth Error Message...");
    return (
      <View style={styles.loadingContainer}>
        <MaterialCommunityIcons name="alert-circle-outline" size={60} color={COLORS.errorRed} />
        <Text style={styles.errorTitle}>Connection Error</Text>
        <Text style={styles.errorText}>{authError}</Text>
        <Text style={styles.errorDetail}>Please check your internet connection and restart the app.</Text>
      </View>
    );
  }

  if (!user) {
    // This state should ideally be brief as anonymous sign-in is attempted.
    // If it persists, it might mean anonymous sign-in is failing silently or repeatedly.
    console.log("App.js: Rendering Loading Indicator (no user yet)...");
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
        <Text style={styles.loadingText}>Authenticating...</Text>
      </View>
    );
  }

  // --- User is Authenticated - Render the main app screens ---
  console.log("App.js: User authenticated (UID:", user.uid, "). Rendering screen:", currentScreen);
  const renderAuthenticatedScreen = () => {
    switch (currentScreen) {
      case 'Login': // This now means "Enter Tour Code" screen
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      case 'TourHome':
        return <TourHomeScreen tourCode={tourCode} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'Photobook':
        return <PhotobookScreen onBack={() => navigateTo('TourHome')} />;
      case 'Itinerary':
        return <ItineraryScreen itinerary={MOCK_ITINERARY} onBack={() => navigateTo('TourHome')} />;
      case 'Chat':
        return <ChatScreen onBack={() => navigateTo('TourHome')} />;
      case 'Map':
        return <MapScreen onBack={() => navigateTo('TourHome')} />;
      default: // Fallback to the Tour Code entry screen
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {renderAuthenticatedScreen()}
    </>
  );
}

// --- Styles for Loading/Error states ---
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.appBackground,
    padding: 30,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.darkText,
    opacity: 0.8,
  },
   errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.errorRed,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: COLORS.darkText,
    textAlign: 'center',
    marginBottom: 5,
  },
   errorDetail: {
    fontSize: 14,
    color: COLORS.secondaryText,
    textAlign: 'center',
    marginTop: 15,
    opacity: 0.8,
  },
});
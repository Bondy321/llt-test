// screens/LoginScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions
} from 'react-native';

// Ensure your logo is at this relative path from the screens folder
const appLogo = require('../assets/images/app-icon-llt.png');
const windowHeight = Dimensions.get('window').height;

// Brand Colors
const COLORS = {
  primaryBlue: '#007DC3',
  lightBlueAccent: '#AECAEC',
  coralAccent: '#FF7757',
  white: '#FFFFFF',
  darkText: '#1A202C', // A dark gray for text
  lightGray: '#E2E8F0', // For borders or light backgrounds
  inputBackground: '#F7FAFC',
  errorRed: '#E53E3E',
};

export default function LoginScreen({ onLoginSuccess }) {
  const [tourCodeInput, setTourCodeInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (tourCodeInput.trim() !== '') {
      setError('');
      onLoginSuccess(tourCodeInput.trim().toUpperCase());
    } else {
      setError('Please enter your Tour Code.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.loginContainer}>
            <Image source={appLogo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Loch Lomond Travel</Text>
            <Text style={styles.subtitle}>Your adventure awaits. Access your private tour space.</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tour Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter code (e.g. LLT123)"
                placeholderTextColor="#A0AEC0"
                value={tourCodeInput}
                onChangeText={setTourCodeInput}
                autoCapitalize="characters"
                selectionColor={COLORS.primaryBlue}
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Enter Tour Space</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lightBlueAccent,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: windowHeight * 0.05, // Responsive padding
    paddingHorizontal: 20,
  },
  loginContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderRadius: 20, // Softer corners
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold', // Using 'bold' is more standard than numeric weights for system fonts
    color: COLORS.primaryBlue,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.darkText,
    opacity: 0.8,
    marginBottom: 35,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.darkText,
    opacity: 0.9,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.inputBackground,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.darkText,
  },
  button: {
    backgroundColor: COLORS.coralAccent,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10, // Added some margin top
    shadowColor: COLORS.coralAccent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.errorRed,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
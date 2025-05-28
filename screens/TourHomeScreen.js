// screens/TourHomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Ensure your logo is at this relative path from the screens folder
const appLogoSmall = require('../assets/images/app-icon-llt.png');

// Brand Colors
const COLORS = {
  primaryBlue: '#007DC3',
  lightBlueAccent: '#AECAEC',
  coralAccent: '#FF7757',
  white: '#FFFFFF',
  darkText: '#1A202C',
  cardBackground: '#FFFFFF',
  appBackground: '#F0F4F8', // A very light grey/blue for overall app background
};

export default function TourHomeScreen({ tourCode, onNavigate, onLogout }) {
  const menuItems = [
    { id: 'Photobook', title: 'Photo Album', icon: 'image-album', color: COLORS.primaryBlue },
    { id: 'Itinerary', title: 'Tour Itinerary', icon: 'map-legend', color: '#3498DB' }, // A complementary blue
    { id: 'Chat', title: 'Group Chat', icon: 'chat-processing-outline', color: '#2ECC71' }, // A friendly green
    { id: 'Map', title: 'Driver Location', icon: 'map-marker-radius-outline', color: COLORS.coralAccent },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={appLogoSmall} style={styles.headerLogo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Active Tour</Text>
            <Text style={styles.tourCodeDisplay}>{tourCode}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout} activeOpacity={0.7}>
            <MaterialCommunityIcons name="logout-variant" size={22} color={COLORS.primaryBlue} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Tour Features</Text>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.box, { backgroundColor: item.color }]}
              onPress={() => onNavigate(item.id)}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name={item.icon} size={36} color={COLORS.white} />
              </View>
              <Text style={styles.boxText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20, // Add padding at the top
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  headerLogo: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.darkText,
    opacity: 0.7,
  },
  tourCodeDisplay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryBlue,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: COLORS.lightBlueAccent,
    borderRadius: 20, // Circular
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 20,
    paddingLeft: 5, // Slight indent
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '48%',
    aspectRatio: 1.1, // Slightly taller than wide
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18, // Softer corners
    marginBottom: 15,
    padding: 15, // Increased padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 12,
    padding:10, // Space around icon
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Subtle highlight for icon
    borderRadius: 30, // Circular background for icon
  },
  boxText: {
    fontSize: 15, // Adjusted for better fit
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
});
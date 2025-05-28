// screens/ItineraryScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Brand Colors
const COLORS = {
  primaryBlue: '#007DC3',
  complementaryBlue: '#3498DB', // From TourHome
  lightBlueAccent: '#AECAEC',
  white: '#FFFFFF',
  darkText: '#1A202C',
  secondaryText: '#4A5568',
  appBackground: '#F0F4F8',
  cardBackground: '#FFFFFF',
  timelineColor: '#CBD5E0',
};

export default function ItineraryScreen({ itinerary, onBack }) {
  if (!itinerary || !itinerary.days) {
    // Basic fallback, could be styled more nicely if needed
    return (
      <SafeAreaView style={styles.safeArea}>
         <View style={[styles.header, {backgroundColor: COLORS.complementaryBlue}]}>
            <TouchableOpacity onPress={onBack} style={styles.headerButton} activeOpacity={0.7}>
                <MaterialCommunityIcons name="arrow-left" size={26} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tour Itinerary</Text>
            <View style={styles.headerButton} />
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'center', padding: 20}}>
            <Text style={{fontSize: 16, color: COLORS.darkText}}>Itinerary details are currently unavailable.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, {backgroundColor: COLORS.complementaryBlue}]}>
        <TouchableOpacity onPress={onBack} style={styles.headerButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={26} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{itinerary.title}</Text>
        <View style={styles.headerButton} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {itinerary.days.map((dayData, index) => (
          <View key={index} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <MaterialCommunityIcons name="calendar-check-outline" size={28} color={COLORS.primaryBlue} />
              <Text style={styles.dayTitleText}>Day {dayData.day}: {dayData.title}</Text>
            </View>
            <View style={styles.activitiesContainer}>
              {dayData.activities.map((activity, actIndex) => (
                <View key={actIndex} style={styles.activityItem}>
                  <View style={styles.timeline}>
                    <View style={styles.timelineDot} />
                    {actIndex < dayData.activities.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButton: {
    padding: 5,
    minWidth: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18, // Adjusted size for potentially longer itinerary titles
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center', // Ensure it centers even if title is short
    flex: 1, // Allow title to take available space
    marginHorizontal: 5, // Prevent text touching buttons
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  dayCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    marginBottom: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10, // Reduced bottom padding
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 4,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBlueAccent,
    paddingBottom: 15,
  },
  dayTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryBlue,
    marginLeft: 12,
    flex:1, // Allow wrapping
  },
  activitiesContainer: {
    // No specific styles needed, acts as a wrapper
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'flex-start',
  },
  timeline: {
    alignItems: 'center',
    marginRight: 15,
    paddingTop: 3, // Align dot with text
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.coralAccent,
    zIndex: 1,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.timelineColor,
    marginTop: -2, // Overlap dot slightly
    marginBottom: -2, // Overlap dot slightly
  },
  activityContent: {
    flex: 1,
  },
  activityTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkText,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 15,
    color: COLORS.secondaryText,
    lineHeight: 22,
  },
});
// screens/MapScreen.js
import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView,
  Image, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Brand Colors
const COLORS = {
  primaryBlue: '#007DC3',
  coralAccent: '#FF7757',
  white: '#FFFFFF',
  darkText: '#1A202C',
  secondaryText: '#4A5568',
  appBackground: '#F0F4F8',
  mapPlaceholderBackground: '#D8E2EB', // A light blue-grey for map bg
  mapHeaderColor: '#FF7757', // Coral from TourHome
};

const mapImage = require('../assets/map/luss_village_map.png');
const windowWidth = Dimensions.get('window').width;

const MOCK_PIN_LOCATION = {
  title: "Luss Pier - Driver Location",
  description: "The driver is currently near the beautiful Luss Pier, ready for your loch-side exploration!",
  xPercent: 0.52, // Adjusted slightly, tune this to your image
  yPercent: 0.65, // Adjusted slightly, tune this to your image
};

export default function MapScreen({ onBack }) {
  const mapImageContainerWidth = windowWidth - 30;
  // Attempt to calculate pin position more robustly, assuming pin icon is 30x30
  const pinOffsetX = (MOCK_PIN_LOCATION.xPercent * mapImageContainerWidth) - 15; // 15 is half of pin width 30
  const pinOffsetY = (MOCK_PIN_LOCATION.yPercent * (mapImageContainerWidth * 0.75)) - 30; // 30 is full height of pin

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, {backgroundColor: COLORS.mapHeaderColor}]}>
        <TouchableOpacity onPress={onBack} style={styles.headerButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={26} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Driver Location</Text>
        <View style={styles.headerButton} />
      </View>
      <View style={styles.container}>
        <View style={styles.mapOuterContainer}>
          <View style={styles.mapImageContainer}>
            <Image source={mapImage} style={styles.mapImage} resizeMode="cover" />
            <View
              style={[
                styles.mockPinContainer,
                {
                  left: pinOffsetX,
                  top: pinOffsetY,
                },
              ]}
            >
              <MaterialCommunityIcons name="map-marker" size={40} color={COLORS.primaryBlue} style={styles.mapPinIcon} />
            </View>
          </View>
        </View>
        <View style={styles.locationCard}>
            <MaterialCommunityIcons name="bus-marker" size={30} color={COLORS.primaryBlue} style={{marginRight: 12}}/>
            <View style={{flex:1}}>
                <Text style={styles.pinTitle}>{MOCK_PIN_LOCATION.title}</Text>
                <Text style={styles.pinDescription}>{MOCK_PIN_LOCATION.description}</Text>
            </View>
        </View>
        <Text style={styles.disclaimerText}>
            Location is updated periodically. For illustrative purposes only.
        </Text>
      </View>
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
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  mapOuterContainer: {
    width: '100%',
    aspectRatio: 4/3, // Common map aspect ratio
    borderRadius: 18,
    backgroundColor: COLORS.mapPlaceholderBackground,
    overflow: 'hidden',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  mapImageContainer: {
    flex: 1,
    position: 'relative', // For absolute positioning of the pin
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mockPinContainer: {
    position: 'absolute',
    // The pin icon itself will define its size
  },
  mapPinIcon: {
    // Add shadow to the pin icon itself for depth
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  pinTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primaryBlue,
    marginBottom: 5,
  },
  pinDescription: {
    fontSize: 14,
    color: COLORS.secondaryText,
    lineHeight: 20,
  },
  disclaimerText: {
      fontSize: 12,
      color: COLORS.secondaryText,
      opacity: 0.7,
      textAlign: 'center',
      marginTop: 20,
      paddingHorizontal: 10,
  }
});
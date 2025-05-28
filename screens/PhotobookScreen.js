// screens/PhotobookScreen.js
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView,
  Image, Dimensions, Modal, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const mockPhotos = [
  { id: '1', source: require('../assets/photobook/loch_view_1.jpg'), caption: 'Serene Loch View' },
  { id: '2', source: require('../assets/photobook/trossachs_trail.jpg'), caption: 'Exploring the Trossachs Trail' },
  { id: '3', source: require('../assets/photobook/highland_coo.jpg'), caption: 'A Friendly Highland Coo Encounter' },
  { id: '4', source: require('../assets/photobook/castle_ruins.jpg'), caption: 'Whispers of Ancient Castle Ruins' },
  { id: '5', source: require('../assets/photobook/forest_path.jpg'), caption: 'Journey Through an Enchanting Forest' },
  { id: '6', source: require('../assets/photobook/ben_lomond.jpg'), caption: 'The Majestic Ben Lomond Summit' },
];

// Brand Colors
const COLORS = {
  primaryBlue: '#007DC3',
  lightBlueAccent: '#AECAEC',
  coralAccent: '#FF7757',
  white: '#FFFFFF',
  darkText: '#1A202C',
  appBackground: '#F0F4F8',
  modalBackground: 'rgba(0, 20, 40, 0.9)', // Darker, slightly blueish overlay
};

export default function PhotobookScreen({ onBack }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImage = () => {
    setModalVisible(false);
    // Delay clearing selectedImage to allow modal to animate out smoothly
    setTimeout(() => setSelectedImage(null), 300);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, {backgroundColor: COLORS.primaryBlue}]}>
        <TouchableOpacity onPress={onBack} style={styles.headerButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={26} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Photo Album</Text>
        <View style={styles.headerButton} /> {/* Spacer for centering title */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.grid}>
          {mockPhotos.map((photo, index) => (
            <TouchableOpacity
              key={photo.id}
              style={styles.imageTouchable}
              onPress={() => openImage(photo)}
              activeOpacity={0.8}
            >
              <Image source={photo.source} style={styles.imageThumbnail} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedImage && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeImage}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={selectedImage.source} style={styles.fullImage} resizeMode="contain" />
              {selectedImage.caption && <Text style={styles.captionText}>{selectedImage.caption}</Text>}
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeImage}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons name="close" size={32} color={COLORS.lightBlueAccent} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
    paddingVertical: Platform.OS === 'ios' ? 12 : 15, // Adjust for status bar
    // backgroundColor will be set dynamically
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButton: {
    padding: 5, // Make tap target larger
    minWidth: 40, // Ensure consistent tap area
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
  scrollContainer: {
    padding: 8, // Tighter padding for more images
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between', // This might leave uneven spacing
  },
  imageTouchable: {
    width: (windowWidth - 16) / 3, // 3 images per row, -16 for total horizontal padding
    height: (windowWidth - 16) / 3,
    padding: 4, // Spacing between images
  },
  imageThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12, // Softer corners
    backgroundColor: COLORS.lightGray, // Placeholder color
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: windowWidth * 0.95,
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: windowHeight * 0.6, // Max height for image
    borderRadius: 15,
    marginBottom: 15,
  },
  captionText: {
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
});
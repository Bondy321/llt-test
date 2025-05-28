// screens/ChatScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, SafeAreaView,
  ScrollView, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Brand Colors
const COLORS = {
  primaryBlue: '#007DC3',
  lightBlueAccent: '#AECAEC',
  coralAccent: '#FF7757',
  white: '#FFFFFF',
  darkText: '#1A202C',
  secondaryText: '#4A5568',
  appBackground: '#F0F4F8', // Consistent app background
  chatScreenBackground: '#E6F3F8', // Slightly different, very light blue
  myMessageBackground: '#007DC3',
  theirMessageBackground: '#FFFFFF',
  driverMessageBackground: '#FFF2E0', // Lightened coral for driver
  driverMessageBorder: '#FFCAA8',
  inputBackground: '#FFFFFF',
  sendButtonColor: '#FF7757', // Coral accent for send
  chatHeaderColor: '#2ECC71', // Green from TourHome
};

// Keeping MOCK_MESSAGES here for simplicity for now
const MOCK_MESSAGES = [
  { id: '1', text: 'Hello everyone! So excited for our Loch Lomond adventure!', sender: 'Sarah P.', timestamp: '10:00 AM', isSelf: false },
  { id: '2', text: 'Hi Sarah! Me too! Can\'t wait to see those views. 👋', sender: 'You', timestamp: '10:01 AM', isSelf: true },
  { id: '3', text: 'Driver (Alex): Good morning team! I\'m at the designated pickup spot by the main entrance. Look for the Loch Lomond Travel minibus. Safe travels!', sender: 'Driver', timestamp: '10:02 AM', isDriver: true },
  { id: '4', text: 'Perfect, see you shortly, Alex!', sender: 'Mark T.', timestamp: '10:03 AM', isSelf: false },
  { id: '5', text: 'Just spotted the minibus! On my way.', sender: 'You', timestamp: '10:05 AM', isSelf: true },
];


export default function ChatScreen({ onBack }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    const newMessage = {
      id: String(Date.now()), // More unique ID
      text: inputText.trim(),
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      isSelf: true,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, {backgroundColor: COLORS.chatHeaderColor}]}>
        <TouchableOpacity onPress={onBack} style={styles.headerButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="arrow-left" size={26} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Chat</Text>
        <View style={styles.headerButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 80} // Adjust as needed
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesScrollContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.isSelf ? styles.myMessageRow : styles.theirMessageRow,
              ]}
            >
              <View style={[
                styles.messageBubble,
                msg.isSelf ? styles.myMessageBubble : styles.theirMessageBubble,
                msg.isDriver ? styles.driverMessageBubble : {}
              ]}>
                {!msg.isSelf && (
                  <Text style={[styles.senderName, msg.isDriver ? styles.driverSenderName : {}]}>
                    {msg.sender}
                  </Text>
                )}
                <Text style={[styles.messageText, msg.isSelf ? styles.myMessageText : {}]}>
                  {msg.text}
                </Text>
                <Text style={[styles.timestamp, msg.isSelf ? styles.myTimestamp : {}]}>
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message here..."
            placeholderTextColor="#A0AEC0"
            value={inputText}
            onChangeText={setInputText}
            multiline
            selectionColor={COLORS.primaryBlue}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} activeOpacity={0.7}>
            <MaterialCommunityIcons name="send-circle" size={38} color={COLORS.sendButtonColor} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.chatScreenBackground,
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
  keyboardAvoidingContainer: {
    flex: 1,
  },
  messagesScrollContainer: {
    paddingVertical: 15,
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20, // More rounded
  },
  myMessageBubble: {
    backgroundColor: COLORS.myMessageBackground,
    borderBottomRightRadius: 5, // Characteristic "tail"
  },
  theirMessageBubble: {
    backgroundColor: COLORS.theirMessageBackground,
    borderBottomLeftRadius: 5, // Characteristic "tail"
    shadowColor: '#000', // Subtle shadow for received messages
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  driverMessageBubble: {
    backgroundColor: COLORS.driverMessageBackground,
    borderColor: COLORS.driverMessageBorder,
    borderWidth: 1,
  },
  senderName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primaryBlue, // Make sender name stand out
    marginBottom: 4,
  },
  driverSenderName: {
    color: COLORS.coralAccent, // Driver name in coral
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.darkText,
  },
  myMessageText: {
    color: COLORS.white,
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.secondaryText,
    opacity: 0.7,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  myTimestamp: {
    color: COLORS.lightBlueAccent,
    opacity: 0.8,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#D1D9E6', // Lighter border
    backgroundColor: COLORS.inputBackground,
  },
  textInput: {
    flex: 1,
    minHeight: 44, // Taller input
    maxHeight: 120,
    backgroundColor: '#F0F4F8', // Light background for input field
    borderRadius: 22, // Pill shape
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 16,
    color: COLORS.darkText,
    marginRight: 8,
  },
  sendButton: {
    padding: 4, // Just enough to make icon easily tappable
  },
});
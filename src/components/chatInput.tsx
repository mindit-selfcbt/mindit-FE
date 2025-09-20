import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import VoiceIcon from '../assets/img/chat/voicerecognition.png';
import KeyboardIcon from '../assets/img/chat/keyboard.png';

const ChatInput = ({ onVoicePress, onKeyboardPress }) => (
  <View style={styles.inputWrap}>
    <TouchableOpacity onPress={onVoicePress} style={styles.voiceButton}>
      <Image source={VoiceIcon} style={styles.voiceIcon} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onKeyboardPress} style={styles.keyboardButton}>
      <Image source={KeyboardIcon} style={styles.keyboardIcon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputWrap: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 80,
  },
  voiceIcon: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  keyboardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  keyboardIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default ChatInput;

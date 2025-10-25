import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  PermissionsAndroid,
  Platform,
  Alert,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import VoiceIcon from '../assets/img/chat/voicerecognition.png';
import KeyboardIcon from '../assets/img/chat/keyboard.png';
import SendIcon from '../assets/img/chat/send.png';
import MicIcon from '../assets/icon/micIcon.png';

const windowWidth = Dimensions.get('window').width;

const ChatInput = ({ onSendText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const requestRecordPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: '음성 인식 권한 요청',
            message: '앱에서 음성을 인식하려면 마이크 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('권한 요청 예외:', err);
        return false;
      }
    }
    return true;
  };

  const startRecording = async () => {
    const available = await Voice.isAvailable();
    if (!available) return;

    const hasPermission = await requestRecordPermission();
    if (!hasPermission) return;

    try {
      await Voice.start('ko-KR');
      setIsRecording(true);
    } catch (e) {
      Alert.alert('음성 인식 시작 오류', e.message || e.toString());
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      Alert.alert('음성 인식 종료 오류', e.message || e.toString());
    }
  };

  const handleSendPress = () => {
    if (inputText.trim()) {
      onSendText(inputText.trim());
      setInputText('');
    }
  };

  const toggleKeyboardMode = () => {
    setIsKeyboardOpen(prev => !prev);
  };

  if (isKeyboardOpen) {
    return (
      <KeyboardAvoidingView
        style={[styles.keyboardAvoidContainer, !keyboardVisible && { flex: 0 }]}
        behavior="position"
        keyboardVerticalOffset={40}
      >
        <View style={styles.chatBarWrapper}>
          <View style={styles.chatBar}>
            <TouchableOpacity
              onPress={toggleKeyboardMode}
              style={styles.micButton}
            >
              <Image source={MicIcon} style={styles.micIcon} />
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="메시지를 입력하세요..."
              placeholderTextColor="#9DA4B0"
              returnKeyType="send"
              onSubmitEditing={handleSendPress}
              blurOnSubmit={false}
              autoFocus
            />

            <TouchableOpacity
              onPress={handleSendPress}
              style={styles.sendButton}
              disabled={!inputText.trim()}
            >
              <Image
                source={SendIcon}
                style={[
                  styles.sendIcon,
                  {
                    opacity: inputText.trim() ? 1 : 0.5,
                    width: 30,
                    height: 30,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={styles.inputWrapVoice}>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={styles.voiceButton}
      >
        <Animated.Image
          source={VoiceIcon}
          style={[styles.voiceIcon, { transform: [{ scale: scaleAnim }] }]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={toggleKeyboardMode}
        style={styles.keyboardButton}
      >
        <Image source={KeyboardIcon} style={styles.keyboardIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapVoice: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 80,
  },
  voiceIcon: { width: 160, height: 160, resizeMode: 'contain' },
  keyboardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  keyboardIcon: { width: 60, height: 60, resizeMode: 'contain' },
  keyboardAvoidContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  chatBarWrapper: {
    position: 'absolute',
    bottom: -32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 32,
    maxWidth: 380,
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    gap: 8,
  },
  micButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    height: 60,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#343B61',
  },
  sendButton: {
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    resizeMode: 'contain',
  },
});

export default ChatInput;

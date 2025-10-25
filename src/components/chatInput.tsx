import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import VoiceIcon from '../assets/img/chat/voicerecognition.png';
import KeyboardIcon from '../assets/img/chat/keyboard.png';

const ChatInput = ({ onKeyboardPress, onSendText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  console.log('ChatInput 렌더링됨, Voice:', Voice);

  // ⚡ Android 권한 요청
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
        console.log('권한 요청 결과:', granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('권한 요청 예외:', err);
        return false;
      }
    }
    return true; // iOS는 Info.plist에서 권한 설정 필요
  };

  useEffect(() => {
    console.log('Voice 이벤트 등록 시도');

    Voice.onSpeechResults = event => {
      console.log('onSpeechResults 호출, event:', event);
      const text = event.value?.[0];
      if (text) {
        console.log('인식된 텍스트:', text);
        onSendText(text);
      }
    };

    Voice.onSpeechError = event => {
      console.log('onSpeechError 호출, event:', event);
      setIsRecording(false);
      Alert.alert(
        '음성 인식 오류',
        event.error?.message || '오류가 발생했습니다.',
      );
    };

    return () => {
      console.log('Voice 이벤트 해제');
      Voice.destroy().then(() => Voice.removeAllListeners());
    };
  }, []);

  // 🔹 녹음 중 애니메이션
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ]),
      ).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isRecording]);

  // 🔹 녹음 시작
  const startRecording = async () => {
    console.log('녹음 시작 시도');

    if (!Voice || !Voice.isAvailable) {
      console.log('Voice 모듈이 로드되지 않았거나 사용 불가');
      Alert.alert('오류', 'Voice 모듈이 아직 준비되지 않았습니다.');
      return;
    }

    const available = await Voice.isAvailable();
    console.log('Voice 사용 가능 여부:', available);
    if (!available) return;

    const hasPermission = await requestRecordPermission();
    if (!hasPermission) return;

    try {
      console.log('Voice.start 호출 전');
      await Voice.start('ko-KR');
      setIsRecording(true);
      console.log('Voice.start 호출 성공, 녹음 시작됨');
    } catch (e) {
      console.log('Voice Start Error:', e);
      Alert.alert('음성 인식 시작 오류', e.message || e.toString());
    }
  };

  // 🔹 녹음 종료
  const stopRecording = async () => {
    console.log('녹음 종료 시도');
    try {
      await Voice.stop();
      setIsRecording(false);
      console.log('Voice.stop 호출 성공, 녹음 종료됨');
    } catch (e) {
      console.log('Voice Stop Error:', e);
      Alert.alert('음성 인식 종료 오류', e.message || e.toString());
    }
  };

  return (
    <View style={styles.inputWrap}>
      <TouchableOpacity
        onPress={isRecording ? stopRecording : startRecording}
        style={styles.voiceButton}
      >
        <Animated.Image
          source={VoiceIcon}
          style={[styles.voiceIcon, { transform: [{ scale: scaleAnim }] }]}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onKeyboardPress} style={styles.keyboardButton}>
        <Image source={KeyboardIcon} style={styles.keyboardIcon} />
      </TouchableOpacity>
    </View>
  );
};

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
  voiceIcon: { width: 160, height: 160, resizeMode: 'contain' },
  keyboardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  keyboardIcon: { width: 60, height: 60, resizeMode: 'contain' },
});

export default ChatInput;

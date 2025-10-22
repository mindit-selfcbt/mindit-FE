import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native'; // Animated, Easing import
import VoiceIcon from '../assets/img/chat/voicerecognition.png';
import KeyboardIcon from '../assets/img/chat/keyboard.png';

// isListening prop 추가
const ChatInput = ({ onVoicePress, onKeyboardPress, isListening }) => {
  // 애니메이션 값
  const scaleAnim = useRef(new Animated.Value(1)).current; // 1.0에서 시작

  useEffect(() => {
    if (isListening) {
      // 음성 인식 중일 때 애니메이션 시작 (반복)
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1, // 약간 커짐
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.0, // 원래대로 돌아옴
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      // 음성 인식이 끝났을 때 애니메이션 중지 및 초기 상태로 복귀
      scaleAnim.stopAnimation(() => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isListening, scaleAnim]);

  return (
    <View style={styles.inputWrap}>
      <TouchableOpacity onPress={onVoicePress} style={styles.voiceButton}>
        {/* Animated.View로 감싸서 scale 애니메이션 적용 */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Image source={VoiceIcon} style={styles.voiceIcon} />
        </Animated.View>
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
    // voiceIcon의 크기만큼 영역 유지
    width: 160,
    height: 160,
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

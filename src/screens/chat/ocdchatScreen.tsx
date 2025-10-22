import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  PermissionsAndroid, // PermissionsAndroid 추가
} from 'react-native';
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';

// 💡 @react-native-voice/voice 라이브러리 import
import Voice from '@react-native-voice/voice';

import MainIcon from '../../assets/icon/mainIcon.png';
import BackgroundImage from '../../assets/img/chat/bg.png';

// 메시지 타입 정의
type Message = {
  id: string;
  text: string;
  from: 'AI' | 'User';
  auto: boolean;
};

// 현재 더미 대화의 순서를 추적하는 상태 (파일 스코프 변수로 유지)
let currentDummyIndex = 0;

const OcdChatScreen = ({ navigation }) => {
  // 실제 표시될 메시지 상태. 초기값은 첫 두 개의 AI 메시지입니다.
  const initialMessages = ocddummyMessages.slice(0, 2); // '안녕하세요', '요즘 일상...'
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isListening, setIsListening] = useState(false); // 음성 인식 상태
  const messageCounter = useRef(initialMessages.length); // 메시지 ID 카운터

  // 1. 초기 더미 메시지 순서 설정
  useEffect(() => {
    currentDummyIndex = initialMessages.length;
  }, []);

  const handleMainPress = () => {
    navigation.navigate('main');
  };

  // 2. 새로운 메시지를 목록에 추가하는 함수
  const addNewMessage = useCallback((newMessage: Omit<Message, 'id'>) => {
    setMessages(prev => {
      messageCounter.current += 1;
      return [
        ...prev,
        { ...newMessage, id: messageCounter.current.toString() },
      ];
    });
  }, []);

  // 3. 사용자 메시지 전송 및 AI 응답 로직
  const handleUserMessageSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      // A. 사용자 메시지 추가
      const userMessage: Omit<Message, 'id'> = {
        text: text.trim(),
        from: 'User',
        auto: false,
      };
      addNewMessage(userMessage);

      // B. 다음 AI 더미 응답 찾기 및 추가
      const nextAIMessage = ocddummyMessages.find(
        (msg, index) =>
          index >= currentDummyIndex && msg.from === 'AI' && msg.auto,
      );

      if (nextAIMessage) {
        const aiMessage: Omit<Message, 'id'> = {
          text: nextAIMessage.text,
          from: 'AI',
          auto: true,
        };

        // 1초 후 AI 응답 시뮬레이션
        setTimeout(() => {
          addNewMessage(aiMessage);
          // 더미 인덱스 업데이트
          currentDummyIndex =
            ocddummyMessages.findIndex(msg => msg.id === nextAIMessage.id) + 1;
        }, 1000);
      } else {
        console.log('No more dummy AI responses.');
      }
    },
    [addNewMessage],
  );

  // 4. 음성 인식 리스너 설정
  useEffect(() => {
    const onSpeechStart = (e: any) => {
      setIsListening(true);
    };

    const onSpeechEnd = (e: any) => {
      setIsListening(false);
    };

    const onSpeechError = (e: any) => {
      console.error('Voice Error:', e);
      setIsListening(false);
    };

    const onSpeechResults = (e: any) => {
      if (e.value && e.value.length > 0) {
        handleUserMessageSend(e.value[0]);
      }
    };

    // 리스너 등록
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      // 컴포넌트 언마운트 시 리스너 해제 및 파괴
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [handleUserMessageSend]);

  // 5. 권한 요청 및 음성 인식 시작 함수
  const startListening = async () => {
    try {
      // 💡 Android 마이크 권한 요청 로직 추가
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: '마이크 권한 요청',
          message: '음성 인식 기능을 사용하려면 마이크 접근이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          '권한 거부',
          '마이크 권한이 거부되어 음성 인식을 시작할 수 없습니다.',
        );
        return;
      }

      // 권한이 허용된 경우, 음성 인식 시작
      if (isListening) {
        await Voice.stop();
        return;
      }

      setIsListening(true);
      await Voice.start('ko-KR'); // 한국어 설정
    } catch (e) {
      console.error(e);
      setIsListening(false);
      Alert.alert(
        '음성 인식 오류',
        '음성 인식 중 오류가 발생했습니다. 권한 및 설정을 확인해주세요.',
      );
    }
  };

  const handleVoicePress = () => {
    startListening();
  };

  const handleKeyboardPress = () => {
    // 키보드 입력 기능 구현 시 여기에 로직 추가
    Alert.alert('키보드 입력', '키보드 입력 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>나의 강박에 대해 파악하기</Text>
        <TouchableOpacity onPress={handleMainPress}>
          <Image source={MainIcon} style={styles.mainIcon} />
        </TouchableOpacity>
      </View>
      <ChatMessageList messages={messages} />
      <ChatInput
        onVoicePress={handleVoicePress}
        onKeyboardPress={handleKeyboardPress}
        isListening={isListening}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 2,
  },
  headerText: {
    flex: 1,
    color: '#25252C',
    textAlign: 'left',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '800',
  },
  mainIcon: {
    width: 26,
    height: 26,
    marginLeft: 8,
    resizeMode: 'contain',
  },
});

export default OcdChatScreen;

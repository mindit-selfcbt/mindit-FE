import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Easing,
} from 'react-native';
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';
import MainIcon from '../../assets/icon/mainIcon.png';

const OcdChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const totalMessageCount = ocddummyMessages.length; // 총 더미 메시지 개수 저장

  const handleMainPress = () => {
    navigation.navigate('main');
  };

  const handleSendText = (text: string) => {
    const newUserMessage = {
      id: (messages.length + 1).toString(),
      text,
      type: 'user',
      from: 'User',
      auto: false,
    };

    // 1. 사용자 메시지 추가
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // TODO: 실제 채팅 흐름에서는 여기에 AI 응답 로직을 구현해야 합니다.
  };

  // 1. 컴포넌트 마운트 시 더미 메시지를 순차적으로 표시 (스크롤 속도 조정됨)
  useEffect(() => {
    let timeout = null;
    let index = 0;

    const displayNextMessage = () => {
      if (index < totalMessageCount) {
        const nextMessage = ocddummyMessages[index];
        // 딜레이 250ms로 조정하여 스크롤 속도를 늦추고 부드럽게 표시
        const delay = 250;

        timeout = setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              ...nextMessage,
              auto: false,
            },
          ]);

          index++;
          displayNextMessage(); // 다음 메시지 표시
        }, delay);
      }
    };

    displayNextMessage();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // 2. 대화가 끝났는지 감지하고 화면 이동 로직
  useEffect(() => {
    // 현재 메시지 수가 전체 메시지 수와 같으면 대화 종료로 간주
    if (messages.length > 0 && messages.length === totalMessageCount) {
      // 마지막 메시지 표시 애니메이션이 끝날 시간을 기다린 후 네비게이션 실행
      const navigationDelay = 1000; // 1초 대기 후 이동 (애니메이션 여유 시간)

      const navigateTimeout = setTimeout(() => {
        console.log('대화 종료! 특정 화면(ResultScreen)으로 이동합니다.');

        // **[수정 필요] 여기에 원하는 화면의 이름을 넣어주세요.**
        navigation.navigate('myanxiety');
      }, navigationDelay);

      return () => clearTimeout(navigateTimeout);
    }
  }, [messages.length, totalMessageCount, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>나의 강박에 대해 파악하기</Text>
        <TouchableOpacity onPress={handleMainPress}>
          <Image source={MainIcon} style={styles.mainIcon} />
        </TouchableOpacity>
      </View>

      <ChatMessageList messages={messages} style={styles.messageList} />

      <ChatInput onSendText={handleSendText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEFFE',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerText: {
    flex: 1,
    color: '#25252C',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '800',
  },
  mainIcon: { width: 26, height: 26, marginLeft: 8, resizeMode: 'contain' },
  messageList: {
    flex: 1,
  },
});

export default OcdChatScreen;

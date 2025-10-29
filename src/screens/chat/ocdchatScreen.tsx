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

  // 컴포넌트가 마운트될 때 더미 메시지를 순차적으로 표시
  useEffect(() => {
    let timeout = null;
    let index = 0;

    const displayNextMessage = () => {
      if (index < ocddummyMessages.length) {
        const nextMessage = ocddummyMessages[index];
        // 딜레이를 250ms로 조정하여 스크롤 속도를 늦춤
        const delay = 1000;

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
// C:\mindit-FE\src\screens\chat\ocdchatScreen.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';
import MainIcon from '../../assets/icon/mainIcon.png';

// 초기 메시지 설정은 동일
const initialMessages = ocddummyMessages.filter(m => m.auto).slice(0, 2);

const OcdChatScreen = ({ navigation }) => {
  // ... (state 및 handleMainPress, handleSendText 함수는 동일) ...
  const [messages, setMessages] = useState(initialMessages);
  const [nextAiResponseIndex, setNextAiResponseIndex] = useState(2);

  const handleMainPress = () => {
    navigation.navigate('main');
  };

  const handleSendText = (text: string) => {
    // 1. 사용자 메시지 추가
    const newUserMessage = {
      id: (messages.length + 1).toString(),
      text,
      type: 'user',
      from: 'User',
      auto: false,
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // 2. Mock AI 응답 찾기 및 추가
    const nextAiIndex = ocddummyMessages.findIndex(
      (msg, index) => index >= nextAiResponseIndex && msg.from === 'AI',
    );

    if (nextAiIndex !== -1) {
      const nextAiMessage = ocddummyMessages[nextAiIndex];

      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            ...nextAiMessage,
            id: (prevMessages.length + 2).toString(),
            auto: false,
          },
        ]);

        const nextUserIndex = ocddummyMessages.findIndex(
          (msg, index) => index > nextAiIndex && msg.from === 'User',
        );

        if (nextUserIndex !== -1) {
          setNextAiResponseIndex(nextUserIndex);
        } else {
          setNextAiResponseIndex(ocddummyMessages.length);
        }
      }, 1000);
    }
  };

  return (
    // ⚡ container에 flex: 1을 유지하고, 내부 요소를 수직 배치합니다.
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>나의 강박에 대해 파악하기</Text>
        <TouchableOpacity onPress={handleMainPress}>
          <Image source={MainIcon} style={styles.mainIcon} />
        </TouchableOpacity>
      </View>

      {/* ⚡ 메시지 리스트: flex: 1을 주어 남은 공간을 모두 차지하게 합니다. */}
      <ChatMessageList messages={messages} style={styles.messageList} />

      {/* ⚡ ChatInput: 이제 absolute가 아니므로 목록 바로 아래에 배치됩니다. */}
      <ChatInput onSendText={handleSendText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEFFE',
    // ⚡ justifyContent: 'flex-end' 제거, flex: 1로 전체를 채우게 변경
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
  mainIcon: { width: 26, height: 26, marginLeft: 8, resizeMode: 'contain' },
  messageList: {
    flex: 1, // ChatMessageList에도 flex: 1을 적용합니다.
  },
});

export default OcdChatScreen;

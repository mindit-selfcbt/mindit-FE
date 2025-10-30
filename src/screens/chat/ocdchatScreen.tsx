import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';
import MainIcon from '../../assets/icon/mainIcon.png';

// 다음 메시지 로드를 위한 투명 오버레이 컴포넌트
const NextMessageOverlay = ({ onPress, isVisible }) => {
  if (!isVisible) return null;

  // ChatInput 영역을 제외하고 화면 상단을 덮는 투명 터치 영역
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.nextMessageOverlay}
      activeOpacity={1} // 터치 시 시각적 피드백 없음
    />
  );
};

const OcdChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  // currentIndex를 1로 시작: 첫 번째 메시지 ('안녕하세요 🙂')는 이미 표시된 것으로 간주
  const [currentIndex, setCurrentIndex] = useState(1);
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

    // 1. 사용자가 ChatInput을 통해 실제 메시지를 입력하면, 해당 메시지만 추가됩니다.
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    // NOTE: 더미 흐름은 오직 화면 클릭(`handleNextMessage`)으로만 진행됩니다.
  };

  // 1. 컴포넌트 마운트 시 첫 번째 메시지 ('안녕하세요 🙂')만 표시
  useEffect(() => {
    const firstMessage = ocddummyMessages[0];
    if (firstMessage) {
      // id: '0'으로 설정하여 더미 메시지 id와 충돌 방지
      setMessages([{ ...firstMessage, id: '0' }]);
    }
  }, []); // 빈 배열: 마운트 시 1회 실행

  // 다음 더미 메시지를 표시하는 함수 (클릭 시 실행)
  const handleNextMessage = useCallback(() => {
    // currentIndex가 totalMessageCount보다 작을 때만 다음 메시지 로드
    if (currentIndex < totalMessageCount) {
      const nextMessage = ocddummyMessages[currentIndex];

      setMessages(prevMessages => [
        ...prevMessages,
        {
          ...nextMessage,
          // 새로운 ID 부여
          id: (prevMessages.length + 1).toString(),
        },
      ]);

      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  }, [currentIndex, totalMessageCount]);

  // 2. 대화가 끝났는지 감지하고 화면 이동 로직
  useEffect(() => {
    // currentIndex가 전체 메시지 수와 같아지면 대화 종료
    if (currentIndex > 0 && currentIndex === totalMessageCount) {
      const navigationDelay = 3000; // 1초 대기 후 이동

      const navigateTimeout = setTimeout(() => {
        console.log('대화 종료! 특정 화면(myanxiety)으로 이동합니다.');
        navigation.navigate('myanxiety');
      }, navigationDelay);

      return () => clearTimeout(navigateTimeout);
    }
  }, [currentIndex, totalMessageCount, navigation]);

  // NextMessageOverlay를 표시할지 여부를 결정 (클릭으로 진행할 메시지가 남아있을 경우)
  const isNextMessageOverlayVisible = currentIndex < totalMessageCount;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>나의 강박에 대해 파악하기</Text>
        <TouchableOpacity onPress={handleMainPress}>
          <Image source={MainIcon} style={styles.mainIcon} />
        </TouchableOpacity>
      </View>

      <ChatMessageList messages={messages} style={styles.messageList} />

      {/* NextMessageOverlay: 클릭을 기다리는 시점에 표시 */}
      <NextMessageOverlay
        onPress={handleNextMessage}
        isVisible={isNextMessageOverlayVisible}
      />

      {/* ChatInput: 상시 노출 */}
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
  // NextMessageOverlay 스타일
  nextMessageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    // [⭐️ 핵심]: ChatInput이 차지하는 영역(약 120px)을 제외하고 터치를 잡도록 bottom 조정
    bottom: 120,
    backgroundColor: 'transparent',
    zIndex: 10, // 가장 위에 배치하여 터치 이벤트를 확실히 잡도록 Z-Index 증가
  },
});

export default OcdChatScreen;

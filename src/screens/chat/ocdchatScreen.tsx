import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';
import MainIcon from '../../assets/icon/mainIcon.png';

const OcdChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(ocddummyMessages);

  const handleMainPress = () => {
    navigation.navigate('main');
  };

  // ChatInput에서 전달받은 텍스트를 메시지 상태에 추가
  const handleSendText = (text: string) => {
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, text, type: 'user', from: 'User' },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>나의 강박에 대해 파악하기</Text>
        <TouchableOpacity onPress={handleMainPress}>
          <Image source={MainIcon} style={styles.mainIcon} />
        </TouchableOpacity>
      </View>

      {/* 메시지 리스트 */}
      <ChatMessageList messages={messages} />

      {/* 입력창 */}
      <ChatInput onKeyboardPress={() => {}} onSendText={handleSendText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEFFE',
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
  mainIcon: { width: 26, height: 26, marginLeft: 8, resizeMode: 'contain' },
});

export default OcdChatScreen;

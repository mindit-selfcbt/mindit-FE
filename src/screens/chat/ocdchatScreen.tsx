import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ChatMessageList from '../../components/chatmessageList';
import ChatInput from '../../components/chatInput';
import { ocddummyMessages } from '../../data/ocddummyMessages';
import MainIcon from '../../assets/icon/mainIcon.png';

const initialMessages = ocddummyMessages.filter(m => m.auto).slice(0, 2);

const OcdChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [nextAiResponseIndex, setNextAiResponseIndex] = useState(2);

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
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

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

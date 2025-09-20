import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const MESSAGE_DELAY = 2000; // 조금 더 느리게

const ChatMessageList = ({ messages }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const timeoutRef = useRef();

  useEffect(() => {
    setVisibleMessages([]);
    // 안전한 체크!
    if (Array.isArray(messages) && messages.length > 0) {
      let i = 0;
      function addMsg() {
        setVisibleMessages(prev => [...prev, messages[i]]);
        i++;
        if (i < messages.length) {
          timeoutRef.current = setTimeout(addMsg, MESSAGE_DELAY);
        }
      }
      addMsg();
    }
    return () => clearTimeout(timeoutRef.current);
  }, [messages]);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.from === 'User' ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={styles.flatListPadding}
      data={visibleMessages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatListPadding: {
    paddingHorizontal: 18,
    paddingBottom: 12,
    paddingTop: 20,
  },
  messageBubble: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.80)',
    maxWidth: '85%',
  },
  aiBubble: {
    alignSelf: 'flex-start',
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#343B61',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 28.8,
  },
});

export default ChatMessageList;

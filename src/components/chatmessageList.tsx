import React, { useEffect, useRef, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const MESSAGE_DELAY = 2000;

const ChatMessageList = ({ messages }) => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const flatListRef = useRef(null);
  const timeoutRef = useRef();

  useEffect(() => {
    setVisibleMessages([]);
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

  useEffect(() => {
    if (flatListRef.current && visibleMessages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [visibleMessages]);

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
      ref={flatListRef}
      contentContainerStyle={styles.flatListPadding}
      data={visibleMessages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatListPadding: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 220, // ChatInput와 겹치지 않도록 충분한 여백
  },
  messageBubble: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.80)',
    maxWidth: '85%',
  },
  aiBubble: { alignSelf: 'flex-start' },
  userBubble: { alignSelf: 'flex-end' },
  messageText: {
    color: '#343B61',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28.8,
  },
});

export default ChatMessageList;

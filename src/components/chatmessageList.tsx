import React, { useRef, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const ChatMessageList = ({ messages, style }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleContentSizeChange = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.from === 'User' ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text
        style={[styles.messageText, item.from === 'User' && styles.userText]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={[{ flex: 1 }, style]}>
      <FlatList
        ref={flatListRef}
        style={styles.flatList}
        contentContainerStyle={styles.flatListPadding}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleContentSizeChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  flatListPadding: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageBubble: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    maxWidth: '85%',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.80)',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#6289E8',
  },
  messageText: {
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28.8,
    color: '#343B61',
  },
  userText: {
    color: '#FFFFFF',
  },
});

export default ChatMessageList;

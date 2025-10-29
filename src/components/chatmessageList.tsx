import React, { useRef, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, Animated } from 'react-native';

const AnimatedMessageBubble = ({ item, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <View
        style={[
          styles.messageBubble,
          item.from === 'User' ? styles.userBubble : styles.aiBubble,
        ]}
      >
        {children}
      </View>
    </Animated.View>
  );
};

const ChatMessageList = ({ messages, style }) => {
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      // animated: true 유지하여 부드러운 스크롤
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleContentSizeChange = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item }) => (
    <AnimatedMessageBubble item={item}>
      <Text
        style={[styles.messageText, item.from === 'User' && styles.userText]}
      >
        {item.text}
      </Text>
    </AnimatedMessageBubble>
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
    // paddingBottom을 150으로 증가시켜 마지막 메시지 잘림 방지
    paddingBottom: 300,
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
// C:\mindit-FE\src\components\chatmessageList.tsx

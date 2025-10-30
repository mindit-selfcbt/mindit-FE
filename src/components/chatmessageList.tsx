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
          styles.messageWrapper,
          item.from === 'User' ? styles.userWrapper : styles.aiWrapper,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            item.from === 'User' ? styles.userBubble : styles.aiBubble,
          ]}
        >
          {children}
        </View>
      </View>
    </Animated.View>
  );
};

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
    <AnimatedMessageBubble item={item}>
      <Text
        style={[
          styles.messageText,
          item.from === 'User' ? styles.userText : styles.aiText,
        ]}
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
    paddingBottom: 300,
  },

  // 버블 너비 자동 조정 및 정렬을 위한 래퍼 (Wrapper)
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  aiWrapper: {
    justifyContent: 'flex-start',
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },

  messageBubble: {
    padding: 16,
    borderRadius: 16,
    maxWidth: '85%',
    // [⭐️ 확인]: View 컴포넌트는 기본적으로 내용물에 맞게 너비를 조정하므로,
    // 이전에 제거한 alignSelf 대신, 이 maxWidth를 통해 최대 너비만 제한합니다.
  },
  aiBubble: {
    backgroundColor: 'rgba(255,255,255,0.80)',
  },
  userBubble: {
    backgroundColor: '#6289E8',
  },

  // 텍스트 스타일 및 정렬
  messageText: {
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28.8,
    color: '#343B61',
  },
  aiText: {
    // AI 메시지는 왼쪽 정렬 유지
    textAlign: 'left',
  },
  userText: {
    color: '#FFFFFF',
    // [⭐️ 수정]: 사용자 메시지는 오른쪽 정렬을 통해 오른쪽 끝이 꽉 찬 느낌을 주도록 유지
    textAlign: 'right',
  },
});

export default ChatMessageList;

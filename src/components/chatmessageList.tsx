import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, Animated } from 'react-native';

// [복원] 메시지 표시 지연 시간 (밀리초): 3.0초
const MESSAGE_DELAY = 1500;
// 배경색이 흐려지는 애니메이션 시작 지연 시간 (밀리초): 30초 유지
const ANIMATION_DELAY = 1500;
const ANIMATION_DURATION = 800;

// 메시지 객체의 타입 정의
type Message = {
  id: string;
  text: string;
  from: 'AI' | 'User';
  auto: boolean;
};

// visibleMessages 상태에 사용할 타입 정의
type VisibleMessage = Message & {
  bgColorAnim: Animated.Value;
};

const ChatMessageList = ({ messages }: { messages: Message[] }) => {
  const [visibleMessages, setVisibleMessages] = useState<VisibleMessage[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const flatListRef = useRef<FlatList<VisibleMessage>>(null);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // [복원] visibleMessages를 초기화하고 순차적으로 로딩 시작
    setVisibleMessages([]);

    if (Array.isArray(messages) && messages.length > 0) {
      let i = 0;

      const addMsg = () => {
        const newMessage: VisibleMessage = {
          ...messages[i],
          bgColorAnim: new Animated.Value(0), // 초기 밝은 흰색 (투명도 1.0)
        };

        // 1. 새 메시지를 목록에 추가
        setVisibleMessages(prev => [...prev, newMessage]);

        // 2. 배경색 애니메이션 시작: 밝은 흰색(0) -> 흐린 흰색(1)
        Animated.timing(newMessage.bgColorAnim, {
          toValue: 1, // 목표 투명도 (0.40)
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
          delay: ANIMATION_DELAY, // 30초 지연 적용
        }).start();

        i++;
        if (i < messages.length) {
          // [복원] 다음 메시지를 MESSAGE_DELAY (3.0초) 후 추가
          timeoutRef.current = setTimeout(addMsg, MESSAGE_DELAY);
        }
      };

      // 첫 메시지는 지연 없이 바로 시작
      addMsg();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [messages]);

  const renderItem = ({ item }: { item: VisibleMessage }) => {
    // 애니메이션 값에 따라 배경색을 보간(interpolate)
    // 시작: rgba(255, 255, 255, 1.0) -> 끝: rgba(255, 255, 255, 0.40)
    const interpolatedColor = item.bgColorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 1.0)', 'rgba(255, 255, 255, 0.40)'],
    });

    // 버블 스타일
    const bubbleStyle = [
      styles.messageBubble,
      item.from === 'User' ? styles.userBubble : styles.aiBubble,
      { backgroundColor: interpolatedColor }, // 애니메이션 배경색 적용
    ];

    return (
      <Animated.View style={bubbleStyle}>
        <Text style={styles.messageText}>{item.text}</Text>
      </Animated.View>
    );
  };

  return (
    <FlatList<VisibleMessage>
      ref={flatListRef}
      contentContainerStyle={styles.flatListPadding}
      data={visibleMessages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      // 메시지가 추가될 때마다 자동으로 맨 아래로 스크롤
      onContentSizeChange={scrollToBottom}
    />
  );
};

const styles = StyleSheet.create({
  flatListPadding: {
    paddingHorizontal: 18,
    // 입력 컴포넌트 가림 현상 방지를 위해 250px로 확대 유지
    paddingBottom: 250,
    paddingTop: 20,
  },
  messageBubble: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
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

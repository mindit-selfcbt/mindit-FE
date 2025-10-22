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

// **[수정]**: `messages` 타입을 Message[]로 변경
const ChatMessageList = ({ messages }: { messages: Message[] }) => {
  // [수정] visibleMessages 상태를 제거하고, prop으로 받은 messages를 직접 사용합니다.
  // 대신, Animated.Value를 관리하기 위해 Map을 사용하거나, messages를 VisibleMessage[]로 변환하는 로직이 필요합니다.
  // 여기서는 단순화를 위해 prop을 기반으로 Animated.Value를 생성합니다.

  const flatListRef = useRef<FlatList<VisibleMessage>>(null);
  // [삭제/주석 처리] const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = useCallback(() => {
    if (flatListRef.current) {
      // 다음 렌더링 사이클에서 스크롤을 수행하도록 짧은 지연 시간 설정
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50); // 50ms 지연
    }
  }, []);

  // [수정]: messages prop이 변경될 때마다 메시지 목록을 생성합니다.
  // 이제 메시지는 한 번에 표시되며, 자동 로딩 지연은 제거됩니다.
  const [animatedMessages, setAnimatedMessages] = useState<VisibleMessage[]>(
    [],
  );

  useEffect(() => {
    // **[수정]**: props의 모든 메시지에 대해 Animated.Value를 생성하고 애니메이션을 시작합니다.
    const newAnimatedMessages: VisibleMessage[] = messages.map(msg => {
      // 이미 생성된 애니메이션 값은 유지
      const existingMsg = animatedMessages.find(am => am.id === msg.id);

      const newMsg: VisibleMessage = {
        ...msg,
        bgColorAnim: existingMsg
          ? existingMsg.bgColorAnim
          : new Animated.Value(0),
      };

      // 새로 추가된 메시지이거나 애니메이션이 시작되지 않은 경우에만 시작
      if (!existingMsg) {
        // 2. 배경색 애니메이션 시작: 밝은 흰색(0) -> 흐린 흰색(1)
        Animated.timing(newMsg.bgColorAnim, {
          toValue: 1, // 목표 투명도 (0.40)
          duration: ANIMATION_DURATION,
          useNativeDriver: false,
          delay: ANIMATION_DELAY,
        }).start();
      }

      return newMsg;
    });

    setAnimatedMessages(newAnimatedMessages);
    // messages prop이 변경될 때만 실행
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
      // [수정] prop 대신, Animated.Value가 적용된 animatedMessages 사용
      data={animatedMessages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      // 메시지가 추가될 때마다 자동으로 맨 아래로 스크롤
      onContentSizeChange={scrollToBottom}
    />
  );
};

const styles = StyleSheet.create({
  // ... (styles는 변경 없음)
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

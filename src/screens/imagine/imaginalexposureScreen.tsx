import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
} from 'react-native';

const chattingData = [
  // 1. 훈련 시작 및 불안 유도
  {
    id: 1,
    type: 'other',
    text: '이제 상상 속에서 오늘 외출을 준비해봅시다.\n아침이에요. 어떤 생각이 떠오르나요?',
  },
  {
    id: 2,
    type: 'me',
    text: '오늘도 버스를 놓칠까봐 불안해요.\n미리 앱으로 버스 위치를 확인하고 싶고 안절부절하고 있어요.',
  },
  {
    id: 3,
    type: 'other',
    text: '그렇군요. 오늘은 딱 한 번만 확인한 뒤에는 다시 확인하지 않고 준비를 계속해봅시다. 어떻게 준비하나요?',
  },

  // 2. 강박적 행동(확인) 차단 및 불안 고조
  {
    id: 4,
    type: 'me',
    text: '한 번만 확인하고 나왔는데, 버스가 갑자기 빨리 올까 봐 불안해서 심장이 뛰어요. 다시 확인해야 할 것 같아요.',
  },
  {
    id: 5,
    type: 'other',
    text: '불안함은 당연한 감정이에요. 하지만 우리는 다시 확인하지 않고 상상을 이어갈 겁니다. 지금 당신은 현관문을 잠그고 엘리베이터 앞에 섰습니다. 불안 수치가 10점 만점에 몇 점인가요?',
  },
  {
    id: 6,
    type: 'me',
    text: '8점입니다. 현관문이 정말 잠겼는지, 가스 밸브는 잠갔는지, 혹시 집을 비우는 사이에 큰일이 날까봐 온갖 생각이 다 들어요.',
  },

  // 3. 상상 속에서 회피 행동 방지 및 의도적 노출
  {
    id: 7,
    type: 'other',
    text: '숨을 깊게 들이쉬고, 그 생각들을 느껴보세요. 문이 안 잠겼을 때 일어날 수 있는 가장 끔찍한 일을 상상해봅시다. 당신은 이미 버스 정류장에 도착했고, 버스가 오지 않아 늦고 있어요. 그때 스마트폰을 켜보니 뉴스에서 집에 관한 불길한 소식이 들립니다.',
  },
  {
    id: 8,
    type: 'me',
    text: '으, 너무 소름 끼쳐요. 제가 늦게 도착해서 모든 것을 망치는 상상이 계속 돼요. 땀이 나고 견디기 힘들어요. 상상을 멈추고 싶어요.',
  },

  // 4. 불안 수용 및 현실로 돌아오기 유도
  {
    id: 9,
    type: 'other',
    text: '잠시 멈추고 호흡을 고릅시다. 지금 당신의 불안 수치는요? 이 모든 일은 상상 속에서만 일어난 일이라는 것을 다시 한번 기억하세요. 이 불안을 그대로 받아들인 채 버스에 탑승해봅시다.',
  },
  {
    id: 10,
    type: 'me',
    text: '불안 수치가 6점으로 조금 내려갔어요. 지금은 버스 맨 뒷자리에 앉아 바깥 풍경을 보고 있어요. 아직도 찝찝하지만, 상상을 계속할 수 있을 것 같아요.',
  },

  // 5. 훈련 마무리 및 강박 재정의
  {
    id: 11,
    type: 'other',
    text: '훌륭합니다. 버스는 목적지에 도착했고, 당신은 무사히 모든 일정을 마쳤습니다. 이번 훈련에서 확인하지 않았음에도 일상이 무너지지 않는다는 것을 상상했습니다. 이 순간 당신의 강박적 사고는 어떤 모습으로 느껴지나요?',
  },
  {
    id: 12,
    type: 'me',
    text: '강박적 사고는 나를 보호하려는 목소리지만, 그저 나를 괴롭히는 소음처럼 느껴집니다.',
  },
  {
    id: 13,
    type: 'other',
    text: '잘 정의했습니다. 이 느낌을 기억하고, 이 경험을 현실에서도 적용할 수 있도록 계속 노력합시다. 오늘 훈련은 여기서 마칩니다. 수고하셨습니다.',
  },
];

const { width: windowWidth } = Dimensions.get('window');

const icons = {
  mic: require('../../assets/icon/micIcon.png'),
};

const ChatMessage = React.memo(({ msg, isMyMsg, delay }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [fadeAnim, delay]);

  const msgBoxStyle = isMyMsg ? styles.myMsgBox : styles.otherMsgBox;
  const msgTextStyle = isMyMsg ? styles.myMsgText : styles.otherMsgText;
  const msgAlignStyle = isMyMsg ? styles.myMsgAlign : {};

  return (
    <Animated.View
      style={[styles.msgContainer, msgAlignStyle, { opacity: fadeAnim }]}
    >
      <View style={msgBoxStyle}>
        <Text style={msgTextStyle}>{msg.text}</Text>
      </View>
    </Animated.View>
  );
});

const ImaginalexposureScreen = ({ navigation }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const [isSubtitleOn, setIsSubtitleOn] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);

  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollViewRef = useRef();

  useEffect(() => {
    let timers = [];
    setVisibleMessages([]);

    if (isSubtitleOn) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        chattingData.forEach((msg, index) => {
          const delay = 500 + index * 2000;

          const timer = setTimeout(() => {
            setVisibleMessages(prev => [...prev, msg]);
          }, delay);
          timers.push(timer);
        });
      });
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisibleMessages([]);
      });
    }

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isSubtitleOn, fadeAnim]);

  useEffect(() => {
    if (scrollViewRef.current && visibleMessages.length > 0) {
      const scrollTimer = setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 200);
      return () => clearTimeout(scrollTimer);
    }
  }, [visibleMessages]);

  const toggleIcons = {
    sound: {
      on: require('../../assets/icon/soundonIcon.png'),
      off: require('../../assets/icon/soundoffIcon.png'),
    },
    voice: {
      on: require('../../assets/icon/voiceonIcon.png'),
      off: require('../../assets/icon/voiceoffIcon.png'),
    },
    subtitle: {
      on: require('../../assets/icon/subtitleonIcon.png'),
      off: require('../../assets/icon/subtitleoffIcon.png'),
    },
    exit: require('../../assets/icon/exitIcon.png'),
  };

  const toggleSound = () => setIsSoundOn(prev => !prev);
  const toggleVoice = () => setIsVoiceOn(prev => !prev);
  const toggleSubtitle = () => setIsSubtitleOn(prev => !prev);

  const handleChatBarPress = () => {
    console.log('Chat bar pressed (Placeholder)');
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.topIconRow}>
          <TouchableOpacity onPress={toggleSound}>
            <Image
              source={isSoundOn ? toggleIcons.sound.on : toggleIcons.sound.off}
              style={styles.iconImg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleVoice}>
            <Image
              source={isVoiceOn ? toggleIcons.voice.on : toggleIcons.voice.off}
              style={styles.iconImg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSubtitle}>
            <Image
              source={
                isSubtitleOn
                  ? toggleIcons.subtitle.on
                  : toggleIcons.subtitle.off
              }
              style={styles.iconImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('main');
            }}
          >
            <Image source={toggleIcons.exit} style={styles.iconImg} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentArea}>
          {!isSubtitleOn && (
            <Image
              source={require('../../assets/img/imagine/profileImg1.png')}
              style={styles.colorCircleImage}
              resizeMode="contain"
            />
          )}

          <Animated.View
            style={[styles.chatAreaWrapper, { opacity: fadeAnim }]}
          >
            {isSubtitleOn && (
              <ScrollView
                ref={scrollViewRef}
                style={styles.chatScrollView}
                contentContainerStyle={styles.chatContentContainer}
                automaticallyAdjustContentInsets={false}
                contentInsetAdjustmentBehavior="never"
              >
                {visibleMessages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id}
                    msg={msg}
                    isMyMsg={msg.type === 'me'}
                    delay={0}
                  />
                ))}
              </ScrollView>
            )}
          </Animated.View>
        </View>

        {isSubtitleOn && (
          <KeyboardAvoidingView
            style={styles.inputWrap}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
          >
            <TouchableOpacity
              style={styles.chatBar}
              activeOpacity={0.75}
              onPress={handleChatBarPress}
              pointerEvents="auto"
            >
              <Image source={icons.mic} style={styles.micIcon} />
              <Text style={styles.chatPlaceholder}>
                천천히 상상해보고, 생각을 적어주세요
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#D4E4FF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D4E4FF',
  },
  topIconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingTop: 40,
    paddingRight: 24,
    marginBottom: 20,
    gap: 12,
  },
  iconImg: {
    width: 40,
    height: 40,
  },
  contentArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCircleImage: {
    width: 200,
    height: 200,
    marginBottom: 200,
  },
  chatAreaWrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 0,
    bottom: 0,
  },
  chatScrollView: {
    flex: 1,
  },
  chatContentContainer: {
    paddingTop: 12,
    paddingBottom: 16 + 84,
  },
  msgContainer: {
    marginTop: 20,
    marginBottom: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  myMsgAlign: {
    justifyContent: 'flex-end',
  },
  myMsgBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    maxWidth: windowWidth * 0.8,
    overflow: 'hidden',
  },
  myMsgText: {
    color: '#343B61',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28.8,
    textAlign: 'right',
  },
  otherMsgBox: {
    maxWidth: windowWidth * 0.9,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  otherMsgText: {
    color: '#343B61',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28.8,
    textAlign: 'left',
  },
  inputWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  chatBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth - 32,
    maxWidth: 380,
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    gap: 8,
  },
  micIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  chatPlaceholder: {
    color: '#9DA4B0',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    flex: 1,
    textAlign: 'left',
  },
});

export default ImaginalexposureScreen;

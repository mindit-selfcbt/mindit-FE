import React, { useState, useEffect } from 'react';
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
} from 'react-native';

const chattingData = [
  {
    id: 1,
    type: 'other',
    text: '이제 상상 속에서 오늘 외출을 준비해봅시다.\n아침이에요. 어떤 생각이 떠오르나요?',
  },
  {
    id: 2,
    type: 'me',
    text: '오늘도 버스를 놓칠까봐 불안해요.\n미리 앱으로 버스 위치를 확인하고 싶어요.',
  },
  {
    id: 3,
    type: 'other',
    text: '그렇군요. 오늘은 딱 한 번만 확인한 뒤에는\n다시 확인하지 않고 준비를 이어가볼게요.\n어떤 준비물을 챙기나요?',
  },
];

const { width } = Dimensions.get('window');

const ImaginalexposureScreen = ({ navigation }) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const [isSubtitleOn, setIsSubtitleOn] = useState(false);

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isSubtitleOn) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSubtitleOn, fadeAnim]);

  const icons = {
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

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.topIconRow}>
          <TouchableOpacity onPress={toggleSound}>
            <Image
              source={isSoundOn ? icons.sound.on : icons.sound.off}
              style={styles.iconImg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleVoice}>
            <Image
              source={isVoiceOn ? icons.voice.on : icons.voice.off}
              style={styles.iconImg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleSubtitle}>
            <Image
              source={isSubtitleOn ? icons.subtitle.on : icons.subtitle.off}
              style={styles.iconImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('main');
            }}
          >
            <Image source={icons.exit} style={styles.iconImg} />
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

          {isSubtitleOn && (
            <Animated.View style={[styles.chatArea, { opacity: fadeAnim }]}>
              {chattingData.map(msg =>
                msg.type === 'me' ? (
                  <View
                    key={msg.id}
                    style={[styles.msgContainer, styles.myMsgAlign]}
                  >
                    <View style={styles.myMsgBox}>
                      <Text style={styles.myMsgText}>{msg.text}</Text>
                    </View>
                  </View>
                ) : (
                  <View key={msg.id} style={styles.msgContainer}>
                    <View style={styles.otherMsgBox}>
                      <Text style={styles.otherMsgText}>{msg.text}</Text>
                    </View>
                  </View>
                ),
              )}
            </Animated.View>
          )}
        </View>

        {isSubtitleOn && (
          <KeyboardAvoidingView
            style={styles.inputWrap}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.inputArea}>
              <Text style={styles.inputPlaceholder}>
                천천히 상상해보고, 생각을 적어주세요
              </Text>
            </View>
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
  chatArea: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 0,
    marginTop: 16,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    maxWidth: width * 0.9,
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
    maxWidth: width * 0.9,
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  inputArea: {
    width: 360,
    height: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: 'rgba(255,255,255,0.40)',
  },
  inputPlaceholder: {
    color: '#9DA4B0',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default ImaginalexposureScreen;

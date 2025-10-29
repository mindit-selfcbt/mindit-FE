import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AnxietyStartModal from '../../components/anxietystartModal';
import AnxietyExitModal from '../../components/anxietyexitModal';
import PulsingCircleInteraction from '../../components/pulsingcircleInteraction';

const exitIcon = require('../../assets/icon/exitIcon.png');

const ResponsePreventionScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  // 💡 수정된 부분: 초기 불안 정도를 50에서 0으로 변경
  const [anxiety, setAnxiety] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(
    '첫 불안 정도 입력을 완료했다면\n화면을 꾹 눌러 바로 반응 방지를 시작하세요',
  );

  useEffect(() => {
    setModalVisible(true);
  }, []);

  useEffect(() => {
    let interval = null;

    if (isPulsing) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;

          if (newSeconds === 5) {
            setMessage('좋아요. 지금처럼 천천히 호흡에 집중해보세요.');
          } else if (newSeconds === 10) {
            setMessage(
              '괜찮아요, 불안은 곧 잦아듭니다.\n당신은 이미 잘하고 있어요.',
            );
          } else if (newSeconds === 20) {
            setMessage(
              '불안을 피하지 않고 마주하는 건\n용기가 필요한 일이에요.',
            );
          } else if (newSeconds === 35) {
            setMessage(
              '조금 힘들 수 있지만,\n이 순간은 당신의 회복 과정이에요.',
            );
          } else if (newSeconds === 50) {
            setMessage(
              '절대 잘못된 감정이 아니에요.\n당신의 몸이 적응하고 있어요.',
            );
          } else if (newSeconds === 70) {
            setMessage(
              '호흡을 한 번 더 깊게, 천천히.\n당신이 통제하고 있습니다.',
            );
          } else if (newSeconds === 90) {
            setMessage('이제 조금 익숙해졌죠?\n불안은 이미 줄어들고 있어요.');
          } else if (newSeconds === 110) {
            setMessage(
              '마지막까지 잘 버텨줬어요.\n이 경험이 당신을 더 강하게 만들 거예요.',
            );
          } else if (newSeconds === 120) {
            setMessage('2분을 완주했어요.\n당신은 해냈습니다. 정말 잘했어요.');
          }

          return newSeconds;
        });
      }, 1000);
    } else if (!isPulsing && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPulsing, seconds]);

  const handleClose = () => {
    setIsPulsing(false);
    navigation.replace('main');
  };

  const handleCompleteExit = () => {
    setExitModalVisible(false);
    setIsPulsing(false);
    navigation.replace('exitresponseprevention', {
      initialAnxiety: anxiety,
      secondsSpent: seconds,
    });
  };

  const handleModalStart = () => {
    setModalVisible(false);
    setIsStarted(true);
    setMessage(
      '첫 불안 정도 입력을 완료했다면\n화면을 꾹 눌러 바로 반응 방지를 시작하세요',
    );
  };

  const setPulsingState = state => {
    setIsPulsing(state);
  };

  const handlePressInCircle = () => {};

  const handlePressOutCircle = () => {
    if (isStarted && isPulsing) {
      setIsPulsing(false);
      setExitModalVisible(true);
    } else {
      setIsPulsing(false);
    }
  };

  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.pulsingInteractionWrapper}>
        <PulsingCircleInteraction
          isStarted={isStarted}
          isPlaying={isPulsing}
          handlePressIn={handlePressInCircle}
          handlePressOut={handlePressOutCircle}
          setPulsingState={setPulsingState}
        />
      </View>

      <View style={styles.timerAbsolute}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.exitBtn}
        onPress={handleClose}
        activeOpacity={0.8}
      >
        <Image source={exitIcon} style={styles.exitIcon} />
      </TouchableOpacity>

      {isStarted && !modalVisible && !exitModalVisible && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      <AnxietyStartModal
        visible={modalVisible}
        anxiety={anxiety}
        setAnxiety={setAnxiety}
        onStart={handleModalStart}
        onClose={() => setModalVisible(false)}
      />

      <AnxietyExitModal
        visible={exitModalVisible}
        anxiety={anxiety}
        setAnxiety={setAnxiety}
        onComplete={handleCompleteExit}
        onCancel={() => {
          setExitModalVisible(false);
        }}
      />
    </View>
  );
};

export default ResponsePreventionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    width: '100%',
  },
  pulsingInteractionWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  timerAbsolute: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },
  timerBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.60)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 40,
  },
  timerText: {
    color: '#3557D4',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28.8,
    letterSpacing: 1,
  },
  exitBtn: {
    position: 'absolute',
    top: 55,
    right: 24,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  exitIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  messageBox: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 30,
  },
  messageText: {
    color: '#717780',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});

// C:\mindit-FE\src\screens\aiarexposure\aiexposureScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AnxietyStartModal from '../../components/aistartModal';
import AnxietyExitModal from '../../components/aiexitModal';
import AIVideoInteraction from '../../components/aivideoInteraction';

const exitIcon = require('../../assets/icon/exitIcon.png');

const AIExposureScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [anxiety, setAnxiety] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(
    '첫 불안 정도 입력을 완료했다면\n화면을 꾹 눌러 AI 사진 노출을 시작하세요',
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
            setMessage('화면의 원을 따라 손을 움직여주세요');
          } else if (newSeconds === 10) {
            setMessage('잘하고 있어요, 계속 집중해보세요');
          } else if (newSeconds === 15) {
            setMessage('조금 불편할 수 있어요, 괜찮아요');
          } else if (newSeconds === 20) {
            setMessage('이 감정을 피하려 하지 마세요');
          } else if (newSeconds === 30) {
            setMessage('호흡에 집중하며 천천히 진행해요');
          } else if (newSeconds === 40) {
            setMessage('지금 이 순간을 느껴보세요');
          } else if (newSeconds === 50) {
            setMessage('반응 없이 버티는 시간이 핵심입니다');
          } else if (newSeconds === 60) {
            setMessage('아주 잘하고 있어요, 조금만 더!');
          } else if (newSeconds === 75) {
            setMessage('불안이 점점 줄어드는 걸 느껴보세요');
          } else if (newSeconds === 90) {
            setMessage('잘하고 있어요. 호흡에 집중하세요');
          } else if (newSeconds === 105) {
            setMessage('거의 다 왔어요, 힘내세요!');
          } else if (newSeconds === 120) {
            setMessage('2분을 완주했어요! 정말 잘했어요');
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
    navigation.replace('ailoading', {
      initialAnxiety: anxiety,
      secondsSpent: seconds,
    });
  };

  const handleModalStart = () => {
    setModalVisible(false);
    setIsStarted(true);
    setMessage('화면을 꾹 눌러서 시작하고\n 원을 따라 손을 움직여주세요');
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
        <AIVideoInteraction
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
        onComplete={handleCompleteExit} // onComplete를 전달함
        onCancel={() => {
          setExitModalVisible(false);
          if (isStarted) {
            setIsPulsing(true);
          }
        }}
      />
    </View>
  );
};

export default AIExposureScreen;

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
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

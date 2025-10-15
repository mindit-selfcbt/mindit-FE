import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AnxietyStartModal from '../../components/anxietystartModal';
import PulsingCircleInteraction from '../../components/pulsingcircleInteraction';

const exitIcon = require('../../assets/icon/exitIcon.png');

const ResponsePreventionScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [anxiety, setAnxiety] = useState(50);
  const [isStarted, setIsStarted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(
    '첫 불안 정도 입력을 완료했다면\n화면을 꾹 눌러 바로 반응 방지를 시작하세요',
  );

  useEffect(() => {
    setModalVisible(true);
  }, []);

  // 🔹 타이머 로직
  useEffect(() => {
    let interval = null;

    if (isPulsing) {
      console.log('⏳ Timer started');
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          if (newSeconds === 15) {
            console.log('💬 15 seconds passed — showing motivational message');
            setMessage(
              '지금 느끼는 불안은 잘못된 게 아니에요.\n치료가 작동하고 있다는 증거예요.',
            );
          }
          return newSeconds;
        });
      }, 1000);
    } else if (!isPulsing && seconds !== 0) {
      console.log('⏹️ Timer stopped');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPulsing, seconds]);

  const handleClose = () => {
    console.log('🚪 Exit button pressed');
    setIsPulsing(false);
    navigation.replace('main');
  };

  const handleModalStart = () => {
    console.log('▶️ Session started');
    setModalVisible(false);
    setIsStarted(true);
    setMessage(
      '첫 불안 정도 입력을 완료했다면\n화면을 꾹 눌러 바로 반응 방지를 시작하세요',
    );
  };

  const setPulsingState = state => {
    console.log(`🌕 Pulsing state changed: ${state}`);
    setIsPulsing(state);
  };

  const handlePressInCircle = () => {
    console.log('🟢 User pressed in (handlePressInCircle)');
  };

  const handlePressOutCircle = () => {
    console.log('🔴 User pressed out (handlePressOutCircle)');
    setIsPulsing(false);
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
      {/* PulsingCircleInteraction */}
      <View style={styles.pulsingInteractionWrapper}>
        <PulsingCircleInteraction
          isStarted={isStarted}
          isPlaying={isPulsing}
          handlePressIn={handlePressInCircle}
          handlePressOut={handlePressOutCircle}
          setPulsingState={setPulsingState}
        />
      </View>

      {/* Timer */}
      <View style={styles.timerAbsolute}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      </View>

      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitBtn}
        onPress={handleClose}
        activeOpacity={0.8}
      >
        <Image source={exitIcon} style={styles.exitIcon} />
      </TouchableOpacity>

      {/* Message */}
      {isStarted && !modalVisible && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      {/* Anxiety Start Modal */}
      <AnxietyStartModal
        visible={modalVisible}
        anxiety={anxiety}
        setAnxiety={setAnxiety}
        onStart={handleModalStart}
        onClose={() => setModalVisible(false)}
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
    top: 54,
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
    top: 54,
    right: 24,
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.60)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  exitIcon: {
    width: 28,
    height: 28,
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

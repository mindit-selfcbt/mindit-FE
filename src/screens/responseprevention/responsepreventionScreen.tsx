import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AnxietyStartModal from '../../components/anxietystartModal';
import PulsingCircleInteraction from '../../components/pulsingcircleInteraction';

const exitIcon = require('../../assets/icon/exitIcon.png');

const ResponsePreventionScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [anxiety, setAnxiety] = useState(50);

  const [isStarted, setIsStarted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false); // 비디오 재생 및 타이머 제어 상태
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(
    '첫 불안 정도 입력을 완료했다면\n원을 눌러 바로 반응 방지를 시작하세요',
  );

  useEffect(() => {
    setModalVisible(true);
  }, []);

  // 타이머 로직: isPulsing 상태에 따라 작동
  useEffect(() => {
    let interval = null;

    if (isPulsing) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;

          if (newSeconds === 15) {
            setMessage(
              '지금 느끼는 불안은 잘못된 게 아니에요.\n치료가 작동하고 있다는 증거예요.',
            );
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

  const handleModalStart = () => {
    setModalVisible(false);
    setIsStarted(true);
    setMessage(
      '첫 불안 정도 입력을 완료했다면\n원을 눌러 바로 반응 방지를 시작하세요',
    );
  };

  // 원을 가볍게 터치했을 때 isPulsing 상태를 토글하는 함수
  const handleCirclePress = () => {
    if (isStarted) {
      setIsPulsing(prev => !prev);
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
      {/* 타이머 */}
      <View style={styles.timerAbsolute}>
        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      </View>

      {/* 종료 버튼 */}
      <TouchableOpacity
        style={styles.exitBtn}
        onPress={handleClose}
        activeOpacity={0.8}
      >
        <Image source={exitIcon} style={styles.exitIcon} />
      </TouchableOpacity>

      {/* PulsingCircleInteraction 컴포넌트 */}
      <PulsingCircleInteraction
        isStarted={isStarted}
        isPlaying={isPulsing}
        handlePress={handleCirclePress}
      />

      {/* 하단 메시지 영역 표시 */}
      {isStarted && !modalVisible && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}

      {/* 불안 입력 모달 */}
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
    alignItems: 'center',
    justifyContent: 'center', // 중앙 정렬
    width: '100%',
  },
  timerAbsolute: {
    position: 'absolute',
    top: 54,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
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
    zIndex: 3,
  },
  exitIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  messageBox: {
    position: 'absolute',
    bottom: 50, // 하단 위치
    alignItems: 'center',
    paddingHorizontal: 30,
    // ✅ zIndex 제거: 낮은 zIndex를 유지하여 터치 영역을 덮지 않도록 함
  },
  messageText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});

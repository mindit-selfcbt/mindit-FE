import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, Easing } from 'react-native';
import Video from 'react-native-video';

const pulsingVideo = require('../assets/videos/pulsingcircle.mp4');

// 맥박 애니메이션 상수 설정
const PULSE_SCALE_MIN = 1.0;
const PULSE_SCALE_MAX = 1.05;
const PULSE_DURATION = 1000;
const CIRCLE_SIZE = 300;

const PulsingCircleInteraction = ({ isStarted, isPlaying, handlePress }) => {
  const pulseScaleAnim = useRef(new Animated.Value(PULSE_SCALE_MIN)).current;

  const startPulsingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseScaleAnim, {
          toValue: PULSE_SCALE_MAX,
          duration: PULSE_DURATION / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseScaleAnim, {
          toValue: PULSE_SCALE_MIN,
          duration: PULSE_DURATION / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 },
    ).start();
  };

  useEffect(() => {
    if (isPlaying) {
      startPulsingAnimation();
    } else {
      pulseScaleAnim.stopAnimation();
      Animated.timing(pulseScaleAnim, {
        toValue: PULSE_SCALE_MIN,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isPlaying, pulseScaleAnim]);

  const onCirclePress = () => {
    // ✅ 디버깅: 터치 이벤트가 발생하는지 확인
    console.log(
      'Circle Pressed! isStarted:',
      isStarted,
      ' isPlaying:',
      isPlaying,
    );
    if (isStarted) {
      handlePress();
    }
  };

  return (
    <TouchableOpacity
      disabled={!isStarted}
      onPress={onCirclePress}
      activeOpacity={1.0}
      style={styles.touchArea}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ scale: pulseScaleAnim }] },
        ]}
      >
        <Video
          source={pulsingVideo}
          style={styles.video}
          // ✅ 비디오 제어: isStarted가 true이고 isPlaying이 true일 때만 재생
          paused={!isPlaying || !isStarted}
          repeat={true}
          muted={true}
          resizeMode="cover"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchArea: {
    // marginTop 제거 (부모 컨테이너가 중앙 정렬 담당)
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10, // 터치 우선순위를 위해 높은 zIndex 유지
    // borderWidth: 2, // 디버깅용: 터치 영역 확인 (필요 시 주석 해제)
    // borderColor: 'white',
  },
  animatedContainer: {
    width: '100%',
    height: '100%',
    borderRadius: CIRCLE_SIZE / 2,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default PulsingCircleInteraction;

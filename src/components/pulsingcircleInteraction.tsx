import React, { useRef, useEffect, useCallback } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
  Vibration,
} from 'react-native';
import Video from 'react-native-video';

const pulsingVideo = require('../assets/video/pulsingcircle.mp4');

const PULSE_SCALE_MIN = 1.0;
const PULSE_SCALE_MAX = 1.05;
const PULSE_DURATION = 1000;
const LONG_PRESS_DURATION = 3000; // 3초 롱프레스

const PulsingCircleInteraction = ({
  isStarted,
  isPlaying,
  handlePressIn,
  handlePressOut,
  setPulsingState,
}) => {
  const pulseScaleAnim = useRef(new Animated.Value(PULSE_SCALE_MIN)).current;
  const pulseLoop = useRef(null);
  const pressTimer = useRef(null);

  /** 🔹 펄스 애니메이션 시작 */
  const startPulsingAnimation = useCallback(() => {
    if (pulseLoop.current) pulseLoop.current.stop();

    console.log('🎞️ Pulsing animation started');
    const loop = Animated.loop(
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
    );

    pulseLoop.current = loop;
    loop.start();
  }, [pulseScaleAnim]);

  /** 🔹 펄스 애니메이션 정지 */
  const stopPulsingAnimation = useCallback(() => {
    if (pulseLoop.current) {
      console.log('⏹️ Pulsing animation stopped');
      pulseLoop.current.stop();
      pulseLoop.current = null;
    }
    Animated.timing(pulseScaleAnim, {
      toValue: PULSE_SCALE_MIN,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [pulseScaleAnim]);

  /** 🔹 isPlaying 상태에 따라 제어 */
  useEffect(() => {
    if (isPlaying) {
      startPulsingAnimation();
    } else {
      stopPulsingAnimation();
    }
  }, [isPlaying, startPulsingAnimation, stopPulsingAnimation]);

  /** 🔹 3초 롱프레스 감지 */
  const onPressInHandler = () => {
    console.log('🟢 Press In Handler triggered', { isStarted, isPlaying });
    if (!isStarted || isPlaying) return;

    if (pressTimer.current) clearTimeout(pressTimer.current);
    handlePressIn();

    pressTimer.current = setTimeout(() => {
      console.log('⏱️ Long press detected (3 seconds)');
      setPulsingState(true);
      Vibration.vibrate(50);
      pressTimer.current = null;
    }, LONG_PRESS_DURATION);
  };

  /** 🔹 손 떼면 정지 */
  const onPressOutHandler = () => {
    console.log('🔴 Press Out detected');
    if (pressTimer.current) {
      console.log('❌ Press released before long press finished');
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (!isStarted) return;

    if (isPlaying) {
      console.log('🧘‍♂️ Stopping pulsing state');
      setPulsingState(false);
    }

    handlePressOut();
  };

  return (
    <TouchableOpacity
      disabled={!isStarted}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      activeOpacity={1.0}
      style={styles.touchArea}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ scale: pulseScaleAnim }] },
        ]}
        pointerEvents="none" // Video 위에서도 터치 이벤트 통과
      >
        <Video
          source={pulsingVideo}
          style={styles.video}
          paused={!isPlaying}
          repeat
          muted
          resizeMode="cover"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchArea: {
    flex: 1,
    width: '100%',
  },
  animatedContainer: {
    flex: 1,
    width: '100%',
  },
  video: {
    flex: 1,
    width: '100%',
  },
});

export default PulsingCircleInteraction;

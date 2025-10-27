import React, { useRef, useEffect, useCallback } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
  Vibration,
} from 'react-native';
import Video from 'react-native-video';

const pulsingVideo = require('../assets/video/aivideo.mp4');

const PULSE_SCALE_MIN = 1.0;
const PULSE_SCALE_MAX = 1.0;
const PULSE_DURATION = 1000;
const LONG_PRESS_DURATION = 3000;

const AIVideoInteraction = ({
  isStarted,
  isPlaying,
  handlePressIn,
  handlePressOut,
  setPulsingState,
}) => {
  const pulseScaleAnim = useRef(new Animated.Value(PULSE_SCALE_MIN)).current;
  const pulseLoop = useRef(null);
  const pressTimer = useRef(null);

  const startPulsingAnimation = useCallback(() => {
    if (pulseLoop.current) pulseLoop.current.stop();

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

  const stopPulsingAnimation = useCallback(() => {
    if (pulseLoop.current) {
      pulseLoop.current.stop();
      pulseLoop.current = null;
    }
    Animated.timing(pulseScaleAnim, {
      toValue: PULSE_SCALE_MIN,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [pulseScaleAnim]);

  useEffect(() => {
    if (isPlaying) {
      startPulsingAnimation();
    } else {
      stopPulsingAnimation();
    }
  }, [isPlaying, startPulsingAnimation, stopPulsingAnimation]);

  const onPressInHandler = () => {
    if (!isStarted || isPlaying) return;

    if (pressTimer.current) clearTimeout(pressTimer.current);
    handlePressIn();

    pressTimer.current = setTimeout(() => {
      setPulsingState(true);
      Vibration.vibrate(50);
      pressTimer.current = null;
    }, LONG_PRESS_DURATION);
  };

  const onPressOutHandler = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (!isStarted) return;

    if (isPlaying) {
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
        pointerEvents="none"
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

export default AIVideoInteraction;

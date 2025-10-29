// C:\mindit-FE\src\screens\aiarexposure\loadingScren.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const COLORS = {
  BG_LIGHT: '#F8FBFF',
  TEXT_DARK: '#25252C',
  TEXT_GRAY: '#9298A2',
};

const reportImg = require('../../assets/img/responseprevention/reportImg.png');

// 💡 수정: 스크린 이름을 요청에 맞게 'ailoading'으로 변경
type RootStackParamList = {
  ailoading: undefined;
  aireport: undefined;
};

type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ailoading'
>;

export default function LoadingScreen() {
  const navigation = useNavigation<LoadingScreenNavigationProp>();
  const [ellipsis, setEllipsis] = useState('.');
  // 💡 수정: 로딩 딜레이를 3000ms로 변경
  const NAVIGATION_DELAY = 3000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setEllipsis(prev => {
        if (prev === '...') return '.';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 💡 수정: 네비게이션 타겟을 'aireport'으로 변경
      navigation.replace('aireport');
    }, NAVIGATION_DELAY);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={reportImg} style={styles.mainImage} resizeMode="contain" />

      <View style={styles.textRow}>
        <Text style={styles.loadingText}>데이터 분석 중{ellipsis}</Text>
      </View>

      <Text style={styles.infoText}>
        완료되면 AI 사진 노출 리포트로 넘어갑니다.
      </Text>

      <ActivityIndicator
        size="small"
        color={COLORS.TEXT_DARK}
        style={styles.indicator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  loadingText: {
    color: COLORS.TEXT_DARK,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  infoText: {
    color: COLORS.TEXT_GRAY,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  indicator: {
    marginTop: 20,
  },
});

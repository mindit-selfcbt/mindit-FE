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

type RootStackParamList = {
  loading: undefined;
  responsepreventionreport: undefined;
};

type LoadingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'loading'
>;

export default function LoadingScreen() {
  const navigation = useNavigation<LoadingScreenNavigationProp>();
  const [ellipsis, setEllipsis] = useState('.');
  const NAVIGATION_DELAY = 5000;

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
      navigation.replace('responsepreventionreport');
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
        완료되면 반응방지 리포트로 넘어갑니다.
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

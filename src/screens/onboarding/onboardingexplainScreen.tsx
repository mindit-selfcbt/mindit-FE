import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import NextButton from '../../components/nextButton';

const contents = [
  {
    image: require('../../assets/img/onboarding/cbtImg.png'),
    title: '노출 및 반응 방지 기법이란?',
    lines: [
      '가장 효과적인 강박 치료 방법 중 하나로,',
      {
        highlight:
          '강박을 유발하는 환경에 자신을\n노출한 뒤에 강박 행동을 하지 않음으로써',
      },
      '점점 불안을 느끼는 환경에 익숙해지도록',
      '하는 치료 방식입니다.',
    ],
  },
  {
    image: require('../../assets/img/onboarding/exampleImg.png'),
    title: '예시를 하나 들어볼까요?',
    lines: [
      '만약 평소에 문이 잘 잠겼는지 강박적으로',
      '확인하는 증상이 있었다면, 문단속을 할 때',
      {
        highlight: '딱 한 번만 확인하고',
        normal: ' 더 이상 확인하지 않는',
      },
      '것을 반복해서 연습하는 행동이 바로',
      '노출 및 반응 방지입니다.',
    ],
  },
];

const arrowRight = require('../../assets/icon/arrowrightIcon.png');
const arrowLeft = require('../../assets/icon/arrowleftIcon.png');

const OnboardingExplainScreen = ({ navigation }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const { image, title, lines } = contents[pageIndex];

  const handleNext = () => {
    if (pageIndex < contents.length - 1) {
      setPageIndex(prev => prev + 1);
    } else {
      navigation.replace('onboardingstep');
    }
  };

  const ArrowButton = ({ side }) => {
    const isRight = side === 'right';
    const icon = isRight ? arrowRight : arrowLeft;
    const onPress = () => setPageIndex(prev => prev + (isRight ? 1 : -1));
    const show =
      (isRight && pageIndex < contents.length - 1) ||
      (!isRight && pageIndex > 0);

    return (
      show && (
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Image source={icon} style={styles.arrowImg} />
        </TouchableOpacity>
      )
    );
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.rowWithArrow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {lines.map((line, i) => {
            if (typeof line === 'string') {
              return (
                <Text key={i} style={styles.desc}>
                  {line}
                </Text>
              );
            } else if (line.highlight && line.normal) {
              return (
                <Text key={i} style={styles.desc}>
                  <Text style={styles.highlightDesc}>{line.highlight}</Text>
                  <Text style={styles.desc}>{line.normal}</Text>
                </Text>
              );
            } else {
              return (
                <Text key={i} style={[styles.desc, styles.highlightDesc]}>
                  {line.highlight}
                </Text>
              );
            }
          })}
        </View>
        <ArrowButton side="right" />
        <ArrowButton side="left" />
      </View>
      <NextButton
        title={pageIndex === contents.length - 1 ? '다음' : '계속'}
        onPress={handleNext}
      />
    </View>
  );
};

export default OnboardingExplainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 24,
    paddingTop: 160,
    paddingBottom: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  rowWithArrow: {
    flexDirection: 'row',
    width: '110%',
    alignItems: 'center',
  },
  title: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 32,
    marginBottom: 12,
    textAlign: 'left',
  },
  desc: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 28.8,
    textAlign: 'left',
    marginBottom: 0,
  },
  highlightDesc: {
    color: '#3557D4',
    fontWeight: '700',
  },
  arrowBtn: {
    marginLeft: 8,
    marginRight: 20,
    padding: 8,
  },
  arrowImg: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});

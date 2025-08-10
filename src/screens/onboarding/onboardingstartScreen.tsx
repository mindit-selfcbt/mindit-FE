import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import NextButton from '../../components/nextButton';

const startImg = require('../../assets/img/onboarding/startImg.png');

const OnboardingStartScreen = ({ navigation }) => {
  const handleNext = () => {
    navigation.replace('OnboardingExplain');
  };

  return (
    <View style={styles.container}>
      <Image source={startImg} style={styles.image} />

      <View style={styles.stepWrap}>
        <Text style={styles.stepLabel}>1단계</Text>
      </View>

      <Text style={styles.title}>나의 강박에 대해 파악하기</Text>

      <NextButton title="AI와 함께 나의 강박 파악하기" onPress={handleNext} />
    </View>
  );
};

export default OnboardingStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 18,
    marginTop: 30,
  },
  stepWrap: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 55,
    backgroundColor: '#D4E4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  stepLabel: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 19.2,
  },
  title: {
    color: '#3557D4',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 110,
  },
});

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import NextButton from '../../components/nextButton';

const introImg = require('../../assets/img/onboarding/introImg.png');

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const onboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleNext = () => {
    navigation.replace('onboardingexplain');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Image source={introImg} style={styles.image} />
        <Text style={styles.mainText}>
          <Text style={styles.highlight}>노출 및 반응 방지 기법</Text>
          <Text style={styles.mainText}>
            을 스스로{'\n'}실행할 수 있도록 도와드릴게요
          </Text>
        </Text>
      </View>
      <NextButton title="다음" onPress={handleNext} />
    </View>
  );
};

export default onboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  mainText: {
    color: '#25252C',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 100,
  },
  highlight: {
    color: '#3557D4',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 30,
  },
});

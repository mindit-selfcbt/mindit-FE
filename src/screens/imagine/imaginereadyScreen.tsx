import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import NextButton from '../../components/nextButton';

const ImagineReadyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Image
            source={require('../../assets/img/imagine/headphoneImg.png')}
            style={styles.headphoneImage}
            resizeMode="contain"
          />
          <Text style={styles.guideText}>
            감정에 집중하기 위해, 이어폰을 착용해 주세요
          </Text>
          <View style={styles.avatarCircle} />
        </View>
        <View style={styles.bottomInfoArea}>
          <Text style={styles.subGuideText}>음성 훈련이 어려운 경우에는,</Text>
          <View style={styles.ccRow}>
            <Image
              source={require('../../assets/img/imagine/subtitleImg.png')}
              style={styles.ccImage}
              resizeMode="contain"
            />
            <Text style={styles.subGuideText}>
              버튼을 눌러 음성 없이 진행할 수 있어요
            </Text>
          </View>
        </View>
        <View style={styles.bottomButtonWrap}>
          <NextButton text="다음" onPress={() => {}} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
  },
  headphoneImage: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  guideText: {
    color: '#25252C',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25.6,
    marginBottom: 32,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D2DEF6',
  },
  bottomInfoArea: {
    width: width - 32,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 160,
  },
  subGuideText: {
    color: '#9298A2',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.48,
  },
  ccRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 2,
  },
  ccImage: {
    width: 32,
    height: 20,
    marginHorizontal: 2,
    marginBottom: 2,
  },
  bottomButtonWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 10,
    alignSelf: 'center',
  },
});

export default ImagineReadyScreen;

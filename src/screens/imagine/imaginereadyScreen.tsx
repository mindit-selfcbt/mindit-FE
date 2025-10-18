import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import NextButton from '../../components/nextButton';
import Sound from 'react-native-sound';

const profileImg1 = require('../../assets/img/imagine/profileImg1.png');
const profileImg2 = require('../../assets/img/imagine/profileImg2.png');
const profileImg3 = require('../../assets/img/imagine/profileImg3.png');
const profileImg4 = require('../../assets/img/imagine/profileImg4.png');
const subtitleImg = require('../../assets/img/imagine/subtitleImg.png');
const headphoneImg = require('../../assets/img/imagine/headphoneImg.png');

const voiceAudioMap = {
  jae1: 'voice1_02',
  haru: 'voice2_02',
  miso: 'voice3_02',
  minsu: 'voice4_02',
};

const voiceImageMap = {
  jae1: profileImg1,
  haru: profileImg2,
  miso: profileImg3,
  minsu: profileImg4,
};

const ImagineReadyScreen = ({ route, navigation }) => {
  const { voiceId } = route.params || {};
  const selectedImage = voiceImageMap[voiceId];
  const soundRef = useRef(null);

  useEffect(() => {
    if (voiceId && voiceAudioMap[voiceId]) {
      // Sound 객체 생성 및 재생
      soundRef.current = new Sound(
        voiceAudioMap[voiceId],
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.error('오디오 로드 실패:', error);
            soundRef.current = null;
            return;
          }
          soundRef.current.play(success => {
            if (success) {
              console.log(`${voiceId} 오디오 재생 완료`);
            } else {
              console.error('오디오 재생 실패');
            }
            // 완료 후 릴리즈
            soundRef.current.release();
            soundRef.current = null;
          });
        },
      );
    }

    // 언마운트 시 사운드 해제
    return () => {
      if (soundRef.current) {
        soundRef.current.stop(() => {
          soundRef.current.release();
          soundRef.current = null;
        });
      }
    };
  }, [voiceId]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <Image
            source={headphoneImg}
            style={styles.headphoneImage}
            resizeMode="contain"
          />
          <Text style={styles.guideText}>
            감정에 집중하기 위해, 이어폰을 착용해 주세요
          </Text>

          {selectedImage ? (
            <Image
              source={selectedImage}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.avatarCircle} />
          )}
        </View>
        <View style={styles.bottomInfoArea}>
          <Text style={styles.subGuideText}>음성 훈련이 어려운 경우에는,</Text>
          <View style={styles.ccRow}>
            <Image
              source={subtitleImg}
              style={styles.ccImage}
              resizeMode="contain"
            />
            <Text style={styles.subGuideText}>
              버튼을 눌러 음성 없이 진행할 수 있어요
            </Text>
          </View>
        </View>
        <View style={styles.bottomButtonWrap}>
          <NextButton
            text="다음"
            onPress={() => navigation.navigate('imaginalexposure')}
          />
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
    marginTop: 120,
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
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
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

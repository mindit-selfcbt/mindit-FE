import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';
import NextButton from '../../components/nextButton';

const profileImg1 = require('../../assets/img/imagine/profileImg1.png');
const profileImg2 = require('../../assets/img/imagine/profileImg2.png');
const profileImg3 = require('../../assets/img/imagine/profileImg3.png');
const profileImg4 = require('../../assets/img/imagine/profileImg4.png');

const voices = [
  {
    id: 'jae1',
    name: '지안',
    desc: '차분한 중저음의 중성 음성',
    subdesc: '전문적인 상담사 느낌의 신뢰를 주는 말투로 이끌어줘요',
    image: profileImg1,
    audio: 'voice1_01',
  },
  {
    id: 'haru',
    name: '하루',
    desc: '명료하고 단호한 음성',
    subdesc: '회피가 강한 사용자를 이끄는 코치형 음성으로 단호하게 휘어잡아요',
    image: profileImg2,
    audio: 'voice2_01',
  },
  {
    id: 'miso',
    name: '미소',
    desc: '밝고 경쾌한 여성 음성',
    subdesc: '선생님처럼 친근하고 에너지 넘치는 말투로 상상을 진행할 수 있어요',
    image: profileImg3,
    audio: 'voice3_01',
  },
  {
    id: 'minsu',
    name: '민수',
    desc: '부드러운 남성 음성',
    subdesc: '따뜻하고 안정감 있는 목소리로 보다 더 다정한 대화를 할 수 있어요',
    image: profileImg4,
    audio: 'voice4_01',
  },
];

let currentSound = null;
Sound.setCategory('Playback');

const stopAndReleaseCurrentSound = () => {
  if (currentSound) {
    const soundToRelease = currentSound;
    currentSound = null;

    try {
      soundToRelease.stop(() => {
        soundToRelease.release();
      });
    } catch (e) {
      console.warn('이전 오디오 중지 중 오류 발생:', e);
      try {
        soundToRelease.release();
      } catch (e2) {}
    }
  }
};

const ImagineScreen = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const navigation = useNavigation();

  const handleVoicePress = voice => {
    setSelectedVoice(voice.id);
    stopAndReleaseCurrentSound();

    const newSound = new Sound(voice.audio, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('오디오 로드 실패:', error);
        newSound.release();
        if (currentSound === newSound) currentSound = null;
        return;
      }

      if (currentSound !== null && currentSound !== newSound) {
        newSound.release();
        return;
      }

      currentSound = newSound;

      currentSound.play(success => {
        if (success) {
          console.log(`${voice.name} 오디오 재생 완료`);
        } else {
          console.error('오디오 재생 실패');
        }

        if (currentSound === newSound) {
          currentSound.release();
          currentSound = null;
        } else {
          newSound.release();
        }
      });
    });

    currentSound = newSound;
  };

  const handleNext = () => {
    if (!selectedVoice) {
      Alert.alert('안내', '안내 음성을 선택해 주세요.');
      return;
    }
    stopAndReleaseCurrentSound();
    navigation.navigate('imagineready', { voiceId: selectedVoice });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 80 }} />
          <View style={styles.topNotice}>
            <Text style={styles.topNoticeText}>눈송이님,</Text>
            <Text style={styles.topNoticeText}>
              이번 주 상상 노출 훈련 횟수가 {'\n'}1회 남았어요.
            </Text>
          </View>

          <View style={styles.box}>
            <View style={styles.weekRow}>
              <View style={styles.weekBadge}>
                <Text style={styles.weekBadgeText}>1주차</Text>
              </View>
              <Text style={styles.dateText}>11월 1일 ~ 11월 7일</Text>
            </View>
            <View style={{ height: 12 }} />
            <Text style={styles.trainTitle}>기초 상상 노출 훈련</Text>
            <View style={{ height: 12 }} />
            <View style={[styles.inlineRow, { alignItems: 'flex-start' }]}>
              <View style={styles.labelBadge}>
                <Text style={styles.labelBadgeText}>목표</Text>
              </View>
              <View style={{ width: 12 }} />
              <Text style={[styles.detailText, { marginTop: 0 }]}>
                나의 강박과 불안 관찰하고 익숙해지기
              </Text>
            </View>
            <View style={{ height: 12 }} />
            <View style={[styles.inlineRow, { alignItems: 'flex-start' }]}>
              <View style={styles.labelBadge}>
                <Text style={styles.labelBadgeText}>내용</Text>
              </View>
              <View style={{ width: 12 }} />
              <Text style={[styles.detailText, { marginTop: 0 }]}>
                내가 도착 시간을 확인하지 않고 이동하는 상황을 바탕으로 상상
                노출 2회
              </Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>안내 음성 선택</Text>
          {voices.map(voice => (
            <TouchableOpacity
              key={voice.id}
              activeOpacity={0.85}
              style={[
                styles.voiceBox,
                selectedVoice === voice.id && styles.voiceBoxSelected,
              ]}
              onPress={() => handleVoicePress(voice)}
            >
              <Image source={voice.image} style={styles.voiceIcon} />
              <View style={styles.voiceTexts}>
                <View style={styles.voiceTitleRow}>
                  <Text style={styles.voiceName}>{voice.name}</Text>
                  <Text style={styles.voiceDesc}>{voice.desc}</Text>
                </View>
                <Text style={styles.voiceSubDesc}>{voice.subdesc}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.scrollButtonWrap}>
            <NextButton onPress={handleNext} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f9fbfd',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 100,
    minHeight: '100%',
  },
  topNotice: {
    width: 320,
    marginBottom: 20,
  },
  topNoticeText: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
  },
  box: {
    width: 320,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#E8F1FF',
    backgroundColor: '#FFF',
    marginBottom: 32,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekBadge: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
    backgroundColor: '#E8F1FF',
    height: 22,
    minWidth: 42,
  },
  weekBadgeText: {
    color: '#3557D4',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Pretendard',
  },
  dateText: {
    color: '#9298A2',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    marginLeft: 10,
  },
  trainTitle: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '700',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  labelBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 55,
    backgroundColor: '#E8F1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelBadgeText: {
    color: '#3557D4',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Pretendard',
  },
  detailText: {
    color: '#25252C',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 25.6,
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 0,
  },
  sectionLabel: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    width: 320,
    marginBottom: 20,
  },
  voiceBox: {
    flexDirection: 'row',
    width: 320,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 0,
    marginBottom: 12,
    shadowColor: '#9298A2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  voiceBoxSelected: {
    borderWidth: 2,
    borderColor: '#87B1FF',
    elevation: 0,
  },
  voiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#dbeafe',
    marginRight: 20,
  },
  voiceTexts: {
    flex: 1,
  },
  voiceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  voiceName: {
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  voiceDesc: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
  },
  voiceSubDesc: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
  },
  scrollButtonWrap: {
    marginTop: 40,
    width: 360,
    alignSelf: 'center',
    top: 100,
  },
});

export default ImagineScreen;

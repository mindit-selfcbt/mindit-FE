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

// 이미지 파일은 require() 사용 가능
const profileImg1 = require('../../assets/img/imagine/profileImg1.png');
const profileImg2 = require('../../assets/img/imagine/profileImg2.png');
const profileImg3 = require('../../assets/img/imagine/profileImg3.png');
const profileImg4 = require('../../assets/img/imagine/profileImg4.png');

// 오디오 파일명은 문자열로, 안드로이드 raw 폴더에 복사 완료 전제
const voices = [
  {
    id: 'jae1',
    name: '지안',
    desc: '차분한 중저음의 중성 음성',
    subdesc: '전문적인 상담사 느낌의 신뢰를 주는 말투로 이끌어 줍니다.',
    image: profileImg1,
    audio: 'voice1_01',
  },
  {
    id: 'haru',
    name: '하루',
    desc: '명료하고 단호한 음성',
    subdesc:
      '회피가 강한 사용자를 이끄는 코치형 음성으로 단호하게 이끌어 줍니다.',
    image: profileImg2,
    audio: 'voice2_01',
  },
  {
    id: 'miso',
    name: '미소',
    desc: '밝고 경쾌한 여성 음성',
    subdesc: '친근하고 에너지 넘치는 말투로 상상을 안내합니다.',
    image: profileImg3,
    audio: 'voice3_01',
  },
  {
    id: 'minsu',
    name: '민수',
    desc: '부드러운 남성 음성',
    subdesc: '따뜻하고 안정감 있게 상상을 도와줍니다.',
    image: profileImg4,
    audio: 'voice4_01',
  },
];

let currentSound = null;
Sound.setCategory('Playback');

/**
 * 현재 재생 중인 오디오를 중지하고 해제합니다.
 * currentSound가 null로 설정되어 비동기 콜백 충돌을 방지합니다.
 */
const stopAndReleaseCurrentSound = () => {
  if (currentSound) {
    const soundToRelease = currentSound; // 중지/해제할 객체의 참조를 저장
    currentSound = null; // 전역 참조를 즉시 null로 설정 (가장 중요)

    // stop은 비동기일 수 있으므로 콜백 내에서 release를 호출합니다.
    try {
      soundToRelease.stop(() => {
        // stop이 완료된 후 해제
        soundToRelease.release();
      });
    } catch (e) {
      console.warn('이전 오디오 중지 중 오류 발생:', e);
      // 오류가 발생해도 해제 시도 (단, 이미 해제되었을 가능성 있음)
      try {
        soundToRelease.release();
      } catch (e2) {
        // 무시
      }
    }
  }
};

const ImagineScreen = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const navigation = useNavigation();

  const handleVoicePress = voice => {
    setSelectedVoice(voice.id);

    // 1. 이전 오디오 중지 및 해제 (currentSound는 null이 됩니다.)
    stopAndReleaseCurrentSound();

    // 2. 새로운 오디오 로드 시작
    // 이 시점에 currentSound는 null이므로, 새 객체를 바로 할당합니다.
    // 로드 콜백은 비동기이므로, 이 객체의 참조를 지역 변수에 유지합니다.
    const newSound = new Sound(voice.audio, Sound.MAIN_BUNDLE, error => {
      // **(A) 로드 완료 콜백 시작**

      if (error) {
        console.error('오디오 로드 실패:', error);
        newSound.release();
        // 만약 로드 실패 시, currentSound가 이 newSound를 참조하고 있었다면 null 처리
        if (currentSound === newSound) {
          currentSound = null;
        }
        return;
      }

      // 로드 성공 시:
      // 이 시점에 currentSound가 null이 아니거나 newSound가 아니라면
      // 사용자가 이 오디오 로드 시간 동안 다른 음성을 선택했다는 뜻입니다.
      if (currentSound !== null && currentSound !== newSound) {
        // 이미 다른 오디오가 시작되었으므로 이 객체는 재생하지 않고 해제
        newSound.release();
        return;
      }

      // currentSound가 null이거나 newSound인 경우 (대부분 null일 것)
      currentSound = newSound;

      // 3. 새 사운드 재생 시도
      currentSound.play(success => {
        // **(B) 재생 완료 콜백 시작**
        if (success) {
          console.log(`${voice.name} 오디오 재생 완료`);
        } else {
          console.error('오디오 재생 실패');
        }

        // 재생 완료 후 해제:
        // 오디오 객체(currentSound)가 여전히 이 객체(newSound)와 동일한 경우에만
        // 안전하게 해제하고 currentSound를 null로 설정합니다.
        if (currentSound === newSound) {
          currentSound.release();
          currentSound = null;
        } else {
          // 이미 다른 오디오가 시작되어 currentSound가 변경되었거나 null이 된 경우,
          // 이 객체(newSound)만 해제
          newSound.release();
        }
      });
    });

    // 로드 시작 후, currentSound에 잠재적인 객체를 할당
    // 이 객체는 로드 완료 전/후에 stopAndReleaseCurrentSound에 의해 안전하게 처리됩니다.
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

  // ... (나머지 렌더링 코드는 이전과 동일)
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 16 }} />
          <View style={styles.topNotice}>
            <Text style={styles.topNoticeText}>눈송이님,</Text>
            <Text style={styles.topNoticeText}>
              이번 주 상상 노출 훈련 횟수가 1회 남았어요.
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
            <View style={styles.inlineRow}>
              <View style={styles.labelBadge}>
                <Text style={styles.labelBadgeText}>목표</Text>
              </View>
              <View style={{ width: 12 }} />
              <Text style={styles.detailText}>
                나의 강박과 불안 관찰하고 익숙해지기
              </Text>
            </View>
            <View style={{ height: 12 }} />
            <View style={styles.inlineRow}>
              <View style={styles.labelBadge}>
                <Text style={styles.labelBadgeText}>내용</Text>
              </View>
              <View style={{ width: 12 }} />
              <Text style={styles.detailText}>
                내가 도착 시간을 확인하지 않고 이동하는{'\n'}
                상황을 바탕으로 상상 노출 2회
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

          <View style={{ height: 120 }} />
        </ScrollView>

        <View style={styles.fixedButtonWrap}>
          <NextButton onPress={handleNext} />
        </View>
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
    paddingBottom: 24,
    minHeight: '100%',
  },
  topNotice: {
    width: 360,
    marginBottom: 20,
  },
  topNoticeText: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    fontFamily: 'Pretendard',
  },
  box: {
    width: 360,
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
    fontFamily: 'Pretendard',
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  sectionLabel: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
    width: 360,
    marginBottom: 20,
  },
  voiceBox: {
    flexDirection: 'row',
    width: 360,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#FFF',
    borderWidth: 0,
    marginBottom: 16,
    shadowColor: '#000',
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
    marginRight: 16,
  },
  voiceTexts: {
    flex: 1,
  },
  voiceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
    fontSize: 16,
    fontWeight: '400',
  },
  voiceSubDesc: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
  },
  fixedButtonWrap: {
    position: 'absolute',
    left: (width - 360) / 2,
    bottom: Platform.OS === 'ios' ? 0 : 12,
    width: 360,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 16,
  },
});

export default ImagineScreen;

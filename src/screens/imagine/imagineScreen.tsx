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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NextButton from '../../components/nextButton';

const voices = [
  {
    id: 'jae1',
    name: '지안',
    desc: '차분한 중저음의 중성 음성',
    subdesc: '전문적인 상담사 느낌의 신뢰를 주는 말투로 이끌어 줍니다.',
  },
  {
    id: 'haru',
    name: '하루',
    desc: '명료하고 단호한 음성',
    subdesc:
      '회피가 강한 사용자를 이끄는 코치형 음성으로, 단호하게 이끌어 줍니다.',
  },
  {
    id: 'miso',
    name: '미소',
    desc: '밝고 경쾌한 여성 음성',
    subdesc: '친근하고 에너지 넘치는 말투로 상상을 안내합니다.',
  },
  {
    id: 'minsu',
    name: '민수',
    desc: '부드러운 남성 음성',
    subdesc: '따뜻하고 안정감 있게 상상을 도와줍니다.',
  },
];

const ImagineScreen = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const navigation = useNavigation();

  const handleNext = () => {
    if (!selectedVoice) {
      Alert.alert('안내', '안내 음성을 선택해 주세요.');
      return;
    }
    navigation.navigate('imagineready');
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ height: 16 }} />
          {/* 상단 공지 */}
          <View style={styles.topNotice}>
            <Text style={styles.topNoticeText}>눈송이님,</Text>
            <Text style={styles.topNoticeText}>
              이번 주 상상 노출 훈련 횟수가 1회 남았어요.
            </Text>
          </View>
          {/* 안내 박스 */}
          <View style={styles.box}>
            {/* 1주차 + 날짜 */}
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

          {/* 안내 음성 선택 */}
          <Text style={styles.sectionLabel}>안내 음성 선택</Text>
          {voices.map(voice => (
            <TouchableOpacity
              key={voice.id}
              activeOpacity={0.85}
              style={[
                styles.voiceBox,
                selectedVoice === voice.id && styles.voiceBoxSelected,
              ]}
              onPress={() => setSelectedVoice(voice.id)}
            >
              <View style={styles.voiceIcon} />
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
    paddingTop: 0,
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#E8F1FF',
    backgroundColor: '#FFF',
    marginBottom: 32,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 0,
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
    lineHeight: 19.2,
  },
  dateText: {
    color: '#9298A2',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Pretendard',
    lineHeight: 19.2,
    marginLeft: 10,
  },
  trainTitle: {
    color: '#25252C',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    lineHeight: 32,
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
    minWidth: 38,
    alignSelf: 'flex-start',
  },
  labelBadgeText: {
    color: '#3557D4',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Pretendard',
    lineHeight: 19.2,
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
  },
  voiceBoxSelected: {
    borderWidth: 2,
    borderColor: '#87B1FF',
    backgroundColor: '#FFF',
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
    flexDirection: 'column',
    justifyContent: 'center',
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
    lineHeight: 25.6,
  },
  voiceSubDesc: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 25.6,
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

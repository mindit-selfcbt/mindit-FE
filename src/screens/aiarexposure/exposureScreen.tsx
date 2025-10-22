import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator, // 로딩 인디케이터 사용을 위해 추가
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 18;

// 이미지 및 아이콘 경로
const aiExposureActivateIcon = require('../../assets/img/exposure/aiexposrueactivateImg.png');
const aiExposureDeactivateIcon = require('../../assets/img/exposure/aiexposruedeactivateImg.png');
const arExposureActivateIcon = require('../../assets/img/exposure/arexposrueactivateImg.png');
const arExposureDeactivateIcon = require('../../assets/img/exposure/arexposruedeactivateImg.png');
const mainIcon = require('../../assets/icon/mainIcon.png');
const noChoiceIcon = require('../../assets/img/exposure/nochoice.png');
const choiceIcon = require('../../assets/img/exposure/choice.png');

// 더미 AI 이미지
const aiImages = [
  require('../../assets/img/exposure/aisubway1Img.png'),
  require('../../assets/img/exposure/aisubway2Img.png'),
  require('../../assets/img/exposure/aisubway3Img.png'),
];

const TOGGLE_OPTIONS = [
  { key: 'ai', label: 'AI 사진 노출' },
  { key: 'ar', label: 'AR 노출' },
];

const EXPOSURE_SITUATIONS = [
  '지하철/버스 손잡이를 만졌을 때',
  '다른 사람이 만진 물건을 만졌을 때',
  '공공화장실 문 손잡이를 잡았을 때',
  '오염에 손이 닿았을 때',
];

const TRAINING_LABELS = {
  ai: '사진 훈련',
  ar: 'AR 훈련',
};

const SITUATION_DESCRIPTIONS = [
  '더러운 지하철 손잡이를 만진 후 손이 오염되었다.',
  '다른 사람이 만진 물건을 만진 후 손이 오염되었다.',
  '공공화장실의 문 손잡이를 잡는다.',
  '오염에 손이 닿았다.',
];

// 버튼 너비 고정 (유동성을 위해 width를 제거하고 flex: 1을 사용하는 것이 좋지만, 기존 스타일 유지를 위해 명시적 너비 사용)
const BUTTON_FIXED_WIDTH = (windowWidth - HORIZONTAL_PADDING * 2 - 8) / 2;

export default function ExposureScreen({ navigation }) {
  const [toggle, setToggle] = useState<'ai' | 'ar'>('ai');
  const [selectedSituation, setSelectedSituation] = useState<number | null>(0);
  // 이미지 생성 여부 상태
  const [isGenerated, setIsGenerated] = useState(false);
  // 로딩 상태 (2초 딜레이 구현용)
  const [isLoading, setIsLoading] = useState(false);
  // 선택된 이미지 인덱스 상태 (null이면 미선택)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  const getToggleIcon = (key: string, active: boolean) => {
    if (key === 'ai')
      return active ? aiExposureActivateIcon : aiExposureDeactivateIcon;
    return active ? arExposureActivateIcon : arExposureDeactivateIcon;
  };

  const exposureIcon =
    toggle === 'ai' ? aiExposureDeactivateIcon : arExposureDeactivateIcon;

  const exposureText =
    toggle === 'ai'
      ? '생성하기를 누르면 AI 사진이 표시됩니다'
      : '생성하기를 누르면 AR 사진이 표시됩니다';

  // --- 생성하기 버튼 핸들러 (로딩 딜레이 추가) ---
  const handleGenerate = () => {
    if (toggle === 'ai' && selectedSituation !== null) {
      setIsGenerated(false); // 생성 상태 초기화
      setSelectedImageIndex(null); // 이미지 선택 초기화
      setIsLoading(true); // 로딩 시작

      // 2초 로딩 딜레이
      setTimeout(() => {
        setIsLoading(false); // 로딩 끝
        setIsGenerated(true); // 이미지 생성 완료
      }, 2000);
    }
  };

  // --- 이미지 선택 핸들러 ---
  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(prevIndex => (prevIndex === index ? null : index)); // 이미 선택된 것을 다시 누르면 해제
  };

  // --- 시작하기 버튼 스타일 결정 ---
  const isStartButtonActive = selectedImageIndex !== null;

  const startBtnStyle = isStartButtonActive
    ? { ...styles.startBtn, backgroundColor: '#3856C1', borderColor: '#3856C1' }
    : styles.startBtn;

  const startBtnTextStyle = isStartButtonActive
    ? { ...styles.startBtnText, color: '#FFFFFF' }
    : styles.startBtnText;

  // --- UI 컴포넌트 분리: 이미지 렌더링 영역 ---
  const ImageDisplayArea = () => {
    if (isLoading) {
      // 로딩 중일 때
      return (
        <View style={exposureGuideBoxStyles.outer}>
          <ActivityIndicator
            size="large"
            color="#3557D4"
            style={{ marginBottom: 18 }}
          />
          <Text style={exposureGuideBoxStyles.text}>
            AI 이미지를 생성 중입니다...
          </Text>
        </View>
      );
    } else if (isGenerated) {
      // 생성 완료 후 이미지 표시
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={imageDisplayStyles.scrollView}
          contentContainerStyle={imageDisplayStyles.scrollContent} // 패딩을 ContentContainerStyle로 이동
        >
          {aiImages.map((imageSource, index) => {
            const isSelected = selectedImageIndex === index;
            return (
              <View key={index} style={imageDisplayStyles.imageContainer}>
                <Image source={imageSource} style={imageDisplayStyles.image} />
                <TouchableOpacity
                  style={imageDisplayStyles.selectionIcon}
                  onPress={() => handleImageSelect(index)}
                  activeOpacity={0.8}
                >
                  <Image
                    source={isSelected ? choiceIcon : noChoiceIcon}
                    style={imageDisplayStyles.icon}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      );
    } else {
      // 생성 전 가이드 표시
      return (
        <View style={exposureGuideBoxStyles.outer}>
          <Image
            source={exposureIcon}
            style={{ width: 48, height: 48, marginBottom: 18 }}
          />
          <Text style={exposureGuideBoxStyles.text}>{exposureText}</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {/* 상단 탭 및 아이콘 */}
      <View style={styles.topRow}>
        <View style={styles.toggleWrap}>
          {TOGGLE_OPTIONS.map(option => {
            const active = toggle === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                style={[styles.toggleBtn, active && styles.toggleBtnActive]}
                onPress={() => {
                  setToggle(option.key as 'ai' | 'ar');
                  setIsGenerated(false);
                  setSelectedImageIndex(null);
                  setIsLoading(false); // 로딩 중지
                }}
                activeOpacity={1}
              >
                <Image
                  source={getToggleIcon(option.key, active)}
                  style={[
                    styles.toggleIcon,
                    !active && styles.toggleIconInactive,
                  ]}
                />
                <Text
                  style={[
                    styles.toggleLabel,
                    active
                      ? styles.toggleLabelActive
                      : styles.toggleLabelInactive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.mainIconWrap}
          onPress={() => navigation.replace('main')}
        >
          <Image source={mainIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>강박 상황</Text>
      <Text style={styles.desc}>
        불안 위계표에서 노출 훈련을 할 상황을 선택해주세요
      </Text>

      {/* 상황 목록 */}
      <View style={styles.situationList}>
        {EXPOSURE_SITUATIONS.map((situation, i) => {
          const selected = selectedSituation === i;
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.situationItem,
                selected ? styles.situationItemSelected : null,
              ]}
              onPress={() => {
                setSelectedSituation(i);
                setIsGenerated(false);
                setSelectedImageIndex(null);
                setIsLoading(false); // 상황 변경 시 로딩 중지
              }}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.situationText,
                  selected ? styles.situationTextSelected : null,
                ]}
              >
                {situation}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.trainingLabel}>{TRAINING_LABELS[toggle]}</Text>
      <Text style={styles.trainingDesc}>
        훈련할 상황을 구체적으로 묘사하면 AI가 {toggle === 'ai' ? '사진' : 'AR'}
        를 생성해요
      </Text>

      {/* 상황 선택 박스 */}
      <View style={exposureSituationBoxStyles.outer}>
        <Text style={exposureSituationBoxStyles.text}>
          {selectedSituation !== null
            ? SITUATION_DESCRIPTIONS[selectedSituation]
            : '상황을 선택해 주세요.'}
        </Text>
        <Text style={exposureSituationBoxStyles.charCount}>
          {selectedSituation !== null
            ? `${SITUATION_DESCRIPTIONS[selectedSituation].length}/100`
            : '0/100'}
        </Text>
      </View>

      <View style={{ height: 12 }} />

      {/* 이미지 표시/가이드/로딩 영역 */}
      <ImageDisplayArea />

      <View style={{ height: 24 }} />

      {/* 버튼 영역 */}
      <View style={styles.buttonRowWrapper}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.generateBtn}
            onPress={handleGenerate}
            disabled={
              toggle !== 'ai' || selectedSituation === null || isLoading
            } // AI 모드, 상황 선택, 로딩 중 아닐 때만 활성화
          >
            <Text style={styles.generateBtnText}>
              {isLoading
                ? '생성 중...'
                : isGenerated
                ? '다시 생성하기'
                : '생성하기'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={startBtnStyle}
            disabled={!isStartButtonActive}
          >
            <Text style={startBtnTextStyle}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#F8FBFF' },
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 60,
    paddingBottom: 36,
    backgroundColor: '#F8FBFF',
    alignItems: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 40,
    width: '100%',
  },
  mainIconWrap: { position: 'absolute', right: 0 },
  icon: { width: 20, height: 20, marginLeft: 4 },
  toggleWrap: {
    flexDirection: 'row',
    borderRadius: 18,
    padding: 4,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 44,
    borderRadius: 15,
  },
  toggleBtnActive: {
    backgroundColor: '#fff',
    shadowColor: '#E1E7EF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 1,
  },
  toggleIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  toggleIconInactive: {
    opacity: 0.5,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleLabelActive: {
    color: '#222B41',
  },
  toggleLabelInactive: {
    color: '#ADB6C5',
  },
  title: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
    lineHeight: 24,
    width: '100%',
  },
  desc: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 18,
    letterSpacing: -0.42,
    lineHeight: 20,
    width: '100%',
  },
  situationList: {
    marginBottom: 22,
    gap: 10,
    width: '100%',
  },
  situationItem: {
    display: 'flex',
    paddingVertical: 24,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#F3F7FB',
  },
  situationItemSelected: {
    backgroundColor: '#E8F1FF',
    borderWidth: 0.8,
    borderColor: '#4388FF',
    width: '100%',
  },
  situationText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  situationTextSelected: {
    color: '#3557D4',
    fontWeight: '500',
  },
  trainingLabel: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
    lineHeight: 24,
    width: '100%',
  },
  trainingDesc: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 16,
    letterSpacing: -0.42,
    lineHeight: 20,
    width: '100%',
  },
  buttonRowWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    maxWidth: windowWidth - HORIZONTAL_PADDING * 2,
    width: '100%',
  },
  generateBtn: {
    width: BUTTON_FIXED_WIDTH,
    height: 60,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#92A9FF',
    backgroundColor: '#E8F1FF',
    marginRight: 8,
  },
  generateBtnText: {
    color: '#3856C1',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
  },
  startBtn: {
    width: BUTTON_FIXED_WIDTH,
    height: 60,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: '#9298A2',
    backgroundColor: '#F3F7FB',
  },
  startBtnText: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 18,
  },
});

const exposureSituationBoxStyles = StyleSheet.create({
  outer: {
    display: 'flex',
    width: '100%',
    height: 100,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#F3F7FB',
    alignSelf: 'stretch',
    marginBottom: 0,
    position: 'relative',
  },
  text: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25.6,
    alignSelf: 'flex-start',
    flex: 1,
  },
  charCount: {
    position: 'absolute',
    bottom: 8,
    right: 16,
    color: '#717780',
    fontSize: 12,
  },
});

const exposureGuideBoxStyles = StyleSheet.create({
  outer: {
    display: 'flex',
    width: '100%',
    height: 360,
    paddingHorizontal: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F3F7FB',
    alignSelf: 'stretch',
  },
  text: {
    color: '#9298A2',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: -0.42,
    width: '100%',
  },
});

const IMAGE_WIDTH = windowWidth * 0.7;
const imageDisplayStyles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: 360,
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: 360,
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F3F7FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectionIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

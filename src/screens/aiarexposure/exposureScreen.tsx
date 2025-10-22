import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const HORIZONTAL_PADDING = 18;

const aiExposureActivateIcon = require('../../assets/img/exposure/aiexposrueactivateImg.png');
const aiExposureDeactivateIcon = require('../../assets/img/exposure/aiexposruedeactivateImg.png');
const arExposureActivateIcon = require('../../assets/img/exposure/arexposrueactivateImg.png');
const arExposureDeactivateIcon = require('../../assets/img/exposure/arexposruedeactivateImg.png');
const mainIcon = require('../../assets/icon/mainIcon.png');

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

const BUTTON_WIDTH_LIMIT = (windowWidth - HORIZONTAL_PADDING * 1.5) / 2;

export default function ExposureScreen({ navigation }) {
  const [toggle, setToggle] = useState<'ai' | 'ar'>('ai');
  const [selectedSituation, setSelectedSituation] = useState<number | null>(
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

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.toggleWrap}>
          {TOGGLE_OPTIONS.map(option => {
            const active = toggle === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                style={[styles.toggleBtn, active && styles.toggleBtnActive]}
                onPress={() => setToggle(option.key as 'ai' | 'ar')}
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
              onPress={() => setSelectedSituation(i)}
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
      </View>

      <View style={{ height: 12 }} />

      {/* 가이드 박스 */}
      <View style={exposureGuideBoxStyles.outer}>
        <Image
          source={exposureIcon}
          style={{ width: 48, height: 48, marginBottom: 18 }}
        />
        <Text style={exposureGuideBoxStyles.text}>{exposureText}</Text>
      </View>

      <View style={{ height: 24 }} />

      {/* 버튼 영역: 버튼 너비를 줄이고 중앙 정렬 */}
      <View style={styles.buttonRowWrapper}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.generateBtn}>
            <Text style={styles.generateBtnText}>생성하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startBtn}>
            <Text style={styles.startBtnText}>시작하기</Text>
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
  // 버튼을 래핑하여 전체 너비를 사용하고, 버튼을 중앙에 정렬합니다.
  buttonRowWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  // 버튼 자체의 컨테이너, 버튼 너비를 직접 설정하거나 제한합니다.
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    // 버튼 영역의 최대 너비를 설정하여 여백 확보
    maxWidth: windowWidth - HORIZONTAL_PADDING * 2, // 컨테이너 패딩만큼 줄입니다.
    width: '100%', // 래퍼 내에서 100% 사용
  },
  generateBtn: {
    // flex: 1 대신 max width로 버튼 길이를 제한하고, padding을 더 줄입니다.
    width: BUTTON_WIDTH_LIMIT * 0.9, // 계산된 너비보다 약간 더 줄입니다.
    height: 60,
    paddingVertical: 20,
    paddingHorizontal: 10, // 버튼 내부 패딩을 줄여 너비 조정
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
    // flex: 1 대신 max width로 버튼 길이를 제한하고, padding을 더 줄입니다.
    width: BUTTON_WIDTH_LIMIT, // 계산된 너비보다 약간 더 줄입니다.
    height: 60,
    paddingVertical: 20,
    paddingHorizontal: 10, // 버튼 내부 패딩을 줄여 너비 조정
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
  },
  text: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 25.6,
    alignSelf: 'flex-start',
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

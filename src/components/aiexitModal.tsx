// C:\mindit-FE\src\components\aiexitModal.tsx

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
// import { useNavigation } from '@react-navigation/native';

const COLORS = {
  BG_0: '#F8FBFF',
  BG_40: '#BDC5D3',
  BG_100: '#25252C',
  MAIN_1: '#3557D4',
  MAIN_4: '#E8F1FF',
  SLIDER_TRACK: '#344EAD',
  BORDER_BLUE: '#4388FF',
  WHITE: '#FFF',
};

const Step4Image = require('../assets/img/responseprevention/infoImg.png');

// 💡 수정: 컴포넌트 이름을 AnxietyExitModal로 정정
const AnxietyExitModal = ({
  visible,
  onCancel, // 이어서하기 버튼 (onCancel)
  // 💥 에러 수정: onStart 대신 onComplete prop 사용
  onComplete, // 완료하기 버튼 (onComplete)
  anxiety,
  setAnxiety,
}) => {
  // 모달이 열릴 때마다 0으로 초기화되는 지역 상태
  const [exitAnxiety, setExitAnxiety] = useState(0);

  // 사용자가 슬라이더를 움직였는지 추적하는 상태 (버튼 활성화 로직)
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleValueChange = value => {
    setExitAnxiety(value);
    if (!hasInteracted) setHasInteracted(true);
  };

  // 💡 수정: 완료 시 지역 상태 값을 부모에게 전달하고 onComplete 호출
  const handleCompleteExit = () => {
    setAnxiety(exitAnxiety);
    onComplete(); // 💥 에러 해결: onStart() 대신 onComplete() 호출
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <Image
            source={Step4Image}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            사진을 보고 느껴지는{'\n'}불안 정도를 입력해주세요
          </Text>

          <Slider
            minimumValue={0}
            maximumValue={100}
            value={exitAnxiety}
            onValueChange={handleValueChange}
            style={styles.slider}
            minimumTrackTintColor={COLORS.SLIDER_TRACK}
            maximumTrackTintColor={COLORS.BG_40}
            thumbTintColor={
              Platform.OS === 'ios' ? COLORS.SLIDER_TRACK : undefined
            }
          />

          <View style={styles.buttonContainerAbsolute}>
            <TouchableOpacity
              onPress={onCancel}
              style={styles.cancelButton}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>이어서하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCompleteExit}
              style={[
                styles.startButton,
                hasInteracted
                  ? styles.startButtonActive
                  : styles.startButtonInactive,
              ]}
              disabled={!hasInteracted}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.startButtonText,
                  hasInteracted
                    ? styles.startButtonTextActive
                    : styles.startButtonTextInactive,
                ]}
              >
                완료하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AnxietyExitModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 320,
    height: 320,
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
    marginTop: 8,
  },
  title: {
    color: COLORS.BG_100,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 0,
  },
  slider: {
    width: '100%',
    height: 50,
    marginBottom: 40,
  },
  buttonContainerAbsolute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  cancelButton: {
    width: '48%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLORS.BORDER_BLUE,
    backgroundColor: COLORS.MAIN_4,
  },
  cancelButtonText: {
    color: COLORS.MAIN_1,
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '500',
  },
  startButton: {
    width: '48%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 0.8,
  },
  startButtonInactive: {
    borderColor: COLORS.BG_40,
    backgroundColor: '#FCFEFF',
  },
  startButtonActive: {
    borderColor: COLORS.BG_40,
    backgroundColor: COLORS.MAIN_1,
  },
  startButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 13,
    fontWeight: '500',
  },
  startButtonTextInactive: {
    color: COLORS.BG_100,
  },
  startButtonTextActive: {
    color: COLORS.BG_0,
  },
});

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

const COLORS = {
  BG_0: '#F8FBFF',
  BG_40: '#BDC5D3',
  BG_100: '#25252C',
  MAIN_1: '#3557D4',
  MAIN_4: '#E8F1FF',
  SLIDER_TRACK: '#344EAD',
  BORDER_BLUE: '#4388FF',
  ACTIVE_BTN_BG: '#3856C1',
  ACTIVE_BTN_TEXT: '#FFFFFF',
  WHITE: '#FFF',
};

const Step4Image = require('../assets/img/responseprevention/infoImg.png');

const AnxietyExitModal = ({
  visible,
  onComplete,
  onCancel,
  anxiety,
  setAnxiety,
}) => {
  // ✅ 새 state: 사용자가 실제로 슬라이더를 움직였는지 추적
  const [hasMoved, setHasMoved] = useState(false);

  const handleValueChange = value => {
    setAnxiety(value);
    if (!hasMoved) setHasMoved(true); // 처음 슬라이더를 움직였을 때 true로 변경
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

          <Text style={styles.title}>현재 느끼는 불안 정도를 입력해주세요</Text>

          <Slider
            minimumValue={0}
            maximumValue={100}
            value={anxiety}
            onValueChange={handleValueChange} // ✅ 수정
            style={styles.slider}
            minimumTrackTintColor={COLORS.SLIDER_TRACK}
            maximumTrackTintColor={COLORS.BG_40}
            thumbTintColor={
              Platform.OS === 'ios' ? COLORS.SLIDER_TRACK : undefined
            }
          />

          <View style={styles.buttonContainerAbsolute}>
            {/* 이어서 하기 버튼 */}
            <TouchableOpacity
              onPress={onCancel}
              style={styles.cancelButton}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>이어서하기</Text>
            </TouchableOpacity>

            {/* 완료하기 버튼 */}
            <TouchableOpacity
              onPress={onComplete}
              style={[
                styles.startButton,
                hasMoved
                  ? styles.startButtonActive
                  : styles.startButtonInactive,
              ]}
              disabled={!hasMoved}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.startButtonText,
                  hasMoved
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
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    color: COLORS.BG_100,
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 60,
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
    fontSize: 14,
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
    borderColor: COLORS.ACTIVE_BTN_BG,
    backgroundColor: COLORS.ACTIVE_BTN_BG,
  },
  startButtonText: {
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
  },
  startButtonTextInactive: {
    color: COLORS.BG_100,
  },
  startButtonTextActive: {
    color: COLORS.ACTIVE_BTN_TEXT,
  },
});

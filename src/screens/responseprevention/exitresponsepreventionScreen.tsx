import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const editIcon = require('../../assets/img/responseprevention/editImg.png');

const COLORS = {
  BG_LIGHT: '#F8FBFF',
  BG_BUTTON: '#3557D4',
  TEXT_DARK: '#25252C',
  TEXT_GRAY: '#717780',
  TEXT_WHITE: '#FFFFFF',
  BG_BUTTON_LIGHT: '#F3F7FB',
  BORDER_GRAY: '#E0E0E0',
  BORDER_BLUE_LIGHT: '#E8F1FF',
  TEXT_BLUE: '#3856C1',
  PLACEHOLDER: '#BDC5D3',
};

type RootStackParamList = {
  ExitResponsePreventionScreen: undefined;
  LoadingScreen: undefined;
};

type ExitScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExitResponsePreventionScreen'
>;

export default function ExitResponsePreventionScreen() {
  const navigation = useNavigation<ExitScreenNavigationProp>();

  const [selectedSituation, setSelectedSituation] = useState('');
  const [customSituation, setCustomSituation] = useState('');
  const [obsessiveThought, setObsessiveThought] = useState('');

  const situationOptions = [
    '이동 중에 내 위치를 확인하고 싶다',
    '도착지까지의 시간을 확인하고 싶다',
    '일정 사이 사이의 시간을 확인하고 싶다',
    '이동 중 발생할 상황을 계속 확인하고 싶다',
  ];

  const handleSelectSituation = situation => {
    setSelectedSituation(situation);
    if (situation !== '직접 작성하기') {
      setCustomSituation('');
    }
  };

  const isCompleteButtonActive =
    (!!selectedSituation && selectedSituation !== '직접 작성하기') ||
    (selectedSituation === '직접 작성하기' &&
      customSituation.trim() !== '' &&
      obsessiveThought.trim() !== '');

  const handleCompletePress = () => {
    if (isCompleteButtonActive) {
      navigation.navigate('loading');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>반응 방지 완료하기</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>강박 상황</Text>
          <Text style={styles.sectionSubtitle}>
            불안 위계표에서 방금 겪었던 상황을 선택해주세요
          </Text>
          {situationOptions.map(situation => (
            <TouchableOpacity
              key={situation}
              style={[
                styles.situationButton,
                selectedSituation === situation && styles.situationButtonActive,
              ]}
              onPress={() => handleSelectSituation(situation)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.situationButtonText,
                  selectedSituation === situation &&
                    styles.situationButtonTextActive,
                ]}
              >
                {situation}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.situationButton,
              styles.writeButton,
              selectedSituation === '직접 작성하기' &&
                styles.situationButtonActive,
            ]}
            onPress={() => handleSelectSituation('직접 작성하기')}
            activeOpacity={0.8}
          >
            <View style={styles.writeButtonContent}>
              <Image
                source={editIcon}
                style={styles.writeIcon}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.writeButtonText,
                  selectedSituation === '직접 작성하기' &&
                    styles.situationButtonTextActive,
                ]}
              >
                직접 작성하기
              </Text>
            </View>
          </TouchableOpacity>

          {selectedSituation === '직접 작성하기' && (
            <TextInput
              style={styles.customInput}
              placeholder="강박 상황을 직접 입력하세요."
              placeholderTextColor={COLORS.PLACEHOLDER}
              value={customSituation}
              onChangeText={setCustomSituation}
              multiline
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>강박 사고</Text>
          <Text style={styles.sectionSubtitle}>
            반응 방지를 하면서 어떤 생각과 감정이 들었나요?
          </Text>
          <View style={styles.textBox}>
            <TextInput
              style={styles.textInput}
              placeholder="뭔가 내가 지금 지날 영역을 지나쳤을 것 같다는 느낌이 들고, 당장 나의 현재 위치를 확인하지 않으면 늦을 것 같다는 생각이 든다."
              placeholderTextColor={COLORS.TEXT_GRAY}
              value={obsessiveThought}
              onChangeText={setObsessiveThought}
              multiline
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.completeButton,
            isCompleteButtonActive
              ? styles.completeButtonActive
              : styles.completeButtonInactive,
          ]}
          onPress={handleCompletePress}
          disabled={!isCompleteButtonActive}
          activeOpacity={0.8}
        >
          <Text style={styles.completeButtonText}>반응 방지 완료하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.BG_LIGHT,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    marginBottom: 20,
    marginTop: 40,
  },
  headerTitle: {
    color: COLORS.TEXT_DARK,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 28,
  },
  section: {
    width: '100%',
    marginBottom: 30,
  },
  sectionTitle: {
    color: COLORS.TEXT_DARK,
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 30,
    marginBottom: 8,
  },
  headerSubTitle: {
    color: COLORS.TEXT_GRAY,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.4,
    marginTop: 5,
  },
  sectionSubtitle: {
    color: COLORS.TEXT_GRAY,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22.4,
    marginBottom: 12,
  },
  situationButton: {
    display: 'flex',
    width: 320,
    paddingVertical: 24,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    backgroundColor: COLORS.BG_BUTTON_LIGHT,
    marginBottom: 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  situationButtonActive: {
    borderColor: COLORS.BG_BUTTON,
    backgroundColor: COLORS.BORDER_BLUE_LIGHT,
  },
  situationButtonText: {
    color: COLORS.TEXT_DARK,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14 * 1.5,
    textAlign: 'center',
  },
  situationButtonTextActive: {
    color: COLORS.BG_BUTTON,
    fontWeight: '700',
  },
  writeButton: {
    backgroundColor: COLORS.BG_BUTTON_LIGHT,
    borderColor: 'transparent',
    borderWidth: 1,
    alignSelf: 'center',
  },
  writeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  writeButtonText: {
    color: COLORS.TEXT_GRAY,
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14 * 1.5,
  },
  customInput: {
    width: '100%',
    minHeight: 80,
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: COLORS.TEXT_WHITE,
    borderColor: COLORS.BORDER_GRAY,
    borderWidth: 0.5,
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    textAlignVertical: 'top',
    fontWeight: '400',
  },
  textBox: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    minHeight: 120,
    shadowColor: '#9298A2',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textInput: {
    width: '100%',
    fontSize: 16,
    color: COLORS.TEXT_DARK,
    lineHeight: 25.6,
    textAlignVertical: 'top',
    padding: 0,
    fontWeight: '400',
  },
  completeButton: {
    width: 320,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  completeButtonActive: {
    backgroundColor: COLORS.BG_BUTTON,
  },
  completeButtonInactive: {
    backgroundColor: COLORS.PLACEHOLDER,
  },
  completeButtonText: {
    color: COLORS.TEXT_WHITE,
    fontFamily: 'Pretendard',
    fontSize: 18,
    fontWeight: '900',
  },
});

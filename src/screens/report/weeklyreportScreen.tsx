import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const mainIcon = require('../../assets/icon/mainIcon.png');
const weeklyIcon = require('../../assets/icon/weeklyIcon.png');

const toggleOptions = [
  { key: 'checking', label: '확인 강박' },
  { key: 'contamination', label: '오염 강박' },
];

const MonthlyReportScreen = ({ navigation }) => {
  const [toggle, setToggle] = useState('checking');

  return (
    <View style={styles.container}>
      {/* 상단: 토글과 아이콘 */}
      <View style={styles.toggleRow}>
        <View style={styles.toggle}>
          {toggleOptions.map(opt => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.toggleButton,
                toggle === opt.key && styles.toggleActive,
              ]}
              onPress={() => setToggle(opt.key)}
            >
              <Text
                style={
                  toggle === opt.key
                    ? styles.toggleTextActive
                    : styles.toggleText
                }
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigation.replace('Main')}>
          <Image source={mainIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* 주간 리포트 보기 */}
      <TouchableOpacity
        style={styles.weeklyRow}
        onPress={() => navigation.navigate('WeeklyReport')}
      >
        <Image source={weeklyIcon} style={styles.weeklyIcon} />
        <Text style={styles.weeklyText}>주간 리포트 보기</Text>
      </TouchableOpacity>

      {/* 상단 텍스트 */}
      <View style={styles.topTextWrap}>
        <Text style={styles.topText}>눈송이님, 지난달보다 평균 불안이</Text>
        <Text style={styles.anxietyChange}>
          <Text style={styles.highlightScore}>58점</Text>
          <Text style={styles.arrow}> → </Text>
          <Text style={styles.highlightScore}>28점</Text>
          <Text style={styles.topText}>
            으로 감소했어요.{'\n'}변화가 눈에 띄어요. {'\n'}잘 해내고 있어요!
          </Text>
        </Text>
      </View>

      {/* 여기서부터 불안 수치별 이미지 및 차트 등 */}
      {/* ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: '#EAEDFA',
    borderRadius: 16,
    padding: 4,
  },
  toggleButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 12 },
  toggleActive: { backgroundColor: '#3557D4' },
  toggleText: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#fff',
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 16,
  },
  icon: { width: 36, height: 36, marginLeft: 10 },
  weeklyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 28,
  },
  weeklyIcon: { width: 24, height: 24, marginRight: 6 },
  weeklyText: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '500',
  },
  topTextWrap: { marginTop: 0, marginBottom: 24 },
  topText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
  },
  anxietyChange: { flexDirection: 'row', alignItems: 'center' },
  highlightScore: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
  },
  arrow: { color: '#3557D4' },
});

export default MonthlyReportScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ToggleButton from '../../components/toggleButton';

const mainIcon = require('../../assets/icon/mainIcon.png');
const weeklyIcon = require('../../assets/icon/weeklyIcon.png');
const backIcon = require('../../assets/icon/backIcon.png');
const nextIcon = require('../../assets/icon/nextIcon.png');

const TOGGLE_OPTIONS = [
  { key: 'checking', label: '확인 강박' },
  { key: 'contamination', label: '오염 강박' },
];

const months = ['4월', '5월', '6월', '7월', '8월', '9월'];
const monthValues = [85, 70, 60, 50, 60, 30];

export default function MonthlyReportScreen({ navigation }) {
  const [toggle, setToggle] = useState('checking');
  const [currentMonth, setCurrentMonth] = useState('9월');

  const currMonthIndex = months.indexOf(currentMonth);
  const handleMonth = (direction: 'prev' | 'next') => {
    let idx = currMonthIndex + (direction === 'prev' ? -1 : 1);
    if (idx < 0) idx = 0;
    if (idx > months.length - 1) idx = months.length - 1;
    setCurrentMonth(months[idx]);
  };

  return (
    <View style={styles.container}>
      {/* 상단 중앙 토글 + 아이콘 */}
      <View style={styles.topRow}>
        <ToggleButton
          options={TOGGLE_OPTIONS}
          value={toggle}
          onChange={setToggle}
        />
        <TouchableOpacity
          style={styles.mainIconWrap}
          onPress={() => navigation.replace('main')}
        >
          <Image source={mainIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* 안내 텍스트 */}
      <View style={styles.topTextWrap}>
        <Text style={styles.topText}>
          <Text style={styles.boldText}>눈송이님</Text>
          {', 지난달보다 평균 불안이'}
        </Text>

        <View style={styles.anxietyChange}>
          <Text style={styles.highlightScore}>58점</Text>
          <Text style={styles.arrow}>{' → '}</Text>
          <Text style={styles.highlightScore}>28점</Text>
          <Text style={styles.topText}>
            {'으로 '}
            <Text style={styles.boldText}>감소</Text>
            {'했어요.'}
          </Text>
        </View>

        <Text style={styles.topText}>
          변화가 눈에 띄어요.{'\n'}잘 해내고 있어요!
        </Text>
      </View>

      {/* 월 이동 및 주간 리포트 보기 */}
      <View style={styles.monthRow}>
        {currMonthIndex > 0 ? (
          <TouchableOpacity onPress={() => handleMonth('prev')}>
            <Image source={backIcon} style={styles.smallIcon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.smallIcon} />
        )}
        <Text style={styles.monthText}>{currentMonth}</Text>
        <TouchableOpacity
          style={styles.weeklyReportRow}
          onPress={() => navigation.navigate('WeeklyReport')}
        >
          <Image source={weeklyIcon} style={styles.smallIcon} />
          <Text style={styles.weeklyReportText}>주간 리포트 보기</Text>
        </TouchableOpacity>
        {currMonthIndex < months.length - 1 ? (
          <TouchableOpacity onPress={() => handleMonth('next')}>
            <Image source={nextIcon} style={styles.smallIcon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.smallIcon} />
        )}
      </View>

      {/* 그래프 제목 */}
      <Text style={styles.graphTitle}>월별 평균 불안 정도</Text>

      {/* 월별 평균 불안 정도 그래프 */}
      <View style={styles.graphBox}>
        <View style={styles.yAxisLabels}>
          {[100, 50, 0].map(v => (
            <Text key={v} style={styles.yAxisText}>
              {v}
            </Text>
          ))}
        </View>
        <View style={styles.graphContent}>
          {/* 도트선 */}
          <View style={[styles.dotLine, { top: 0 }]} />
          <View style={[styles.dotLine, { top: '50%' }]} />
          {/* 막대그래프와 수치 */}
          <View style={styles.barRow}>
            {months.map((month, i) => {
              const value = monthValues[i];
              const isLast = i === months.length - 1;
              const barHeight = (value / 100) * 120;
              return (
                <View key={month} style={styles.barItem}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: barHeight,
                        backgroundColor: isLast
                          ? '#7BAFFF'
                          : 'rgba(123, 175, 255, 0.3)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.barValueBox,
                        isLast && styles.barValueBoxLast,
                      ]}
                    >
                      <Text
                        style={[
                          styles.barValueText,
                          isLast && styles.barValueTextLast,
                        ]}
                      >
                        {value}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.monthLabel}>{month}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFF',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  mainIconWrap: {
    position: 'absolute',
    right: 0,
  },
  icon: { width: 24, height: 24, marginLeft: 4 },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 18,
  },
  smallIcon: { width: 24, height: 24 },
  topTextWrap: { marginTop: 0, marginBottom: 24 },
  topText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
  },
  boldText: {
    fontWeight: '700',
    color: '#25252C',
    fontFamily: 'Pretendard',
  },
  anxietyChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  highlightScore: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 32,
  },
  arrow: {
    color: '#3557D4',
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 2,
  },
  monthText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 8,
  },
  weeklyReportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  weeklyIcon: { width: 16, height: 16, marginRight: 3 },
  weeklyReportText: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.42,
  },
  graphTitle: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 12,
  },
  graphBox: {
    width: 380,
    height: 186,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D6E7F8',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingLeft: 34,
    paddingTop: 12,
    paddingBottom: 24,
  },
  yAxisLabels: {
    width: 26,
    justifyContent: 'space-between',
    height: '93%',
  },
  yAxisText: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
  },
  graphContent: {
    flex: 1,
    marginLeft: 10,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  dotLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#E8F1FF',
    width: '92%',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 20,
    width: '95%',
    justifyContent: 'space-between',
  },
  barItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  bar: {
    width: 32,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: 4,
    position: 'relative',
  },
  barValueBox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#E8F1FF',
    marginBottom: 6,
    position: 'absolute',
    top: -28,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barValueBoxLast: {
    backgroundColor: '#3557D4',
  },
  barValueText: {
    color: '#9CC3FF',
    textAlign: 'center',
    fontFamily: 'Gmarket Sans',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  barValueTextLast: {
    color: '#FFF',
  },
  monthLabel: {
    marginTop: 6,
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
  },
});

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ToggleButton from '../../components/toggleButton';
import MonthlyBarChart from '../../components/monthlybarChart';
import CalendarGrid from '../../components/calendarGrid';

// 아이콘 import는 동일...
const mainIcon = require('../../assets/icon/mainIcon.png');
const weeklyIcon = require('../../assets/icon/weeklyIcon.png');
const backIcon = require('../../assets/icon/backIcon.png');
const nextIcon = require('../../assets/icon/nextIcon.png');

const TOGGLE_OPTIONS = [
  { key: 'checking', label: '확인 강박' },
  { key: 'contamination', label: '오염 강박' },
];

const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];
const monthValues = [100, 95, 90, 85, 70, 60, 50, 60, 30, 40, 35, 20];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// 월별 불안데이터 예시 생성기 (실제 데이타 연동 가능)
function randomAnxietyForMonth(year, month) {
  const numDays = getDaysInMonth(year, month);
  return Array.from({ length: numDays }, (_, i) => ({
    day: i + 1,
    level: Math.ceil(Math.random() * 5),
  }));
}

export default function MonthlyReportScreen({ navigation }) {
  const now = new Date();
  const [toggle, setToggle] = useState('checking');
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1); // 1~12
  const [anxietyList, setAnxietyList] = useState(
    randomAnxietyForMonth(now.getFullYear(), now.getMonth() + 1),
  );

  // 그래프 월 계산도 맞춰줌
  const showMonthIdx = currentMonth - 1;
  const showMonths = months.slice(
    Math.max(0, showMonthIdx - 5),
    showMonthIdx + 1,
  );
  const showValues = monthValues.slice(
    Math.max(0, showMonthIdx - 5),
    showMonthIdx + 1,
  );
  const isBarRowLeft = showMonths.length < 6;

  // 월 이동 핸들러
  const handleMonth = dir => {
    let y = currentYear;
    let m = currentMonth + (dir === 'prev' ? -1 : 1);
    if (m < 1) {
      m = 12;
      y -= 1;
    } else if (m > 12) {
      m = 1;
      y += 1;
    }
    setCurrentYear(y);
    setCurrentMonth(m);
  };

  // 월/연도 바뀔 때마다 불안 레벨 데이터 새로 준비(랜덤 예시)
  useEffect(() => {
    setAnxietyList(randomAnxietyForMonth(currentYear, currentMonth));
  }, [currentYear, currentMonth]);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
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
      <View style={styles.topTextWrap}>
        <Text style={styles.topText}>눈송이님, 지난달보다 평균 불안이</Text>
        <View style={styles.anxietyChange}>
          <Text style={styles.highlightScore}>58점</Text>
          <Text style={styles.arrow}>{' → '}</Text>
          <Text style={styles.highlightScore}>28점</Text>
        </View>
        <Text style={styles.topText}>
          으로 감소했어요.{'\n'}변화가 눈에 띄어요.{'\n'}잘 해내고 있어요!
        </Text>
      </View>
      <View style={styles.monthRow}>
        <View style={styles.monthCenterRow}>
          <TouchableOpacity onPress={() => handleMonth('prev')}>
            <Image source={backIcon} style={styles.smallIcon} />
          </TouchableOpacity>
          <Text
            style={styles.monthText}
          >{`${currentYear}년 ${currentMonth}월`}</Text>
          <TouchableOpacity onPress={() => handleMonth('next')}>
            <Image source={nextIcon} style={styles.smallIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.weeklyReportRow}
          onPress={() => navigation.navigate('WeeklyReport')}
        >
          <Text style={styles.weeklyReportText}>주간 리포트 보기</Text>
          <Image
            source={weeklyIcon}
            style={[styles.smallIcon, styles.weeklyIconRight]}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.graphTitle}>월별 평균 불안 정도</Text>
      {/* 월별 그래프 */}
      <MonthlyBarChart
        months={showMonths}
        values={showValues}
        isBarRowLeft={isBarRowLeft}
      />
      {/* 달력 (월 변경에 따라 날짜·이미지 연동!) */}
      <CalendarGrid
        year={currentYear}
        month={currentMonth}
        anxietyList={anxietyList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#F8FBFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    backgroundColor: '#F8FBFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  mainIconWrap: { position: 'absolute', right: 0 },
  icon: { width: 20, height: 20, marginLeft: 4 },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 18,
    height: 48,
  },
  monthCenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIcon: { width: 20, height: 20, marginHorizontal: 4 },
  monthText: {
    fontSize: 20,
    color: '#25252C',
    fontWeight: '700',
    marginHorizontal: 4,
    textAlign: 'center',
    minWidth: 36,
  },
  weeklyReportRow: { flexDirection: 'row', alignItems: 'center' },
  weeklyIconRight: { marginLeft: 6 },
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
  topTextWrap: { marginTop: 0, marginBottom: 24 },
  topText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
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
});

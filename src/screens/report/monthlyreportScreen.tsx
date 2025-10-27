import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import ToggleButton from '../../components/toggleButton';
import MonthlyBarChart from '../../components/monthlybarChart';
import CalendarGrid from '../../components/calendarGrid';

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

const checkingMonthValues = [70, 60, 50, 60, 30, 40, 35, 20, 15, 25, 30, 40];
const contaminationMonthValues = [
  55, 45, 65, 35, 25, 30, 40, 50, 45, 55, 60, 70,
];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function randomAnxietyForMonth(year, month, type = 'checking') {
  const numDays = getDaysInMonth(year, month);
  if (type === 'checking') {
    return Array.from({ length: numDays }, (_, i) => ({
      day: i + 1,
      level: Math.ceil(Math.random() * 5),
    }));
  } else {
    return Array.from({ length: numDays }, (_, i) => ({
      day: i + 1,
      level: Math.ceil(Math.random() * 3),
    }));
  }
}

const { width } = Dimensions.get('window');
const scaleFactor = width / 360;

export default function MonthlyReportScreen({ navigation }) {
  const now = new Date();
  const [toggle, setToggle] = useState('checking');
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [anxietyList, setAnxietyList] = useState(
    randomAnxietyForMonth(now.getFullYear(), now.getMonth() + 1, 'checking'),
  );

  const currentMonthValues =
    toggle === 'checking' ? checkingMonthValues : contaminationMonthValues;

  const showMonthIdx = currentMonth - 1;
  const showMonths = months.slice(
    Math.max(0, showMonthIdx - 4),
    showMonthIdx + 1,
  );
  const showValues = currentMonthValues.slice(
    Math.max(0, showMonthIdx - 4),
    showMonthIdx + 1,
  );
  const isBarRowLeft = showMonths.length < 5;

  const lastMonthValue = currentMonthValues[Math.max(0, showMonthIdx - 1)];
  const currentMonthValue = currentMonthValues[showMonthIdx];

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

  const handleDayPress = (day, level) => {
    const monthString = String(currentMonth).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');
    const selectedDate = `${currentYear}-${monthString}-${dayString}`;
    navigation.navigate('dailyreport', { date: selectedDate, level: level });
  };

  useEffect(() => {
    setAnxietyList(randomAnxietyForMonth(currentYear, currentMonth, toggle));
  }, [currentYear, currentMonth, toggle]);

  const getAnxietyMessage = () => {
    const difference = lastMonthValue - currentMonthValue;
    const typeText = toggle === 'checking' ? '확인 강박' : '오염 강박';

    if (difference > 0) {
      return (
        <Text style={styles.topText}>
          눈송이님, 지난달보다 평균 {typeText}이{' '}
          <Text style={styles.highlightScore}>{lastMonthValue}점</Text>
          <Text style={styles.arrow}>{' → '}</Text>
          <Text style={styles.highlightScore}>{currentMonthValue}점</Text>
          으로{' '}
          <Text style={{ fontWeight: 'bold', color: '#3557D4' }}>감소</Text>
          했어요.{'\n'}
          점점 안정되어 가는 모습이 눈에 띄어요.{'\n'}잘 해내고 있어요!
        </Text>
      );
    } else if (difference < 0) {
      return (
        <Text style={styles.topText}>
          눈송이님, 지난달보다 평균 {typeText}이{' '}
          <Text style={styles.highlightScore}>{lastMonthValue}점</Text>
          <Text style={styles.arrow}>{' → '}</Text>
          <Text style={styles.highlightScore}>{currentMonthValue}점</Text>
          으로{' '}
          <Text style={{ fontWeight: 'bold', color: '#3557D4' }}>증가</Text>
          했어요.{'\n'}혹시 스트레스 받는 일이 있었을까요?{' '}
          <Text style={{ fontWeight: 'bold' }}>
            다시 한번 목표를 되새겨봐요!
          </Text>
        </Text>
      );
    } else {
      return (
        <Text style={styles.topText}>
          눈송이님, 지난달과 평균 {typeText}이{' '}
          <Text style={styles.highlightScore}>{currentMonthValue}점</Text>으로{' '}
          <Text style={{ fontWeight: 'bold', color: '#717780' }}>동일</Text>
          해요.{'\n'}꾸준히 관리하는 모습, 정말 멋져요!
        </Text>
      );
    }
  };

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

      <View style={styles.topTextWrap}>{getAnxietyMessage()}</View>

      <View style={styles.monthRow}>
        <View style={styles.monthCenterRow}>
          <TouchableOpacity onPress={() => handleMonth('prev')}>
            <Image source={backIcon} style={styles.smallIcon} />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {`${currentYear}년 ${currentMonth}월`}
          </Text>
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

      <View style={styles.monthlyBarChartWrapper}>
        <MonthlyBarChart
          months={showMonths}
          values={showValues}
          isBarRowLeft={isBarRowLeft}
          maxValue={100}
          maxHeight={100}
        />
      </View>

      <CalendarGrid
        year={currentYear}
        month={currentMonth}
        anxietyList={anxietyList}
        onDayPress={handleDayPress}
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
    paddingHorizontal: 24 * scaleFactor,
    paddingTop: 60 * scaleFactor,
    paddingBottom: 20 * scaleFactor,
    backgroundColor: '#F8FBFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40 * scaleFactor,
    position: 'relative',
  },
  mainIconWrap: { position: 'absolute', right: 0 },
  icon: {
    width: 20 * scaleFactor,
    height: 20 * scaleFactor,
    marginLeft: 12,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8 * scaleFactor,
    marginBottom: 16 * scaleFactor,
    height: 40 * scaleFactor,
  },
  monthCenterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  smallIcon: {
    width: 16 * scaleFactor,
    height: 16 * scaleFactor,
    marginHorizontal: 4 * scaleFactor,
  },
  monthText: {
    fontSize: 16 * scaleFactor,
    color: '#25252C',
    fontWeight: '700',
    marginHorizontal: 0,
    textAlign: 'center',
    minWidth: 24 * scaleFactor,
  },
  weeklyReportRow: { flexDirection: 'row', alignItems: 'center' },
  weeklyIconRight: { marginLeft: 4 * scaleFactor },
  weeklyReportText: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 16 * scaleFactor,
    fontWeight: '400',
    letterSpacing: -0.36 * scaleFactor,
  },
  graphTitle: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 18 * scaleFactor,
    fontWeight: '700',
    lineHeight: 28 * scaleFactor,
    marginBottom: 12 * scaleFactor,
  },
  topTextWrap: { marginTop: 0, marginBottom: 16 * scaleFactor },
  topText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20 * scaleFactor,
    fontWeight: '700',
    lineHeight: 30 * scaleFactor,
  },
  highlightScore: {
    color: '#3557D4',
    fontSize: 20 * scaleFactor,
    fontWeight: '700',
    lineHeight: 30 * scaleFactor,
  },
  arrow: {
    color: '#3557D4',
    fontSize: 20 * scaleFactor,
    fontWeight: '700',
    marginHorizontal: 2 * scaleFactor,
  },
  monthlyBarChartWrapper: {
    marginBottom: 20 * scaleFactor,
    alignSelf: 'center',
  },
});

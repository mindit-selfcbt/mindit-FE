import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ToggleButton from '../../components/toggleButton';
import LinearGradient from 'react-native-linear-gradient';

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

const BAR_WIDTH = 48;
const BAR_LINE_HEIGHT = 4;
const GRAPH_BARLINE_WIDTH = 300;
const BARROW_HEIGHT = 100;
const YAXIS_HEIGHT = 100;

export default function MonthlyReportScreen({ navigation }) {
  const [toggle, setToggle] = useState('checking');
  const [currentMonth, setCurrentMonth] = useState('9월');

  const currMonthIndex = months.indexOf(currentMonth);
  const handleMonth = direction => {
    let idx = currMonthIndex + (direction === 'prev' ? -1 : 1);
    if (idx < 0) idx = 0;
    if (idx > months.length - 1) idx = months.length - 1;
    setCurrentMonth(months[idx]);
  };

  const startIndex = currMonthIndex - 5 >= 0 ? currMonthIndex - 5 : 0;
  const showMonths = months.slice(startIndex, currMonthIndex + 1);
  const showValues = monthValues.slice(startIndex, currMonthIndex + 1);
  const isBarRowLeft = showMonths.length < 6;

  const yLabelData = [{ value: 100 }, { value: 50 }, { value: 0 }];

  return (
    <View style={styles.container}>
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
          <Text style={styles.monthText}>{currentMonth}</Text>
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
      <View style={styles.graphBox}>
        <View style={styles.graphArea}>
          {/* y축 레이블+선 한 row에 묶어서 렌더 */}
          <View style={styles.yAxisWrapper}>
            {yLabelData.map((item, i) => (
              <View key={item.value} style={styles.yAxisRow}>
                <Text style={styles.yAxisText}>{item.value}</Text>
                <View style={styles.dotLineRow} />
              </View>
            ))}
          </View>
          {/* 그래프 bar 영역 */}
          <View style={[styles.graphContent]}>
            <View
              style={[
                styles.barRow,
                isBarRowLeft ? { justifyContent: 'flex-start' } : {},
              ]}
            >
              {showMonths.map((month, i) => {
                const value = showValues[i];
                const isCurrent = i === showMonths.length - 1;
                const barHeight = (value / 100) * BARROW_HEIGHT;
                return (
                  <View key={month} style={styles.barItem}>
                    <View
                      style={[
                        styles.barValueBox,
                        isCurrent && styles.barValueBoxLast,
                      ]}
                    >
                      <Text
                        style={[
                          styles.barValueText,
                          isCurrent && styles.barValueTextLast,
                        ]}
                      >
                        {value}
                      </Text>
                    </View>
                    <View style={{ height: 8 }} />
                    <View
                      style={[
                        styles.barWrap,
                        { height: barHeight + BAR_LINE_HEIGHT },
                      ]}
                    >
                      <View
                        style={[
                          styles.barTopLine,
                          isCurrent
                            ? styles.barTopLineCurrent
                            : styles.barTopLinePrev,
                        ]}
                      />
                      <View style={{ width: BAR_WIDTH, height: barHeight }}>
                        <LinearGradient
                          colors={[
                            'rgba(123,175,255,0.30)',
                            'rgba(123,175,255,0.00)',
                          ]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 0, y: 1 }}
                          style={styles.barGradient}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            <View
              style={[
                styles.monthLabelRow,
                isBarRowLeft ? { justifyContent: 'flex-start' } : {},
              ]}
            >
              {showMonths.map((month, i) => {
                const isCurrent = i === showMonths.length - 1;
                return (
                  <Text
                    key={month}
                    style={[
                      styles.monthLabel,
                      isCurrent && styles.monthLabelCurrent,
                    ]}
                  >
                    {month}
                  </Text>
                );
              })}
            </View>
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
  icon: {
    width: 20,
    height: 20,
    marginLeft: 4,
  },
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
  smallIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
  },
  monthText: {
    fontSize: 20,
    color: '#25252C',
    fontWeight: '700',
    marginHorizontal: 4,
    textAlign: 'center',
    minWidth: 36,
  },
  weeklyReportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklyIconRight: {
    marginLeft: 6,
  },
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
    width: 360,
    height: 200,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#D6E7F8',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 28,
  },
  graphArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%',
  },
  yAxisWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: YAXIS_HEIGHT,
  },
  yAxisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: YAXIS_HEIGHT / 2,
  },
  yAxisText: {
    width: 24,
    textAlign: 'center',
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '400',
  },
  dotLineRow: {
    height: 1,
    backgroundColor: '#E8F1FF',
    flex: 1,
    marginRight: 8,
  },
  graphContent: {
    flex: 1,
    alignItems: 'flex-start',
    width: GRAPH_BARLINE_WIDTH,
    paddingBottom: 0,
    height: YAXIS_HEIGHT,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: BARROW_HEIGHT,
    width: GRAPH_BARLINE_WIDTH,
    marginTop: 20,
    marginBottom: 0,
    zIndex: 2,
  },
  barItem: {
    alignItems: 'center',
    width: BAR_WIDTH,
  },
  barWrap: {
    width: BAR_WIDTH,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  barTopLine: {
    width: BAR_WIDTH,
    height: BAR_LINE_HEIGHT,
    borderRadius: 0,
    marginBottom: 0,
  },
  barTopLinePrev: {
    backgroundColor: '#85B6FF',
  },
  barTopLineCurrent: {
    backgroundColor: '#3557D4',
  },
  barGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 0,
  },
  barValueBox: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#E8F1FF',
    marginBottom: 0,
    marginTop: 0,
    position: 'relative',
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
  monthLabelRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: GRAPH_BARLINE_WIDTH,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  monthLabel: {
    width: BAR_WIDTH,
    textAlign: 'center',
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  monthLabelCurrent: {
    color: '#3557D4',
  },
  topTextWrap: {
    marginTop: 0,
    marginBottom: 24,
  },
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

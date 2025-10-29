import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import ToggleButton from '../../components/toggleButton';
import MonthlyBarChart from '../../components/weeklybarChart';

const mainIcon = require('../../assets/icon/mainIcon.png');
const weeklyIcon = require('../../assets/icon/weeklyIcon.png');
const backIcon = require('../../assets/icon/backIcon.png');
const nextIcon = require('../../assets/icon/nextIcon.png');
const dropIcon = require('../../assets/icon/dropIcon.png');

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 48;

const TOGGLE_OPTIONS = [
  { key: 'checking', label: '확인 강박' },
  { key: 'contamination', label: '오염 강박' },
];

const { width } = Dimensions.get('window');
const scaleFactor = width / 360;

const WEEK_LABELS = ['1주차', '2주차', '3주차', '4주차'];

const WEEKLY_ANXIETY_DATA_CHECKING = [95, 80, 60, 40];
// 🚨 요일 순서를 월화수목금으로 변경 (데이터는 임의의 값으로 재정렬됨)
const DAILY_ANXIETY_DATA_CHECKING = [
  { label: '월\n10.27', value: 55 },
  { label: '화\n10.28', value: 60 },
  { label: '수\n10.29', value: 70 },
  { label: '목\n10.30', value: 80 },
  { label: '금\n10.31', value: 45 },
];

const WEEKLY_ANXIETY_DATA_CONTAMINATION = [70, 65, 75, 50];
// 🚨 요일 순서를 월화수목금으로 변경 (데이터는 임의의 값으로 재정렬됨)
const DAILY_ANXIETY_DATA_CONTAMINATION = [
  { label: '월\n10.27', value: 65 },
  { label: '화\n10.28', value: 70 },
  { label: '수\n10.29', value: 60 },
  { label: '목\n10.30', value: 55 },
  { label: '금\n10.31', value: 50 },
];

const REACTION_PREVENTION_DATA = [
  { day: '월', times: [{ duration: '4분 30초' }, { duration: '1분 30초' }] },
  { day: '화', times: [{ duration: '5분 07초' }] },
  { day: '수', times: [{ duration: '4분 30초' }, { duration: '45초' }] },
  { day: '목', times: [{ duration: '7분 30초' }] },
  { day: '금', times: [{ duration: '4분 30초' }, { duration: '2분 45초' }] },
  { day: '토', times: [{ duration: '3분 30초' }] },
  { day: '일', times: [{ duration: '4분 30초' }, { duration: '1분 30초' }] },
];

const WEEKLY_EXPOSURE_CARD_DATA = {
  week: 4,
  startDate: new Date(2025, 9, 27),
  endDate: new Date(2025, 10, 2),
  title: '결과까지 상상하는 노출 훈련',
  goal: '불안과 결과에 따른 감정을 수용하기',
  content:
    '확인을 안 해서 늦었고, 상대방이 기다리고 있는 결과를 상상하는 훈련 2회',
};

const formatDate = date => `${date.getMonth() + 1}월 ${date.getDate()}일`;

export default function WeeklyReportScreen({ navigation }) {
  const [toggle, setToggle] = useState('checking');

  const handleWeekChange = dir => {
    console.log(`Moving to ${dir} week/month`);
  };

  const getAnxietyMessage = () => {
    const isChecking = toggle === 'checking';
    const currentWeekValues = isChecking
      ? WEEKLY_ANXIETY_DATA_CHECKING
      : WEEKLY_ANXIETY_DATA_CONTAMINATION;
    const typeText = isChecking ? '확인 강박' : '오염 강박';

    const currentScore = currentWeekValues[3];
    const prevScore = currentWeekValues[2];
    const difference = prevScore - currentScore;

    const actionText =
      difference > 0 ? (
        <Text style={{ fontWeight: 'bold', color: '#3557D4' }}>감소</Text>
      ) : difference < 0 ? (
        <Text style={{ fontWeight: 'bold', color: 'red' }}>증가</Text>
      ) : (
        <Text style={{ fontWeight: 'bold', color: '#717780' }}>동일</Text>
      );

    const encouragementText =
      difference > 0
        ? '이전의 나보다 더 자유로워진 당신을 응원해요!'
        : '다시 한번 목표를 되새겨봐요!';

    return (
      <Text style={styles.topText}>
        <Text>눈송이님, 지난주보다 평균 불안이 </Text>
        <Text style={styles.highlightScore}>{prevScore}점</Text>
        <Text style={styles.arrow}>{' → '}</Text>
        <Text style={styles.highlightScore}>{currentScore}점</Text>
        <Text>으로 </Text>
        {actionText}
        <Text>했어요.{'\n'}</Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 18 * scaleFactor,
            lineHeight: 28 * scaleFactor,
            color: '#717780',
          }}
        >
          {encouragementText}
        </Text>
      </Text>
    );
  };

  const renderReactionPrevention = () => {
    const totalCount = REACTION_PREVENTION_DATA.reduce(
      (acc, curr) => acc + curr.times.length,
      0,
    );

    const getBlockStyle = duration => {
      const time = duration.replace(/\s/g, '');
      const baseStyle = reactionPreventionStyles.timeBlockBase;

      if (time === '7분30초') {
        return {
          ...baseStyle,
          ...reactionPreventionStyles.timeBlockLong,
          ...reactionPreventionStyles.timeBlockBg3,
        };
      } else if (['4분30초', '3분30초', '5분07초'].includes(time)) {
        return {
          ...baseStyle,
          ...reactionPreventionStyles.timeBlockBg1,
        };
      } else {
        return {
          ...baseStyle,
          ...reactionPreventionStyles.timeBlockBg2,
        };
      }
    };

    return (
      <View style={weeklyStyles.sectionContainer}>
        <Text style={styles.graphTitle}>4주차 반응 방지</Text>

        <View style={reactionPreventionStyles.reactionHeaderLeft}>
          <Text style={reactionPreventionStyles.reactionHeaderTextLeft}>
            강박 발생 횟수 |{' '}
            <Text style={reactionPreventionStyles.reactionHighlightTextLeft}>
              {totalCount}회
            </Text>
          </Text>
        </View>

        <View style={reactionPreventionStyles.reactionListContainer}>
          {REACTION_PREVENTION_DATA.map((data, index) => (
            <View key={index} style={reactionPreventionStyles.reactionRow}>
              <Text style={reactionPreventionStyles.reactionDayText}>
                {data.day}
              </Text>
              <View style={reactionPreventionStyles.reactionTimesContainer}>
                {data.times.map((time, timeIndex) => (
                  <View key={timeIndex} style={getBlockStyle(time.duration)}>
                    <Text style={reactionPreventionStyles.timeBlockText}>
                      {time.duration}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={reactionPreventionStyles.noteContainer}>
          <Image source={dropIcon} style={reactionPreventionStyles.dropIcon} />
          <Text style={reactionPreventionStyles.reactionNote}>
            블럭의 개수는 반응방지 횟수를, 블럭 안의 시간은 반응방지 한 번의
            시간을 의미해요.
          </Text>
        </View>
      </View>
    );
  };

  const renderImaginalExposure = () => {
    const cardData = WEEKLY_EXPOSURE_CARD_DATA;

    return (
      <View style={weeklyStyles.sectionContainer}>
        <Text style={styles.graphTitle}>4주차 상상 노출 훈련</Text>

        <View style={planCardStyles.planCard}>
          <View style={planCardStyles.planCardHeader}>
            <View style={planCardStyles.weekBadge}>
              <Text style={planCardStyles.weekBadgeText}>
                {cardData.week}주차
              </Text>
            </View>
            <Text style={planCardStyles.planCardDate}>
              {formatDate(cardData.startDate)} ~ {formatDate(cardData.endDate)}
            </Text>
          </View>
          <Text style={planCardStyles.planCardTitle}>{cardData.title}</Text>
          <View style={planCardStyles.fieldRow}>
            <View style={planCardStyles.fieldLabel}>
              <Text style={planCardStyles.fieldLabelText}>목표</Text>
            </View>
            <Text style={planCardStyles.fieldContent}>{cardData.goal}</Text>
          </View>
          <View style={planCardStyles.fieldRow}>
            <View style={planCardStyles.fieldLabel}>
              <Text style={planCardStyles.fieldLabelText}>내용</Text>
            </View>
            <Text style={planCardStyles.fieldContent}>{cardData.content}</Text>
          </View>
        </View>
      </View>
    );
  };

  const currentAnxietyData =
    toggle === 'checking'
      ? WEEKLY_ANXIETY_DATA_CHECKING
      : WEEKLY_ANXIETY_DATA_CONTAMINATION;
  const currentDailyData =
    toggle === 'checking'
      ? DAILY_ANXIETY_DATA_CHECKING
      : DAILY_ANXIETY_DATA_CONTAMINATION;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FBFF' }}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
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
            <TouchableOpacity onPress={() => handleWeekChange('prev')}>
              <Image source={backIcon} style={styles.smallIcon} />
            </TouchableOpacity>
            <Text style={styles.monthText}>{`10월`}</Text>
            <TouchableOpacity onPress={() => handleWeekChange('next')}>
              <Image source={nextIcon} style={styles.smallIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.weeklyReportRow}
            onPress={() => navigation.navigate('monthlyreport')}
          >
            <Text style={styles.weeklyReportText}>월간 리포트 보기</Text>
            <Image
              source={weeklyIcon}
              style={[styles.smallIcon, styles.weeklyIconRight]}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.graphTitle}>4주차 평균 불안 정도</Text>
        <Text style={weeklyStyles.graphSubtitleOutside}>
          일주일 동안 반응 방지를 하며 기록한 불안 정도의 평균
        </Text>

        <View style={weeklyStyles.graphBlock}>
          <View style={styles.weeklyBarChartWrapper}>
            <MonthlyBarChart
              months={WEEK_LABELS}
              values={currentAnxietyData}
              isBarRowLeft={true}
              maxValue={100}
              maxHeight={100}
              barWidth={40 * scaleFactor}
              barColor="#3557D4"
              hideGridLines={true}
            />
          </View>

          <View style={weeklyStyles.dailyBarChartWrapper}>
            <MonthlyBarChart
              months={currentDailyData.map(d => d.label)}
              values={currentDailyData.map(d => d.value)}
              isBarRowLeft={true}
              maxValue={100}
              maxHeight={100}
              barWidth={16 * scaleFactor}
              barColor="#3557D4"
              hideGridLines={true}
            />
          </View>
        </View>

        {renderReactionPrevention()}

        {renderImaginalExposure()}
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 20 * scaleFactor,
    fontWeight: '700',
    lineHeight: 32 * scaleFactor,
    marginBottom: 8 * scaleFactor,
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
  weeklyBarChartWrapper: {
    width: 320 * scaleFactor,
    alignSelf: 'center',
    marginBottom: 0,
  },
});

const weeklyStyles = StyleSheet.create({
  graphSubtitleOutside: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 14 * scaleFactor,
    fontWeight: '400',
    lineHeight: 21 * scaleFactor,
    letterSpacing: -0.42 * scaleFactor,
    marginBottom: 16 * scaleFactor,
  },
  graphBlock: {
    backgroundColor: 'transparent',
    borderRadius: 16 * scaleFactor,
    paddingVertical: 16 * scaleFactor,
    paddingHorizontal: 0,
    marginBottom: 20 * scaleFactor,
    overflow: 'hidden',
  },
  dailyBarChartWrapper: {
    width: 320 * scaleFactor,
    alignSelf: 'center',
    marginTop: 12 * scaleFactor,
  },
  sectionContainer: {
    marginBottom: 32 * scaleFactor,
  },
});

const reactionPreventionStyles = StyleSheet.create({
  reactionHeaderLeft: {
    marginBottom: 16 * scaleFactor,
    alignSelf: 'flex-start',
  },
  reactionHeaderTextLeft: {
    color: '#25252C',
    fontSize: 16 * scaleFactor,
    fontWeight: '400',
    lineHeight: 24 * scaleFactor,
  },
  reactionHighlightTextLeft: {
    color: '#3557D4',
    fontWeight: '700',
  },
  reactionListContainer: {
    marginBottom: 12 * scaleFactor,
  },
  reactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12 * scaleFactor,
  },
  reactionDayText: {
    color: '#717780',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    fontSize: 14 * scaleFactor,
    fontWeight: '400',
    lineHeight: 21 * scaleFactor,
    letterSpacing: -0.42 * scaleFactor,
    minWidth: 24 * scaleFactor,
    marginRight: 16 * scaleFactor,
  },
  reactionTimesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 8 * scaleFactor,
  },
  timeBlockBase: {
    flexDirection: 'row',
    paddingVertical: 12 * scaleFactor,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10 * scaleFactor,
    borderRadius: 4 * scaleFactor,
    borderWidth: 0.5 * scaleFactor,
    borderColor: '#7198FF',
    minWidth: 70 * scaleFactor,
  },
  timeBlockBg1: {
    paddingHorizontal: 28 * scaleFactor,
    backgroundColor: '#E4EEFF',
  },
  timeBlockBg2: {
    paddingHorizontal: 12 * scaleFactor,
    backgroundColor: '#F2F7FF',
  },
  timeBlockBg3: {
    paddingHorizontal: 28 * scaleFactor,
    width: 230 * scaleFactor,
    backgroundColor: '#D4E4FF',
  },
  timeBlockText: {
    color: '#25252C',
    fontSize: 14 * scaleFactor,
    fontWeight: '400',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12 * scaleFactor,
  },
  reactionNote: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 12 * scaleFactor,
    fontWeight: '400',
    lineHeight: 15 * scaleFactor,
    flexShrink: 1,
  },
  dropIcon: {
    width: 16 * scaleFactor,
    height: 16 * scaleFactor,
    marginRight: 4 * scaleFactor,
  },
});

const planCardStyles = StyleSheet.create({
  planCard: {
    width: CARD_WIDTH * scaleFactor,
    minHeight: 240 * scaleFactor,
    backgroundColor: '#FFF',
    borderRadius: 18 * scaleFactor,
    padding: 24 * scaleFactor,
    shadowColor: '#1A1D241A',
    shadowOffset: { width: 0, height: 2 * scaleFactor },
    shadowOpacity: 0.1,
    shadowRadius: 8 * scaleFactor,
    elevation: 5,
    justifyContent: 'flex-start',
    marginBottom: 16 * scaleFactor,
    alignSelf: 'center',
  },
  planCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12 * scaleFactor,
  },
  weekBadge: {
    backgroundColor: '#E8F1FF',
    borderRadius: 55 * scaleFactor,
    paddingHorizontal: 16 * scaleFactor,
    paddingVertical: 6 * scaleFactor,
    marginRight: 12 * scaleFactor,
  },
  weekBadgeText: {
    color: '#3557D4',
    fontWeight: '500',
    fontSize: 12 * scaleFactor,
    lineHeight: 19.2 * scaleFactor,
  },
  planCardDate: {
    fontWeight: '400',
    fontSize: 12 * scaleFactor,
    color: '#9298A2',
    lineHeight: 19.2 * scaleFactor,
  },
  planCardTitle: {
    fontWeight: '500',
    fontSize: 20 * scaleFactor,
    color: '#25252C',
    lineHeight: 32 * scaleFactor,
    marginBottom: 16 * scaleFactor,
    marginTop: 0,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 12 * scaleFactor,
  },
  fieldLabel: {
    backgroundColor: '#E8F1FF',
    height: 32 * scaleFactor,
    borderRadius: 55 * scaleFactor,
    paddingHorizontal: 16 * scaleFactor,
    paddingVertical: 6 * scaleFactor,
    justifyContent: 'center',
    marginRight: 12 * scaleFactor,
  },
  fieldLabelText: {
    color: '#3557D4',
    fontWeight: '500',
    fontSize: 12 * scaleFactor,
    lineHeight: 19.2 * scaleFactor,
  },
  fieldContent: {
    flex: 1,
    fontWeight: '400',
    fontSize: 16 * scaleFactor,
    lineHeight: 24 * scaleFactor,
    color: '#25252C',
    marginTop: 2 * scaleFactor,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ToggleButton from '../../components/toggleButton';

const mainIcon = require('../../assets/icon/mainIcon.png');
const CalendarImg = require('../../assets/img/myplan/calendar.png');
// CheckIcon import 제거

const TOGGLE_OPTIONS = [
  { key: 'checking', label: '확인 강박' },
  { key: 'contamination', label: '오염 강박' },
];

const formatDate = date => `${date.getMonth() + 1}월 ${date.getDate()}일`;

const CURRENT_DATE = new Date(2025, 9, 28);

const createWeeklyData = (baseDate, weeks) => {
  return weeks.map((item, index) => {
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() + index * 7);
    const endDate = new Date(baseDate);
    endDate.setDate(baseDate.getDate() + index * 7 + 6);

    const isCurrent = CURRENT_DATE >= startDate && CURRENT_DATE <= endDate;
    const isCompleted = CURRENT_DATE > endDate;

    return { ...item, startDate, endDate, isCurrent, isCompleted };
  });
};

const checkingPlanData = createWeeklyData(new Date(2025, 9, 27), [
  {
    week: 1,
    title: '기초 상상 노출 훈련',
    goal: '나의 강박과 불안 관찰하고 익숙해지기',
    content:
      '내가 도착 시간을 확인하지 않고 이동하는 상황을 바탕으로 상상 노출 2회',
  },
  {
    week: 2,
    title: '구체적 상황의 상상 노출 훈련',
    goal: '불확실성을 견뎌보기',
    content:
      '버스를 타고 이동하고 있고, 목적지까지 가는 길이 막히고 있다는 구체적인 상황을 바탕으로 상상 노출 2회',
  },
  {
    week: 3,
    title: '결과까지 상상하는 노출 훈련',
    goal: '불안과 결과에 따른 감정을 수용하기',
    content:
      '확인 안 해서 도착이 늦었고, 상대방이 기다리고 있는 결과를 상상하는 훈련 2회',
  },
  {
    week: 4,
    title: '실제 노출 훈련1',
    goal: '실생활에 직접 적용하며 익숙해지기',
    content:
      '도착 예상 시간과 현재 위치를 확인하지 않고 외출하는 실제 노출 훈련 1회',
  },
  {
    week: 5,
    title: '실제 노출 훈련2',
    goal: '실생활에 직접 적용하며 익숙해지기',
    content:
      '도착 예상 시간과 현재 위치를 확인하지 않고 외출하는 실제 노출 훈련 2회',
  },
]);

const contaminationPlanData = createWeeklyData(new Date(2025, 9, 27), [
  {
    week: 1,
    title: '기초 상상 노출 훈련',
    goal: '나의 강박과 불안 관찰하고 익숙해지기',
    content: '손에 오염 물질이 묻었다고 상상하는 상황을 바탕으로 상상 노출 2회',
  },
  {
    week: 2,
    title: '구체적 상황의 상상 노출 훈련',
    goal: '불확실성을 견뎌보기',
    content:
      '공중 화장실 손잡이를 만진 후 손을 씻지 않고 다른 물건을 만지는 상상 노출 2회',
  },
  {
    week: 3,
    title: '결과까지 상상하는 노출 훈련',
    goal: '불안과 결과에 따른 감정을 수용하기',
    content: '오염된 손으로 얼굴을 만져 질병에 걸린 결과를 상상하는 훈련 2회',
  },
  {
    week: 4,
    title: '실제 노출 훈련1',
    goal: '실생활에 직접 적용하며 익숙해지기',
    content:
      '대중교통 손잡이를 잡고 손을 씻지 않고 10분 버티는 실제 노출 훈련 1회',
  },
  {
    week: 5,
    title: '실제 노출 훈련2',
    goal: '실생활에 직접 적용하며 익숙해지기',
    content:
      '오염되었다고 생각하는 물건을 만지고 손을 씻지 않고 30분 버티는 실제 노출 훈련 2회',
  },
]);

const DashedLine = () => (
  <View style={styles.dashedContainer}>
    <View style={styles.dashedLine} />
  </View>
);

const TimelineItem = ({ data, isLast }) => {
  const dotColor = data.isCurrent || data.isCompleted ? '#3557D4' : '#A0B3F1';
  const isPastWeek = data.isCompleted;

  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineConnector}>
        {/* isPastWeek일 때 체크 아이콘 표시 로직 제거 */}
        <View style={[styles.timelineDot, { backgroundColor: dotColor }]} />
        {!isLast && <DashedLine />}
      </View>

      <View style={styles.timelineContent}>
        <View style={[styles.planCard, isPastWeek && styles.planCardCompleted]}>
          <View style={styles.planCardHeader}>
            <View
              style={[
                styles.weekBadge,
                isPastWeek && styles.weekBadgeCompleted,
              ]}
            >
              <Text
                style={[
                  styles.weekBadgeText,
                  isPastWeek && styles.weekBadgeTextCompleted,
                ]}
              >
                {data.week}주차
              </Text>
            </View>
            <Text style={styles.planCardDate}>
              {formatDate(data.startDate)} ~ {formatDate(data.endDate)}
            </Text>
          </View>
          <Text style={styles.planCardTitle}>{data.title}</Text>
          <View style={styles.fieldRow}>
            <View
              style={[
                styles.fieldLabel,
                isPastWeek && styles.fieldLabelCompleted,
              ]}
            >
              <Text
                style={[
                  styles.fieldLabelText,
                  isPastWeek && styles.fieldLabelTextCompleted,
                ]}
              >
                목표
              </Text>
            </View>
            <Text style={styles.fieldContent}>{data.goal}</Text>
          </View>
          <View style={styles.fieldRow}>
            <View
              style={[
                styles.fieldLabel,
                isPastWeek && styles.fieldLabelCompleted,
              ]}
            >
              <Text
                style={[
                  styles.fieldLabelText,
                  isPastWeek && styles.fieldLabelTextCompleted,
                ]}
              >
                내용
              </Text>
            </View>
            <Text style={styles.fieldContent}>{data.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function MyTimelineScreen() {
  const navigation = useNavigation();
  const [toggle, setToggle] = useState('checking');
  const currentPlan =
    toggle === 'checking' ? checkingPlanData : contaminationPlanData;

  return (
    <SafeAreaView style={styles.safeArea}>
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
            onPress={() => navigation.navigate('main')}
          >
            <Image source={mainIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.planHeaderContainer}>
          <Text style={styles.planHeaderText}>
            눈송이님을 위한{'\n'}맞춤 강박개선 플랜을{'\n'}구성했어요!
          </Text>
          <Image
            source={CalendarImg}
            style={styles.calendarImg}
            resizeMode="contain"
          />
        </View>

        <View style={styles.timelineContainer}>
          {currentPlan.map((item, index) => (
            <TimelineItem
              key={item.week}
              data={item}
              isLast={index === currentPlan.length - 1}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FBFF' },
  scroll: { flex: 1, backgroundColor: '#F8FBFF' },
  container: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 36 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  mainIconWrap: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  icon: { width: 20, height: 20, marginLeft: 4 },
  planHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  planHeaderText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
  },
  calendarImg: { width: 100, height: 100 },

  timelineContainer: { paddingLeft: 0 },
  timelineItem: { flexDirection: 'row', marginBottom: 30 },
  timelineConnector: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
    paddingLeft: 0,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A0B3F1',
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#F8FBFF',
    marginTop: 6,
    marginBottom: -2,
  },
  // checkIconOverlay 스타일 제거

  dashedContainer: {
    flex: 1,
    width: 3,
    overflow: 'hidden',
    alignItems: 'center',
    paddingVertical: 4,
    marginTop: -2,
    marginBottom: -2,
  },
  dashedLine: {
    width: 3,
    height: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'absolute',
    borderLeftWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#E8F1FF',
  },

  timelineContent: { flex: 1 },

  planCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 24,
    shadowColor: '#1A1D241A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'flex-start',
    marginLeft: 4,
    opacity: 1,
  },
  planCardCompleted: {
    backgroundColor: '#F7F9FD',
    opacity: 0.8,
  },
  planCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekBadge: {
    backgroundColor: '#E8F1FF',
    borderRadius: 55,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
  },
  weekBadgeCompleted: {
    backgroundColor: '#E6E9F2',
  },
  weekBadgeText: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 19.2,
  },
  weekBadgeTextCompleted: {
    color: '#9298A2',
  },
  planCardDate: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 14,
    color: '#9298A2',
    lineHeight: 19.2,
  },
  planCardTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 18,
    color: '#25252C',
    lineHeight: 28,
    marginBottom: 16,
  },

  fieldRow: { flexDirection: 'row', marginBottom: 10 },
  fieldLabel: {
    backgroundColor: '#F3F7FB',
    height: 32,
    borderRadius: 55,
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'center',
    marginRight: 12,
  },
  fieldLabelCompleted: {
    backgroundColor: '#E6E9F2',
  },
  fieldLabelText: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 19.2,
  },
  fieldLabelTextCompleted: {
    color: '#9298A2',
  },
  fieldContent: {
    flex: 1,
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 24,
    color: '#25252C',
    marginTop: 2,
  },
});

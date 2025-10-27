import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import NextButton from '../../components/nextButton';
import { useNavigation } from '@react-navigation/native';

import CalendarImg from '../../assets/img/myplan/calendar.png';
import ResponsePreventionImg from '../../assets/img/myplan/responseprevention.png';
import ImaginaryExposureImg from '../../assets/img/myplan/imaginaryexposure.png';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 48;
const CARD_HEIGHT = 240;
const SPACING = 16;

const planData = [
  {
    week: 1,
    startDate: new Date(2025, 9, 27),
    endDate: new Date(2025, 10, 2),
    title: '기초 상상 노출 훈련',
    goal: '나의 강박과 불안 관찰하고 익숙해지기',
    content:
      '내가 도착 시간을 확인하지 않고 이동하는 상황을 바탕으로 상상 노출 2회',
  },
  {
    week: 2,
    startDate: new Date(2025, 10, 3),
    endDate: new Date(2025, 10, 9),
    title: '구체적 상황의 상상 노출 훈련',
    goal: '불확실성을 견뎌보기',
    content:
      '버스를 타고 이동하고 있고, 목적지까지 가는 길이 막히고 있다는 구체적인 상황을 바탕으로 상상 노출 2회',
  },
  {
    week: 3,
    startDate: new Date(2025, 10, 10),
    endDate: new Date(2025, 10, 16),
    title: '결과까지 상상하는 노출 훈련',
    goal: '불안과 결과에 따른 감정을 수용하기',
    content:
      '확인 안 해서 도착이 늦었고, 상대방이 기다리고 있는 결과를 상상하는 훈련 2회',
  },
  {
    week: 4,
    startDate: new Date(2025, 10, 17),
    endDate: new Date(2025, 10, 23),
    title: '심화 상상 노출 훈련',
    goal: '예상치 못한 상황에도 적용하기',
    content: '예상 밖의 변화가 발생한 상황에서 상상 노출 2회',
  },
  {
    week: 5,
    startDate: new Date(2025, 10, 24),
    endDate: new Date(2025, 10, 30),
    title: '실전 적용 훈련',
    goal: '실제 상황에서 실천해보기',
    content: '실제 외출/이동 상황에서 강박 없이 행동해 보기 2회',
  },
];

const formatDate = (date: Date) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일`;

export default function MyPlanScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const trainings = [
    {
      id: 'response',
      text: '반응 방지',
      img: ResponsePreventionImg,
      question: '반응방지 훈련이란?',
      description:
        '강박이 떠오를 때, 바로 그 순간!\n그 행동을 하지 않고 그대로 버텨보는\n훈련이에요.',
      when: '언제 하나요?',
      whenDesc: '강박이 발생하는 순간에 바로\n반응 방지를 실행해주세요.',
    },
    {
      id: 'imaginary',
      text: '상상 노출',
      img: ImaginaryExposureImg,
      question: '상상 노출 훈련이란?',
      description:
        '불안을 유발하는 사진이나 장면을\nAI를 통해 생성하고, 미리 정한 계획에 따라 일부러 마주해보는 연습이에요.',
      when: '언제 하나요?',
      whenDesc:
        '계획된 플랜에 따라 일주일에\n정해진 횟수만큼 노출 훈련을\n진행합니다.',
    },
  ];

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.topTitle}>
          눈송이님이 진행할 훈련을 설명해드릴게요
        </Text>

        {trainings.map(item => (
          <View key={item.id} style={styles.trainingRow}>
            <View style={styles.badge}>
              <Image
                source={item.img}
                style={styles.badgeIcon}
                resizeMode="contain"
              />
              <Text style={styles.badgeText}>{item.text}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.trainingQuestion}>{item.question}</Text>
              <Text style={styles.trainingDesc}>{item.description}</Text>
              <Text style={[styles.trainingQuestion, { marginTop: 12 }]}>
                {item.when}
              </Text>
              <Text style={styles.trainingDesc}>{item.whenDesc}</Text>
            </View>
          </View>
        ))}

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

        <View style={styles.planCardArea}>
          <FlatList
            data={planData}
            horizontal
            pagingEnabled
            snapToInterval={CARD_WIDTH + SPACING}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewConfigRef.current}
            keyExtractor={item => item.week.toString()}
            renderItem={({ item }) => (
              <View style={styles.planCard}>
                <View style={styles.planCardHeader}>
                  <View style={styles.weekBadge}>
                    <Text style={styles.weekBadgeText}>{item.week}주차</Text>
                  </View>
                  <Text style={styles.planCardDate}>
                    {formatDate(item.startDate)} ~ {formatDate(item.endDate)}
                  </Text>
                </View>
                <Text style={styles.planCardTitle}>{item.title}</Text>
                <View style={styles.fieldRow}>
                  <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabelText}>목표</Text>
                  </View>
                  <Text style={styles.fieldContent}>{item.goal}</Text>
                </View>
                <View style={styles.fieldRow}>
                  <View style={styles.fieldLabel}>
                    <Text style={styles.fieldLabelText}>내용</Text>
                  </View>
                  <Text style={styles.fieldContent}>{item.content}</Text>
                </View>
              </View>
            )}
          />
          <View style={styles.indicatorContainer}>
            {planData.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicatorDot,
                  {
                    backgroundColor: i === currentIndex ? '#3557D4' : '#EDF1FF',
                    opacity: i === currentIndex ? 1 : 0.9,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        <NextButton
          text="다음"
          onPress={() => navigation.navigate('mytimeline')}
          style={{ marginBottom: 40 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F8FBFF',
    flex: 1,
  },
  topTitle: {
    fontWeight: '700',
    fontFamily: 'Pretendard',
    fontSize: 20,
    lineHeight: 32,
    color: '#25252C',
    marginLeft: 24,
    marginTop: 60,
    marginBottom: 40,
  },
  trainingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderColor: '#FFF',
    borderWidth: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#1A1D241A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  badgeIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  badgeText: {
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 14,
    color: '#3D3D44',
  },
  trainingQuestion: {
    fontFamily: 'Pretendard',
    fontWeight: '800',
    fontSize: 16,
    color: '#3557D4',
    marginBottom: 4,
    lineHeight: 24,
  },
  trainingDesc: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 15,
    color: '#25252C',
    lineHeight: 25.6,
  },
  planHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginBottom: 20,
  },
  planHeaderText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
  },
  calendarImg: {
    width: 100,
    height: 100,
  },
  planCardArea: {
    alignItems: 'center',
    backgroundColor: '#F8FBFF',
    paddingTop: 20,
    paddingBottom: 12,
  },
  planCard: {
    width: CARD_WIDTH,
    minHeight: CARD_HEIGHT,
    backgroundColor: '#FFF',
    borderRadius: 18,
    marginRight: SPACING,
    padding: 24,
    shadowColor: '#1A1D241A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'flex-start',
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
  weekBadgeText: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 19.2,
  },
  planCardDate: {
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 12,
    color: '#9298A2',
    lineHeight: 19.2,
  },
  planCardTitle: {
    fontFamily: 'Pretendard',
    fontWeight: '700',
    fontSize: 20,
    color: '#25252C',
    lineHeight: 32,
    marginBottom: 16,
    marginTop: 0,
  },
  fieldRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  fieldLabel: {
    backgroundColor: '#E8F1FF',
    height: 32,
    borderRadius: 55,
    paddingHorizontal: 16,
    paddingVertical: 6,
    justifyContent: 'center',
    marginRight: 12,
  },
  fieldLabelText: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 19.2,
  },
  fieldContent: {
    flex: 1,
    fontFamily: 'Pretendard',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#25252C',
    marginTop: 2,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3557D4',
    marginHorizontal: 4,
  },
});

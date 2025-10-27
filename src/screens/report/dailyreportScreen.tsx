import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const mainIcon = require('../../assets/icon/mainIcon.png');
const { width } = Dimensions.get('window');
const scaleFactor = width / 360;

const ANXIETY_ICONS = [
  require('../../assets/img/report/anxiety1.png'),
  require('../../assets/img/report/anxiety2.png'),
  require('../../assets/img/report/anxiety3.png'),
  require('../../assets/img/report/anxiety4.png'),
  require('../../assets/img/report/anxiety5.png'),
];

const ALL_DUMMY_RECORDS = [
  [
    {
      time: '오전 9시 36분',
      title: '이동 중에 나의 현재 위치를 확인하고 싶다',
      extra1: '반응 방지',
      extra2: '3분 30초',
      extra3: '평균 불안 정도',
      extra4: '50',
    },
    {
      time: '오전 11시 20분',
      title: '내 위치에서 도착지까지의 시간을 확인하고 싶다',
      extra1: '반응 방지',
      extra2: '4분 30초',
      extra3: '평균 불안 정도',
      extra4: '30',
    },
  ],
  [
    {
      time: '오후 1시 05분',
      title: '출근 후 문이 잠겼는지 다시 확인했다',
      extra1: '확인 횟수',
      extra2: '3번',
      extra3: '평균 불안 정도',
      extra4: '65',
    },
    {
      time: '오후 4시 30분',
      title: '지하철 좌석에 앉은 뒤 옷이 더럽혀진 것 같다',
      extra1: '반응 방지',
      extra2: '5분 00초',
      extra3: '평균 불안 정도',
      extra4: '70',
    },
    {
      time: '저녁 8시 15분',
      title: '주차된 차 문을 잠갔는지 계속 리모컨으로 확인했다',
      extra1: '확인 횟수',
      extra2: '6번',
      extra3: '평균 불안 정도',
      extra4: '80',
    },
  ],
  [
    {
      time: '오후 2시 10분',
      title: '전등 스위치를 껐는지 생각나서 잠시 고민했다',
      extra1: '반응 방지',
      extra2: '1분 10초',
      extra3: '평균 불안 정도',
      extra4: '20',
    },
  ],
  [
    {
      time: '오전 7시 50분',
      title: '엘리베이터 버튼을 누른 손을 씻고 싶은 충동을 참았다',
      extra1: '반응 방지',
      extra2: '2분 45초',
      extra3: '평균 불안 정도',
      extra4: '45',
    },
    {
      time: '저녁 7시 00분',
      title: '마트 카트를 만진 뒤 불안감이 느껴져 밖으로 나왔다',
      extra1: '반응 방지',
      extra2: '3분 50초',
      extra3: '평균 불안 정도',
      extra4: '55',
    },
  ],
  [
    {
      time: '오후 5시 25분',
      title: '집에 혼자 두고 온 창문이 닫혔는지 불안해서 전화했다',
      extra1: '확인 횟수',
      extra2: '1번',
      extra3: '평균 불안 정도',
      extra4: '85',
    },
    {
      time: '오후 10시 00분',
      title: '문을 잠근 상태를 열쇠로 세 번 다시 확인했다',
      extra1: '확인 횟수',
      extra2: '3번',
      extra3: '평균 불안 정도',
      extra4: '78',
    },
  ],
  [
    {
      time: '오전 10시 00분',
      title:
        '공중화장실 물 내림 버튼을 손으로 누르고 바로 씻지 않기 위해 참았다',
      extra1: '반응 방지',
      extra2: '4분 15초',
      extra3: '평균 불안 정도',
      extra4: '68',
    },
    {
      time: '오후 3시 40분',
      title: '책상 위 먼지를 보고 손을 씻고 싶었으나 작업을 계속했다',
      extra1: '반응 방지',
      extra2: '2분 00초',
      extra3: '평균 불안 정도',
      extra4: '40',
    },
  ],
  [
    {
      time: '오후 1시 20분',
      title: '서랍 속 물건들의 대칭을 맞추고 싶은 충동을 억제했다',
      extra1: '반응 방지',
      extra2: '1분 50초',
      extra3: '평균 불안 정도',
      extra4: '55',
    },
    {
      time: '저녁 9시 05분',
      title:
        '침대 위 베개가 살짝 비뚤어진 것을 보고 고치지 않고 잠자리에 들었다',
      extra1: '반응 방지',
      extra2: '3분 20초',
      extra3: '평균 불안 정도',
      extra4: '75',
    },
  ],
  [
    {
      time: '오전 8시 30분',
      title: '집을 나서기 전 가스 밸브를 여러 번 점검했다',
      extra1: '확인 횟수',
      extra2: '4번',
      extra3: '평균 불안 정도',
      extra4: '72',
    },
    {
      time: '오후 6시 40분',
      title: '차를 주차한 후 사이드 브레이크가 채워졌는지 반복해서 확인했다',
      extra1: '확인 횟수',
      extra2: '5번',
      extra3: '평균 불안 정도',
      extra4: '88',
    },
    {
      time: '밤 11시 10분',
      title: '알람 시계를 세 번 껐다 켜서 작동 여부를 재확인했다',
      extra1: '확인 횟수',
      extra2: '3번',
      extra3: '평균 불안 정도',
      extra4: '60',
    },
  ],
  [
    {
      time: '오전 11시 50분',
      title: '복도를 걸을 때 보도블록의 금을 밟지 않으려는 행동을 참았다',
      extra1: '반응 방지',
      extra2: '2분 20초',
      extra3: '평균 불안 정도',
      extra4: '58',
    },
    {
      time: '오후 2시 55분',
      title: '특정 단어를 속으로 짝수 번 반복하고 싶은 충동을 억제했다',
      extra1: '반응 방지',
      extra2: '1분 30초',
      extra3: '평균 불안 정도',
      extra4: '35',
    },
  ],
  [
    {
      time: '오전 6시 00분',
      title: '샤워 시 몸의 특정 부위를 정해진 횟수만큼 반복해서 씻었다',
      extra1: '반복 횟수',
      extra2: '5회',
      extra3: '평균 불안 정도',
      extra4: '90',
    },
    {
      time: '오후 12시 30분',
      title: '식사 후 손을 세 번의 과정을 거쳐 과도하게 씻었다',
      extra1: '반복 횟수',
      extra2: '3회',
      extra3: '평균 불안 정도',
      extra4: '82',
    },
  ],
];

const formatDateForTitle = dateString => {
  if (!dateString) return '';
  const parts = dateString.split('-');
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  return `${month}월 ${day}일`;
};

export default function DailyReportScreen({ route, navigation }) {
  const { date, level } = route.params || {};
  const today = new Date();
  const defaultDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const selectedDate = date || defaultDate;
  const selectedLevel = level || 1;

  const dateTitle = formatDateForTitle(selectedDate);
  const screenTitle = `${dateTitle}의 반응 방지`;

  const anxietyIconSource =
    ANXIETY_ICONS[selectedLevel - 1] || ANXIETY_ICONS[0];

  const randomIndex = Math.floor(Math.random() * ALL_DUMMY_RECORDS.length);
  const dailyRecords = ALL_DUMMY_RECORDS[randomIndex];

  const averageAnxiety =
    dailyRecords.length > 0
      ? Math.round(
          dailyRecords.reduce((sum, r) => sum + parseInt(r.extra4, 10), 0) /
            dailyRecords.length,
        )
      : 0;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.titleText}>{screenTitle}</Text>
        <TouchableOpacity
          style={styles.mainIconWrap}
          onPress={() => navigation.replace('main')}
        >
          <Image source={mainIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.largeIconWrap}>
        <Image
          source={anxietyIconSource}
          style={styles.largeIcon}
          resizeMode="contain"
        />
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>평균 불안 정도</Text>
          <Text style={styles.summaryValue}>{averageAnxiety}점</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>반응 방지 횟수</Text>
          <Text style={styles.summaryValue}>{dailyRecords.length}회</Text>
        </View>
      </View>

      <View style={styles.section}>
        {dailyRecords.map((item, idx) => (
          <View key={idx} style={styles.recordCard}>
            <View style={styles.titleRow}>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.recordTitle}>{item.title}</Text>
            <View style={styles.infoBoxesRow}>
              <View style={styles.extraBox}>
                <Text style={styles.extraLabel}>{item.extra1}</Text>
                <Text style={styles.extraValue}>{item.extra2}</Text>
              </View>
              <View style={styles.extraBox}>
                <Text style={styles.extraLabel}>{item.extra3}</Text>
                <Text style={styles.extraValue}>{item.extra4}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#F8FBFF' },
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 36,
    backgroundColor: '#F8FBFF',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 24,
    paddingRight: 4,
  },
  titleText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 20 * scaleFactor,
    fontWeight: '700',
    lineHeight: 28 * scaleFactor,
  },
  mainIconWrap: { position: 'absolute', right: 0 },
  icon: { width: 20 * scaleFactor, height: 20 * scaleFactor, marginLeft: 4 },
  largeIconWrap: {
    alignSelf: 'center',
    marginVertical: 20 * scaleFactor,
    width: 160 * scaleFactor,
    height: 160 * scaleFactor,
  },
  largeIcon: { width: '100%', height: '100%' },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12 * scaleFactor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E7EEF8',
    marginVertical: 20 * scaleFactor,
  },
  summaryItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  summaryLabel: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14 * scaleFactor,
    fontWeight: '500',
  },
  summaryValue: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 14 * scaleFactor,
    fontWeight: '700',
  },
  section: {
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 20 * scaleFactor,
  },
  recordCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: '100%',
    maxWidth: 320,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16 * scaleFactor,
    marginBottom: 16,
    shadowColor: '#D6E7F8',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 16 * scaleFactor,
    fontWeight: '800',
  },
  recordTitle: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14 * scaleFactor,
    fontWeight: '500',
  },
  infoBoxesRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  extraBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 8 * scaleFactor,
    borderRadius: 10,
    backgroundColor: '#F7F9FD',
    width: '48%',
  },
  extraLabel: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14 * scaleFactor,
    fontWeight: '500',
    marginRight: 0,
  },
  extraValue: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 14 * scaleFactor,
    fontWeight: '500',
    marginRight: 0,
  },
});

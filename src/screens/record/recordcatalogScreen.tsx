import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ToggleButton from '../../components/toggleButton';
const mainIcon = require('../../assets/icon/mainIcon.png');
const moreIcon = require('../../assets/icon/moreIcon.png');

const TOGGLE_OPTIONS = [
  { key: 'checking', label: '확인 강박' },
  { key: 'contamination', label: '오염 강박' },
];

const dummyRecordsByType = {
  checking: [
    {
      date: '10월 29일',
      time: '오전 8시 10분',
      title: '출근 전에 가스밸브를 5번 넘게 확인했다',
      extra1: '확인 횟수',
      extra2: '5번',
      extra3: '평균 불안 정도',
      extra4: '70',
    },
    {
      date: '10월 15일',
      time: '오후 9시 50분',
      title: '외출 후 문을 제대로 잠갔는지 확인하러 갔다',
      extra1: '확인 횟수',
      extra2: '2번',
      extra3: '평균 불안 정도',
      extra4: '55',
    },
    {
      date: '9월 30일',
      time: '저녁 7시 20분',
      title: '전등 스위치를 끄지 않았을까 걱정되어 돌아갔다',
      extra1: '확인 횟수',
      extra2: '3번',
      extra3: '평균 불안 정도',
      extra4: '50',
    },
    {
      date: '9월 12일',
      time: '오전 6시 40분',
      title: '외출 후 창문이 닫혔는지 생각나서 다시 확인했다',
      extra1: '확인 횟수',
      extra2: '4번',
      extra3: '평균 불안 정도',
      extra4: '65',
    },
    {
      date: '8월 22일',
      time: '오후 5시 30분',
      title: '차 문을 잠갔는지 리모컨으로 계속 확인했다',
      extra1: '확인 횟수',
      extra2: '6번',
      extra3: '평균 불안 정도',
      extra4: '72',
    },
    {
      date: '8월 5일',
      time: '오전 10시 00분',
      title: '인터폰이 꺼졌는지 확인하려고 집에 돌아왔다',
      extra1: '확인 횟수',
      extra2: '1번',
      extra3: '평균 불안 정도',
      extra4: '40',
    },
  ],
  contamination: [
    {
      date: '10월 31일',
      time: '오전 11시 20분',
      title: '지하철 손잡이를 잡은 후 손이 오염된 것 같다',
      extra1: '반응 방지',
      extra2: '4분 30초',
      extra3: '평균 불안 정도',
      extra4: '30',
    },
    {
      date: '10월 7일',
      time: '오후 6시 45분',
      title: '길고양이에게 스친 옷이 오염된 것 같다',
      extra1: '반응 방지',
      extra2: '3분 10초',
      extra3: '평균 불안 정도',
      extra4: '40',
    },
    {
      date: '9월 28일',
      time: '오전 9시 15분',
      title: '회사 탕비실 컵을 만지고 불안해졌다',
      extra1: '반응 방지',
      extra2: '2분 50초',
      extra3: '평균 불안 정도',
      extra4: '35',
    },
    {
      date: '9월 10일',
      time: '오후 4시 00분',
      title: '엘리베이터 버튼을 누른 뒤 손을 씻고 싶었다',
      extra1: '반응 방지',
      extra2: '1분 40초',
      extra3: '평균 불안 정도',
      extra4: '25',
    },
    {
      date: '8월 24일',
      time: '오후 8시 50분',
      title: '편의점 거스름돈을 만진 것이 불안하다',
      extra1: '반응 방지',
      extra2: '3분 20초',
      extra3: '평균 불안 정도',
      extra4: '38',
    },
    {
      date: '8월 3일',
      time: '오전 7시 20분',
      title: '공용 세면대를 사용한 뒤 손을 씻지 않아 불안했다',
      extra1: '반응 방지',
      extra2: '5분 00초',
      extra3: '평균 불안 정도',
      extra4: '50',
    },
  ],
};

export default function ListRecordScreen({ navigation }) {
  const [toggle, setToggle] = useState('checking');
  const [filter1, setFilter1] = useState('1주일');
  const [filter2, setFilter2] = useState('불안 위계');

  const records = dummyRecordsByType[toggle] || [];

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

      <View style={styles.selectRow}>
        <TouchableOpacity style={styles.selectorBox} onPress={() => {}}>
          <Text style={styles.selectorText}>{filter1}</Text>
          <Image
            source={moreIcon}
            style={styles.moreIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectorBox} onPress={() => {}}>
          <Text style={styles.selectorText}>{filter2}</Text>
          <Image
            source={moreIcon}
            style={styles.moreIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        {records.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.recordCard}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('record', { type: toggle, record: item })
            }
          >
            <View style={styles.titleRow}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.recordTitle}>{item.title}</Text>
            <View style={styles.infoBoxesRow}>
              <View style={styles.extraBox}>
                <Text style={styles.extraLabel}>{item.extra1}</Text>
                <Text style={styles.extraValue}>{item.extra2}</Text>
              </View>
              <View style={styles.extraBox}>
                <Text style={styles.extraLabel}>{item.extra3} </Text>
                <Text style={styles.extraValue}>{item.extra4}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    paddingBottom: 36,
    backgroundColor: '#F8FBFF',
  },
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
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 4,
  },
  selectRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  selectorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F7FB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    minWidth: 90,
  },
  selectorText: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: -0.42,
    textAlign: 'center',
  },
  moreIcon: {
    width: 16,
    height: 16,
    marginLeft: 10,
  },
  section: {
    alignItems: 'center',
    marginBottom: 8,
  },
  recordCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    width: 320,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,
    marginBottom: 16,
    shadowColor: '#D6E7F8',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    color: '#25252C',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
  timeText: {
    color: '#9298A2',
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '800',
  },
  recordTitle: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
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
    paddingVertical: 16,
    borderRadius: 10,
    backgroundColor: '#F7F9FD',
    width: '48%',
  },
  extraLabel: {
    color: '#717780',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 0,
  },
  extraValue: {
    color: '#3557D4',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 0,
  },
});
